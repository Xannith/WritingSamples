# SKA Knowledge Hub — User Guide

**URL:** [joshuabechtel.com/ska_prototype](https://joshuabechtel.com/ska_prototype/)

---

## What this page is

The SKA Knowledge Hub is a live demonstration of Stateless Knowledge Architecture in action. The whitepaper content has been decomposed into 26 typed knowledge fragments — each independently authored, uniquely identified, and connected through a relationship graph. The page assembles those fragments into experiences based on your role, competency level, and domain context. There is no static page here; what you see is always constructed on demand from the fragment corpus.

---

## The two modes

### Fragment mode (default)
Displays one fragment at a time in full detail — its content, metadata, and graph relationships. Use this to read deeply, follow connections, and explore the architecture at the object level.

### Assemble mode
Displays all fragments that match your current filters as a scrollable card deck. Use this to get a bird's-eye view of the knowledge that applies to your role and level, then click any card to open it in Fragment mode.

**Switch between modes** using the **Fragment / Assemble** buttons in the top-right of the header bar.

---

## The left panel

### Role context
Sets who you are. Each role surfaces a different subset of fragments.

| Role | Best for |
|---|---|
| **All** | Browsing everything — no filter applied |
| **Leader** | Strategic alignment, maturity model, Knowledge OS, agents |
| **Architect** | System layers, graph relationships, assembly engine, AI readiness |
| **Engineer** | Stage 1/2 processing, telemetry, migration pipeline, fragment identity |
| **Practitioner** | Governance hierarchy, authoring workflow, learning pathways, glossary |
| **Analyst** | Telemetry architecture, intelligence agents, instrumented systems |

### Competency level
Filters by the Crawl / Walk / Run model described in the whitepaper. Each level maps to a pre-built assembly template.

- **Crawl** — 8 foundational fragments. Start here if SKA is new to you.
- **Walk** — 17 fragments covering the full architecture. The standard working view.
- **Run** — 19 fragments including advanced runtime, strategy, and AI topics.
- **All** — All 26 fragments, unfiltered.

### Domain filter
Narrows by subject area. Multiple domains can be active at once. Useful when you want to focus on a specific layer — for example, activating **runtime** + **architecture** together to study the processing and assembly model.

Available domains: `analytics`, `architecture`, `foundations`, `governance`, `learning`, `operations`, `runtime`, `strategy`.

---

## The right panel — Graph Relations

When you select a fragment, the right panel shows every declared relationship it holds in the knowledge graph — both outbound (what this fragment governs, produces, aggregates, or references) and inbound (what other fragments point to this one).

**Every relationship is clickable.** Selecting a related fragment navigates to it and updates the graph panel in turn. This is how you traverse the architecture — following typed edges from a Policy down through its Processes and Procedures, or tracing a Playbook back to its source fragments.

---

## Search

The search bar at the top searches across fragment IDs, titles, summaries, types, and domain tags simultaneously. Results appear as a dropdown — click any result to open it in Fragment mode.

**Tip:** Searching a type code (`POL`, `PCS`, `PCD`, `PBK`, `REF`) returns all fragments of that type at once.

---

## The telemetry ticker

The scrolling bar at the bottom of the page is a live telemetry log. Every interaction you perform — selecting a fragment, running a search, changing a role, switching modes — is recorded and displayed as a structured event. This is a direct demonstration of Section 17 (Telemetry Architecture): every delivery event is instrumented at the fragment level.

---

## Suggested paths through the content

### "I'm new to SKA and want the overview"
1. Set **Crawl** level
2. Switch to **Assemble** mode — you'll see the 8 foundational fragments
3. Click **Introduction to SKA** to start, then follow the graph to **Problem Statement** → **Principles** → **Glossary**

### "I'm an architect evaluating implementation"
1. Set role to **Architect**, level to **Walk** or **Run**
2. Start in **Assemble** mode to see your full fragment set
3. Open **System Architecture Layers** → follow graph relations outward
4. Then read **Assembly Engine** and **Fragment Identity Model** in sequence

### "I want to understand the data model"
1. Open **Atomic Knowledge Object Types** (REF00002)
2. Follow the **references** relationship to **Domain Taxonomy** (REF00001)
3. Follow the **governs** inbound relationship to **Principles** (POL00001)
4. Then open **Knowledge Graph Relationships** (REF00003) to see the full edge type vocabulary

### "I need to explain this to a leadership audience"
1. Set role to **Leader**
2. Open **KAMM** (REF00006) — the maturity model is the most accessible strategic entry point
3. Then **Strategic Alignment Layer** (POL00002) and **Knowledge Operating System** (REF00008)

### "I want to see the AI angle"
1. Set level to **Run**
2. Open **AI-Ready Knowledge Systems** (REF00009)
3. Follow the **references** relationship to **Knowledge Graph Relationships** (REF00003)
4. Then open **Knowledge Intelligence Agents** (REF00010) for the Learning Sphinx and Awareness Lion

---

## Fragment ID reference

Every fragment has a stable typed ID. You can search directly by ID at any time.

| Prefix | Type | Meaning |
|---|---|---|
| `POL` | Policy | Governing principles and architectural commitments |
| `PCS` | Process | End-to-end operational workflows |
| `PCD` | Procedure | Step-by-step executable instructions |
| `PBK` | Playbook | Curated assemblies for a domain or role |
| `REF` | Reference | Definitions, taxonomies, models, and reference tables |

---

*SKA Knowledge Hub · v5.0 · Built with Stateless Knowledge Architecture*
