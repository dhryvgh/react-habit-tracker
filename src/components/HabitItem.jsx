"use client"

export default function HabitItem({ habit, isCompleted, onToggle, onDelete, streak }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <input
          id={`habit-${habit.id}`}
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(habit.id)}
          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
          aria-describedby={`habit-${habit.id}-label`}
        />
        <label
          id={`habit-${habit.id}-label`}
          htmlFor={`habit-${habit.id}`}
          className={"text-sm " + (isCompleted ? "line-through text-gray-500" : "text-gray-900")}
        >
          {habit.name}
        </label>
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
          Streak: {streak}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onDelete(habit.id)}
        className="rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        aria-label={`Delete habit ${habit.name}`}
        title="Delete habit"
      >
        Delete
      </button>
    </li>
  )
}
