import { parseFeedback } from '../utils/feedbackParser'

const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

/**
 * Calls Groq with the full conversation history and returns { reply, feedback }.
 *
 * Groq uses the OpenAI-compatible format:
 * - API key in Authorization header as a Bearer token
 * - System prompt as the first message with role 'system'
 * - Roles are 'user' and 'assistant' — no remapping needed
 * - response_format: json_object guarantees valid JSON output
 */
export async function askClaude({ messages, systemPrompt }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  const parsed = JSON.parse(data.choices[0].message.content)

  return {
    reply: parsed.reply,
    script: parsed.script || null,
    feedback: parseFeedback(parsed.feedback),
  }
}
