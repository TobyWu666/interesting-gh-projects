const state = {
  projects: [],
  selectedTag: "",
  query: ""
};

const els = {
  projectCount: document.querySelector("#projectCount"),
  tagCount: document.querySelector("#tagCount"),
  lastUpdated: document.querySelector("#lastUpdated"),
  searchInput: document.querySelector("#searchInput"),
  tagStrip: document.querySelector("#tagStrip"),
  resultMeta: document.querySelector("#resultMeta"),
  featuredList: document.querySelector("#featuredList"),
  latestList: document.querySelector("#latestList"),
  projectGrid: document.querySelector("#projectGrid"),
  emptyState: document.querySelector("#emptyState")
};

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-Hant"));
}

function formatDate(value) {
  if (!value) return "-";
  return value.replaceAll("-", "/");
}

function normalize(value) {
  return String(value || "").trim().toLocaleLowerCase("zh-Hant");
}

function getSearchBlob(project) {
  return normalize([
    project.title,
    project.subtitle,
    project.summary,
    project.language,
    project.status,
    project.difficulty,
    project.tags.join(" "),
    project.highlights.join(" ")
  ].join(" "));
}

function sortByUpdated(projects) {
  return [...projects].sort((a, b) => String(b.updated).localeCompare(String(a.updated)));
}

function getFilteredProjects() {
  const query = normalize(state.query);
  return sortByUpdated(state.projects.filter((project) => {
    const matchesQuery = !query || getSearchBlob(project).includes(query);
    const matchesTag = !state.selectedTag || project.tags.includes(state.selectedTag);
    return matchesQuery && matchesTag;
  }));
}

function renderSummary() {
  const allTags = uniqueSorted(state.projects.flatMap((project) => project.tags));
  const latest = state.projects.reduce((max, project) => project.updated > max ? project.updated : max, "");
  els.projectCount.textContent = state.projects.length;
  els.tagCount.textContent = allTags.length;
  els.lastUpdated.textContent = formatDate(latest);
}

function renderTags() {
  const tags = uniqueSorted(state.projects.flatMap((project) => project.tags));
  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = `tag-button${state.selectedTag ? "" : " is-active"}`;
  allButton.textContent = "全部";
  allButton.addEventListener("click", () => {
    state.selectedTag = "";
    render();
  });

  const tagButtons = tags.map((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tag-button${state.selectedTag === tag ? " is-active" : ""}`;
    button.textContent = tag;
    button.addEventListener("click", () => {
      state.selectedTag = state.selectedTag === tag ? "" : tag;
      render();
    });
    return button;
  });

  els.tagStrip.replaceChildren(allButton, ...tagButtons);
}

function createArticleCard(project, featured = false) {
  const article = document.createElement("article");
  article.className = featured ? "project-card featured-card" : "project-card";
  const homepageLink = project.homepage
    ? `<a href="${project.homepage}" target="_blank" rel="noreferrer">網站</a>`
    : "";

  article.innerHTML = `
    <div class="card-kicker">
      <span>${project.language}</span>
      <span class="status-pill">${project.stars || project.status}</span>
    </div>
    <div>
      <h3>${project.title}</h3>
      <p class="subtitle">${project.subtitle || ""}</p>
      <p>${project.summary}</p>
    </div>
    <div class="card-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <dl class="meta-list">
      <div>
        <dt>更新</dt>
        <dd>${formatDate(project.updated)}</dd>
      </div>
      <div>
        <dt>安裝</dt>
        <dd>${project.install || project.difficulty}</dd>
      </div>
    </dl>
    <div class="card-actions">
      <a class="primary" href="${project.repo}" target="_blank" rel="noreferrer">GitHub</a>
      ${homepageLink}
    </div>
  `;

  return article;
}

function createLatestItem(project) {
  const link = document.createElement("a");
  link.className = "latest-item";
  link.href = project.repo;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.innerHTML = `
    <span>${formatDate(project.updated)}</span>
    <strong>${project.title}</strong>
    <small>${project.summary}</small>
  `;
  return link;
}

function renderProjects() {
  const projects = getFilteredProjects();
  const featured = projects.filter((project) => project.recommended).slice(0, 2);
  const latest = projects.slice(0, 5);

  els.featuredList.replaceChildren(...(featured.length ? featured : projects.slice(0, 2)).map((project) => createArticleCard(project, true)));
  els.latestList.replaceChildren(...latest.map(createLatestItem));
  els.projectGrid.replaceChildren(...projects.map((project) => createArticleCard(project)));
  els.emptyState.hidden = projects.length > 0;

  const tagText = state.selectedTag ? `，tag：${state.selectedTag}` : "";
  const queryText = state.query ? `，搜尋：${state.query}` : "";
  els.resultMeta.textContent = `顯示 ${projects.length} / ${state.projects.length} 篇${tagText}${queryText}`;
}

function render() {
  renderTags();
  renderProjects();
}

async function init() {
  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.projects = await response.json();
    renderSummary();
    render();
  } catch (error) {
    els.resultMeta.textContent = "資料載入失敗，請先執行 npm run build:data。";
    console.error(error);
  }
}

els.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProjects();
});

init();
