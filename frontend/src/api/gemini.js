const API_KEY = "AIzaSyBy8zuqZXjQajxCFq40FmvmcXOiSkLobR0"; // Replace this with your actual key

export const askGemini = async (promptText) => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch from Gemini API");
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (error) {
    console.error("Gemini fetch error:", error);
    return "Error: Could not connect to Gemini API.";
  }
};
