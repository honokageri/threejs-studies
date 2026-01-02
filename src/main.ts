import { createLayout } from "./app/layout";
import { injectBaseStyles, clearStage } from "./app/mount";
import type { Demo, Cleanup } from "./app/types";

import { demo01BasicScene } from "./demos/01-basic-scene";

const demos: Demo[] = [
  demo01BasicScene,
  // ここに 02,03… を追加していく
];

injectBaseStyles();
document.title = "Three.js Studies (TypeScript)";

const ui = createLayout();
const githubLink = document.getElementById("link-github") as HTMLAnchorElement | null;
const demoLink = document.getElementById("link-demo") as HTMLAnchorElement | null;

// ★ここは自分のGitHubリポジトリURLに置き換えてね
if (githubLink) githubLink.href = "https://github.com/honokageri/threejs-studies";

function updateLinks(demoId: string) {
  // 今のページURLに #demoId を付ける（共有しやすい）
  const url = new URL(window.location.href);
  url.hash = demoId;
  if (demoLink) demoLink.href = url.toString();
}

function setHash(demoId: string) {
  // 履歴を増やしたくないなら replaceState（おすすめ）
  history.replaceState(null, "", `#${demoId}`);
}


const metaTitle = document.getElementById("meta-title")!;
const metaDesc  = document.getElementById("meta-desc")!;

let cleanup: Cleanup | null = null;
let activeId: string | null = null;

function setMeta(demo: Demo) {
  metaTitle.textContent = demo.title;
  metaDesc.textContent = demo.description ?? "";
}

function getInitialDemo(): Demo {
  const hash = window.location.hash.replace("#", "").trim();
  if (!hash) return demos[0];

  const found = demos.find(d => d.id === hash);
  return found ?? demos[0];
}

window.addEventListener("hashchange", () => {
  const next = getInitialDemo();
  if (next.id !== activeId) runDemo(next);
});

function runDemo(demo: Demo) {
  if (cleanup) cleanup();
  cleanup = null;

  clearStage(ui.stage);
  setMeta(demo);

  cleanup = demo.start({ container: ui.stage });
  activeId = demo.id;

  setHash(demo.id);       // ★追加：アドレスバー更新
  updateLinks(demo.id);   // ★既存：共有リンク更新

  renderSidebar();
}



function renderSidebar() {
  ui.list.innerHTML = "";

  for (const demo of demos) {
    const item = document.createElement("div");
    item.className = "demo-item" + (demo.id === activeId ? " active" : "");

    item.innerHTML = `
      <div class="demo-title">${demo.title}</div>
      <div class="demo-desc">${demo.description ?? ""}</div>
    `;

    item.addEventListener("click", () => runDemo(demo));
    ui.list.appendChild(item);
  }
}

// 初期表示
renderSidebar();
runDemo(getInitialDemo());
