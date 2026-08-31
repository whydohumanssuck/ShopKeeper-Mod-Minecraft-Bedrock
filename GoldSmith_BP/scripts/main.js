import { world } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";

const ID = "remotion:gold_smith";
const CD = new Map();

function ok(p) {
    const n = Date.now(), k = p.id + "_cd";
    if (n - (CD.get(k) || 0) < 4000) return false;
    CD.set(k, n); return true;
}

function openGreeting(p) {
    if (!ok(p)) return;
    try {
        new MessageFormData()
            .title("Gold Smith")
            .body("Hey Pal, what brings you here?")
            .button1("Nothing")
            .button2("Buy Items")
            .show(p).then(r => {
                if (r.selection === 1) {
                    p.sendMessage("\u00a76Gold Smith: Take a look, then hold to trade!");
                }
            }).catch(() => {});
    } catch (_) {}
}

// Tap / hit → greeting (does not open native trade; native trade opens on hold)
world.afterEvents.entityHitEntity.subscribe(e => {
    try {
        if (e.damagingEntity?.typeId !== "minecraft:player") return;
        if (e.hitEntity.typeId === ID) openGreeting(e.damagingEntity);
    } catch (_) {}
});

// Slash fallback
world.afterEvents.chatSend.subscribe(e => {
    try {
        if (e.message.trim().toLowerCase() !== "/goldsmith") return;
        openGreeting(e.sender);
    } catch (_) {}
});
