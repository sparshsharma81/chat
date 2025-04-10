export async function getHoroscope(sign = "aries", day = "today") {
    try {
      const response = await fetch("https://aztro.sameerkumar.website/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Set correct content type
        },
        body: `sign=${sign}&day=${day}`, // API expects the parameters to be sent in body
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.description;
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      return "Failed to fetch horoscope.";
    }
  }
  