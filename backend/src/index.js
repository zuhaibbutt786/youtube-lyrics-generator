import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import lyricsRouter from "./routes/lyrics.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/lyrics", lyricsRouter);

app.get("/", (req, res) => {
  res.json({ status: "YouTube Lyrics API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
