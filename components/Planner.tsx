"use client"
import { useState } from "react"
import { Workout } from "@/types"

interface PlannerProps {
  workouts: Workout[]
  setWorkouts: (workouts: Workout[]) => void
}

export default function Planner({ workouts, setWorkouts }: PlannerProps) {
  const [goal, setGoal] = useState("fat_loss")
  const [level, setLevel] = useState("beginner")
  const [days, setDays] = useState(4)
  const [equipment, setEquipment] = useState(["bodyweight", "dumbbells"])

  const generateWorkout = (dayIndex: number): Workout => {
    const goals = {
      fat_loss: [
        { name: "Goblet Squat", sets: 3, reps: "10-12", rpe: 8, rir: 2 },
        { name: "Reverse Lunge", sets: 3, reps: "12/leg", rpe: 7, rir: 3 },
        { name: "Glute Bridge", sets: 3, reps: "15", rpe: 8, rir: 2 },
        { name: "Incline Walk", sets: 1, reps: "15min", rpe: 6, rir: 4 }
      ],
      muscle: [
        { name: "Bench Press", sets: 4, reps: "6-8", rpe: 9, rir: 1 },
        { name: "Dumbbell Row", sets: 4, reps: "8-10", rpe: 8, rir: 2 },
        { name: "Overhead Press", sets: 3, reps: "10-12", rpe: 8, rir: 2 }
      ],
      hybrid: [
        { name: "Deadlift", sets: 4, reps: "6-8", rpe: 8, rir: 2 },
        { name: "Pull-ups", sets: 3, reps: "AMRAP", rpe: 9, rir: 1 },
        { name: "Farmer Carry", sets: 3, reps: "40m", rpe: 8, rir: 2 },
        { name: "5km Run", sets: 1, reps: "5km", rpe: 7, rir: 3 }
      ]
    }

    const workoutExercises = goals[goal as keyof typeof goals][dayIndex % goals[goal as keyof typeof goals].length]

    return {
      id: `workout-${Date.now()}-${dayIndex}`,
      day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][dayIndex],
      title: `${goal} Day ${dayIndex + 1}`,
      exercises: [workoutExercises],
      duration: 45,
      completed: false
    }
  }

  const generatePlan = () => {
    const newWorkouts = Array.from({length: days}, (_, i) => generateWorkout(i))
    setWorkouts([...workouts, ...newWorkouts])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-4">Build your plan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="p-3 border border-slate-200 rounded-xl">
              <option value="fat_loss">Fat Loss</option>
              <option value="muscle">Muscle Gain</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="p-3 border border-slate-200 rounded-xl">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="p-3 border border-slate-200 rounded-xl">
              <option value={3}>3 days</option>
              <option value={4}>4 days</option>
              <option value={5}>5 days</option>
              <option value={6}>6 days</option>
            </select>
          </div>
          <button onClick={generatePlan} className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
            Generate {days}-Day Plan
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {equipment.map(eq => (
            <button 
              key={eq}
              onClick={() => setEquipment(prev => prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq])}
              className={`p-3 rounded-xl font-semibold border-2 ${equipment.includes(eq) ? 'bg-blue-100 border-blue-400 text-blue-800' : 'border-slate-200 hover:border-slate-300'}`}
            >
              {eq.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Your generated workouts</h2>
        <div className="space-y-4">
          {workouts.slice(-days).map((workout) => (
            <div key={workout.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{workout.title}</h3>
                  <p className="text-slate-500">{workout.day} • {workout.duration}min</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${workout.completed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {workout.completed ? 'Completed' : 'Planned'}
                </span>
              </div>

              <div className="space-y-3">
                {workout.exercises.map((exercise, idx) => (
                  <div key={idx} className="flex gap-4 items-center p-3 bg-slate-50 rounded-xl">
                    <div className="flex-1">
                      <div className="font-semibold">{exercise.name}</div>
                      <div className="text-sm text-slate-500">
                        {exercise.sets} sets • {exercise.reps} • RPE {exercise.rpe} • RIR {exercise.rir}
                      </div>
                      {exercise.notes && <div className="text-xs text-slate-400 mt-1">{exercise.notes}</div>}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono bg-white px-2 py-1 rounded">{exercise.reps}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}