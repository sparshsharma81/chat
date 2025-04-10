// zodiacUtils.js
export const getZodiacSign = (birthMonth, birthDay) => {
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
  
    const zodiacSigns = [
      { sign: "Capricorn", start: [1, 1], end: [1, 19] },
      { sign: "Aquarius", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", start: [2, 19], end: [3, 20] },
      { sign: "Aries", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", start: [5, 21], end: [6, 20] },
      { sign: "Cancer", start: [6, 21], end: [7, 22] },
      { sign: "Leo", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", start: [8, 23], end: [9, 22] },
      { sign: "Libra", start: [9, 23], end: [10, 22] },
      { sign: "Scorpio", start: [10, 23], end: [11, 21] },
      { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
      { sign: "Capricorn", start: [12, 22], end: [12, 31] },
    ];
  
    for (let i = 0; i < zodiacSigns.length; i++) {
      const { sign, start, end } = zodiacSigns[i];
      if (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      ) {
        return sign.toLowerCase();
      }
    }
  
    return null;
  };
  