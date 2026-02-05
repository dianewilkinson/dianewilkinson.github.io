import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TOOLS_JSON = path.join(ROOT, "tools", "tools.json");

// -------------- helpers --------------
function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function replaceBlock(html, key, replacement) {
  const start = `<!-- AUTO:${key} start -->`;
  const end = `<!-- AUTO:${key} end -->`;
  const re = new RegExp(`${start}[\\s\\S]*?${end}`, "m");
  if (!re.test(html)) return html; // if marker not present, do nothing
  return html.replace(re, `${start}\n${replacement}\n${end}`);
}

function toolById(tools, id) {
  return tools.find(t => t.id === id);
}

function linkForTool(tools, id) {
  const t = toolById(tools, id);
  if (!t) {
    // show as plain text if unknown (lets you reference future tools without breaking)
    return `<span class="badge">${id}</span>`;
  }
  const href = t?.pages?.index || t?.pages?.overview || t?.href;
  if (!href) return `<span class="badge">${t.title || id}</span>`;
  return `<a class="pillLink" href="${href}">${t.emoji || ""} ${t.title || id}</a>`;
}

function renderQuickLinks(tool) {
  const p = tool.pages || {};
  const links = [
    p.index && { label: "Overview", href: p.index },
    p.playbook && { label: "Playbook", href: p.playbook },
    p.demo && { label: "Demo", href: p.demo },
    (p.dictionary || p.documents) && { label: "Dictionary", href: (p.dictionary || p.documents) }
  ].filter(Boolean);

  if (!links.length) return "";

  return `
<div class="autoCard">
  <div class="autoTitle">Quick links</div>
  <div class="autoRow">
    ${links.map(l => `<a class="btn" href="${l.href}">${l.label}</a>`).join("")}
  </div>
</div>`.trim();
}

function renderRelations(tools, tool) {
  const r = tool.relations || {};
  const groups = [
    r.fedBy?.length && { label: "Fed by", ids: r.fedBy },
    r.dependsOn?.length && { label: "Depends on", ids: r.dependsOn, isSystem: true },
    r.informs?.length && { label: "Informs", ids: r.informs },
    r.related?.length && { label: "Related", ids: r.related }
  ].filter(Boolean);

  if (!groups.length) return "";

  const groupHtml = groups.map(g => {
    const items = g.ids.map(id => {
      // dependsOn can include systems like "ats" which may not be a tool page yet
      return linkForTool(tools, id);
    }).join("");
    return `
<div class="autoGroup">
  <div class="autoLabel">${g.label}</div>
  <div class="autoPills">${items}</div>
</div>`.trim();
  }).join("\n");

  return `
<div class="autoCard">
  <div class="autoTitle">Where this connects</div>
  ${groupHtml}
</div>`.trim();
}

function getTargetFiles(tool) {
  // We update any pages that exist on disk for this tool.
  // Convention: /tools/<id>/index.html + playbook.html + demo.html + dictionary.html
  const baseDir = path.join(ROOT, "tools", tool.id);
  const candidates = ["index.html", "playbook.html", "demo.html", "dictionary.html"];
  return candidates
    .map(f => path.join(baseDir, f))
    .filter(p => fs.existsSync(p));
}

// -------------- main --------------
const data = readJson(TOOLS_JSON);
const tools = data.tools || [];

let changedCount = 0;

for (const tool of tools) {
  const files = getTargetFiles(tool);
  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    let next = original;

    next = replaceBlock(next, "QUICKLINKS", renderQuickLinks(tool));
    next = replaceBlock(next, "RELATIONS", renderRelations(tools, tool));

    if (next !== original) {
      fs.writeFileSync(file, next, "utf8");
      changedCount++;
      console.log(`updated: ${path.relative(ROOT, file)}`);
    }
  }
}

console.log(`done. files updated: ${changedCount}`);
