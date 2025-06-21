import './message-preview.css'
export function MessagePreview(d: { source?: string; title?: string }) {
  return `
      <div class="globe-message-box-title">${d.source || '无标题'}</div>
      <div class="globe-message-box-content">${d.title || '无内容'}</div>
      <div class="globe-message-box-arrow"></div>
  `;
}