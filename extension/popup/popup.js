document.addEventListener("DOMContentLoaded", async () => {
  const content = document.getElementById("content");

  const { lastResult } = await chrome.storage.local.get("lastResult");

  if (!lastResult || !lastResult.lyrics) {
    content.innerHTML = `<div class="empty">Click "Get Lyrics / Transcript" on a YouTube video first.</div>`;
    return;
  }

  const { title, lyrics } = lastResult;

  content.innerHTML = `
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">Generated just now</div>
    <div id="lyrics">${escapeHtml(lyrics)}</div>
    <div class="actions">
      <button id="copy-btn">Copy</button>
      <button id="download-btn">Download .txt</button>
    </div>
  `;

  document.getElementById("copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(lyrics).then(() => {
      const btn = document.getElementById("copy-btn");
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    });
  });

  document.getElementById("download-btn").addEventListener("click", () => {
    const blob = new Blob([lyrics], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (title || "lyrics").replace(/[^a-z0-9]/gi, "_").slice(0, 60) + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  });
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
