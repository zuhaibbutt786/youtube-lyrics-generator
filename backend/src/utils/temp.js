import fs from "fs";

export function cleanupTemp(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Failed to delete temp file:", err.message);
  }
}
