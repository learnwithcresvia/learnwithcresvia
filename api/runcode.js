import axios from "axios";

export async function runCodeHandler(code) {
  try {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: 63, // JavaScript Node.js
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": "YOUR_API_KEY_HERE",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
}
