export async function runCode(code, languageId) {
  const response = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code
      })
    }
  );

  return await response.json();
}
