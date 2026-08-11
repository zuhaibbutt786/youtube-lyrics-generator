import express from "express";
import { downloadAudio } from "../services/youtube.js";
import { transcribeAudio } from "../services/whisper.js";
import { cleanLyrics } from "../services/cleaner.js";
import { cleanupTemp } from "../utils/temp.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url || (!url.includes("youtube.com") && !url.includes("youtu.be"))) {
    return res.status(400).json({ success: false, error: "Invalid YouTube URL" });
  }

  let audioPath = null;

  try {
    // 1. Download audio
    const { filePath, title } = await downloadAudio(url);
    audioPath = filePath;

    // 2. Transcribe with Whisper
    const rawTranscript = await transcribeAudio(filePath);

    // 3. Clean into lyrics
    const lyrics = await cleanLyrics(rawTranscript);

    res.json({
      success: true,
      title,
      lyrics,
      raw: rawTranscript
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    if (audioPath) cleanupTemp(audioPath);
  }
});

export default router;
