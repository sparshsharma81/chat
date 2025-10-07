import React, { useState } from "react";

const theme = {
  primary: "#6c63ff",
  background: "inherit",
  text: "inherit",
  highlight: "inherit",
  border: "inherit",
  accent: "inherit",
};

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
      // "🧠 Mental Plane": [4, 9, 2],
      // "💓 Emotional Plane": [3, 5, 7],
      // "💪 Physical Plane": [8, 1, 6],
      // "🔷 Thought Line": [4, 3, 8],
      // "🔷 Will Power Line": [9, 5, 1],
      // "🔷 Action Line": [2, 7, 6],
      // "🪞 Diagonal 1": [4, 5, 6],
      // "🪞 Diagonal 2": [2, 5, 8],
      // "⭐ Center Point": [5],
      // "🌟 Spiritual Triangle": [3, 6, 9],
      // "🔺 Intuition Triangle": [1, 5, 9],
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

  // const GEMINI_API_KEY = "AIzaSyCQ8UKs9qDqv3137MEXes"; // Replace with your key
  const GEMINI_API_KEY = "AIzaSyDhTtBuO1bJYFEm9XI2ZPWpmN0om3JGMcQ" //this is the updated api key..it should work

  const callGemini = async (prompt) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
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
    const prompt = `DOB: ${dob}, Gender: ${gender}, Driver: ${driver}, Conductor: ${conductor}, Kua: ${kua}, Missing: ${missing.join(", ")}, Provide an insightful, brief numerology reading. 
    tell the user about all the numerological losho grid lines present in the native loshogrid
    and you know all the numbers which are present so be professional.. and calculate using current year..like how your year will be
    does your driver conductor support this year or not..what is your life path..what is your goals..
    tell the remedies of missing number also and be professional..and at the end just write
    Hope you like this website made by SPARSH SHARMA`;

    setGeminiResponse("⏳ Fetching Gemini Insight...");
    const reply = await callGemini(prompt);
    setGeminiResponse(reply);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.wrapper}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        <h2 style={styles.heading}>🔢 Lo Shu Grid & Kua Calculator</h2>

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
                    backgroundColor: cell.isKua ? theme.highlight : theme.accent,
                  }}
                >
                  {cell.count > 0 ? cell.num.toString().repeat(cell.count) : ""}
                </div>
              ))}
            </div>
            

            {/* <div style={styles.scrollableBox}>
              {gridData.lineStrength.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div> */}

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
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "inherit", // Added semi-transparent dark background
    backdropFilter: "blur(4px)", // Subtle blur for modern look
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
    overflowY: "auto",
    boxSizing: "border-box",
  },

  wrapper: {
    width: "100%",
    maxWidth: "720px",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "inherit",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 2)",
    padding: "32px 28px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: "relative",
    color: "inherit",
    transition: "all 0.3s ease-in-out",
    boxSizing: "border-box",
  },

  closeBtn: {
    position: "sticky",
    top: "16px",
    right: "16px",
    fontSize: "24px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "Red",
    transition: "color 0.3s",
    alignSelf: "flex-end",
    zIndex: 10,
    ":hover": {
      color: "#333",
    },
    ":focus": {
      outline: "2px solid #aaa",
      borderRadius: "4px",
    },
  },

  heading: {
    fontSize: "1.85rem",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "28px",
    color: "inherit",
    lineHeight: 1.3,
  },

  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    justifyContent: "center",
    marginBottom: "28px",
  },

    grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 70px)",
    gap: "12px",
    justifyContent: "center",
    marginTop: "24px",
  },

  cell: {
    border: "2px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    padding: "14px",
    fontWeight: 600,
    fontSize: "18px",
    backgroundColor: "#f9f9f9",
    color: "inherit",
    transition: "background 0.3s, border 0.3s",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#f0f0f0",
      borderColor: "#bbb",
    },
  },

  output: {
    backgroundColor: "inherit",
    padding: "20px",
    margin: "24px 0 10px",
    borderRadius: "12px",
    border: "1px solid #eee",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
    fontSize: "16px",
    lineHeight: 1.6,
  },

  analysisBox: {
    backgroundColor: "inherit",
    border: "1px solid #ddd",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.07)",
    marginBottom: "32px",
    fontSize: "15px",
    lineHeight: 1.5,
  },

  scrollableBox: {
    maxHeight: "180px",
    overflowY: "auto",
    padding: "14px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "20px",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#444",
  },

  analysisText: {
    whiteSpace: "pre-wrap",
    fontFamily: "'Courier New', monospace",
    fontSize: "15px",
    lineHeight: "1.7",
    color: "inherit",
  },
};



export default LoShuKuaModal;
