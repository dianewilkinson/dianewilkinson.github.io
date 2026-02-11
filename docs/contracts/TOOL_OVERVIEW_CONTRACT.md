Tool Overview Page Contract
/docs/TOOL_OVERVIEW_CONTRACT.md
Status: Locked (v1)
Owner: Diane Wilkinson
Applies to: /tools/*/index.html

Purpose
This document defines the required structure, layout, and navigation rules for all Tool Overview pages under /tools/{tool-id}/.
All tool overview pages must conform to this contract.

1. Structural Requirements (Non-Negotiable)
Each Tool Overview page must:
Use /assets/css/site.css?v=1
Use data-page="tool-index"
Follow the page-shell structure:
.bar
.wrap
.hero
Content sections
.exploreNext
.site-footer
No structural deviation is permitted.

2. Hero Section Rules
The hero must include:
.hero.hero--tool or .hero.hero--tool-strong
.kicker containing:
Tool Type
Tool Area
Autonomy Tier
<h1> with optional .accent span
.sub paragraph
.backRow.backRow--split
Hero Navigation (“Explore →” Row)
The order must always be:
Overview / Playbook / Demo / Dictionary / Cases
Rules:
The current page must render as:

 <span class="btn primary">Current Page</span>
All other items must render as <a class="btn">
Order may not change.
Items may not be removed.
Dictionary must link to the shared canonical dictionary at /system/core/metrics.html
Cases must link to /use-cases/.

3. Required Content Sections
All tool overview pages must include the following sections in this order:
Purpose
What Breaks Without This
What It Does
Where It Fits
Section titles may not be renamed.
Additional top-level sections are not permitted without updating this contract.

4. Purpose Section Rules
The Purpose section must include:
One descriptive paragraph
A 3-column .miniGrid showing outcome pillars
The miniGrid must contain exactly three .mini blocks.

5. Quick Links Rules
Quick Links must include:
Playbook (tool-specific)
System Architecture linked to /system/
Use Cases linked to /use-cases/



6. Demo Section
If the tool includes a demo:
Use the .demo component
Embed via iframe
Use the standard demo header structure


If no demo exists:
The demo section may be removed
The hero navigation must still show “Demo” (non-clickable or labeled “Coming”)



7. Where It Fits Section
Must include:
Downstream context
Upstream context
“Feeds” relationship
This section reinforces system cohesion and may not be omitted.

8. Prohibited Changes
The following are not allowed:
Introducing new CSS classes
Creating new layout patterns
Reordering hero navigation
Renaming core sections
Adding new navigation rows
Duplicating hero links inside Quick Links

9. Template Variables
The following placeholders are allowed and expected:
{{TOOL_ID}}
 {{TOOL_NAME}}
 {{TOOL_TYPE}}
 {{TOOL_AREA}}
 {{AUTO_TIER}}
 {{HERO_H1}}
 {{HERO_H1_ACCENT}}
 {{HERO_DESC}}
 {{TOOL_PURPOSE}}
 {{BREAKS1–5}}
 {{DOES1–4}}
 {{CALLOUT}}
 {{D_STREAM_DESC}}
 {{U_STREAM_DESC}}
 {{FEEDS_DESC}}
No additional structural placeholders are permitted.

10. Modification Protocol
If structural changes are required:
Update this contract.
Update the template.
Apply changes consistently to all tool overview pages.
Ad hoc changes are not allowed.
