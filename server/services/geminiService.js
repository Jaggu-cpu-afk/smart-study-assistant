const axios = require("axios");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateAIResponse = async (prompt) => {
  let geminiApiKey = process.env.GEMINI_API_KEY;
  let openrouterApiKey = process.env.OPENROUTER_API_KEY;

  // Check if user accidentally placed OpenRouter key inside GEMINI_API_KEY variable
  if (geminiApiKey && geminiApiKey.startsWith("sk-or")) {
    openrouterApiKey = geminiApiKey;
    geminiApiKey = null;
  }

  if (geminiApiKey) {
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API Error:", error.message);
      // Fallthrough to OpenRouter if configured
    }
  }

  if (openrouterApiKey) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${openrouterApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API Error:", error.response?.data || error.message);
      let errMsg = error.response?.data?.error?.message || error.message;
      if (error.response?.status === 402) {
        errMsg = "OpenRouter Error (402): Insufficient Credits or Payment Required. The free model limit may have been reached. Please top up your OpenRouter account or use a free Google Gemini API Key instead.";
      }
      throw new Error(errMsg);
    }
  }

  throw new Error("AI API key not configured. Set GEMINI_API_KEY or OPENROUTER_API_KEY in .env");
};

const generateNotes = async (text) => {
  // Truncate massive PDFs to speed up the AI response time
  const optimizedText = text.substring(0, 15000);
  
  const prompt = `
Generate highly detailed notes:

1. Detailed Chapter Summary (at least 3 paragraphs)
2. Important Concepts (explain at least 10 key concepts)
3. Key Points (list at least 15-20 comprehensive bullet points)
4. Quick Revision Notes (for last minute review)

Content:

${optimizedText}
`;

  return await generateAIResponse(prompt);
};

// Generate MCQs
const generateMCQContent = async (text, count = 10) => {
  const optimizedText = text.substring(0, 15000);
  const prompt = `
Generate ${count} Multiple Choice Questions based on the content below.

IMPORTANT FORMATTING RULES:
1. List all ${count} Questions first, with their A, B, C, D options. DO NOT put the answer immediately after the question.
2. At the very end of all questions, create an "Answer Key" section.
3. In the Answer Key section, list the correct answers for all questions along with a brief explanation for each.

Format Example:

**Questions:**
1. Question Text?
A) Option 1
B) Option 2
C) Option 3
D) Option 4

(continue for all questions...)

**Answer Key & Explanations:**
1. Correct Answer: A) Option 1
Explanation: Detailed explanation here.

(continue for all explanations...)

Content:

${optimizedText}
`;

  return await generateAIResponse(
    prompt
  );
};



// Generate Flashcards
const generateFlashcardContent =
async (text) => {
  const optimizedText = text.substring(0, 15000);
  const prompt = `
Generate 20 Flashcards.

Format:

Question:
Answer:

Content:

${optimizedText}
`;

  return await generateAIResponse(
    prompt
  );
};

// Generate Viva Questions
const generateVivaContent =
async (text) => {
  const optimizedText = text.substring(0, 15000);
  const prompt = `
Generate 20 Viva Questions
with Answers.

Format:

Question:
Answer:

Content:

${optimizedText}
`;

  return await generateAIResponse(
    prompt
  );
};

// Generate Exam Questions
const generateExamContent =
async (text) => {
  const optimizedText = text.substring(0, 15000);
  const prompt = `
Generate:

5 Short Questions

5 Long Questions

Content:

${optimizedText}
`;

  return await generateAIResponse(
    prompt
  );
};

module.exports = {
  generateNotes,
  generateMCQContent,
  generateFlashcardContent,
  generateVivaContent,
  generateExamContent
};