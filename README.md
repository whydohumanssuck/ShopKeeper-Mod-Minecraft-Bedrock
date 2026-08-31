# Gold Smith NPC — Bedrock Addon (1.21.130)

A custom **Gold Smith** trader NPC for Minecraft Bedrock/PE **1.21.130**.
Uses the honest-worker skin, shows a "Talk" button when you get close, opens
a greeting with a **Buy Items** option, and then opens the **native villager
trade screen** (with item icons, costs, and trade slots).

## Install

1. Open `GoldSmith_NPC_v1.0.6.mcaddon` — Minecraft imports both packs.
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
| **Walk close to the NPC** | A **Talk** interaction button appears |
| **Tap Talk** | Greeting dialogue: *"Hey Pal, what brings you here?"* with **Nothing** and **Buy Items** |
| **Tap Buy Items** | NPC switches to shop mode; tap the NPC once more to open the **villager trade screen** |
| **Tap the NPC in shop mode** | Opens the **native trade screen** with all goldsmith trades |
| **Tap Nothing** | Closes the dialogue |
| **Attack** | NPC takes no damage (unkillable) |

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
