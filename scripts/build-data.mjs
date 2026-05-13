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

async function main() {
  const files = (await readdir(contentDir))
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

  const projects = [];

  for (const file of files) {
    const fullPath = path.join(contentDir, file);
    const raw = await readFile(fullPath, "utf8");
    const { data, body } = parseFrontmatter(raw, file);

    validateFields(data, file);
    validateHeadings(body, file);
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
      source: `content/projects/${file}`
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
