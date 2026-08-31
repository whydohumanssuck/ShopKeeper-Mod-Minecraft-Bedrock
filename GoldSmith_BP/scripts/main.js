import { world, system } from "@minecraft/server";
import { MessageFormData, ActionFormData, ModalFormData } from "@minecraft/server-ui";

const ID = "remotion:gold_smith";
const EMERALD = "minecraft:emerald";
const CD = new Map();

// shop catalog: name, cost in emeralds, item id, count
const CATALOG = [
    { name: "Golden Apple",    cost: 4,  item: "minecraft:golden_apple",    count: 1 },
    { name: "Golden Carrot",   cost: 3,  item: "minecraft:golden_carrot",   count: 1 },
    { name: "Gold Helmet",     cost: 7,  item: "minecraft:golden_helmet",   count: 1 },
    { name: "Gold Chestplate", cost: 11, item: "minecraft:golden_chestplate", count: 1 },
    { name: "Gold Leggings",   cost: 9,  item: "minecraft:golden_leggings", count: 1 },
    { name: "Gold Boots",      cost: 5,  item: "minecraft:golden_boots",    count: 1 },
    { name: "Bell",            cost: 36, item: "minecraft:bell",            count: 1 }
];

function ok(pid, ms) {
    const n = Date.now(), k = pid + "_cd";
    if (n - (CD.get(k) || 0) < (ms || 5000)) return false;
    CD.set(k, n); return true;
}

/* ---- shop helpers ---- */

function emeralds(p) {
    let t = 0;
    for (const s of p.getComponent("minecraft:inventory").container) {
        if (s && s.typeId === EMERALD) t += s.amount;
    }
    return t;
}

function takeEmeralds(p, n) {
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

function giveItem(p, id, n) {
    const c = p.getComponent("minecraft:inventory").container;
    const left = c.addItem({ typeId: id, amount: n });
    if (left) p.spawnItem(left, p.location);
}

/* ---- UI flow ---- */

// Step 1: greeting with two buttons
function openGreeting(p) {
    if (!ok(p.id)) return;
    try {
        new MessageFormData()
            .title("Gold Smith")
            .body("Hey Pal, what brings you here?")
            .button1("Nothing")
            .button2("Buy Items")
            .show(p).then(r => {
                if (r.selection === 1) openTrades(p);
            }).catch(() => {});
    } catch (_) {}
}

// Step 2: trade menu (mirrors villager-style trades with item icons + costs)
function openTrades(p) {
    try {
        const f = new ActionFormData().title("Gold Smith \u2014 Trade");
        for (const c of CATALOG) {
            f.button(c.name + "   \u00a7b\u00a7l" + c.cost + "\u00a7r Emerald");
        }
        f.show(p).then(r => {
            if (r.selection === undefined) return;
            const deal = CATALOG[r.selection];
            confirmPurchase(p, deal);
        }).catch(() => {});
    } catch (_) {}
}

// Step 3: confirm + process the trade
function confirmPurchase(p, deal) {
    try {
        const have = emeralds(p);
        const f = new ModalFormData()
            .title("Confirm Trade")
            .dropdown("Quantity", ["1"], 0);
        f.show(p).then(() => {
            if (have >= deal.cost) {
                takeEmeralds(p, deal.cost);
                giveItem(p, deal.item, deal.count);
                p.sendMessage("\u00a76Gold Smith: Pleasure doing business! +" + deal.name);
            } else {
                p.sendMessage("\u00a7cYou need " + deal.cost + " emeralds for " + deal.name + ".");
            }
        }).catch(() => {});
    } catch (_) {}
}

/* ---- triggers ---- */

// Tap / hit
world.afterEvents.entityHitEntity.subscribe(e => {
    try {
        if (e.damagingEntity?.typeId !== "minecraft:player") return;
        if (e.hitEntity.typeId === ID) openGreeting(e.damagingEntity);
    } catch (_) {}
});

// Right-click / hold (native trade screen would open here too — but we show greeting
// and route through Buy Items instead)
world.afterEvents.playerInteractWithEntity.subscribe(e => {
    try { if (e.target.typeId === ID) openGreeting(e.player); } catch (_) {}
});

// Slash fallback
world.afterEvents.chatSend.subscribe(e => {
    try {
        if (e.message.trim().toLowerCase() !== "/goldsmith") return;
        openGreeting(e.sender);
    } catch (_) {}
});
