import { useState, useCallback } from 'react'
import { askClaude } from '../services/claudeService'
import { freeConversationPrompt } from '../prompts/freeConversation'
import { jobInterviewPrompt } from '../prompts/jobInterview'
import { workplaceScenarioPrompt } from '../prompts/workplaceScenario'

const PROMPTS = {
  free: freeConversationPrompt,
  interview: jobInterviewPrompt,
  workplace: workplaceScenarioPrompt,
}

/**
 * Manages the full conversation state: messages, feedback, and loading status.
 * Returns sendMessage(text) which calls Claude and updates all state.
 */
export function useConversation(scenario) {
  const [messages, setMessages] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [script, setScript] = useState(null)
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (userText) => {
    const updatedMessages = [...messages, { role: 'user', content: userText }]
    setMessages(updatedMessages)
    setIsThinking(true)
    setError(null)

    try {
      const result = await askClaude({
        messages: updatedMessages,
        systemPrompt: PROMPTS[scenario],
      })

      setMessages(prev => [...prev, { role: 'assistant', content: result.reply }])
      setFeedback(result.feedback)
      setScript(result.script)

      return result.reply // caller (App) uses this to speak the reply aloud
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setIsThinking(false)
    }
  }, [messages, scenario])

  const reset = useCallback(() => {
    setMessages([])
    setFeedback(null)
    setError(null)
  }, [])

  // Sends a silent trigger to get Maya's opening greeting.
  // The trigger message is not shown in the UI — only Maya's reply is.
  const kickoff = useCallback(async (topicPrompt) => {
    setMessages([])
    setFeedback(null)
    setScript(null)
    setIsThinking(true)
    setError(null)
    try {
      const trigger = topicPrompt
        ? `Please begin the session. Specific scenario: ${topicPrompt}`
        : 'Please begin the session.'
      const result = await askClaude({
        messages: [{ role: 'user', content: trigger }],
        systemPrompt: PROMPTS[scenario],
      })
      setMessages([{ role: 'assistant', content: result.reply }])
      setScript(result.script)
      return result.reply
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setIsThinking(false)
    }
  }, [scenario])

  return { messages, feedback, script, isThinking, error, sendMessage, reset, kickoff }
}
