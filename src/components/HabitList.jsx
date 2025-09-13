"use client"
import HabitItem from "./HabitItem"

export default function HabitList({ habits, isCompletedToday, onToggleHabit, onDeleteHabit, filter, getStreak }) {
  function filterHabits() {
    if (filter === "completed") {
      return habits.filter((h) => isCompletedToday(h.id))
    }
    if (filter === "pending") {
      return habits.filter((h) => !isCompletedToday(h.id))
    }
    // 'today' -> show all
    return habits
  }

  const visible = filterHabits()

  if (visible.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
       😔 No habits to show.
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {visible.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isCompleted={isCompletedToday(habit.id)}
          onToggle={onToggleHabit}
          onDelete={onDeleteHabit}
          streak={getStreak(habit.id)}
        />
      ))}
    </ul>
  )
}
