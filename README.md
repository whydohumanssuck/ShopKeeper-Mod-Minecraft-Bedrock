# Gold Smith NPC — Bedrock Addon (1.21.130)

A custom **Gold Smith** trader NPC for Minecraft Bedrock/PE **1.21.130**.
Uses your honest-worker skin, greets the player with a dialogue, and opens a
custom shop menu (script-driven, not the vanilla villager screen).

## Install

1. Open `GoldSmith_NPC_v1.0.1.mcaddon` — Minecraft imports both packs.
2. Activate **Gold Smith NPC (Behavior)** and **Gold Smith NPC (Resource)** in the world.
3. Summon the NPC:

```
/summon remotion:gold_smith
```

A gold/brown **spawn egg** is also in the Creative inventory.

## Features

- **Dialogue on interact**: tap/right-click the NPC → popup:
  *"hey, sup long time no see what do you want today?"*
- **Buy items** button → custom shop menu (not the villager trade screen).
- NPC is **silent** (no villager voice) and **unkillable** (damage sensor).

## Shop (emeralds)

| Item | Cost |
|---|---|
| Golden Apple | 4 |
| Golden Carrot | 3 |
| Gold Helmet | 7 |
| Gold Chestplate | 11 |
| Gold Leggings | 9 |
| Gold Boots | 5 |
| Bell | 36 |

Emeralds are taken from the player's inventory; the item is given (drops if inventory full).

## Notes

- Requires **experimental "Beta APIs / Gametest Framework"** enabled in world settings
  (script-based shop), or the dialogue won't appear.
- Custom shop UI is the only way to get a real dialogue + buy flow on Bedrock.
