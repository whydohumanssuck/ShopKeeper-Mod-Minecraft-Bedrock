import { world, system } from "@minecraft/server";

const ID = "remotion:gold_smith";
const GREETING = "hey, sup long time no see what do you want today?";
const CD = new Map();

function ok(pid) {
    const n = Date.now(), k = pid + "_cd";
    if (n - (CD.get(k) || 0) < 5000) return false;
    CD.set(k, n); return true;
}

function greet(p) {
    if (!ok(p.id)) return;
    try {
        p.onScreenDisplay.setTitle("Gold Smith", {
            fadeInDuration: 5,
            stayDuration: 40,
            fadeOutDuration: 10,
            subtitle: GREETING
        });
    } catch (_) {
        try { p.sendMessage("\u00a76Gold Smith: " + GREETING); } catch (_) {}
    }
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

// 3. Interact: right-click / hold — trade screen opens via trade_table component
//    (no script needed for the trade UI itself)
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
