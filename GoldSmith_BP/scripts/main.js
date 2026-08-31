import { world, system } from "@minecraft/server";
import { MessageFormData, ActionFormData } from "@minecraft/server-ui";

const ID = "remotion:gold_smith";
const EMERALD = "minecraft:emerald";
const CATALOG = [
    { name: "Golden Apple",    cost: 4,  item: "minecraft:golden_apple" },
    { name: "Golden Carrot",   cost: 3,  item: "minecraft:golden_carrot" },
    { name: "Gold Helmet",     cost: 7,  item: "minecraft:golden_helmet" },
    { name: "Gold Chestplate", cost: 11, item: "minecraft:golden_chestplate" },
    { name: "Gold Leggings",   cost: 9,  item: "minecraft:golden_leggings" },
    { name: "Gold Boots",      cost: 5,  item: "minecraft:golden_boots" },
    { name: "Bell",            cost: 36, item: "minecraft:bell" }
];
const CD = new Map();

function ok(pid) {
    const n = Date.now(), k = pid + "_cd";
    if (n - (CD.get(k) || 0) < 3000) return false;
    CD.set(k, n); return true;
}

function emeralds(p) {
    let t = 0;
    for (const s of p.getComponent("minecraft:inventory").container) {
        if (s && s.typeId === EMERALD) t += s.amount;
    } return t;
}

function take(p, n) {
    const c = p.getComponent("minecraft:inventory").container;
    let r = n;
    for (let i = 0; i < c.size && r > 0; i++) {
        const s = c.getItem(i);
        if (s && s.typeId === EMERALD) {
            const u = Math.min(s.amount, r);
            s.amount -= u; r -= u;
            c.setItem(i, s.amount > 0 ? s : undefined);
        }
    }
}

function give(p, id, n) {
    const c = p.getComponent("minecraft:inventory").container;
    const l = c.addItem({ typeId: id, amount: n });
    if (l) p.spawnItem(l, p.location);
}

function greet(p) {
    if (!ok(p.id)) return;
    try {
        new MessageFormData()
            .title("Gold Smith")
            .body("hey, sup long time no see what do you want today?")
            .button1("Buy items")
            .button2("Maybe later")
            .show(p).then(r => { if (r.selection === 0) shop(p); }).catch(() => {});
    } catch (_) {}
}

function shop(p) {
    try {
        const f = new ActionFormData().title("Gold Smith \u2014 Shop");
        for (const c of CATALOG) f.button(c.name + "  [" + c.cost + " emeralds]");
        f.show(p).then(r => {
            if (r.selection === undefined) return;
            const d = CATALOG[r.selection];
            if (emeralds(p) >= d.cost) {
                take(p, d.cost); give(p, d.item, 1);
                world.sendMessage("\u00a76" + p.name + " bought " + d.name);
            } else p.sendMessage("\u00a7cNeed " + d.cost + " emeralds");
        }).catch(() => {});
    } catch (_) {}
}

/* ---- triggers ---- */

// 1. Proximity: walk near the NPC → greeting
system.runInterval(() => {
    try {
        for (const p of world.getPlayers()) {
            const k = p.id + "_prox", now = Date.now();
            if (now - (CD.get(k) || 0) < 15000) continue;
            for (const e of p.dimension.getEntities({ type: ID })) {
                const dx = p.location.x - e.location.x,
                      dy = p.location.y - e.location.y,
                      dz = p.location.z - e.location.z;
                if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 4) { CD.set(k, now); greet(p); break; }
            }
        }
    } catch (_) {}
}, 20);

// 2. Hit: tap / attack on any platform
world.afterEvents.entityHitEntity.subscribe(e => {
    try {
        if (e.damagingEntity?.typeId !== "minecraft:player") return;
        if (e.hitEntity.typeId === ID) greet(e.damagingEntity);
    } catch (_) {}
});

// 3. Interact: right-click / hold
world.afterEvents.playerInteractWithEntity.subscribe(e => {
    try { if (e.target.typeId === ID) greet(e.player); } catch (_) {}
});

// 4. Slash command fallback:  /goldsmith
world.afterEvents.chatSend.subscribe(e => {
    try {
        if (e.message.trim().toLowerCase() !== "/goldsmith") return;
        greet(e.sender);
    } catch (_) {}
});
