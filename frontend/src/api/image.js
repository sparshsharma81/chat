export const generateImage = async (prompt, negativePrompt) => {
  const requestData = {
    key: "qr1CNaY0MymrAEAaAaizaj3ZqFDFXZkKbhGRpuHaFW5JCyFMtUhWl8XliD65", // Replace with your actual API key
    prompt: prompt,
    negative_prompt: negativePrompt,
    width: "512",
    height: "512",
    safety_checker: false,
    seed: null,
    samples: 1,
    base64: false,
    webhook: null,
    track_id: null
  };

  try {
    const response = await fetch("https://modelslab.com/api/v6/realtime/text2img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    const data = await response.json();
    if (data.status === "success" && data.output && data.output.length > 0) {
      return data.output[0]; // Image URL
    } else {
      throw new Error("Error generating image.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error generating image.");
  }
};
