"use client"
import { Workout } from "@/types"

interface HistoryProps {
  workouts: Workout[]
}

export default function History({ workouts }: HistoryProps) {
  const completed = workouts.filter(w => w.completed)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black">Workout History</h2>
        <div className="text-2xl font-bold text-emerald-600">{completed.length}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completed.map(workout => (
          <div key={workout.id} className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-3xl p-8 shadow-lg">
            <div className="flex justify-between mb-4">
              <span className="px-4 py-2 bg-emerald-200 rounded-2xl text-sm font-bold">✓ Completed</span>
              <span className="text-sm text-emerald-600 font-semibold">{workout.day}</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{workout.title}</h3>
            <div className="space-y-2 mb-6">
              {workout.exercises.map((ex, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{ex.name}</span>
                  <span className="font-mono">{ex.sets}x{ex.reps} RPE{ex.rpe}</span>
                </div>
              ))}
            </div>
            <div className="text-xs text-emerald-700 bg-emerald-100 p-3 rounded-2xl">
              {workout.notes || "Great session!"}
            </div>
          </div>
        ))}
      </div>

      {completed.length === 0 && (
        <div className="text-center py-24">
          <div className="w-32 h-32 bg-slate-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">No workouts logged yet</h3>
          <p className="text-slate-500 max-w-md mx-auto">Generate a plan and mark sessions as completed to see your progress here.</p>
        </div>
      )}
    </div>
  )
}