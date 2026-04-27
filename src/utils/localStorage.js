const SESSIONS_KEY = 'english_buddy_sessions'
const STREAK_KEY = 'english_buddy_streak'

/**
 * Saves a completed session to localStorage.
 * session = { scenario, date, turns, avgFluency, fillerWords }
 */
export function saveSession(session) {
  const sessions = getSessions()
  sessions.unshift({ ...session, date: new Date().toISOString() })
  // Keep the last 60 sessions to avoid bloating storage
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, 60)))
  updateStreak()
}

export function getSessions() {
  try {
    return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || []
  } catch {
    return []
  }
}

export function getStreak() {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEY)) || { count: 0, lastDate: null }
  } catch {
    return { count: 0, lastDate: null }
  }
}

function updateStreak() {
  const streak = getStreak()
  const today = new Date().toDateString()
  const last = streak.lastDate ? new Date(streak.lastDate).toDateString() : null
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  if (last === today) return // already practiced today, don't double-count
  const newCount = last === yesterday ? streak.count + 1 : 1
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDate: new Date().toISOString() }))
}
