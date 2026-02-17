# ARCHITECTURE & OPERATING CONTRACT (STRICT)

This document is the single source of truth for:
- Architecture
- Page modes
- Rendering behavior
- Change control
- Assistant output discipline

If any other document conflicts with this one, this one wins.

---

# I. SOURCE OF TRUTH HIERARCHY

## 1) /assets/css/site.css
Single source of truth for styling.

Rules:
- No invented class names.
- No inline <style> blocks on site surfaces.
- No per-page CSS files unless explicitly approved.
- CSS changes require intentional version control.

---

## 2) /site/_includes/layouts/base.njk
Canonical document shell.

Owns:
- <html>, <head>, <body data-page="">
- global wrappers
- hero container wrapper
- footer
- global terminal sections (e.g., Explore Next)

Pages must NEVER recreate shell structure.

Changes to base.njk require:
- Commit labeled: `SHELL:` or `BREAKING:`
- Impact list of affected templates/pages.

---

## 3) /site/_includes/templates/*.njk
Single source of truth for page-type structure.

Templates define:
- Tool overview structure
- Tool playbook structure
- Tool demo structure
- System pages
- Use case pages
- Article pages
- List/grid pages

Templates must:
- Extend base.njk unless explicitly declared standalone.
- Contain `{{ content | safe }}` exactly once.

Pages may only supply:
- Front matter keys the template reads.
- Content blocks expected by the template.

No freestyle structure inside pages.

---

## 4) /site/** (.njk pages)
Pages provide:
- Front matter
- Structured content blocks

Pages must NOT:
- Recreate hero wrappers
- Recreate navigation
- Duplicate CTAs rendered by templates
- Introduce new layout systems

---

## 5) /site/_data/*.json
Data for lists and future automation.

Rules:
- Data changes must not require template rewrites unless version intentionally bumped.
- JSON is optional for early hardcoded lists.
- Build output must not be treated as source.

---

## 6) /_site/
Build output only.
Never edited.
Never referenced as source.

---

# II. HARD FAILS (NON-NEGOTIABLE)

❌ Never invent CSS class names.  
❌ Never add inline styles to site surfaces (demo exception only).  
❌ Never duplicate template-rendered links (crumbs, hero CTAs, footer, Explore Next).  
❌ Never change structure inside a page if the template owns it.  
❌ Never drop content when converting HTML → Nunjucks.  
❌ Never guess template fields.  
❌ Never introduce new `pageId` values without updating CSS + contract intentionally.  

---

# III. PAGE MODES (LOCKED ENUM)

`pageId` controls only layout/styling via:

`<body data-page="{{ pageId }}">`

It determines:
- Hero variant styling
- Layout spacing
- Global section visibility (e.g., Explore Next)

It does NOT determine:
- URL structure
- Content structure
- JSON automation
- Information architecture

Allowed values (and ONLY these):

- `home`
- `tools`
- `tool-index`
- `tool-playbook`
- `tool-demo`
- `tool-demo-embed`
- `system`
- `use-case`
- `article`

If additional categorization is required, use separate keys:
- `pageVariant`
- `contentType`
- `collection`

Do not expand pageId casually.

---

# IV. GLOBAL RENDERING RULES

## Explore Next

Explore Next is owned by base.njk.

Default behavior:
- Rendered on all site surfaces.

Explicit exceptions (must be intentional):

- `home`
- `tool-demo-embed`
- `article`
- scheduler pages

Implementation:
- Prefer a single flag: `minimalShell: true` for stripped surfaces.
- Only introduce additional switches if absolutely necessary.

---

## Hero Variants

Hero styling varies by `pageId`.

Examples (CSS-driven):

- home → home hero
- tools → list hero
- tool-index → strong tool hero
- tool-playbook → strong tool hero
- tool-demo → standard tool hero
- article → article hero variant
- system → system hero

Templates define structure.
CSS defines presentation.

---

# V. TOOL SURFACE RULES

Each tool must have:

- `/site/tools/<slug>/index.njk`
- `/site/tools/<slug>/playbook.njk` (UI label may say “Blueprint”; URL can remain `/playbook/`)
- `/site/tools/<slug>/demo/` (templated) OR legacy demo.html (choose one system and remain consistent)
- `/site/tools/<slug>/demo-embed/` (iframe artifact; minimal shell)

Demos may be:
- Minimal standalone HTML
OR
- Templated minimal layout

But must follow Demo rules below.

---

# VI. DEMO PAGE RULES (NON-SITE SURFACE EXCEPTION)

Demo and demo-embed pages are minimal artifacts.

They may:
- Use inline <style> when explicitly marked as demo/demo-embed.
- Omit full site shell intentionally.
- Exclude navigation and Explore Next.

They must NOT:
- Introduce unrelated layout systems.
- Break iframe isolation.

---

# VII. CHANGE CONTROL

Any change to:
- site.css
- base.njk
- template structure

Requires:
- Single commit labeled:
  - `BREAKING:`
  - `SHELL:`
  - `CSS:`
- Impact list describing affected pages/templates.

New templates must:
- Contain `{{ content | safe }}` exactly once.
- Extend base.njk unless intentionally standalone.

---

# VIII. ASSISTANT OUTPUT CONTRACT

Before generating any site code, the assistant must:

1) Quote relevant template blocks being targeted.
2) List allowed front matter keys for that template.
3) Confirm:
   - New classes added: NONE
   - Inline styles added: NONE (unless demo exception)
4) Produce a mapping table when converting HTML → Nunjucks.
5) Stop and propose minimal template diff if content does not fit.

Output must:
- Be copy/paste-ready full files unless “diff-only mode” requested.
- Not silently omit sections.
- Not invent structure.

---

# IX. LINK OWNERSHIP RULE

Links appear in exactly one place:

- Crumbs → template only
- Hero CTAs → template only
- Footer → base only
- Explore Next → base only

Pages must not duplicate them.

---

# X. DESIGN PHILOSOPHY

The system is:

- Workflow-first
- CSS-token disciplined
- Template-owned
- Drift-resistant
- Minimal surface area
- Scalable without structural rewrites

If unsure:
Stop.
Propose smallest possible structural change.
Do not guess.
