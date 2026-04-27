/**
 * Validates and normalises the feedback object Claude returns.
 * Returns a clean feedback object, or null if the response is unusable.
 *
 * Why this exists: Claude occasionally returns slightly malformed JSON
 * or omits optional fields. This centralises all the defensive checks.
 */
export function parseFeedback(raw) {
  if (!raw || typeof raw !== 'object') return null

  const grammar = raw.grammar && raw.grammar.issue
    ? { issue: raw.grammar.issue, correction: raw.grammar.correction || null, tip: raw.grammar.tip || null }
    : null

  const vocabulary = raw.vocabulary && raw.vocabulary.suggestion
    ? { suggestion: raw.vocabulary.suggestion, example: raw.vocabulary.example || null }
    : null

  const fillerWords = Array.isArray(raw.filler_words)
    ? raw.filler_words.filter(w => typeof w === 'string')
    : []

  const fluencyScore = typeof raw.fluency_score === 'number'
    ? Math.min(10, Math.max(1, Math.round(raw.fluency_score)))
    : null

  const overall = typeof raw.overall === 'string' ? raw.overall : null

  return { grammar, vocabulary, fillerWords, fluencyScore, overall }
}
