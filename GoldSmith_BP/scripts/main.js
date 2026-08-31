import { world } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";

const ID = "remotion:gold_smith";
const CD = new Map();
const CD_MS = 3000;

function cooldown(p) {
    const key = p.id;
    const now = Date.now();
    if (now - (CD.get(key) || 0) < CD_MS) return false;
    CD.set(key, now);
    return true;
}

function openGreeting(p, npc) {
    if (!cooldown(p)) return;
    try {
        new MessageFormData()
            .title("Gold Smith")
            .body("Hey Pal, what brings you here?")
            .button1("Nothing")
            .button2("Buy Items")
            .show(p).then((r) => {
                if (r.selection === 1) {
                    // Flip NPC into trade phase so the next tap opens the native trader UI.
                    try {
                        npc?.triggerEvent("remotion:open_shop");
                    } catch (_) {}
                    p.sendMessage("\u00a76Gold Smith: Ready to deal! Tap me once more to open the shop.");
                }
            }).catch(() => {});
    } catch (_) {}
}

// Clicking the "Talk" interaction button fires this event on the player.
world.afterEvents.playerInteractWithEntity.subscribe((e) => {
    try {
        if (e.target?.typeId !== ID) return;
        const p = e.player;
        if (p && p.typeId === "minecraft:player") openGreeting(p, e.target);
    } catch (_) {}
});
