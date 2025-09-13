const STORAGE_KEY = "habit-tracker-v1"
export { STORAGE_KEY }

function defaultState() {
  return {
    habits: [], // [{id, name, createdAt}]
    completions: {}, // { [habitId]: { 'YYYY-MM-DD': true } }
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return {
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
      completions: parsed.completions && typeof parsed.completions === "object" ? parsed.completions : {},
    }
  } catch {
    return defaultState()
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
