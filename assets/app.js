const state = {
  projects: [],
  selectedTag: "",
  query: "",
  status: "",
  difficulty: "",
  sort: "updated-desc"
};

const els = {
  projectCount: document.querySelector("#projectCount"),
  tagCount: document.querySelector("#tagCount"),
  lastUpdated: document.querySelector("#lastUpdated"),
  searchInput: document.querySelector("#searchInput"),
  statusFilter: document.querySelector("#statusFilter"),
  difficultyFilter: document.querySelector("#difficultyFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  tagStrip: document.querySelector("#tagStrip"),
  resultMeta: document.querySelector("#resultMeta"),
  projectGrid: document.querySelector("#projectGrid"),
  emptyState: document.querySelector("#emptyState")
};

const difficultyRank = {
  "入門": 1,
  "中階": 2,
  "進階": 3
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
    project.summary,
    project.language,
    project.status,
    project.difficulty,
    project.tags.join(" "),
    project.highlights.join(" ")
  ].join(" "));
}

function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    if (state.sort === "title-asc") {
      return a.title.localeCompare(b.title, "zh-Hant");
    }
    if (state.sort === "difficulty-asc") {
      return (difficultyRank[a.difficulty] || 9) - (difficultyRank[b.difficulty] || 9);
    }
    return String(b.updated).localeCompare(String(a.updated));
  });
}

function getFilteredProjects() {
  const query = normalize(state.query);
  const filtered = state.projects.filter((project) => {
    const matchesQuery = !query || getSearchBlob(project).includes(query);
    const matchesTag = !state.selectedTag || project.tags.includes(state.selectedTag);
    const matchesStatus = !state.status || project.status === state.status;
    const matchesDifficulty = !state.difficulty || project.difficulty === state.difficulty;
    return matchesQuery && matchesTag && matchesStatus && matchesDifficulty;
  });
  return sortProjects(filtered);
}

function renderSummary() {
  const allTags = uniqueSorted(state.projects.flatMap((project) => project.tags));
  const latest = state.projects.reduce((max, project) => project.updated > max ? project.updated : max, "");
  els.projectCount.textContent = state.projects.length;
  els.tagCount.textContent = allTags.length;
  els.lastUpdated.textContent = formatDate(latest);
}

function renderSelectOptions(select, values) {
  const firstOption = select.querySelector("option");
  select.replaceChildren(firstOption);
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function renderFilters() {
  const tags = uniqueSorted(state.projects.flatMap((project) => project.tags));
  renderSelectOptions(els.statusFilter, uniqueSorted(state.projects.map((project) => project.status)));
  renderSelectOptions(els.difficultyFilter, uniqueSorted(state.projects.map((project) => project.difficulty)));

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

function createProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const homepageLink = project.homepage
    ? `<a href="${project.homepage}" target="_blank" rel="noreferrer">Demo</a>`
    : "";

  article.innerHTML = `
    <div class="card-kicker">
      <span>${project.language}</span>
      <span class="status-pill">${project.status}</span>
    </div>
    <div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
    </div>
    <dl class="meta-list">
      <div>
        <dt>難度</dt>
        <dd>${project.difficulty}</dd>
      </div>
      <div>
        <dt>更新</dt>
        <dd>${formatDate(project.updated)}</dd>
      </div>
    </dl>
    <div class="card-tags">
      ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
    <div class="card-actions">
      <a class="primary" href="${project.repo}" target="_blank" rel="noreferrer">GitHub</a>
      ${homepageLink}
    </div>
  `;

  return article;
}

function renderProjects() {
  const projects = getFilteredProjects();
  els.projectGrid.replaceChildren(...projects.map(createProjectCard));
  els.emptyState.hidden = projects.length > 0;
  els.resultMeta.textContent = `顯示 ${projects.length} / ${state.projects.length} 個專案`;
}

function render() {
  renderFilters();
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

els.statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  renderProjects();
});

els.difficultyFilter.addEventListener("change", (event) => {
  state.difficulty = event.target.value;
  renderProjects();
});

els.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProjects();
});

init();
