import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const contentDir = path.join(root, "content", "projects");
const outputFile = path.join(root, "data", "projects.json");
const checkOnly = process.argv.includes("--check");

const requiredFields = [
  "title",
  "repo",
  "homepage",
  "summary",
  "tags",
  "status",
  "language",
  "updated",
  "difficulty",
  "highlights"
];

const requiredHeadings = [
  "## 專案定位",
  "## 有趣之處",
  "## 測試重點",
  "## 使用情境",
  "## 風險與備註"
];

const reportHeadings = [
  "## 📖 這是什麼",
  "## ⚙️ 原理",
  "## 🧪 測試結果",
  "## 💡 想法與心得",
  "## 📊 總評"
];

const allowedStatus = new Set(["待研究", "可測試", "已測試", "暫緩"]);
const allowedDifficulty = new Set(["入門", "中階", "進階"]);
const simplifiedTerms = [
  "项目",
  "开发",
  "测试",
  "云",
  "数据",
  "应用",
  "用户",
  "环境",
  "支持",
  "实现",
  "体验",
  "优化"
];

function parseList(value) {
  const trimmed = value.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  const inner = trimmed.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(",").map((item) => item.trim()).filter(Boolean);
}

function parseFrontmatter(raw, file) {
  if (!raw.startsWith("---\n")) {
    throw new Error(`${file}: 缺少 frontmatter 起始 ---`);
  }

  const end = raw.indexOf("\n---", 4);
  if (end === -1) {
    throw new Error(`${file}: 缺少 frontmatter 結束 ---`);
  }

  const frontmatter = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).trim();
  const data = {};

  frontmatter.split("\n").forEach((line, index) => {
    const match = line.match(/^([a-z]+):\s*(.*)$/);
    if (!match) {
      throw new Error(`${file}: frontmatter 第 ${index + 1} 行格式錯誤`);
    }
    const [, key, value] = match;
    data[key] = value.trim();
  });

  return { data, body };
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getDisplayBody(raw) {
  if (raw.startsWith("---\n")) {
    const end = raw.indexOf("\n---", 4);
    return raw.slice(end + 4).trim();
  }
  return raw.trim();
}

function getSection(body, heading) {
  const start = body.indexOf(heading);
  if (start === -1) return "";
  const rest = body.slice(start + heading.length);
  const next = rest.search(/\n##\s+/);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function matchRequired(raw, pattern, file, label) {
  const match = raw.match(pattern);
  if (!match) {
    throw new Error(`${file}: 缺少 ${label}`);
  }
  return match;
}

function inferTags({ title, language, install, body }) {
  const tags = new Set(["心得文"]);
  if (language) tags.add(language);
  if (/CLI|command line|終端機/i.test(body)) tags.add("CLI");
  if (/笑話|幽默|會心一笑/.test(body)) tags.add("幽默工具");
  if (/教學|範例|入門/.test(body)) tags.add("教學範例");
  if (/AI|模型|推理/i.test(body)) tags.add("AI");
  if (/Docker|部署|自架/i.test(body)) tags.add("部署");
  if (/bot|Discord|Telegram/i.test(body)) tags.add("Bot");
  if (title && tags.size < 3) tags.add("開源專案");
  return [...tags].slice(0, 5);
}

function parseReport(raw, file) {
  const titleMatch = matchRequired(raw, /^#\s+(.+)$/m, file, "文章標題");
  const subtitleMatch = raw.match(/^###\s+(.+)$/m);
  const dateMatch = matchRequired(raw, /^\*\*日期：\*\*\s*(\d{4}-\d{2}-\d{2})$/m, file, "日期");
  const repoMatch = matchRequired(raw, /^\*\*Repo：\*\*\s*\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+)\)$/m, file, "Repo");
  const starsMatch = raw.match(/^\*\*⭐ Stars：\*\*\s*(.+)$/m);
  const languageMatch = matchRequired(raw, /^\*\*語言：\*\*\s*(.+)$/m, file, "語言");
  const installMatch = raw.match(/^\*\*安裝：\*\*\s*(.+)$/m);
  const whatSection = stripMarkdown(getSection(raw, "## 📖 這是什麼"));
  const title = titleMatch[1].replace(/^.*?：/, "").trim();
  const subtitle = subtitleMatch ? stripMarkdown(subtitleMatch[1]) : "";
  const language = stripMarkdown(languageMatch[1]);
  const install = installMatch ? stripMarkdown(installMatch[1]) : "";

  return {
    data: {
      title,
      subtitle,
      repo: repoMatch[2].replace(/\/$/, ""),
      homepage: "",
      summary: truncateText(whatSection || subtitle, 96),
      tags: inferTags({ title, language, install, body: raw }),
      status: "已測試",
      language,
      updated: dateMatch[1],
      difficulty: "入門",
      highlights: ["心得完整", "測試具體", "適合快速閱讀"],
      stars: starsMatch ? stripMarkdown(starsMatch[1]) : "",
      install,
      recommended: true
    },
    body: raw,
    format: "report"
  };
}

function validateTraditionalChinese(text, file) {
  const found = simplifiedTerms.filter((term) => text.includes(term));
  if (found.length) {
    throw new Error(`${file}: 偵測到疑似簡體詞：${found.join("、")}`);
  }

  const cjkCount = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  if (cjkCount < 80) {
    throw new Error(`${file}: 中文內容過少，請補足繁體中文說明`);
  }
}

function validateFields(data, file) {
  const keys = Object.keys(data);
  const missing = requiredFields.filter((field) => !(field in data));
  if (missing.length) {
    throw new Error(`${file}: 缺少欄位 ${missing.join("、")}`);
  }

  const wrongOrder = requiredFields.find((field, index) => keys[index] !== field);
  if (wrongOrder) {
    throw new Error(`${file}: frontmatter 欄位順序必須固定，請從 ${wrongOrder} 開始修正`);
  }

  if (!/^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/?$/.test(data.repo)) {
    throw new Error(`${file}: repo 必須是 GitHub 專案網址`);
  }

  if (data.homepage && !/^https?:\/\/\S+$/.test(data.homepage)) {
    throw new Error(`${file}: homepage 必須是 URL 或留空`);
  }

  if (data.summary.length > 100) {
    throw new Error(`${file}: summary 請控制在 100 字以內`);
  }

  if (!allowedStatus.has(data.status)) {
    throw new Error(`${file}: status 只能是 ${[...allowedStatus].join("、")}`);
  }

  if (!allowedDifficulty.has(data.difficulty)) {
    throw new Error(`${file}: difficulty 只能是 ${[...allowedDifficulty].join("、")}`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updated)) {
    throw new Error(`${file}: updated 必須是 YYYY-MM-DD`);
  }

  data.tags = parseList(data.tags);
  if (!data.tags || data.tags.length < 2 || data.tags.length > 5) {
    throw new Error(`${file}: tags 必須是 2 到 5 個項目`);
  }

  data.highlights = parseList(data.highlights);
  if (!data.highlights || data.highlights.length < 2 || data.highlights.length > 4) {
    throw new Error(`${file}: highlights 必須是 2 到 4 個項目`);
  }
}

function validateHeadings(body, file) {
  const headings = body.match(/^## .+$/gm) || [];
  const expected = requiredHeadings.join("\n");
  const actual = headings.join("\n");
  if (actual !== expected) {
    throw new Error(`${file}: 內文二級標題必須完全符合指定順序`);
  }

  requiredHeadings.forEach((heading, index) => {
    const start = body.indexOf(heading) + heading.length;
    const nextHeading = requiredHeadings[index + 1];
    const end = nextHeading ? body.indexOf(nextHeading) : body.length;
    const section = body.slice(start, end).trim();
    if (section.length < 20) {
      throw new Error(`${file}: ${heading} 內容過短`);
    }
  });
}

function validateReportHeadings(body, file) {
  const missing = reportHeadings.filter((heading) => !body.includes(heading));
  if (missing.length) {
    throw new Error(`${file}: 心得文缺少段落 ${missing.join("、")}`);
  }
}

function normalizeRecord(raw, file) {
  if (!raw.startsWith("---\n")) {
    return parseReport(raw, file);
  }

  const record = parseFrontmatter(raw, file);
  validateFields(record.data, file);
  validateHeadings(record.body, file);
  return {
    ...record,
    format: "frontmatter"
  };
}

async function main() {
  const files = (await readdir(contentDir))
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  const projects = [];

  for (const file of files) {
    const fullPath = path.join(contentDir, file);
    const raw = await readFile(fullPath, "utf8");
    const { data, body, format } = normalizeRecord(raw, file);

    if (format === "report") {
      validateReportHeadings(body, file);
    }
    validateTraditionalChinese(raw, file);

    projects.push({
      id: file.replace(/\.md$/, ""),
      title: data.title,
      repo: data.repo.replace(/\/$/, ""),
      homepage: data.homepage,
      summary: data.summary,
      tags: data.tags,
      status: data.status,
      language: data.language,
      updated: data.updated,
      difficulty: data.difficulty,
      highlights: data.highlights,
      subtitle: data.subtitle || "",
      stars: data.stars || "",
      install: data.install || "",
      recommended: Boolean(data.recommended),
      source: `content/projects/${file}`,
      body: getDisplayBody(raw)
    });
  }

  projects.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, "zh-Hant"));

  if (!checkOnly) {
    await writeFile(outputFile, `${JSON.stringify(projects, null, 2)}\n`);
  }

  console.log(`${checkOnly ? "Validated" : "Built"} ${projects.length} project records.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
