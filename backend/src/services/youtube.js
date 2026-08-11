import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const execPromise = promisify(exec);

export async function downloadAudio(url) {
  const id = uuidv4();
  const outputTemplate = path.join("temp", `${id}.%(ext)s`);

  // Create temp folder if not exists
  if (!fs.existsSync("temp")) {
    fs.mkdirSync("temp", { recursive: true });
  }

  const command = `yt-dlp -f "bestaudio[ext=m4a]/bestaudio" -x --audio-format mp3 --audio-quality 5 -o "${outputTemplate}" --no-playlist "${url}"`;

  await execPromise(command);

  // Find the downloaded file
  const files = fs.readdirSync("temp").filter((f) => f.startsWith(id));
  if (files.length === 0) throw new Error("Failed to download audio");

  const filePath = path.join("temp", files[0]);

  // Get title
  const { stdout } = await execPromise(`yt-dlp --get-title "${url}"`);
  const title = stdout.trim();

  return { filePath, title };
}
