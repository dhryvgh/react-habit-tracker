function pad(n) {
  return n.toString().padStart(2, "0")
}

export function getDateKey(d = new Date()) {
  const yr = d.getFullYear()
  const mo = pad(d.getMonth() + 1)
  const da = pad(d.getDate())
  return `${yr}-${mo}-${da}`
}

export function todayKey() {
  return getDateKey(new Date())
}

export function addDays(date, delta) {
  const d = new Date(date)
  d.setDate(d.getDate() + delta)
  return d
}

// Returns array of date keys oldest -> newest
export function lastNDates(n, includeToday = true) {
  const base = includeToday ? new Date() : addDays(new Date(), -1)
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = addDays(base, -i)
    days.push(getDateKey(d))
  }
  return days
}

// Single-letter weekday label
export function dayLabel(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number)
  const dt = new Date(y, m - 1, d)
  return ["S", "M", "T", "W", "T", "F", "S"][dt.getDay()]
}
