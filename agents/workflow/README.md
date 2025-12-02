# 🟣 Workflow A[i]gent  
### Interview Stage Automation & Orchestration Engine

**Workflow A[i]gent** is a modular system of interview workflows, automations, and communication templates designed to reduce no-shows, enforce SLAs, and standardize candidate and interviewer experience across every stage of the funnel.

This agent was originally implemented during an ATS migration (to Greenhouse) and is designed to be **ATS-agnostic**: the patterns and logic can be applied to any modern recruiting stack.

---

## 1. Problem & Outcomes

### 1.1 The Problem

Most interview processes silently leak:

- Candidates no-show or drop after scheduling  
- Interviewers don’t submit scorecards on time  
- Hiring managers forget feedback, slowing decisions  
- Candidates get inconsistent information across stages  
- Recruiters manually chase everyone, all the time  

This creates:

- Longer time-to-fill  
- Lower close rates  
- Higher operational drag on the recruiting team
- Low Candidate Satisfaction
- Poor Employer Branding

### 1.2 What Workflow A[i]gent Does

Workflow A[i]gent standardizes and automates:

- **Scheduling & availability capture**
- **Interview confirmations & reminders**
- **Candidate expectations & prep**
- **Scorecard SLAs & nudges**
- **Status / delay updates**
- **Offer & pre-onboarding communication**

The result is an **interview pipeline that moves on its own**, with recruiters focusing on judgement calls instead of calendar and reminder work.

---

## 2. Scope & Design Principles

### 2.1 In-scope

- Phone screen → HM/Tech → Panel → Final → Offer → Pre-start  
- Candidate + interviewer + HM communications  
- Time-based triggers & SLAs  
- Template library (email + calendar text)  
- ATS-native automation rules (e.g., Greenhouse, Lever)

### 2.2 Out-of-scope (v1)

- Automated note-taking / transcription  
- LLM-generated feedback summaries  
- Candidate sourcing / nurture campaigns  
- Post-hire onboarding workflows

Those are handled by other A[i]gents in the portfolio.

### 2.3 Design Principles

- **Candidate-first**: clear expectations, no surprises  
- **Low change-management lift**: built on native ATS features  
- **Observable**: every automation is traceable in the ATS timeline  
- **Configurable**: stages and templates can be swapped per role / region  
- **Fail-safe**: humans can override or pause any automation

### 2.4 Global Rules (applied to all automations)

- **Time Zone**: send in candidate's local time; show both candidates + host times
- **Reschedule / Cancel**: always include a self-service link and coordinator alias
- **Accessibility**: ask about accommodations in every invite, include phone backup  
- **Privacy**: no sensitve data in calendar bodies; link to secure docs instead  
- **Branding**: consistent subject format - [Company] · [Role] · [Stage]
- **Localization**: templates must support region-specific phrasing and legal notes
---

## 3. Roles & Responsibilities

| Role           | Responsibilities                                                                                         |
|----------------|----------------------------------------------------------------------------------------------------------|
| Recruiter (R)  | Own candidate relationship & communoications, monitor automation los, manually intervenes for exceptions |
| Coordinator (C)| Manage calendar logistics, reschedules, and scheduling exceptions                                        |
| Hiring Manager | Interviews, submits decisions & scorecards within SLA, participates in escalations                       |
| Interviewers   | Conduct interviews, submit structured feedback promptly                                                  |
| ATS Admin      | Maintains templates, manages automation rules, owns SLA dashboards                                       |
| Owner          | Diane Wilkinson – design, implementation, continuous improvement                                         |

---

## 4. System Overview

At a high level, Workflow A[i]gent delivers:

1. **Scheduling Workflows**  
   - Availability capture emails  
   - Reminders if candidates don’t respond  
   - Alerts to recruiters when threads stall

2. **Stage-based Interview Workflows**  
   - Confirmation + reminder + follow-up for each stage  
   - Interviewer reminders + scorecard nudges  
   - Standard rejection comms

3. **SLAs & Escalations**  
   - Scorecards due within X hours  
   - Automatic escalation to HM / recruiting lead if overdue  
   - Visibility for recruiting ops

4. **Candidate Status & Delay Updates**  
   - Automated “we’re still here” nudges during longer assessments  
   - Role-based messaging for delays (hiring manager out, role on hold, etc.)

5. **Offer / Pre-Start Workflows**  
   - Offer scheduling + confirmation  
   - “What to expect” between offer accept and start date

---

## 5. Workflow Library

Below is the *conceptual* library of workflows that live inside Workflow A[i]gent.  

Implementation details (trigger wiring, exact templates) are documented in sub-files and can be adapted to any ATS.

### 5.1 Trigger Glossary

   - **Stage Change:**: Triggered when ATS stage is updated
   - **Event Booked:**: Triggered when a calendar event is created
   - **Time-Based:**: Triggered relative to interview / event start, stage change timestamp, or set time in stage has elapsed
   - **Manual Override:**: Recruiter-triggered email templates

### 5.2 Scheduling & Availability

**Goals:**  
Reduce drop-off between “stage change” and “time booked.”

**Key Flows:**

| ID   | Trigger                                   | Recipient  | Description                                                |
|------|-------------------------------------------|-----------|------------------------------------------------------------|
| S1   | Stage → Initial Screen                    | Candidate | Request availability with link + expectations             |
| S2   | No reply after 48h                        | Candidate | Gentle nudge / reminder                                   |
| S3   | No reply after 96h                        | Recruiter | Alert to review candidate and decide next action          |
| S4   | Stage → Technical / HM / Final            | Candidate | Stage-specific availability request + prep info           |
| S5   | Event booked (any stage)                  | Candidate | Calendar invite + confirmation template                   |

---

### 5.3 Interview Stage Workflows

For each stage (Screen, HM/Tech, Panel, Final), the pattern is:

- **CONFIRM** – immediate  
- **REMIND** – 24 hours before  
- **REINFORCE** – optional same-day reminder for virtual/onsite  
- **FOLLOW-UP** – 2–4 hours after  
- **SCORECARD NUDGES** – to interviewers until completed  

Example: **HM / Technical Interview**

| ID   | Trigger                      | Recipient   | Action / Template                                      |
|------|------------------------------|-------------|--------------------------------------------------------|
| T1   | Event booked                 | Candidate   | `[CONF_HM_Tech]` – confirmation + how to prepare       |
| T2   | -24h before                  | Candidate   | `[REM_HM_Tech]` – reminder + tech/logistics            |
| T3   | +2h after                    | Candidate   | `[FU_HM_Tech]` – thank-you + next-steps expectation    |
| T4   | -2h before                   | Interviewer | `[REM_HM_Tech_Interviewer]`                            |
| T5   | +2h after                    | Interviewer | `[NUDGE_Scorecard_2h]`                                 |
| T6   | +24h after                   | Interviewer | `[NUDGE_Scorecard_24h]` (escalate if still incomplete) |

The same pattern is reused for Panel and Final interviews with stage-specific copy.

---

### 5.4 Scorecard & SLA Automation

**Objective:** Ensure interview feedback is submitted while the conversation is fresh.

**Example SLA Pattern:**

- **+2h after interview** – first nudge  
- **+24h after interview** – second nudge + Slack / email to HM  
- **+48h after interview** – escalation to recruiting lead and HM’s manager  
- **Blocked candidate progression** – candidate cannot move to next stage until scorecards are complete (configurable per role)

These SLAs are wired via:

- ATS time-based automation rules (where available), and/or  
- Calendar follow-ups using recruiter/coordinator tasks

---

### 5.5 Status & Delay Updates

**Objective:** Protect candidate experience when internal timelines slip.

**Examples:**

- “We’re still actively interviewing and expect next steps by \<date\>“  
- “Your interview feedback is under review, thank you for your patience”  
- “This role is temporarily on hold – here’s what that means for you”

Delay updates can be triggered:

- Manually from a **“Delay”** email template bank, or  
- Automatically after X days in stage without a decision (where ATS supports this)

---

### 5.6 Offer & Pre-Start Workflows

**Objective:** Close offers thoughtfully and avoid “silence” between accept and start.

Examples:

- Offer scheduling link or direct recruiter outreach  
- Confirmation of offer call + agenda  
- Post-accept email with: what to expect, paperwork, first-day logistics  
- Optional reminder 1 week before start with building/remote instructions

---

## 6. Configuration & Implementation Notes

Workflow A[i]gent was originally implemented on **Greenhouse**, but the design is ATS-agnostic.

Typical implementation steps:

1. **Map current stages** → Screen, HM/Tech, Panel, Final, Offer.  
2. **Define SLAs** for each stage (scorecards, response times, etc.).  
3. **Create template library** (confirmation, reminder, follow-up, delay, regret).  
4. **Wire triggers** using ATS automation features:  
   - On stage change  
   - On event booked  
   - On time since interview  
5. **Pilot on 1–2 roles** (e.g., Sales + Eng) before expanding portfolio-wide.  
6. **Train recruiters, coordinators, and HMs** on what’s automated vs. manual.  
7. **Monitor metrics & tune**: no-show rate, SLA adherence, average days per stage.

### 6.1 Role-Based Customization

Workflow A[i]gent supports variations by role family:
- Sales (multi-round panel, heavy prep)
- Engineering (technical assessment linkage)
- G&A (faster stage progression)
- Leadership roles (multi-panel + executive approvals)

Each role config supports:
- Custom templates
- Custom SLAs
- Conditional prep packets
- Variable panel sizes

### 6.2 ATS Configuration Example (Simplified)
- Automation: When Candidate enters “Recruiter Screen” → Send Email Template
- Automation: When No Response 48h → Send Reminder
- Automation: When Interview Ends → Send Scorecard Reminder
- Task: If scorecard overdue 24h → Assign HM Task 

---

## 7. Metrics & Reporting

Workflow A[i]gent is designed to be measured. Suggested metrics:(See Metrics Dictionary for definitions & formulas)

- No-show rate by stage  
- Average days in each interview stage  
- % scorecards submitted within SLA  
- Candidate satisfaction (CSAT / NPS, where available)  
- Template usage rate (how often standard comms are used)  
- Volume of “delay update” communications sent
- Time Initial Screen → Manager Interview median
- Scorecards on‑time (% within 24h)
- Pass‑through Screen → Panel; Panel → Offer
- Template adoption (% automated vs. ad‑hoc emails)
- Recruitment Update usage (delays covered)

These metrics can feed into **Metrics A[i]gent** dashboards for holistic funnel visibility.

### 7.1 Assets in this folder

- index.html - Workflow A[i]gent demo UI (timeline + comms viewer) 
- README.md - this overview
- /assets/playbook-automated-workflows.pdf - full SOP with trigger tables

### 7.2 Metrics Dictionary Integration

Workflow A[i]gent emits standardized timestamps and event objects that map 1:1 to the Metrics Dictionary fields:

| Event emitted by Workflow A[i]gent | Metrics Dictionary Field   | Used For                          |
|------------------------------------|----------------------------|-----------------------------------|
| stage_entered_at                   | stage_start_time           | Time-in-stage calculations        |
| interview_scheduled_at             | interview_scheduled_time   | SLA tracking, throughput          |
| interview_start_at                 | interview_start_time       | Wait time, candidate friction     |
| interview_end_at                   | interview_end_time         | Feedback freshness calculations   |
| scorecard_submitted_at             | scorecard_submitted_time   | SLA compliance                    |
| offer_extended_at                  | offer_extended_time        | Time-to-offer                     |
| delay_update_sent_at               | delay_update_sent          | Delay coverage & CX metrics       |

These events allow Metrics A[i]gent to compute:

- Stage duration (median & percentile)
- SLA adherence (scorecards, scheduling, response times)
- No-show rate by stage
- Interview-to-decision velocity
- Delay-coverage % (roles that received an update)
- Candidate friction (days between interviews)
- Pass-through rates across Screen → Panel → Offer

Workflow A[i]gent = data generator
Metrics A[i]gent = analytics engine
Metrics Dictionary = the shared normalization layer

---

## 8. Future Enhancements (AI-Forward Roadmap)

While this version is built using native ATS automation only, it is intentionally designed to support AI in future iterations:

- LLM-generated delay updates using a structured tone / policy  
- Automated interview summaries (via *Interview A[i]gent*) feeding into scorecards  
- Dynamic choice of templates based on candidate risk (e.g., high-value roles)  
- Automated detection of SLA risk and proactive alerting in Slack / Teams  
- “Interview Quality” analytics across interviewers and stages

---

## 9. How This Fits in the A[i]gents Suite

Workflow A[i]gent Workflow A[i]gent emits clean events and timestamps (stage change, interview booked, scorecard submitted, delay update sent) that Metrics A[i]gent ingests to compute time-in-stage, SLA adherence, and no-show rate using the shared Metrics Dictionary.

- **Upstream:**  
  - *Screening A[i]gent* – evaluates inbound applicants and routes to interviews  
- **Core:**  
  - *Workflow A[i]gent* – orchestrates all interview-stage communications & SLAs  
- **Downstream:**  
  - *Metrics A[i]gent* – analyzes time-to-fill, pass-through, and SLA performance  
  - *Interview A[i]gent* (future) – note-taking and structured feedback

Together, they form an **AI-ready, automation-first recruiting operating system.**

---

## 10. Risks & Mitigations

- **Risk:**  Over-automation → Candidates feel robotic
- **Mitigation:** Mix in human touchpoints; configure warm tone templates
- **Risk:** Incorrect triggers → Wrong emails sent
- **Mitigation:** Use sandbox testing on dummy candidate
- **Risk:** Hiring managers ignore SLAs
- **Mitigation:** Escalation routing, Slack reminders, scorecard gating
