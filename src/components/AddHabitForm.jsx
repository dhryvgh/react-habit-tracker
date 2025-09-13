"use client"

import React from "react"

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = React.useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-lg border border-gray-200 bg-white p-3 flex items-center gap-2"
    >
      <label htmlFor="habit-name" className="sr-only">
        Habit name
      </label>
      <input
        id="habit-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="✍️Add a new habit (e.g., Read 20 mins)"
        className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button
        type="submit"
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
        aria-label="Add habit"
      >
        Add
      </button>
    </form>
  )
}
