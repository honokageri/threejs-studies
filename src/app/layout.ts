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
    <section class="sb-section">
        <div class="sb-heading">About</div>
        <div class="sb-text">
        Three.js を TypeScript で学ぶためのデモ集です。<br/>
        「なぜそう見えるか」を小さく分解して検証しています。
        </div>
    </section>

    <section class="sb-section">
        <div class="sb-heading">Links</div>
        <div class="sb-links">
        <a id="link-github" class="sb-link" href="#" target="_blank" rel="noreferrer">GitHub</a>
        <a id="link-demo" class="sb-link" href="#" target="_blank" rel="noreferrer">Open current demo</a>
        </div>
    </section>

    <section class="sb-section">
        <div class="sb-heading">Controls</div>
        <div class="sb-text">
        Demoごとに操作が変わります。<br/>
        例：ドラッグ回転 / スクロールズーム（今後追加）
        </div>
    </section>
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
