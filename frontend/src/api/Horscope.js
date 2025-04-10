export async function getHoroscope(sign = "aries") {
    try {
      const response = await fetch("https://daily-rashifal-api.p.rapidapi.com/all", {
        method: "GET",  // Use GET as it's the correct method for this endpoint
        headers: {
          "X-RapidAPI-Key": "c296a1adb4msh483412b9524cbc0p142aa4jsne9a4212852a9",  // Your RapidAPI key
          "X-RapidAPI-Host": "daily-rashifal-api.p.rapidapi.com",  // Host header required by RapidAPI
          "Content-Type": "application/json",  // Content type should be JSON
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data[sign]?.description || "No horoscope available for this sign.";  // Return the description or a fallback message
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      return "Failed to fetch horoscope.";
    }
  }
  