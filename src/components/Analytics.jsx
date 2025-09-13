import { dayLabel } from "../utils/date"

function Bar({ label, percent, count }) {
  return (
    <div className="flex flex-col items-center justify-end gap-2">
      <div className="h-40 w-8 rounded-md bg-gray-100 overflow-hidden flex items-end">
        <div
          className="w-full bg-teal-600 transition-all"
          style={{ height: `${percent}%` }}
          aria-label={`${label} completion ${percent}%`}
          title={`${count} completions (${percent}%)`}
        />
      </div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  )
}

export default function Analytics({ habitsCount, dailyCounts /* [{dateKey, count}] */ }) {
  const bars = dailyCounts.map((d) => {
    const percent = habitsCount > 0 ? Math.round((d.count / habitsCount) * 100) : 0
    return { label: dayLabel(d.dateKey), percent, count: d.count, dateKey: d.dateKey }
  })

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">Weekly Completion</h3>
        <p className="text-xs text-gray-600">Last 7 days</p>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {bars.map((b) => (
          <Bar key={b.dateKey} label={b.label} percent={b.percent} count={b.count} />
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">Bar height shows percent of habits completed each day.</p>
    </section>
  )
}
