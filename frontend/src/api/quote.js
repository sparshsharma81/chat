export const getQuote = async () => {
    try {
      const response = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random");
  
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
  
      const data = await response.json();
  
      if (Array.isArray(data) && data.length > 0) {
        const quote = data[0].q;
        const author = data[0].a;
        return `"${quote}" — ${author}`;
      } else {
        return "No quote found.";
      }
    } catch (error) {
      console.error("Quote fetch error:", error);
      return "Oops! Couldn't fetch a quote.";
    }
  };
  