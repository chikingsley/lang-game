# Game Direction v1

## Purpose

This document narrows the project from a broad "language thriller" idea into a buildable mission format.

The goal is not to design the entire world yet. The goal is to define the reusable mission grammar that can support:

- AI-only play
- human + AI play
- native speaker + learner play
- later multiplayer extensions

## Reference Pull

This direction pulls from four sources already in or around the repo:

- `README.md`
  - current prototype already has the right seed: story beat -> tape/handler coaching -> live prompt -> aftermath
- `references/episodic/systems-planning-all/01_design_philosophy_v7.md`
  - keep the rule that story justifies systems and that pressure creates learning
- `references/episodic/systems-planning-all/05_mission_flow_template_v1.md`
  - keep the briefing -> training -> simulation/live -> debrief shape
- `references/episodic/systems-planning-all/09_mission_types_v1.md`
  - keep mission families like surveillance, identity verification, extraction guidance, and interrogation
- `references/interrogation-unfold/decompiled/level/store.lua`
  - interrogation scenes can be data-driven: subjects, questions, answers, hints, meters, timers
- `references/interrogation-unfold/decompiled/campaign/missions.lua`
  - the campaign wrapper can stay simple while missions do the heavy lifting

External game references:

- `Keep Talking and Nobody Explodes`: asymmetric cooperation
- `Papers, Please`: objective document/identity verification
- `Interrogation: You Will Be Deceived`: pressure + branching questioning
- `Disco Elysium`: tone, characterization, and consequence, not scope target for v1

## Core Decision

The game should be `mission-first`, not `open-world-first`.

That means each playable unit should be a constrained communication problem with:

- clear roles
- asymmetric information
- objective success/failure state
- a bounded vocabulary domain
- a place where AI or a human can occupy a role

The world, hub, and deeper narrative can sit around that structure later.

## Design Pillars

### 1. Scoped Communication

The player should not be asked to "just chat."

They should be asked to do something specific:

- identify a suspect
- clear a checkpoint
- guide a partner
- extract one fact
- route someone safely

### 2. Objective Validation

The game should judge success mostly through the game state, not through freeform AI grading.

Examples:

- correct person identified
- correct document approved or denied
- correct wire cut
- correct room reached
- correct fact extracted

### 3. Human Slots, AI Fallback

Human interaction is a major opportunity, but it should be optional at the system level.

Rule:

- every core role must have an AI fallback
- humans should improve missions, not make them possible

### 4. Training Before Deployment

The Pimsleur-like spine still matters.

Before a mission, the player should get a short preparation loop:

- hear the phrases
- repeat the phrases
- rehearse in context
- deploy under pressure

### 5. Consequences Over Quiz Screens

Failure should create mission complications, not generic red X feedback.

Examples:

- suspicion rises
- target leaves
- wrong person is cleared
- cover weakens
- better evidence is lost

## Core Mission Grammar

Every mission should answer these questions:

1. Who sees the live situation?
2. Who sees the manual, casefile, or missing context?
3. What must be said in the target language?
4. What is the objective win/lose check?
5. Which roles can be human, AI, or either?

Reusable base pattern:

1. `Briefing`
   - explain the scenario
   - show the stakes
   - preview the vocabulary domain
2. `Training`
   - teach 3-8 mission phrases
   - rehearse likely questions and answers
3. `Live Mission`
   - one role has incomplete information
   - another role has the missing structure or truth
   - they communicate under pressure
4. `Resolution`
   - approve, deny, extract, identify, route, escape, or fail
5. `Debrief`
   - reinforce the phrases actually needed
   - explain what went wrong or right

## Human Interaction Slots

Places where a real person can replace or augment AI:

### Handler / Controller

- sees the manual, casefile, or remote intel
- gives instructions or asks follow-up questions
- best fit for `Keep Talking` style missions

### Field Agent / Operator

- sees the live world or suspect
- asks questions, reports details, executes decisions
- usually the learner-facing role

### Witness / Clerk / Suspect

- answers questions from the player
- can be fully AI or a live native speaker
- useful for interview, checkpoint, and interrogation missions

### Interpreter / Relay

- mediates between two roles with incomplete language overlap
- good bridge role for low-level learners

### Crowd Event Participant

- not needed for core progression
- useful later for hubs, social events, and large operations

## Mission Families

These are the strongest families for this project.

### 1. Remote Guidance

Reference: `Keep Talking`

- one role is on site
- one role has the procedure
- language focus: instructions, confirmation, numbers, colors, directions

Example:

- handler guides field agent through a locked facility, device, or escape route

### 2. Checkpoint Verification

Reference: `Papers, Please`

- player checks documents, answers, appearance, and rules
- language focus: names, dates, nationalities, occupations, locations, simple questions

Example:

- interview a traveler and decide `approve / detain / shadow`

### 3. Witness Interrogation

Reference: `Interrogation`

- extract one or more facts through controlled questioning
- language focus: question forms, time, place, appearance, contradiction, clarification

Example:

- ask about a suspect's route, clothing, contacts, and motive

### 4. Surveillance Identification

Reference: spy thriller observation scenes

- match descriptions to live targets
- language focus: listening, visual description, location words, code phrases

Example:

- identify the correct person in a cafe before they identify you

### 5. Translation Relay

Reference: interpreter mode / asymmetric relay

- one player can partially understand one side, but not the full picture
- language focus: compression, paraphrase, confirmation, repair

Example:

- pass messages between a contact and a remote handler while information decays over time

## Recommended First Mission

The best first mission is a hybrid of `Keep Talking`, `Papers, Please`, and `Interrogation`.

### Mission: Checkpoint Intercept

Roles:

- `Field Agent`
  - sees the traveler or suspect live
  - asks the questions in the target language
  - reports visible details
- `Handler`
  - sees the casefile, watchlist rules, and known tells
  - tells the field agent what to verify
  - helps decide the action
- `Subject`
  - AI by default
  - optional live native speaker role later

Player actions:

- ask name, origin, purpose, destination
- compare spoken answers to visible docs
- relay details to handler
- choose `approve / detain / shadow / abort`

Why this is the right first mission:

- it is narrow
- it creates real speaking pressure
- it works with AI only
- it gets stronger with a human in the loop
- it uses objective success checks
- it fits the current handler-and-tape foundation

## Suggested Scope Ladder

### Stage 1: Solo With AI

- AI handler
- AI subject
- player as field agent

### Stage 2: Two-Player Asymmetric

- human handler + human field agent
- AI subject

### Stage 3: Three-Role Flexible Room

- human field agent
- human handler
- AI or human subject

### Stage 4: Small-Team Ops

- 4-6 player missions
- add hidden objectives or partial betrayal only after the base grammar works

### Stage 5: Hub + Instances

- persistent social wrapper
- actual gameplay remains in small mission rooms

## Mission Packet Template

This should be the format for future mission docs.

### 1. Premise

- one paragraph scenario summary

### 2. Roles

- role names
- what each role can see
- whether each role is AI, human, or either

### 3. Vocabulary Domain

- nouns
- verbs
- question patterns
- emergency phrases

### 4. Training Sequence

- phrases introduced
- rehearsal pattern
- likely variations

### 5. Live Mechanics

- timer or pressure source
- available actions
- assistance levels
- what causes suspicion or failure

### 6. Objective Checks

- what the system can evaluate without subjective grading

### 7. Human Insertion Points

- where a live player improves the mission
- what AI fallback does if no human is present

### 8. Debrief

- what gets reinforced
- what gets logged for future review

## What Not To Do Yet

Not for v1:

- 100-player persistent world design
- unrestricted freeform roleplay as the main mechanic
- complex multi-meter social simulation everywhere
- heavy social deduction as the core mode
- giant content planning pass before a playable mission exists

The references are useful, but the lesson from both `episodic` and `interrogation-unfold` is the same:

- reusable structure matters more than a huge pile of content
- data-driven missions matter more than grand scope

## Immediate Next Artifact

The next doc should be:

- `docs/mission-packet-checkpoint-intercept-v1.md`

That document should define one complete playable mission with:

- the exact roles
- the exact phrase list
- the exact live interaction loop
- the exact pass/fail conditions
- the exact spots where a human can replace AI
