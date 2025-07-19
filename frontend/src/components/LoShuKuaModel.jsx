import React, { useState } from "react";

const LoShuKuaModal = ({ isOpen, onClose }) => {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [gridData, setGridData] = useState(null);
  const [geminiResponse, setGeminiResponse] = useState("");

  const reduceToOneDigit = (n) => {
    while (n > 9) {
      n = n
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
    return n;
  };

  const calculateKuaNumber = (year, gender) => {
    let yearSum = reduceToOneDigit(
      year
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0)
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

  const GEMINI_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your key

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
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        <h2>🔢 Lo Shu Grid & Kua Calculator</h2>
        <div style={styles.form}>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button onClick={generateGrid}>Generate</button>
          {gridData && (
            <button onClick={handleGemini}>🔮 Gemini Insight</button>
          )}
        </div>

        {gridData && (
          <>
            <div style={styles.stats}>
              <p><b>Driver:</b> {gridData.driver}</p>
              <p><b>Conductor:</b> {gridData.conductor}</p>
              <p><b>Kua:</b> {gridData.kua}</p>
              <p><b>Kua Traits:</b> {gridData.kuaTraits}</p>
              <p><b>Missing Numbers:</b> {gridData.missing.join(", ") || "None"}</p>
            </div>
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
            <div style={styles.lines}>
              <h4>📊 Planes & Strength</h4>
              {gridData.lineStrength.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div style={styles.aiOutput}>
              {geminiResponse && (
                <>
                  <h4>🔮 Gemini Insight</h4>
                  <p style={{ whiteSpace: "pre-wrap" }}>{geminiResponse}</p>
                </>
              )}
            </div>
          </>
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
  modal: {
    background: "#fefefe", borderRadius: "12px", padding: "20px", width: "90%", maxWidth: "600px", position: "relative", overflowY: "auto", maxHeight: "90vh"
  },
  closeBtn: {
    position: "absolute", right: 10, top: 10, fontSize: "1.4rem", background: "transparent", border: "none", cursor: "pointer"
  },
  form: {
    display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px"
  },
  stats: {
    marginTop: "10px", textAlign: "left"
  },
  grid: {
    display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: "10px", margin: "20px auto", justifyContent: "center"
  },
  cell: {
    border: "2px solid #555", padding: "10px", textAlign: "center", borderRadius: "8px", fontWeight: "bold"
  },
  lines: {
    marginTop: "10px"
  },
  aiOutput: {
    marginTop: "20px", fontSize: "0.95em", color: "#333"
  }
};

export default LoShuKuaModal;
