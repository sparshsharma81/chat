// const API_KEY = "AIzaSyBy8zuqZXjQajxCFq40FmvmcXOiSkLobR0"; // Replace this with your actual key

// const API_KEY2 = "AIzaSyBNpxKw5NvjtlDISsMdiwXMsjT9ajg66i0";
// const API_KEY = "AIzaSyDz7ymMSIxlQiD3Eu_NWBnbwEKYXiU_WOQ";
        // const API_KEY = "AIzaSyBPrbeoYqWQvGE_LXose5T8Vwbu6YCRPJ4"; // <--- REPLACE THIS WITH YOUR ACTUAL KEY
        // const MODEL_NAME = "gemini-2.0-flash"; 
          const API_KEY = import.meta.env.VITE_GEMINI_API1;
        const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || "gemini-2.0-flash";
export const askGemini = async (promptText) => {
  try {
    const res = await fetch(
     `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
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
    return "Error: Could not connect to Gemini API.....";
  }
};
