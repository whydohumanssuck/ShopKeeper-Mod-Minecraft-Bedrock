# Gold Smith NPC — Bedrock Addon (1.21.130)

A custom **Gold Smith** trader NPC for Minecraft Bedrock/PE **1.21.130**.
Uses the honest-worker skin, shows a greeting on approach, and opens the
**native villager trade screen** (with item icons, costs, and trade slots)
when you hold/right-click.

## Install

1. Open `GoldSmith_NPC_v1.0.3.mcaddon` — Minecraft imports both packs.
2. Enable **Beta APIs / Gametest Framework** in world settings (experimental tab).
3. Activate both **Gold Smith NPC (Behavior)** and **Gold Smith NPC (Resource)**.
4. Summon the NPC:

```
/summon remotion:gold_smith
```

A gold/brown spawn egg is also in the Creative inventory.

## How It Works

| Action | What Happens |
|---|---|
| **Walk within 4 blocks** | Greeting title: *"hey, sup long time no see what do you want today?"* |
| **Tap / attack** | Same greeting title + the NPC takes no damage (unkillable) |
| **Hold / right-click** | Opens the **villager trade screen** with all goldsmith trades |
| **`/goldsmith`** | Shows the greeting in chat |

## Trades (shown in the native trade UI)

| Trade | Cost | Gives |
|---|---|---|
| Raw gold → emerald | 1 raw gold | 1 emerald |
| Gold ingot → emerald | 1 gold ingot | 1 emerald |
| Iron ingots → emerald | 4 iron ingots | 1 emerald |
| Golden apple | 4 emeralds | 1 golden apple |
| Golden carrot | 3 emeralds | 1 golden carrot |
| Gold helmet | 7 emeralds | 1 golden helmet |
| Gold chestplate | 11 emeralds | 1 golden chestplate |
| Gold leggings | 9 emeralds | 1 golden leggings |
| Gold boots | 5 emeralds | 1 golden boots |

## Notes

- NPC is **silent** (no villager murmur/voice).
- NPC is **unkillable** (damage sensor blocks all damage).
- NPC is **persistent** (never despawns).
- The trade screen is the real Bedrock villager trade UI — item icons, costs, and trade slots.
