import { parseFeedback } from '../utils/feedbackParser'

export async function askClaude({ messages, systemPrompt }) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
