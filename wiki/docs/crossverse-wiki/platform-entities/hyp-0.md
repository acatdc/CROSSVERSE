---
title: Hyp 0 ˈHaɪpou
slug: /crossverse-wiki/platform-entities/hyp-0
---

# Hyp-0 [ˈhaɪpou]

A cute digital pet that helps players to explore the metaverse while having fun!

## Etymology

Initially, we developed a device whose task was to generate energy for one secret entity in the CROSSVERSE world. And it was logical to call this device “generator”. However, by that time in the project, the word “generator” was already occupied by another entity, besides, the word generator was not very suitable, since this device initially assumed special functions. As a result, it was spontaneously thought up that it could be a “hyper generator” .. and instantly it turned into a new word - zero generation **Hyperator**, first of its kind. So Hyp-0 is just a concise format for writing a scary and boring name.

## Features

Hyp-0 is a personalized “device”, a kind of “Swiss knife”, whose task is to be an indispensable assistant to any “[*nomad*](./general-overview.md)” of the metaverses.

He has a primitive AI that makes him "a little alive".

Hyp-0 takes on a different form depending on the context:

- Idle: Waits for commands from the player
- Navigate: Shows the direction to specific locations for the nomad
- Portal: Show the portal to the player which teleports somewhere around destination location
- Success: When the player has successfully completed a mission, Hyp-0 will explicitly notify the player.

![hyp-0_blueprint.jpg](./hyp-0/hyp-0-blueprint.jpg)

## Basic scenario of interaction with Hyp-0

1. [Nomad](./general-overview.md) approaches Hyp-0 and activates [interface](./hyp-0.md) to interact with it.
2. Hyp-0 shows various options for what to do.
3. [Nomad](./general-overview.md) selects the “start new task” option.
4. Hyp-0 connects to the [CROSSVERSE core](./hyp-0.md) and waits for a response to see if there are jobs available.
5. If the task is detected, then Hyp-0 receives the coordinates of the [destination area](./hyp-0.md), then transforms into the [portal mode](./hyp-0.md).
6. [Nomad](./general-overview.md) enters the portal and teleports to the area with [destination area](./hyp-0.md).
7. Once [nomad](./general-overview.md) teleported in a new place, Hyp-0’s [navigator mode](./hyp-0.md) activated. In this mode, Hyp-0 scans the space and tries to find the shortest path to the [destination area](./hyp-0.md) based on [*navigation parameters](./hyp-0.md).*
8. Hyp-0 takes his owner to the [destination area](./hyp-0.md) and explicitly signals it. Then nomad approaches Hyp-0 and through the UI gives him the command to start the mission (usually this is the activation of the [charge state](./hyp-0.md), but there may be other tasks and quests)

## Hyp-0 UI

The Hyp-0 interface is an ordinary computer terminal console. Interaction with Hyp-0 occurs by entering commands that are supported by its OS.

The set of menu options depends on the context or the current [Hyp-0 state](./hyp-0.md).

 

![Most often, to activate a menu item, it is enough to write the number corresponding to it in the console and press Enter.](./hyp-0/untitled.png)

Most often, to activate a menu item, it is enough to write the number corresponding to it in the console and press Enter.

## Hyp-0 properties

### Energy stabilization

Range: [1 - 99]

Effect: Affects Hyp-0's ability to work with energy. The higher this ability, the better the results of all energy systems.

For example [Portal](./hyp-0.md) is a classic example of such an unstable system. The higher the energy stabilization parameter - the more stable the portal - the higher the accuracy of the “landing” of the nomad relative to the [destination area](./hyp-0.md).

### Navigation

Range: [1 - 100]

Property: Affects the time it takes Hyp-0 to bring the nomad to the [destination area](./hyp-0.md).

### Qbit’s capacity

Range: [1 - 5]

Property: Affects the number of [qubits](./qbits.md) Hyp-0 can carry in its tail.

### Energy capacity

Range: [1 - 100]

Property: Hyp-0 maximum charge level. The higher the capacity, the more power-consuming functions it can perform without recharging.

## Hyp-0 states

### Hyp-0 Portal Mode

Activation requires [energy](./hyp-0.md).

The portal allows you to instantly transport the nomad to anywhere in the metaverse.

However, the portal is an energetically unstable system. Therefore, he never teleports perfectly to the right place. But the portal can be improved by increasing its degree of [stabilization](./hyp-0.md) and, as a result, the degree of accuracy of the “landing”.

The more advanced portal - the more energy it consumes.

### Navigator Mode

This is a special mode due to the fact that Hyp-0 usually follows his owner everywhere. However, in navigator mode, Hyp-0 becomes the nomad's guiding light. It tries to determine the best route to the [destination zone](./hyp-0.md) and guides the host along it, periodically stopping for [re-calibration](./hyp-0.md).

### Re-Calibration mode

In this state, Hyp-0 reads the signal level from the destination zone and compares it with the value from the previous calibration. As a result, using triangulation methods, it determines a more accurate direction to the signal source.

### Charging mode

In this mode, Hyp-0 tries to collect energy while inside the [source zone](./hyp-0.md).

### Success mode

This is the mode that takes Hyp-0 to indicate the successful completion of the mission.

## Glossary

### Destination area (source zone)

Usually this is a piece of land (1 or a group of parsels) that nomad needs to visit at the direction of the [CROSSVERSE core](./hyp-0.md). The destination area is most often the [energy](./hyp-0.md) source. A nomad who comes with his Hyp-0 to this area can collect this [energy](./hyp-0.md) in [Qbit](./qbits.md) like [[`ECO`](./qbits.md)].

### CROSSVERSE core

It is a comprehensive traffic distribution system for the entire platform. A kind of think-tank that receives signals from multiple sources at any given time (clients/nomads/balancing system/etc) and generates a new signal/stimulus in the form of a task/quest for nomads and other platform participants.

Each [nomad](./general-overview.md) is essentially a separate “neuron”, whose activity directly affects the core of the platform and thus all other participants.

### Energy

The simplest consumable unit in the CROSSVERSE world. Many objects, including Hyp-0 itself, constantly interact in one way or another through the transfer/accumulation/expenditure of energy.