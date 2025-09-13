"use client"
import React from "react"
import { todayKey, lastNDates, getDateKey } from "./utils/date"
import { loadState, saveState, uid } from "./utils/storage"
import AddHabitForm from "./components/AddHabitForm"
import FilterBar from "./components/FilterBar"
import HabitList from "./components/HabitList"
import Analytics from "./components/Analytics"

function computeStreakForHabit(completionsByDay, today) {
  let streak = 0
  let cursor = today
  for (let i = 0; i < 3650; i++) {
    if (completionsByDay && completionsByDay[cursor]) {
      streak += 1
      const [y, m, d] = cursor.split("-").map(Number)
      const prev = new Date(y, m - 1, d)
      prev.setDate(prev.getDate() - 1)
      cursor = getDateKey(prev)
    } else {
      break
    }
  }
  return streak
}

function App() {
  const [state, setState] = React.useState(loadState)
  const [filter, setFilter] = React.useState("today") // today | completed | pending
  const today = todayKey()

  React.useEffect(() => {
    saveState(state)
  }, [state])

  const habits = state.habits
  const completions = state.completions

  function addHabit(name) {
    const newHabit = {
      id: uid(),
      name,
      createdAt: new Date().toISOString(),
    }
    setState((s) => ({
      ...s,
      habits: [newHabit, ...s.habits],
      completions: { ...s.completions, [newHabit.id]: {} },
    }))
  }

  function deleteHabit(id) {
    setState((s) => {
      const nextHabits = s.habits.filter((h) => h.id !== id)
      const nextCompletions = { ...s.completions }
      delete nextCompletions[id]
      return { habits: nextHabits, completions: nextCompletions }
    })
  }

  function isCompletedToday(habitId) {
    return Boolean(completions[habitId] && completions[habitId][today])
  }

  function toggleHabit(habitId) {
    setState((s) => {
      const hComp = s.completions[habitId] || {}
      const next = { ...s.completions }
      const nextHComp = { ...hComp }
      if (nextHComp[today]) {
        delete nextHComp[today]
      } else {
        nextHComp[today] = true
      }
      next[habitId] = nextHComp
      return { ...s, completions: next }
    })
  }

  function getStreak(habitId) {
    return computeStreakForHabit(completions[habitId], today)
  }

  // Weekly analytics: last 7 days counts (oldest -> newest)
  const last7 = lastNDates(7, true)
  const dailyCounts = last7.map((dateKey) => {
    let count = 0
    for (const h of habits) {
      if (completions[h.id] && completions[h.id][dateKey]) count += 1
    }
    return { dateKey, count }
  })

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <AddHabitForm onAdd={addHabit} />
        <div className="flex items-center justify-between">
          <FilterBar filter={filter} onChange={setFilter} />
          <div className="text-xs text-gray-600">
            Today: <span className="font-medium">{today}</span>
          </div>
        </div>
        <HabitList
          habits={habits}
          filter={filter}
          isCompletedToday={isCompletedToday}
          onToggleHabit={toggleHabit}
          onDeleteHabit={deleteHabit}
          getStreak={getStreak}
        />
      </section>

      <Analytics habitsCount={habits.length} dailyCounts={dailyCounts} />
    </div>
  )
}

export default App
