# Metrics A[i]gent
Unified recruiting analytics engine powered by the Metrics Dictionary.

Metrics A[i]gent transforms ATS events, workflow automation logs, and structured screening outputs into reliable, comparable recruiting metrics. It is the analytics backbone of the A[i]gents ecosystem.

---

## 1. Overview
Different ATS platforms emit inconsistent timestamps and naming conventions, making accurate reporting difficult. Metrics A[i]gent solves this by standardizing these events into a unified schema that powers dashboards, SLA monitoring, fairness reviews, and operational insights.

---

## 2. What Metrics A[i]gent Does

### Core Capabilities
- Normalizes ATS fields using the Metrics Dictionary
- Calculates key recruiting metrics:
  - Time in stage
  - Time-to-fill
  - Pass-through rates
  - No-show rate
  - Scorecard SLA adherence
  - Delay update coverage
- Identifies operational risks and bottlenecks
- Supports fairness and audit governance
- Powers dashboards for recruiters, TA Ops, and leadership

Metrics A[i]gent converts messy data into trustworthy operational analytics.

---

## 3. Metrics Dictionary

### Standard Fields
- stage_start_time  
- interview_scheduled_time  
- interview_start_time  
- interview_end_time  
- scorecard_submitted_time  
- offer_extended_time  
- delay_update_sent_time  

### Purpose
- Ensures consistent definitions across roles and teams
- Enables cross-functional reporting
- Supports SLA, funnel, and fairness analytics
- Allows all A[i]gents to speak the same data language

---

## 4. System Overview

### Inputs
- ATS events and timestamps
- Structured outputs from Screening A[i]gent
- Interview and stage events from Workflow A[i]gent
- Hiring manager decisions
- Offer lifecycle events

### Computation Layer

#### Time-Based Metrics
- Median and percentile stage duration
- Scheduling velocity
- Interview-to-decision time
- End-to-end time-to-fill
- Scorecard SLA compliance

#### Pass-Through Metrics
- Application to Screen
- Screen to HM/Tech
- HM/Tech to Panel
- Panel to Offer
- Offer to Hire

#### Quality and Risk Metrics
- No-show rate
- Delay update coverage
- Overdue scorecards
- Stalled candidates
- Recruiter workload and volume patterns
- Screening override frequency

#### Fairness Metrics
- Reviewer variance
- Timing discrepancies
- Override patterns across groups

---

## 5. Outputs

### Dashboards
- Full funnel visualization
- Recruiter performance dashboard
- SLA compliance dashboard
- Candidate friction and delay reporting
- Interview quality analytics
- Executive weekly summary

### Alerts
- SLA breaches
- Missing scorecards
- Stalled candidate activity
- Roles lacking timely updates
- Potential fairness or bias anomalies

---

## 6. Integration Across A[i]gents

### Receives Data From:
- Screening A[i]gent (recommendations, flags, structured fields)
- Workflow A[i]gent (stage events, interview logs, delay updates)

### Powers:
- TA Ops dashboards and insights
- Recruiter performance reporting
- Executive summaries
- SLA and throughput optimization
- Governance and compliance reviews

Metrics A[i]gent acts as the system of record for recruiting analytics.

---

## 7. Example Use Cases
- Diagnose funnel bottlenecks and root causes
- Coach hiring managers on slow feedback cycles
- Compare recruiter workload vs output
- Identify patterns in pass-through rates across roles
- Validate fairness and consistency in screening
- Quantify the operational impact of automation

---

## 8. Future Enhancements
- Predictive modeling for bottlenecks and offer outcomes
- Interviewer calibration and scoring
- Automated weekly reporting drafts
- Capacity and hiring plan forecasting
- Market trend overlays for supply and demand
