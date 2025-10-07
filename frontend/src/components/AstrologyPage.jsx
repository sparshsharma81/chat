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
kam se kam 500 lines ya apni maximum limit tk lines output me likhiyo...full detail about each and every house, usme konsa planet hai..konsi rashi hai..kon uska malik hai..uspr kis planet ki dhristi pad rahi hai...shani ki 3 dhristi hoti hai 3rd,7th,10th, jupiter ki bhi 
3 dhrishti hoti hai... 5th , 7th, 9th, mars ki bhi 3 dhristi hoti hai.. 4th 7th and 8th..  and rahu ketu ki bhi 3 dhrishti hoti hai...5th , 7th, 9th,
aur dhayaan rakhiyo konsa planet kis rashi me uch aur nich ka hota hai..
Exaltation and Debilitation of Planets
Based on Moon Sign

Every planet has a positive and negative placement. For instance, a well-placed planet, or an exalted planet can lead you to great achievements in life. At the same time, a debilitated planet in a weak position can cause you to go through a rough and challenging phase.

Exaltation and Debilitation of Planets

The happiest moment in your life: Exaltation of Planets
We all have that one favorite spot in our house that has a very special place in our heart. The same thing happens with the Planets as well, where if the planet is placed in their comfort zone, which is basically a particular range of degrees where it works very well, it will bring you wealth and success; such a placement is referred to as Exaltation in Vedic Astrology.

Claim your 30-page unique FREE HOROSCOPE & learn about the position of planets in your horoscope.

Name
Male
Please enter name
Email
name@example.com
Date of Birth
Day
Month
Year
Time of Birth
Hour
Minute



Exalted Planets signify strength and happiness by being placed in that friendly zodiac sign, like when you are at your home and there’s something special about that one corner, which attracts you always to spend your time there. You also get new innovative ideas while the spark of creativity will ignite your mind when resting in that corner.


The tough time in your life: Debilitation of Planets
Due to your busy schedule, you were not able to clean your garden and the room that got messed because of the last party night. Now, you are struggling while cleaning that alone and are exhausted with the burden of work related to that room or the corner. All these scenarios will be faced by planets as well, where the planet gets placed in such a zodiac sign, that it gets tired and loses its strength. This form of placements is known as debilitation in Vedic Astrology.

If you have debilitated Planets in your birth chart, you will face struggles related to the significance of those Planets.


The range in the degree where the Planets get Exalted and Debilitated:
Exaltation of Planets in Degree with zodiac sign

PLANETS	DEEPEST EXALTATION ZODIAC SIGN	DEEPEST EXALTATION DEGREE
SUN	ARIES	10 DEGREE
MOON	TAURUS	3 DEGREE
MARS	CAPRICORN	28 DEGREE
MERCURY	VIRGO	15 DEGREE
JUPITER	CANCER	5 DEGREE
VENUS	PISCES	27 DEGREE
SATURN	LIBRA	20 DEGREE
 

Debilitation of Planets in Degree with Zodiac signs:

PLANETS	DEEPEST DEBILITATION ZODIAC SIGN	DEEPEST DEBILITATION DEGREE
SUN	LIBRA	10 DEGREE
MOON	SCORPIO	3 DEGREE
MARS	CANCER	28 DEGREE
MERCURY	PISCES	15 DEGREE
JUPITER	CAPRICORN	5 DEGREE
VENUS	VIRGO	27 DEGREE
SATURN	ARIES	20 DEGREE

. Sun: You should be prepared to enjoy the royal status and charm like a king, if your Sun is exalted in your horoscope. But if the Sun is in debilitation, stay away from legal matters or you will face setbacks in life related to government issues and taxes. Your relationship with your father will depend on the exaltation and debilitation as well.

2. Moon: You will face mood swings, and every now and then you will change your mindset, which will be the greatest barrier in your success with the debilitated Moon. Be ready to be in the limelight and enjoy all the name and fame in your career along with happiness from your mother as well if the Moon is in exaltation in your horoscope.

3. Mars: You will enjoy the happiness and contentment from land and property with the exaltation in your birth chart. You will have good support you’re your brother and earn a decent status in the society. The Debilitation of Mars will create struggles in your life and property-related disputes with siblings will be there.

4. Mercury: You will have sharp intelligence a good amount of knowledge related to mantras if Mercury is exalted. You will face problems in doing calculative work if your Mercury is in debilitation while your relationship with your sister may get strained as well.

5. Jupiter: When Jupiter is exalted, finances will be good for you and you will get the blessing of knowledge from a good mentor. The Debilitation of Jupiter can create setbacks in your finances and children-related matters.

6. Venus: Be ready to have all the luxuries, fun, party, love and romance if Venus is exalted in your chart. The Debilitation of Venus will create a distance in relationships and the essence of love will be missing from your married life.

7. Saturn: While an exalted Saturn will give you the best in terms of career and status, if it is debilitated, you will face tough challenges related to career and relationship.

Have a deep look into your horoscope for the Exaltation and Debilitation of planets to enjoy life and your achievements while prepping for the upcoming challenges.

ye bhi dhyaan rakhiyo konsa planet apni friend aur enemy ki rashi me hai...dhyaan se sahi reply kriyo please... proper professinonal reply...aur minimum 50 lines...
apni maximum limit me reply kriyo
ye Fire Element Signs: Aries (1), Leo (5) and Sagittarius (9)

Fire element represents ambition, transformation, energy, inspiration, push.

Earth Element Signs: Taurus (2), Virgo (6) and Capricorn (10)

Earth element represents practicality, rationality, material world, solidity, concreteness

Air Element Signs: Gemini (3), Libra (7) and Aquarius (11)

Air element represents expansion, limitlessness, creativity, ideas, abstract things

Water Element Signs: Cancer (4), Scorpio (8) and Pisces (12)
dhyaan rakhiyo properly professionally reply krna hai..
Movable Signs: 1, 4, 7,10

Movable signs promote changes, movement, motion, action

Fixed Signs: 2, 5, 8, 11

Fixed signs also known as stable signs promote stability, security, passiveness, control

Dual Signs: 3, 6, 9, 12

Dual signs have both characteristics of movable signs and fixed signs

tell them about their atmakarka..
analysis puri detail me hinid me diyo..pr english language me
jaise me likh raha hu hindi me pr english language me..waise hi reply diyo...
. Bahut hi professional tone me likhna hai jaise kisi expert astrologer se koi analysis le raha ho. Har ek house me kaunsa planet hai, uska kya matlab hai, konsa lord kis house me hai, uska kya impact hai, etc. Detail me likhna.

Location: ${location}
Timezone: ${timezone}

D1 Chart Output:
${d1Data}

D9 Chart Output:
${d9Data}
      `;

      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
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
  all: 'inherit', // inherit all basic styles from parent
  maxWidth: '800px',
  margin: '40px auto',
  fontFamily: 'inherit', // ensure it uses the inherited font if specified by parent
  color: 'inherit',       // text color will also follow parent
  padding: '20px',
  backgroundColor: 'inherit',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
},

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  output: {
    backgroundColor: 'inherit',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 0 10px inherit'
  },
  analysisBox: {
    backgroundColor: 'inherit',
    border: '1px solid inherit',
    padding: '24px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  scrollableBox: {
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: 'inherit',
    border: '1px solid inherit',
    borderRadius: '8px'
  },
  analysisText: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Courier New, monospace',
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'inherit'
  }
};

export default AstrologyPage; 
