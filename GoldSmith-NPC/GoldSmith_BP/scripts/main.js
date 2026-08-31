import { world } from "@minecraft/server";
import { MessageFormData, ActionFormData } from "@minecraft/server-ui";

const GOLD_SMITH_ID = "remotion:gold_smith";
const EMERALD = "minecraft:emerald";

const CATALOG = [
    { name: "Golden Apple", cost: 4, item: "minecraft:golden_apple", count: 1 },
    { name: "Golden Carrot", cost: 3, item: "minecraft:golden_carrot", count: 1 },
    { name: "Gold Helmet", cost: 7, item: "minecraft:golden_helmet", count: 1 },
    { name: "Gold Chestplate", cost: 11, item: "minecraft:golden_chestplate", count: 1 },
    { name: "Gold Leggings", cost: 9, item: "minecraft:golden_leggings", count: 1 },
    { name: "Gold Boots", cost: 5, item: "minecraft:golden_boots", count: 1 },
    { name: "Bell", cost: 36, item: "minecraft:bell", count: 1 }
];

function countEmeralds(player) {
    let total = 0;
    for (const item of player.getComponent("minecraft:inventory").container) {
        if (item && item.typeId === EMERALD) total += item.amount;
    }
    return total;
}

function removeEmeralds(player, amount) {
    const container = player.getComponent("minecraft:inventory").container;
    let toRemove = amount;
    for (let i = 0; i < container.size && toRemove > 0; i++) {
        const item = container.getItem(i);
        if (item && item.typeId === EMERALD) {
            const take = Math.min(item.amount, toRemove);
            item.amount -= take;
            container.setItem(i, item.amount > 0 ? item : undefined);
            toRemove -= take;
        }
    }
}

function giveItem(player, itemId, count) {
    const container = player.getComponent("minecraft:inventory").container;
    const leftover = container.addItem({ typeId: itemId, amount: count });
    if (leftover) {
        player.spawnItem(leftover, player.location);
    }
}

world.afterEvents.playerInteractWithEntity.subscribe((event) => {
    const { player, target } = event;
    if (target.typeId !== GOLD_SMITH_ID) return;

    const form = new MessageFormData()
        .title("Gold Smith")
        .body("hey, sup long time no see what do you want today?")
        .button1("Buy items")
        .button2("Maybe later")
        .show(player).then((resp) => {
            if (resp.selection === 0) {
                showShop(player);
            }
        });
});

function showShop(player) {
    const form = new ActionFormData().title("Gold Smith - Shop");
    const prices = CATALOG.map((c) => c.name + "  [" + c.cost + " emeralds]");
    for (const p of prices) form.button(p);
    form.show(player).then((resp) => {
        if (resp.selection === undefined || resp.selection < 0) return;
        const deal = CATALOG[resp.selection];
        const balance = countEmeralds(player);
        if (balance >= deal.cost) {
            removeEmeralds(player, deal.cost);
            giveItem(player, deal.item, deal.count);
            world.sendMessage(`§6${player.name} bought ${deal.name} from the Gold Smith!`);
        } else {
            player.sendMessage(`§cYou need ${deal.cost} emeralds to buy a ${deal.name}.`);
        }
    });
}
