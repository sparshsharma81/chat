import React, { useState } from "react";

const LoShuKuaModal = ({ isOpen, onClose }) => {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [gridData, setGridData] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState("");

  const reduceToOneDigit = (n) => {
    while (n > 9) {
      n = n.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    }
    return n;
  };

  const calculateKuaNumber = (year, gender) => {
    let yearSum = reduceToOneDigit(
      year.toString().split("").reduce((a, b) => a + parseInt(b), 0)
    );
    let kua;
    if (gender === "male") {
      kua = 11 - yearSum;
      if (kua < 1) kua += 9;
    } else {
      kua = 4 + yearSum;
      if (kua > 9) kua = reduceToOneDigit(kua);
    }
    return kua;
  };

  const getKuaTraits = (kua) => {
    const map = {
      1: "Independent, innovative, water element",
      2: "Supportive, nurturing, earth element",
      3: "Creative, talkative, wood element",
      4: "Practical, planner, wood element",
      5: "Balanced, rare Kua (handled differently)",
      6: "Responsible, disciplined, metal element",
      7: "Joyful, expressive, metal element",
      8: "Wise, calm, mountain energy",
      9: "Visionary, energetic, fire element",
    };
    return map[kua] || "-";
  };

  const generateGrid = () => {
    if (!dob) return alert("Enter date of birth");

    const digits = dob.replaceAll("-", "").split("").map(Number);
    const count = Array(10).fill(0);
    digits.forEach((d) => count[d]++);

    const day = parseInt(dob.split("-")[2]);
    const driver = reduceToOneDigit(day);
    const conductor = reduceToOneDigit(digits.reduce((a, b) => a + b, 0));
    const year = parseInt(dob.split("-")[0]);
    const kua = calculateKuaNumber(year, gender);

    count[driver]++;
    count[kua]++;

    const missing = [];
    for (let i = 1; i <= 9; i++) if (count[i] === 0) missing.push(i);

    const loShuOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    const grid = loShuOrder.map((num) => ({
      num,
      count: count[num],
      isMissing: count[num] === 0,
      isKua: num === kua,
    }));

    const planes = {
      "🧠 Mental Plane": [4, 9, 2],
      "💓 Emotional Plane": [3, 5, 7],
      "💪 Physical Plane": [8, 1, 6],
      "🔷 Thought Line": [4, 3, 8],
      "🔷 Will Power Line": [9, 5, 1],
      "🔷 Action Line": [2, 7, 6],
      "🪞 Diagonal 1": [4, 5, 6],
      "🪞 Diagonal 2": [2, 5, 8],
      "⭐ Center Point": [5],
      "🌟 Spiritual Triangle": [3, 6, 9],
      "🔺 Intuition Triangle": [1, 5, 9],
    };

    const lineStrength = Object.entries(planes)
      .map(([name, nums]) => {
        const strength = nums.map((n) => count[n]).reduce((a, b) => a + b, 0);
        if (strength === 0) return null;
        return `${name}: ${strength >= 5 ? "Strong" : strength >= 3 ? "Moderate" : "Weak"}`;
      })
      .filter(Boolean);

    setGridData({
      grid,
      driver,
      conductor,
      kua,
      kuaTraits: getKuaTraits(kua),
      missing,
      lineStrength,
    });
  };

  const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // Replace this with your real key

  const callGemini = async (prompt) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  };

  const handleGemini = async () => {
    if (!gridData) return;
    const { driver, conductor, kua, missing, lineStrength } = gridData;
    const prompt = `DOB: ${dob}, Gender: ${gender}, Driver: ${driver}, Conductor: ${conductor}, Kua: ${kua}, Missing: ${missing.join(
      ", "
    )}, Planes: ${lineStrength.join("; ")}. Provide an insightful, brief numerology reading.`;

    setGeminiResponse("⏳ Fetching Gemini Insight...");
    const reply = await callGemini(prompt);
    setGeminiResponse(reply);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.wrapper}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        <h2 style={{ textAlign: "center" }}>🔢 Lo Shu Grid & Kua Calculator</h2>

        <div style={styles.form}>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button onClick={generateGrid}>Generate</button>
          {gridData && <button onClick={handleGemini}>🔮 Gemini Insight</button>}
        </div>

        {gridData && (
          <div style={styles.analysisBox}>
            <div><strong>Driver:</strong> {gridData.driver}</div>
            <div><strong>Conductor:</strong> {gridData.conductor}</div>
            <div><strong>Kua:</strong> {gridData.kua}</div>
            <div><strong>Kua Traits:</strong> {gridData.kuaTraits}</div>
            <div><strong>Missing Numbers:</strong> {gridData.missing.join(", ") || "None"}</div>

            <div style={styles.grid}>
              {gridData.grid.map((cell, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.cell,
                    opacity: cell.isMissing ? 0.4 : 1,
                    backgroundColor: cell.isKua ? "#ffe58a" : "#fff",
                  }}
                >
                  {cell.count > 0 ? cell.num.toString().repeat(cell.count) : ""}
                </div>
              ))}
            </div>

            <div style={styles.scrollableBox}>
              {gridData.lineStrength.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>

            {geminiResponse && (
              <div style={styles.output}>
                <h4>🔮 Gemini Insight</h4>
                <div style={styles.analysisText}>{geminiResponse}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
  },
  wrapper: {
    all: "inherit",
    maxWidth: "800px",
    margin: "40px auto",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#333",
    padding: "20px",
    backgroundColor: "#fefefe",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "relative",
    overflowY: "auto",
    maxHeight: "90vh",
    width: "90%",
  },
  closeBtn: {
    position: "absolute", right: 10, top: 10, fontSize: "1.4rem", background: "transparent", border: "none", cursor: "pointer"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 60px)",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  cell: {
    border: "2px solid #555",
    padding: "10px",
    textAlign: "center",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  output: {
    backgroundColor: "#fafafa",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  analysisBox: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  scrollableBox: {
    maxHeight: "200px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "20px",
  },
  analysisText: {
    whiteSpace: "pre-wrap",
    fontFamily: "Courier New, monospace",
    fontSize: "15px",
    lineHeight: "1.6",
  },
};

export default LoShuKuaModal;
