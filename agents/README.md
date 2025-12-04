# A[i]gent Suite — Internal Recruiting Agents  
_Modular · ATS-Native · Evidence-First · Human-in-the-Loop_

The **A[i]gent Suite** is a collection of modular, interoperable AI agents designed to
augment internal recruiting operations directly within the systems Talent Acquisition teams
already use — Greenhouse, Sheets, Slack, email, and lightweight internal automation layers.

Each A[i]gent is responsible for one part of the recruiting lifecycle, and all agents share:

- A workflow-first operating model  
- A common Metrics Dictionary  
- Explainable, structured outputs  
- Human-in-the-loop control  

The suite supports everything from intake → screening → interviews → offer → onboarding.

---

## 📦 Directory Overview

### **`/suite/` — High-level overview of all agents**
The central index of the entire ecosystem: roles, responsibilities, and how the agents fit
together across the recruiting value chain.

**Live page:** `/agents/suite/`

---

## 🤖 Core Agents (Fully Implemented)

### **Screening A[i]gent**  
Hybrid-scoring application review system that evaluates experience, tenure, skills, and
risk indicators to surface high-quality candidates and reduce top-funnel noise.

- Demo → `/agents/screening/`
- Playbook → `/agents/screening/playbook.html`

---

### **Workflow A[i]gent**  
Interview-stage automation engine handling confirmations, reminders, scorecard SLAs,
and delay updates — creating predictable, low-drama interview loops.

- Demo → `/agents/workflow/`
- Playbook → `/agents/workflow/playbook.html`

---

### **Metrics A[i]gent**  
Funnel diagnostics, pass-through analysis, SLA visibility, and forecasting powered by a
shared Metrics Dictionary.

- Demo → `/agents/metrics/`
- Playbook → `/agents/metrics/playbook.html`
- Metrics Dictionary → Google Sheet (linked within playbook)

---

## 🧩 Supported / Upcoming Agents

These agents are defined in the Suite Overview but are not yet fully documented:

- **Kickoff A[i]gent** — transforms intake into structured scorecards & rubrics  
- **Outreach A[i]gent** — calibrated outbound personalization & sourcing  
- **Match A[i]gent** — rediscovery & cross-fit matching across roles  
- **Nurture A[i]gent** — keeps silver-medalists warm  
- **Interview A[i]gent** — guided prompts & note scaffolding  
- **Scorecard A[i]gent** — structured feedback generation  
- **Offer A[i]gent** — comp guardrails & approval paths  
- **Onboarding A[i]gent** — day-1 readiness & handoff  

As these mature, each will receive its own demo + playbook directory following the same
format as Screening, Workflow, and Metrics.

---

## 🧱 Design Principles

All A[i]gents follow these shared principles:

- **Workflow-first** — designed around how recruiting actually operates  
- **Evidence-first** — outputs are structured and explainable  
- **Human-in-the-loop** — humans decide, AI assists  
- **Modular** — each agent has a single responsibility  
- **ATS-native** — built on top of ATS features, not replacing them  
- **Measurable** — every agent emits standardized metrics for analysis  

---

## 📚 How to Explore the Suite

1. Start with `/agents/suite/` for the big-picture overview  
2. Visit each agent’s demo (`index.html`)  
3. Read their playbooks to understand the operational model  
4. View the Metrics Dictionary to see how data flows across the system  

This structure mirrors how internal tooling teams document platforms inside modern tech
companies, enabling easy navigation for engineering, TA Ops, and People Analytics teams.

---

For questions or collaboration:  
**Diane Wilkinson** — Recruiting Operations Specialist, AI-Native TA Systems  
[LinkedIn](https://www.linkedin.com/in/dianewilkinson) · [Email](mailto:dianewilkinson510@gmail.com)
