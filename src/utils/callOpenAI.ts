import { CONFIG } from "./constants/config";

export const callOpenAI = async (field: string, apiKey: string) => {
  const prompts: Record<string, string> = {
    financialSituation:
      "Write a brief professional description of difficult financial circumstances for a support application. Under 100 words, first person.",
    employmentCircumstances:
      "Write a brief professional description of challenging employment situation for a support application. Under 100 words, first person.",
    reasonForApplying:
      "Write a brief professional reason for applying for financial assistance. Under 100 words, first person.",
  };

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), CONFIG.OPENAI.TIMEOUT);

  try {
    const res = await fetch(CONFIG.OPENAI.URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: CONFIG.OPENAI.MODEL,
        messages: [
          {
            role: "system",
            content:
              "You help write social support applications compassionately and professionally.",
          },
          { role: "user", content: prompts[field] },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
      signal: ctrl.signal,
    });

    clearTimeout(timeout);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error("OpenAI error:", errData);
      throw new Error(errData.error?.message || "API failed");
    }
    const data = await res.json();
    return { ok: true, text: data.choices[0].message.content.trim() };
  } catch (err: any) {
    clearTimeout(timeout);
    console.warn("OpenAI call failed. Using mock response.", err);

    const mockReplies: Record<string, string> = {
      financialSituation:
        "I am currently experiencing financial hardship due to limited income and high living costs, and I am seeking assistance to meet basic needs.",
      employmentCircumstances:
        "I am currently unemployed and actively seeking work, but facing challenges due to limited job opportunities in my field.",
      reasonForApplying:
        "I am applying for financial support to help sustain my family during this period of financial difficulty until I regain stable employment.",
    };

    return {
      ok: true,
      text:
        mockReplies[field] || "Unable to generate AI text. Please try again.",
    };
  }
};
