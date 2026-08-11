// Background service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LYRICS_RESULT") {
    // Store result so popup can read it
    chrome.storage.local.set({
      lastResult: {
        title: message.title,
        lyrics: message.lyrics,
        raw: message.raw,
        timestamp: Date.now()
      }
    });
  }
  return true;
});
