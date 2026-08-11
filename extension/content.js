// Wait until YouTube player is ready
function injectButton() {
  // Avoid injecting multiple times
  if (document.getElementById("yt-lyrics-btn")) return;

  const target =
    document.querySelector("#above-the-fold #title") ||
    document.querySelector("h1.title") ||
    document.querySelector("#title h1");

  if (!target) return;

  const btn = document.createElement("button");
  btn.id = "yt-lyrics-btn";
  btn.innerText = "Get Lyrics / Transcript";
  btn.className = "yt-lyrics-button";

  btn.addEventListener("click", async () => {
    btn.innerText = "Processing...";
    btn.disabled = true;

    const videoUrl = window.location.href;

    try {
      const response = await fetch("http://localhost:3000/api/lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl })
      });

      const data = await response.json();

      if (data.success) {
        chrome.runtime.sendMessage({
          type: "LYRICS_RESULT",
          title: data.title,
          lyrics: data.lyrics,
          raw: data.raw
        });
        btn.innerText = "Done! Check popup";
      } else {
        btn.innerText = "Error – Try again";
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
      btn.innerText = "Server Error";
    }

    setTimeout(() => {
      btn.innerText = "Get Lyrics / Transcript";
      btn.disabled = false;
    }, 3000);
  });

  target.parentNode.insertBefore(btn, target.nextSibling);
}

// Run on page load + when YouTube navigates (SPA)
injectButton();
setInterval(injectButton, 2000);
