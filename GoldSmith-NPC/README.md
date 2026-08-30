# Gold Smith NPC — Bedrock Addon (1.21.130)

A custom "Gold Smith" trader NPC for Minecraft Bedrock/PE **1.21.130**.
Uses the honest-worker skin, opens the villager-style trade screen, and is silent (no villager voice).

## Install

1. Open `GoldSmith_NPC_v1.0.0.mcaddon` — Minecraft imports the behavior + resource packs automatically.
2. Activate both **Gold Smith NPC (Behavior)** and **Gold Smith NPC (Resource)** for your world.
3. Summon the NPC:

```
/summon remotion:gold_smith
```

A gold/brown spawn egg is also added to the Creative inventory (NPC tab / spawn egg search).

## Trades

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
| Bell | 36 emeralds | 1 bell |

## Notes

- No ambient villager murmur/voice (custom entity, no villager sound events).
- NPC is a humanoid rendered with the custom skin.
- Trade screen is the standard villager trade UI (Bedrock limitation — a fully custom shop GUI is not possible via addons).
