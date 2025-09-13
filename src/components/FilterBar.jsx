"use client"

function FilterButton({ active, onClick, children, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "px-3 py-2 rounded-md text-sm font-medium transition border",
        active ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

export default function FilterBar({ filter, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <FilterButton ariaLabel="Show all habits for today" active={filter === "today"} onClick={() => onChange("today")}>
        Today
      </FilterButton>
      <FilterButton
        ariaLabel="Show completed habits"
        active={filter === "completed"}
        onClick={() => onChange("completed")}
      >
        Completed
      </FilterButton>
      <FilterButton ariaLabel="Show pending habits" active={filter === "pending"} onClick={() => onChange("pending")}>
        Pending
      </FilterButton>
    </div>
  )
}
