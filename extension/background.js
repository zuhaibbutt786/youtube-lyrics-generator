// Simple message relay + store last result so popup can read it
let lastResult = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LYRICS_RESULT") {
    lastResult = {
      title: message.title,
      lyrics: message.lyrics,
      raw: message.raw,
      timestamp: Date.now()
    };
    // Try to open the popup
    chrome.action.openPopup().catch(() => {
      console.log("Popup opened or already open");
    });
  }

  if (message.type === "GET_LAST_RESULT") {
    sendResponse(lastResult);
  }
});
