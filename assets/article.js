const articleWrap = document.querySelector("#articleWrap");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => inlineMarkdown(cell.trim())));
  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `
    <div class="article-table-wrap">
      <table>
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let paragraph = [];
  let code = [];
  let table = [];
  let inCode = false;

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushTable() {
    if (!table.length) return;
    html.push(renderTable(table));
    table = [];
  }

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      flushParagraph();
      flushTable();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
      }
      inCode = !inCode;
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (/^\|.+\|$/.test(line.trim())) {
      flushParagraph();
      table.push(line.trim());
      return;
    }

    flushTable();

    if (!line.trim() || line.trim() === "---") {
      flushParagraph();
      return;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      html.push(`<h1>${inlineMarkdown(line.replace(/^#\s+/, ""))}</h1>`);
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      html.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      html.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`);
      return;
    }

    if (/^\d+\.\s+/.test(line.trim())) {
      flushParagraph();
      html.push(`<p class="article-list-line">${inlineMarkdown(line.trim())}</p>`);
      return;
    }

    if (/^[-*]\s+/.test(line.trim())) {
      flushParagraph();
      html.push(`<p class="article-note">${inlineMarkdown(line.trim().replace(/^[-*]\s+/, ""))}</p>`);
      return;
    }

    paragraph.push(line.trim());
  });

  flushParagraph();
  flushTable();
  return html.join("\n");
}

function setTitle(project) {
  document.title = `${project.title} | Git趣`;
}

function renderArticle(project) {
  setTitle(project);
  articleWrap.innerHTML = `
    <div class="article-meta">
      <span>${project.language}</span>
      <span>${project.updated.replaceAll("-", "/")}</span>
      ${project.stars ? `<span>${project.stars}</span>` : ""}
    </div>
    <div class="article-actions">
      <a class="primary" href="${project.repo}" target="_blank" rel="noreferrer">GitHub Repo</a>
      <a href="${project.source}" target="_blank" rel="noreferrer">Markdown 原文</a>
    </div>
    <div class="article-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="article-content">
      ${markdownToHtml(project.body || "")}
    </div>
  `;
}

async function init() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    articleWrap.innerHTML = '<p class="article-loading">缺少文章 ID，請回首頁重新開啟文章。</p>';
    return;
  }

  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const projects = await response.json();
    const project = projects.find((item) => item.id === id);
    if (!project) {
      articleWrap.innerHTML = '<p class="article-loading">找不到這篇文章，可能尚未重新建置資料。</p>';
      return;
    }
    renderArticle(project);
  } catch (error) {
    articleWrap.innerHTML = '<p class="article-loading">文章載入失敗，請稍後再試。</p>';
    console.error(error);
  }
}

init();
