# 🟣 Metrics A[i]gent  
### Recruiting Analytics & Metrics Engine

**Metrics A[i]gent** is a recruiting analytics and metrics engine that turns ATS exhaust, automation events, and agent outputs into a unified view of funnel performance, SLAs, quality, and fairness.

It is built on a shared **Metrics Dictionary**, so every A[i]gent and ATS configuration speaks the same data language.

---

## 1. Problem & Outcomes

### 1.1 The Problem

Most recruiting data lives in silos:

- ATS systems store timestamps and fields inconsistently  
- Automation tools emit their own events with no shared schema  
- Reports are manually built in spreadsheets with brittle logic  
- SLAs (scorecards, response times) are hard to track or enforce  
- Fairness, quality, and operational risk are nearly invisible  

This creates:

- Conflicting reports between teams  
- No single source of truth for funnel health  
- Limited ability to debug bottlenecks or delays  
- Poor visibility into the impact of automation and AI  

### 1.2 What Metrics A[i]gent Does

Metrics A[i]gent standardizes and analyzes:

- **Core recruiting KPIs** (time, throughput, quality, cost)  
- **Stage-by-stage pass-through and duration**  
- **No-show, delay, and SLA adherence rates**  
- **Override, fairness, and calibration signals**  
- **Impact of Screening and Workflow A[i]gents on performance**  

The result is an **analytics layer that everyone can trust**: recruiters, TA Ops, finance, HR, and leadership.

---

## 2. Scope & Design Principles

### 2.1 In-scope

- Metrics defined in the Metrics Dictionary  
- Normalizing ATS and automation events into standard fields  
- Calculating KPIs for time, pass-through, quality, SLAs, and fairness  
- Powering dashboards, scorecards, and weekly executive views  
- Providing alerting hooks for operational risk (e.g., SLA breaches)  

### 2.2 Out-of-scope (v1)

- Raw ETL / ingestion pipeline engineering  
- Non-recruiting HR analytics (compensation, benefits, etc.)  
- Predictive modeling and forecasting (kept as roadmap items)  

### 2.3 Design Principles

- **Single source of truth**: one dictionary, many dashboards  
- **ATS-agnostic**: flexible mapping from any underlying system  
- **Explainable metrics**: every KPI ties to specific source fields and events  
- **Composable**: supports different slices (role, team, recruiter, region)  
- **Governed**: supports fairness, bias, and override audits  

---

## 3. Roles & Responsibilities

| Role                  | Responsibilities                                                                                          |
|-----------------------|-----------------------------------------------------------------------------------------------------------|
| TA Ops / Analytics    | Own metric definitions, mapping, and dashboards; monitor health and SLAs                                  |
| Recruiters            | Use dashboards to self-manage pipeline health and workload                                                |
| Hiring Managers       | Review funnel metrics for their roles; partner on bottleneck fixes                                        |
| Leadership / Finance  | Use time-to-fill, throughput, and quality trends for planning and resourcing                              |
| Owner                 | Diane Wilkinson – design, metrics dictionary structure, and continuous improvement of Metrics A[i]gent     |

---

## 4. System Overview

At a high level, Metrics A[i]gent delivers:

1. **Data Ingestion & Mapping**  
   - ATS events (stage changes, interviews, offers)  
   - A[i]gent events (Screening, Workflow, etc.)  
   - Mapping into standardized fields defined in the Metrics Dictionary  

2. **Metric Computation**  
   - Stage durations and pass-through rates  
   - SLA adherence (scorecards, scheduling, responses)  
   - No-show and delay coverage  
   - Override and fairness patterns  

3. **Dashboards & Views**  
   - Funnel health by role, team, and recruiter  
   - SLA & operational risk views for TA Ops  
   - Executive summary views for leadership  

4. **Alerts & Governance Hooks**  
   - SLA breach alerts  
   - Stalled roles or candidates  
   - Potential fairness and bias flags  

---

## 5. Metrics Library

Metrics A[i]gent is powered by a shared dictionary of definitions and formulas.

### 5.1 Time & Throughput Metrics

- **Time-to-fill** (req open → offer accept / start)  
- **Time in stage** (median, mean, percentile)  
- **Time from Screen → HM/Tech → Panel → Offer**  
- **Interview scheduling velocity** (screen request → scheduled → completed)  

### 5.2 Conversion & Volume Metrics

- Application → Screen pass-through  
- Screen → HM/Tech  
- HM/Tech → Panel  
- Panel → Offer  
- Offer → Hire  
- Volume trends by source, recruiter, and role family  

### 5.3 Quality & Experience Metrics

- No-show rate by stage and role  
- Delay update coverage (% of candidates who received a status update)  
- Scorecards submitted within SLA (% within X hours)  
- Template adoption vs ad-hoc emails (with Workflow A[i]gent)  

### 5.4 Governance & Fairness Metrics

- Screening override rate (by recruiter, role, and segment)  
- Variance in pass-through by interviewer / HM  
- Timing disparities across candidate groups  
- Repeated critical overrides without rules updates  

---

## 6. Data Sources & Event Model

Metrics A[i]gent consumes standardized events from ATS and A[i]gents.

### 6.1 Example Event Fields

- `stage_start_time`  
- `interview_scheduled_time`  
- `interview_start_time`  
- `interview_end_time`  
- `scorecard_submitted_time`  
- `offer_extended_time`  
- `delay_update_sent_time`  
- `screening_decision_at`, `screening_recommendation`, `screening_override_flag`  

### 6.2 Sources

- ATS (stage changes, interviews, offers, hires)  
- Screening A[i]gent (scores, recommendations, overrides)  
- Workflow A[i]gent (interview events, delay updates, SLA nudges)  

Together, they form a **complete event timeline** for each candidate and role.

---

## 7. Dashboards & Reporting

Metrics A[i]gent is designed to support multiple audiences and views:

- **Funnel Dashboard** – conversion and time-in-stage across Screen → Offer → Hire  
- **SLA Dashboard** – scorecard compliance, delays, bottlenecks  
- **Recruiter Performance View** – throughput, quality, workload balance  
- **Role / Requisition View** – where candidates get stuck and why  
- **Executive Summary** – high-level trends, risk, and automation impact  

Dashboards can be implemented in Looker Studio, Tableau, Power BI, or embedded directly into internal tools.

---

## 8. Configuration & Implementation Notes

Typical implementation steps:

1. **Inventory current fields and timestamps** in the ATS and A[i]gents.  
2. **Map to the Metrics Dictionary** (e.g., which source field = `stage_start_time`).  
3. **Define SLAs** (e.g., scorecards due in 24 hours, delay updates at X days).  
4. **Set up ingestion pipeline** (exports, APIs, or warehouse views).  
5. **Build initial dashboards** for funnel and SLA tracking.  
6. **Validate with pilot teams**, refine definitions and thresholds.  
7. **Roll out more advanced views** (fairness, overrides, recruiter scorecards).  

---

## 9. How This Fits in the A[i]gents Suite

- **Upstream Data Generators:**  
  - *Screening A[i]gent* – structured scores, recommendations, overrides  
  - *Workflow A[i]gent* – high-fidelity interview, delay, and SLA events  

- **Core Analytics Layer:**  
  - Metrics A[i]gent – normalizes all events using the Metrics Dictionary; computes KPIs  

- **Downstream Consumers:**  
  - TA Ops & Analytics – dashboards, optimization, capacity planning  
  - Leadership – time-to-fill, quality, and fairness trends  
  - Future agents – can use these metrics as feedback signals (e.g., to auto-tune SLAs)  

Together, the suite forms an **AI-ready, measurement-first recruiting operating system.**

---

## 10. Risks & Mitigations

- **Risk:** Misaligned definitions across teams create confusion  
  - **Mitigation:** Centralize the Metrics Dictionary; socialize it with TA, HR, and Finance.  

- **Risk:** Data gaps or inconsistent ATS usage  
  - **Mitigation:** Identify required fields and behaviors; train teams; layer in automation where possible (e.g., Workflow A[i]gent).  

- **Risk:** Over-focusing on speed at the expense of quality  
  - **Mitigation:** Track quality metrics (regret hires, no-show rates, feedback quality) alongside time and volume.  

- **Risk:** Misuse of fairness metrics without context  
  - **Mitigation:** Involve HR/Legal in interpretation; use metrics as starting points for investigation, not as sole evidence.  
