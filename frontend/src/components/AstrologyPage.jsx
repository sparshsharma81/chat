import React, { useState } from "react";

const AstrologyAnalyzer = () => {
  const [d1Output, setD1Output] = useState("Awaiting input...");
  const [d9Output, setD9Output] = useState("Awaiting input...");
  const [geminiOutput, setGeminiOutput] = useState("Awaiting input...");

  const ASTROLOGY_API_KEY_PRIMARY = "QW7HuNu0zm9rZmIfCd9xM2m0bcNdYPti4GsIHH2J";
  const ASTROLOGY_API_KEY_BACKUP = "Pt0HZPrfbc5HTHeq7TReg3K9F4xoNawL5quDOQ54";
  const GEMINI_API_KEY = "AIzaSyCQ8UKs9qDqv3137MEXes-8RcRk5MU--4I";

  const fetchWithFallback = async (url, payload, key1, key2) => {
    try {
      const res1 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key1,
        },
        body: JSON.stringify(payload),
      });
      if (!res1.ok) throw new Error("Primary API failed");
      return await res1.json();
    } catch {
      const res2 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key2,
        },
        body: JSON.stringify(payload),
      });
      if (!res2.ok) throw new Error("Backup API also failed");
      return await res2.json();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const dob = new Date(form.get("dob") + "T" + form.get("tob"));

    setD1Output("Fetching D1 chart...");
    setD9Output("Fetching D9 chart...");
    setGeminiOutput("Waiting for charts...");

    const latitude = 18.9667;
    const longitude = 72.8333;

    const payload = {
      year: dob.getFullYear(),
      month: dob.getMonth() + 1,
      date: dob.getDate(),
      hours: dob.getHours(),
      minutes: dob.getMinutes(),
      seconds: 0,
      latitude,
      longitude,
      timezone: parseFloat(form.get("timezone")),
      settings: {
        observation_point: "topocentric",
        ayanamsha: "lahiri",
      },
    };

    try {
      const d1Data = await fetchWithFallback(
        "https://json.freeastrologyapi.com/planets/extended",
        payload,
        ASTROLOGY_API_KEY_PRIMARY,
        ASTROLOGY_API_KEY_BACKUP
      );
      const d1Text = d1Data.output ? JSON.stringify(d1Data.output, null, 2) : "No D1 data";
      setD1Output(d1Text);

      const d9Data = await fetchWithFallback(
        "https://json.freeastrologyapi.com/navamsa-chart-info",
        payload,
        ASTROLOGY_API_KEY_PRIMARY,
        ASTROLOGY_API_KEY_BACKUP
      );
      const d9Text = d9Data.output ? JSON.stringify(d9Data.output, null, 2) : "No D9 data";
      setD9Output(d9Text);

      const fullChartText = `📍 Location: ${form.get("location")}\n\n🌟 D1 Chart:\n${d1Text}\n\n🌌 D9 Chart:\n${d9Text}`;

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `me tujhe apni api k output show krne k liye use kr raha hu...to tujhe basically ek proper format me expert astrologer ki 
                    thrah output dena hai..mtlb aisa lagna chahiye ki tu ek human hai...properly har ek chij k baare me study
                    life,love life , khubiya , personality bilkul professional astrologer ki thrah tujhe batana hai..
                    tu ek professional astrologer hai.properly details me batahiyo..
                    english me likha hai but baat hindi jaisi honi chahiye...
                    kam se kam 400 lines honi chahiye...
                    \n\n${fullChartText}`
                  }
                ]
              }
            ]
          }),
        }
      );

      const geminiData = await geminiResponse.json();
      const analysis = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini did not return analysis.";
      setGeminiOutput(analysis);
    } catch (error) {
      setD1Output("❌ D1 Error: " + error.message);
      setD9Output("❌ D9 Error: " + error.message);
      setGeminiOutput("❌ Gemini Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Astrology Chart + Gemini Analysis</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date of Birth:
          <input type="date" name="dob" required />
        </label>
        <label>
          Time of Birth:
          <input type="time" name="tob" required />
        </label>
        <label>
          Location (City, Country):
          <input type="text" name="location" defaultValue="Mumbai, India" required />
        </label>
        <label>
          Timezone:
          <select name="timezone" required>
            <option value="5.5">IST (+5:30)</option>
            <option value="0">GMT (0)</option>
            <option value="-5">EST (-5:00)</option>
            <option value="1">CET (+1:00)</option>
            <option value="8">CST (+8:00)</option>
          </select>
        </label>
        <button type="submit">Generate Chart + Analyze</button>
      </form>

      <div style={styles.section}>
        <h2>D1 Chart (Rasi)</h2>
        <pre style={styles.pre}>{d1Output}</pre>
      </div>

      <div style={styles.section}>
        <h2>D9 Chart (Navamsa)</h2>
        <pre style={styles.pre}>{d9Output}</pre>
      </div>

      <div style={styles.section}>
        <h2>🧠 Gemini AI Analysis</h2>
        <pre style={styles.pre}>{geminiOutput}</pre>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f4f6f8",
    padding: "40px",
    maxWidth: "700px",
    margin: "auto",
  },
  section: {
    background: "white",
    padding: "20px",
    marginTop: "30px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  pre: {
    background: "#f1f1f1",
    padding: "10px",
    borderRadius: "6px",
    whiteSpace: "pre-wrap",
    overflowX: "auto",
  },
};

export default AstrologyAnalyzer;
