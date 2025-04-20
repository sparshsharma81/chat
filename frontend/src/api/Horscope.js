import axios from 'axios';

// Function to fetch the horoscope based on the zodiac sign
export const getHoroscope = async (sign = "aries") => {
  const apiKey = 'EYKBTjrLQh5l69EyylJMx9tsunzHZ1N28K5UDUiM';  // Replace with your actual API key from freeastrologyapi.com
  const url = `https://api.freeastrologyapi.com/horoscope?sign=${sign}`;

  try {
    // Making a GET request to the astrology API
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,  // Authorization header with the API key
      },
    });

    // Logging the response for debugging purposes
    console.log(response.data);

    // Returning the description of the horoscope for the selected sign
    return response.data.description || "No horoscope available for this sign.";
  } catch (error) {
    // Handling any errors that occur during the API request
    console.error("Error fetching horoscope:", error);
    return "Failed to fetch horoscope.";
  }
};
