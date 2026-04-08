export interface Exercise {
  name: string
  sets: number
  reps: string
  rpe: number
  rir: number
  notes?: string
}

export interface Workout {
  id: string
  day: string
  title: string
  exercises: Exercise[]
  duration: number
  completed: boolean
  notes?: string
}