"use client"
import { useState } from "react"
import Planner from "@/components/Planner"
import History from "@/components/History"
import { Workout } from "@/types"

export default function Home() {
  const [view, setView] = useState<"planner" | "history" | "account">("planner")
  const [workouts, setWorkouts] = useState<Workout[]>([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex gap-8 mb-12">
          <div className="flex-1">
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              FitGoal
            </h1>
            <p className="text-xl text-slate-600 mt-2">Detailed workouts with sets, reps, RPE, RIR</p>
          </div>
          <nav className="flex gap-4">
            <button onClick={() => setView("planner")} className={`px-6 py-3 rounded-xl font-semibold ${view === "planner" ? "bg-blue-600 text-white shadow-lg" : "bg-white border border-slate-200 hover:bg-slate-50"}`}>Planner</button>
            <button onClick={() => setView("history")} className={`px-6 py-3 rounded-xl font-semibold ${view === "history" ? "bg-blue-600 text-white shadow-lg" : "bg-white border border-slate-200 hover:bg-slate-50"}`}>History</button>
            <button onClick={() => setView("account")} className={`px-6 py-3 rounded-xl font-semibold ${view === "account" ? "bg-blue-600 text-white shadow-lg" : "bg-white border border-slate-200 hover:bg-slate-50"}`}>Account</button>
          </nav>
        </div>

        {view === "planner" && <Planner workouts={workouts} setWorkouts={setWorkouts} />}
        {view === "history" && <History workouts={workouts} />}
        {view === "account" && <div className="text-center p-12"><div className="max-w-md mx-auto"><h2 className="text-2xl font-bold mb-4">Account</h2><p className="text-slate-500">Supabase auth goes here</p></div></div>}
      </div>
    </div>
  )
}