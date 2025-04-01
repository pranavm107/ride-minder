
import * as React from "react"

export interface Student {
  id: number
  name: string
  stop: string
  status: 'boarded' | 'waiting' | 'canceled' | 'skipped'
  imageUrl: string
}

export interface Stop {
  id: number
  name: string
  time: string
  status: 'completed' | 'current' | 'upcoming'
  studentsCount: number
  students: Student[]
}

export function useRouteStops() {
  const [stops, setStops] = React.useState<Stop[]>([
    { 
      id: 1, 
      name: 'Student Center', 
      time: '8:30 AM', 
      status: 'completed', 
      studentsCount: 5,
      students: [
        { id: 1, name: 'Emma Wilson', stop: 'Student Center', status: 'boarded', imageUrl: '' },
        { id: 6, name: 'Jake Miller', stop: 'Student Center', status: 'boarded', imageUrl: '' }
      ]
    },
    { 
      id: 2, 
      name: 'Library', 
      time: '8:45 AM', 
      status: 'current', 
      studentsCount: 3,
      students: [
        { id: 2, name: 'Michael Chen', stop: 'Library', status: 'waiting', imageUrl: '' },
        { id: 7, name: 'Lisa Wang', stop: 'Library', status: 'waiting', imageUrl: '' },
        { id: 10, name: 'Omar Khan', stop: 'Library', status: 'skipped', imageUrl: '' }
      ]
    },
    { 
      id: 3, 
      name: 'Engineering Building', 
      time: '9:00 AM', 
      status: 'upcoming', 
      studentsCount: 8,
      students: [
        { id: 3, name: 'Sarah Johnson', stop: 'Engineering Building', status: 'waiting', imageUrl: '' },
        { id: 8, name: 'David Park', stop: 'Engineering Building', status: 'waiting', imageUrl: '' }
      ]
    },
    { 
      id: 4, 
      name: 'Gym', 
      time: '9:10 AM', 
      status: 'upcoming', 
      studentsCount: 2,
      students: [
        { id: 4, name: 'Diego Rodriguez', stop: 'Gym', status: 'canceled', imageUrl: '' },
        { id: 9, name: 'Zoe Adams', stop: 'Gym', status: 'waiting', imageUrl: '' }
      ]
    },
    { 
      id: 5, 
      name: 'Science Center', 
      time: '9:25 AM', 
      status: 'upcoming', 
      studentsCount: 6,
      students: [
        { id: 5, name: 'Aisha Patel', stop: 'Science Center', status: 'waiting', imageUrl: '' }
      ]
    },
  ])

  const updateStudentStatus = (stopId: number, studentId: number, status: Student['status']) => {
    setStops(currentStops => 
      currentStops.map(stop => {
        if (stop.id === stopId) {
          const updatedStudents = stop.students.map(student => 
            student.id === studentId ? { ...student, status } : student
          )
          return { 
            ...stop, 
            students: updatedStudents,
            studentsCount: updatedStudents.filter(s => s.status === 'waiting' || s.status === 'boarded').length
          }
        }
        return stop
      })
    )
  }

  const updateStopStatus = (stopId: number, status: Stop['status']) => {
    setStops(currentStops => 
      currentStops.map(stop => 
        stop.id === stopId ? { ...stop, status } : stop
      )
    )
  }

  const markStopAsCompleted = (stopId: number) => {
    setStops(currentStops => {
      const updatedStops = currentStops.map(stop => {
        if (stop.id === stopId) {
          // Mark current stop as completed
          return { 
            ...stop, 
            status: 'completed' as const,
            students: stop.students.map(student => 
              student.status === 'waiting' ? { ...student, status: 'boarded' as const } : student
            )
          }
        } else if (stop.status === 'upcoming' && currentStops.some(s => s.id === stopId && s.status === 'current')) {
          // Find the next upcoming stop and mark it as current
          const currentStopIndex = currentStops.findIndex(s => s.id === stopId)
          const nextStopIndex = currentStops.findIndex(s => s.status === 'upcoming')
          
          if (nextStopIndex > -1 && nextStopIndex === currentStopIndex + 1) {
            return { ...stop, status: 'current' as const }
          }
        }
        return stop
      })
      
      return updatedStops
    })
  }

  return {
    stops,
    updateStudentStatus,
    updateStopStatus,
    markStopAsCompleted,
    currentStop: stops.find(stop => stop.status === 'current'),
    nextStop: stops.find((stop, index, arr) => {
      const currentIndex = arr.findIndex(s => s.status === 'current')
      return currentIndex > -1 && index === currentIndex + 1
    }),
    remainingStops: stops.filter(stop => stop.status !== 'completed')
  }
}
