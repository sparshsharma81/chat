import React, { useState } from 'react';

const AstrologyPage = () => {
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [location, setLocation] = useState('Mumbai, India');
  const [timezone, setTimezone] = useState('5.5');
  const [d1Output, setD1Output] = useState(null);
  const [d9Output, setD9Output] = useState(null);
  const [geminiOutput, setGeminiOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const ASTROLOGY_KEY_1 = 'QW7HuNu0zm9rZmIfCd9xM2m0bcNdYPti4GsIHH2J';
  const ASTROLOGY_KEY_2 = 'Pt0HZPrfbc5HTHeq7TReg3K9F4xoNawL5quDOQ54';
  const GEMINI_API_KEY = 'AIzaSyCQ8UKs9qDqv3137MEXes-8RcRk5MU--4I';

  const fetchChart = async (url, payload, key1, key2) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key1
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Primary key failed');
      return await res.json();
    } catch {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key2
        },
        body: JSON.stringify(payload)
      });
      return await res.json();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeminiOutput('Generating analysis...');
    try {
      const [year, month, date] = dob.split('-').map(Number);
      const [hours, minutes] = tob.split(':').map(Number);
      const geoRes = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=4334b95ef0c645e79092cc2c3739083c`);
      const geoData = await geoRes.json();
      const { lat, lng } = geoData.results[0].geometry;

      const basePayload = {
        year, month, date, hours, minutes, seconds: 0,
        latitude: lat, longitude: lng,
        timezone: parseFloat(timezone),
        settings: {
          observation_point: 'topocentric',
          ayanamsha: 'lahiri'
        }
      };

      const d1 = await fetchChart('https://json.freeastrologyapi.com/planets/extended', basePayload, ASTROLOGY_KEY_1, ASTROLOGY_KEY_2);
      const d9 = await fetchChart('https://json.freeastrologyapi.com/navamsa-chart-info', basePayload, ASTROLOGY_KEY_1, ASTROLOGY_KEY_2);

      setD1Output(d1.output);
      setD9Output(d9.output);

      const d1Data = JSON.stringify(d1.output, null, 2);
      const d9Data = JSON.stringify(d9.output, null, 2);

      const prompt = `
Mere paas ek vyakti ka D1 (Rasi Chart) aur D9 (Navamsa Chart) ka output hai. Tum ek professional astrologer ho, aur tumhe unke janm kundli ke adhar par puri analysis deni hai. Analysis sirf kaam ki honi chahiye – love life, married life, nature, thinking, strengths, weaknesses, career, health, aur har house aur planet ke effect ke saath.

Ye analysis English letters me Hindi language me likhi honi chahiye. Bahut hi professional tone me likhna hai jaise kisi expert astrologer se koi analysis le raha ho. Har ek house me kaunsa planet hai, uska kya matlab hai, konsa lord kis house me hai, uska kya impact hai, etc. Detail me likhna.

Location: ${location}
Timezone: ${timezone}

D1 Chart Output:
${d1Data}

D9 Chart Output:
${d9Data}
      `;

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      const geminiJson = await geminiRes.json();
      const finalText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis returned.';
      setGeminiOutput(finalText);
    } catch (error) {
      setGeminiOutput('❌ Error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>🪐 Analyze Astrology</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />
        <input type="time" required value={tob} onChange={(e) => setTob(e.target.value)} />
        <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" />
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          <option value="5.5">IST (+5:30)</option>
          <option value="0">GMT (0)</option>
          <option value="1">CET (+1:00)</option>
          <option value="-5">EST (-5:00)</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Generate Analysis'}</button>
      </form>

      <section style={styles.output}>
        <h3>🌟 D1 Chart Output (Structured):</h3>
        {d1Output && Object.entries(d1Output).map(([planet, data]) => (
          <div key={planet} style={{ marginBottom: '16px' }}>
            <strong>🪐 {planet}</strong>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Zodiac Sign: <b>{data.zodiac_sign_name}</b></li>
              <li>Nakshatra: <b>{data.nakshatra_name} (Pada {data.nakshatra_pada})</b></li>
              <li>House Number: <b>{data.house_number}</b></li>
              <li>Degree: <b>{data.degrees}° {data.minutes}' {parseInt(data.seconds)}"</b></li>
              <li>Retrograde: <b>{data.isRetro === "true" ? 'Yes' : 'No'}</b></li>
              {data.nakshatra_vimsottari_lord && (
                <li>Vimsottari Lord: <b>{data.nakshatra_vimsottari_lord}</b></li>
              )}
            </ul>
          </div>
        ))}
      </section>

      <section style={styles.output}>
        <h3>🌌 D9 Chart Output (Structured):</h3>
        {d9Output && Object.entries(d9Output).map(([key, data]) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <strong>🔹 {data.name || key}</strong>
            <ul style={{ paddingLeft: '20px' }}>
              <li>House Number: <b>{data.house_number}</b></li>
              <li>Current Sign: <b>{data.current_sign}</b></li>
              <li>Retrograde: <b>{data.isRetro === "true" ? 'Yes' : 'No'}</b></li>
            </ul>
          </div>
        ))}
      </section>

      <section style={styles.analysisBox}>
        <h3>🧠 Gemini Analysis (Hindi in English):</h3>
        <div style={styles.scrollableBox}>
          <pre style={styles.analysisText}>{geminiOutput}</pre>
        </div>
      </section>
    </div>
  );
};

const styles = {
wrapper: {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
  fontFamily: 'inherit',
  color: 'inherit',
  backgroundColor: '#f4f6fa', // or 'inherit' if your parent has a background
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'block',
  minHeight: '100vh' // ensures it takes up screen space
},

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  output: {
    backgroundColor: 'white',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 0 10px #ccc'
  },
  analysisBox: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  scrollableBox: {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#fefefe',
    border: '1px solid #eee',
    borderRadius: '8px'
  },
  analysisText: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Courier New, monospace',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#333'
  }
};

export default AstrologyPage;
