import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets.

Your job:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes + resource links.
4. List relevant technical skills.

CRITICAL:
- Respond with ONLY a raw JSON object.
- No markdown, no comments, no extra text.
- If unsure, return best guess.`,
  });

  const response = await supportAgent.run(`
Analyze this support ticket and return a JSON object:

{
  "summary": "Short summary",
  "priority": "low|medium|high",
  "helpfulNotes": "Detailed explanation with resources",
  "relatedSkills": ["Skill1", "Skill2"]
}

Ticket Info:
- Title: ${ticket.title}
- Description: ${ticket.description}
  `);

  try {
    // Try direct parse — since system prompt forbids markdown
    const json = JSON.parse(response.output_text || response.output[0].content || response.output);
    return json;
  } catch (err) {
    console.error("Failed to parse AI JSON:", err.message, response);
    return null;
  }
};

export default analyzeTicket;
