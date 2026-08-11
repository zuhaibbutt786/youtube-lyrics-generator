import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function cleanLyrics(rawText) {
  const prompt = `You are a lyrics formatter.
Convert the following raw transcript into clean, readable lyrics.
- Remove filler words, repeated words, and noise
- Add line breaks properly
- Detect and label [Verse], [Chorus], [Bridge] if possible
- Keep original language
- Output only the cleaned lyrics, nothing else

Transcript:
${rawText}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3
  });

  return completion.choices[0].message.content;
}
