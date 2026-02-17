# \# README: Eleventy Operating Contract

## **\#\# 0\) Prime Directive**

\*\*Never write site HTML/CSS from memory.\*\*  
For any site-surfaced page (tool overview/playbook/system/etc.), you may ONLY output code by:  
\- editing the provided template files, and  
\- using ONLY existing classes from \`site.css\`.

\*\*Exception:\*\* demo \+ demo-embed pages are standalone artifacts and may use inline \`\<style\>\` (see §8).

### **Template Registry (Authoritative)**

Only the following templates may be used for tool surfaces:

* `templates/tool-overview.njk`  extends base
* `templates/tool-playbook.njk`  extends base
* `templates/home.njk`  = standalone layout (does not extend base)
* `templates/system-index.njk`  
* `layouts/base.njk` (read-only wrapper)

Pages use layout:
Templates may extend layouts/base.njk
Before committing any new template/layout: confirm it contains {{ content | safe }} exactly once.

If a request requires structure outside what these templates support:

* You must propose a minimal template diff.  
* You may not invent new structure inside a tool page.



\---

## **\#\# 1\) Operating Contract (Hard Rules)**

### **\#\#\# A) Source of truth hierarchy**

1) **\*\*\`/assets/css/site.css\` is the single source of truth for styling\*\***  
*    \- No inline \`\<style\>\` blocks on overview/playbook pages.  
*    \- No per-page CSS files unless explicitly approved.

2) **\*\*\`templates/\*.njk\` are the single source of truth for structure\*\***  
   * Tool pages (\`site/tools/\*\*/index.njk\`, \`playbook.njk\`) supply:  
     * front matter keys that the template actually reads  
     * content blocks expected by those templates  
   * Do not restructure pages unless explicitly asked to change the template.

3) **\*\*Demos are unique (Non-Site Surface Exception)\*\***  
   * demo and demo-embed are standalone artifacts and do not follow the site styling rules (see §8).

\---

**\#\#\# B) Forbidden actions (hard fails)**  
❌ Do not invent new CSS class names.    
❌ Do not add inline styles to overview/playbook pages.    
❌ Do not duplicate navigation/links that are already rendered by the template (crumbs, hero CTAs/pills, footer).    
❌ Do not change page structure unless the user explicitly asks to change the template.    
❌ Do not summarize, rewrite, or “improve” the user’s content unless explicitly asked.    
❌ Do not guess template fields or class names.

\---

**\#\#\# C) Required actions BEFORE writing any output (non-negotiable)**  
**For every request, you must:**

1) **\*\*Open \+ quote the relevant template sections\*\***  
   * Example: \`templates/tool-overview.njk\`  
   * Quote the specific loops/blocks that render the fields you’re about to populate.

   

2) **\*\*List the allowed front matter keys\*\***  
   * ONLY keys that the template actually reads.  
   * If a key is not read by the template, it must not appear in output.

   

3) **\*\*Confirm existing class usage\*\***  
   * Cite the exact class names from \`site.css\` that will be used.  
   * New classes added must always be: \*\*NONE\*\*.

4) **\*\*Preserve original content when converting HTML → Nunjucks\*\***  
   * You MUST map every section into available fields/blocks.  
   * If a section has nowhere to go, you must:  
     * a) propose a new template slot with a minimal diff, OR    
     * b) include it in an existing rich field (e.g., \`purpose: |\` multiline)    
   * You may not drop content.

\---

**\#\# 2\) Output format requirements**  
\- Output must be copy/paste-ready.  
\- If editing a file: output the \*\*full file\*\* unless the user asks for a patch.  
\- Begin every answer with this checklist:

\*\*Template used:\*\*    
\*\*Fields populated:\*\*    
\*\*New classes added:\*\* NONE    
\*\*Inline styles added:\*\* NONE (unless demo exception)

\---

**\#\# 3\) Mandatory mapping table (stops missing content)**  
When converting old HTML → template-based Nunjucks, you MUST produce a mapping table BEFORE writing the file.

Example format:  
\- Old section: “Purpose” → Destination: \`purpose\` (multiline)  
\- Old section: “The Problem with How Innovation Works Today” → Destination: \`breaks\` \+ \`note\` (or body slot)  
\- Old section: “What Innovation Agent Changes” → Destination: \`does\` (bullets) \+ \`note\` (multiline)  
\- Old section: “Governance & Guardrails” → Destination: \`fits\` (bullets) OR dedicated \`guardrails\` slot

If any old section doesn’t map cleanly, you must say:  
\> “Template missing a slot; propose minimal template change”  
…and show a minimal diff.

\---

**\#\# 4\) Diff-only mode**   
If the user says \*\*“diff-only mode”\*\*, you may NOT write new code.  
You must:  
1\) identify the mismatch vs contract  
2\) propose the smallest change  
3\) provide a patch-style diff only

\---

**\#\# 5\) Stop duplicating links (explicit)**  
Links appear in exactly one place:

\- \*\*Crumbs:\*\* template only    
\- \*\*Hero CTAs/pills:\*\* template only    
\- \*\*Quick Links card:\*\* content only (must NOT repeat hero CTAs/pills)    
\- \*\*Footer:\*\* template only

If the template already renders \`/tools/\`, \`/playbook/\`, \`/demo/\`, then \`quickLinks\` must only include non-duplicated links.

\---

**\#\# 6\) Strict allowed file list per tool (no invented paths)**  
Every tool must have exactly:

\- \`site/tools/\<slug\>/index.njk\`  
\- \`site/tools/\<slug\>/playbook.njk\`  
\- \`site/tools/\<slug\>/demo-embed/index.html\` (passthrough) OR \`index.njk\` (if templated)

Build output must be:

\- \`\_site/tools/\<slug\>/index.html\`  
\- \`\_site/tools/\<slug\>/playbook/index.html\` (or whatever permalink the template defines)  
\- \`\_site/tools/\<slug\>/demo-embed/index.html\`

\---

**\#\# 7\) Read-first requirement (hard gate)**  
Before answering, you must read:  
\- the uploaded \`site.css\`, AND  
\- the relevant \`templates/\*.njk\`

…and constrain output strictly to what those files support.

\---

**\#\# 8\) Demo Page Rules (Non-Site Surface Exception)**  
Demo pages are intentionally standalone artifacts.

\- They do NOT use \`site.css\`.  
\- They may contain inline \`\<style\>\` blocks.  
\- They must not inherit site layout templates.  
\- \`demo-embed\` is a stripped version of demo:  
  \- No site nav  
  \- No CTA buttons  
  \- Same core UI  
\- Demo pages must be passed through by Eleventy if static HTML.  
\- Overview pages embed demos via iframe only.

**“Fail Fast” rule** to stop getting half-solutions:

If required files (site.css or the target template) are not provided / not readable, the assistant must refuse to generate code and instead request the missing file(s).

**“No ghost fields” rule**

Any front matter key that is not rendered by the template is forbidden, even if “harmless.”

