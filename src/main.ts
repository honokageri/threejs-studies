import { createLayout } from "./app/layout";
import { injectBaseStyles, clearStage } from "./app/mount";
import type { Demo, Cleanup } from "./app/types";

import { demo01BasicScene } from "./demos/01-basic-scene";

const demos: Demo[] = [
  demo01BasicScene,
  // ここに 02,03… を追加していく
];

injectBaseStyles();
const ui = createLayout();

const metaTitle = document.getElementById("meta-title")!;
const metaDesc  = document.getElementById("meta-desc")!;

let cleanup: Cleanup | null = null;
let activeId: string | null = null;

function setMeta(demo: Demo) {
  metaTitle.textContent = demo.title;
  metaDesc.textContent = demo.description ?? "";
}

function runDemo(demo: Demo) {
  // 前のデモを掃除
  if (cleanup) cleanup();
  cleanup = null;

  clearStage(ui.stage);
  setMeta(demo);

  cleanup = demo.start({ container: ui.stage });
  activeId = demo.id;
  renderSidebar(); // active表示更新
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
runDemo(demos[0]);
