export interface Location {
  id: string;
  areaName: string;
  type: 'pickup' | 'drop';
  lat: number;
  lng: number;
  distanceFromCollege?: number; // in km
  estimatedTime?: number; // in minutes
}

export interface LocationAssignment {
  studentId: string;
  pickup: Location;
  drop: Location;
  cabId?: string;
  isTemporary?: boolean;
  temporaryDate?: string;
}

export interface RouteStop {
  location: Location;
  studentsCount: number;
  estimatedArrival: string;
  isCompleted: boolean;
}