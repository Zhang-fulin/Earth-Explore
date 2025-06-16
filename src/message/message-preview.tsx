import './message-preview.css'
export function MessagePreview(d: { title?: string; content?: string }) {
  return `
      <div class="globe-message-box-title">${d.title || '无标题'}</div>
      <div class="globe-message-box-content">${d.content || '无内容'}</div>
      <div class="globe-message-box-arrow"></div>
  `;
}