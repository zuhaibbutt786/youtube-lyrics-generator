let currentData = { title: "", lyrics: "", raw: "" };

chrome.runtime.sendMessage({ type: "GET_LAST_RESULT" }, (result) => {
  if (result) {
    currentData = result;
    document.getElementById("title").textContent = result.title || "Untitled";
    document.getElementById("lyrics").textContent = result.lyrics || "";
  }
});

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const text = e.target.value === "raw" ? currentData.raw : currentData.lyrics;
    document.getElementById("lyrics").textContent = text || "No data";
  });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("lyrics").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 1500);
  });
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const text = document.getElementById("lyrics").textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (currentData.title || "lyrics").replace(/[^\w\s-]/g, "") + ".txt";
  a.click();
  URL.revokeObjectURL(url);
});
