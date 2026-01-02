export function injectBaseStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* ★ ここが親の固定の本体 */
    html, body {
      height: 100%;
      margin: 0;
      overflow: hidden; /* ページスクロールを殺す */
    }

    body {
      background: #0b1220;
      color: #e5e7eb;
      font-family: ui-sans-serif, system-ui;
    }

    /* Viteテンプレの余計な余白を潰す（残ってても安全） */
    #app {
      height: 100vh;         /* ★ 画面ぴったり */
      width: 100vw;
      overflow: hidden;      /* ★ ここも */
      display: grid;
      grid-template-columns: 300px 1fr;
    }

    #sidebar {
      background: rgba(15, 23, 42, 0.95);
      border-right: 1px solid rgba(255,255,255,0.08);
      padding: 16px;
      display: grid;
      grid-template-rows: auto 1fr auto;
      gap: 12px;
      overflow: hidden;
      box-sizing: border-box;
    }

    #demo-list {
      display: grid;
      gap: 8px;
      overflow: auto;        /* サイドバーだけはスクロール可 */
      padding-right: 4px;
      min-height: 0;         /* ★ これがないと親が伸びてスクロールしがち */
    }

    .demo-item {
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(2, 6, 23, 0.35);
      border-radius: 10px;
      padding: 10px 10px;
      cursor: pointer;
      transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
    }
    .demo-item:hover { transform: translateY(-1px); background: rgba(2,6,23,0.55); }
    .demo-item.active { border-color: rgba(59,130,246,0.6); background: rgba(30,41,59,0.55); }

    .demo-title { font-size: 13px; font-weight: 650; }
    .demo-desc  { font-size: 11px; color: #94a3b8; margin-top: 4px; line-height: 1.35; }

    #sidebar-footer .hint { font-size: 11px; color: #64748b; line-height: 1.35; }

    #main {
      position: relative;
      overflow: hidden;      /* ★ mainが伸びないように */
      min-width: 0;          /* ★ gridのはみ出し対策 */
      min-height: 0;         /* ★ これも重要 */
    }

    #meta {
      position: absolute;
      top: 14px; left: 14px;
      background: rgba(15,23,42,0.72);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 10px 12px;
      backdrop-filter: blur(10px);
      max-width: min(520px, calc(100% - 28px));
      z-index: 10;
      pointer-events: none;
    }

    #stage {
      width: 100%;
      height: 100%;
      overflow: hidden;      /* ★ canvasが溢れてもスクロールさせない */
    }

    canvas { display: block; }
  `;
  document.head.appendChild(style);
}

export function clearStage(stage: HTMLElement) {
  // canvasなどを全部消す
  while (stage.firstChild) stage.removeChild(stage.firstChild);
}
