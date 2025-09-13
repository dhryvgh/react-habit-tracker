"use client"
import App from "../src/App"

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <div className="mx-auto max-w-xl p-4 md:p-6">
        <header className="mb-4">
          <center> <h1 className="text-balance text-2xl font-semibold">📝Taskly</h1> </center>
          <center><p className="text-sm text-gray-600">Track daily habits, streaks, and weekly completion.</p> </center>
        </header>
        <App />
      </div>
    </main>
  )
}
