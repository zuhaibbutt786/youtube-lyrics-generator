# YouTube Lyrics Generator (MVP)

One-click Chrome extension that turns any YouTube video into clean lyrics or a transcript in under 60 seconds.

## Features (v1)

- Button appears under the video title on YouTube
- Click → Transcribe with Groq Whisper Large v3 Turbo
- Clean with LLM into readable lyrics
- Popup with Copy + Download .txt
- Lyrics Mode / Raw Transcript Mode toggle

## Project Structure

```
youtube-lyrics-generator/
├── extension/          # Chrome Manifest V3 extension
└── backend/            # Node.js + Express + yt-dlp + Groq
```

## Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your Groq API key
npm run dev
```

Required system tools:
- `yt-dlp`
- `ffmpeg`

### 2. Extension

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `extension/` folder
4. Open any normal YouTube video and click **Get Lyrics / Transcript**

> **Icons note**: Simple placeholder icons are included. Replace `extension/icons/*.png` with your own if desired.

## Environment Variables

```
GROQ_API_KEY=your_key_here
PORT=3000
```

## Notes

- Works on normal YouTube videos (not Shorts / Live in v1)
- Max recommended length: ~15-20 minutes
- English first
- Never commit your real `.env` file
- **Important**: Revoke any previously shared API keys and generate a new one.

## License

MIT
