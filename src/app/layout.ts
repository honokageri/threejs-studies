export function createLayout() {
  const root = document.getElementById("app") ?? document.body.appendChild(document.createElement("div"));
  root.id = "app";
  root.innerHTML = ""; // 既存内容をクリア（重要）

  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";

  const header = document.createElement("div");
  header.id = "sidebar-header";
  header.innerHTML = `
    <div class="title">Three.js Studies</div>
    <div class="subtitle">TypeScript / Vite</div>
  `;

  const list = document.createElement("nav");
  list.id = "demo-list";

  const footer = document.createElement("div");
  footer.id = "sidebar-footer";
  footer.innerHTML = `
    <div class="hint">左のメニューからデモを切り替えられます。</div>
  `;

  sidebar.append(header, list, footer);

  const main = document.createElement("main");
  main.id = "main";

  const stage = document.createElement("div");
  stage.id = "stage";

  const meta = document.createElement("div");
  meta.id = "meta";
  meta.innerHTML = `
    <div class="meta-title" id="meta-title"></div>
    <div class="meta-desc" id="meta-desc"></div>
  `;

  main.append(meta, stage);
  root.append(sidebar, main);

  return { root, sidebar, list, main, stage, meta };
}
