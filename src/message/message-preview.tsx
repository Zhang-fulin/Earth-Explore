export function MessagePreview(d: {
  title?: string;
  content?: string;
}) {
  return `
    <div class="globe-message-box" style="
      position: relative;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1.5px solid rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      padding: 12px;
      max-width: 240px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      word-wrap: break-word;
      overflow-wrap: break-word;
      transform-origin: center center;
      user-select: none;
      -webkit-user-select: none;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    ">
      <div style="
        font-weight: 600;
        font-size: 12px;
        color: #222;
        margin-bottom: 6px;
        line-height: 1.4;
      ">
        ${d.title || '无标题'}
      </div>
      <div style="
        font-size: 9px;
        color: #444;
        line-height: 1.6;
      ">
        ${d.content || '无内容'}
      </div>
      <div style="
        position: absolute;
        bottom: -10px;
        left: calc(50% - 10px);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgba(255, 255, 255, 0.6);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      "></div>
    </div>
  `;
}
