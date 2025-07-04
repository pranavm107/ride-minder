import { Location } from '@/types/locations';

export const PICKUP_LOCATIONS: Location[] = [
  {
    id: 'gandhipuram',
    areaName: 'Gandhipuram',
    type: 'pickup',
    lat: 11.0176,
    lng: 76.9558,
    distanceFromCollege: 12,
    estimatedTime: 25
  },
  {
    id: 'ukkadam',
    areaName: 'Ukkadam',
    type: 'pickup',
    lat: 10.9983,
    lng: 76.9674,
    distanceFromCollege: 8,
    estimatedTime: 18
  },
  {
    id: 'townhall',
    areaName: 'Town Hall',
    type: 'pickup',
    lat: 10.9976,
    lng: 76.9629,
    distanceFromCollege: 9,
    estimatedTime: 20
  },
  {
    id: 'singanallur',
    areaName: 'Singanallur',
    type: 'pickup',
    lat: 11.0023,
    lng: 77.0277,
    distanceFromCollege: 15,
    estimatedTime: 30
  },
  {
    id: 'saibaba-colony',
    areaName: 'Saibaba Colony',
    type: 'pickup',
    lat: 11.0168,
    lng: 76.9558,
    distanceFromCollege: 10,
    estimatedTime: 22
  },
  {
    id: 'rs-puram',
    areaName: 'R.S. Puram',
    type: 'pickup',
    lat: 11.0059,
    lng: 76.9749,
    distanceFromCollege: 6,
    estimatedTime: 15
  },
  {
    id: 'peelamedu',
    areaName: 'Peelamedu',
    type: 'pickup',
    lat: 11.0301,
    lng: 77.0081,
    distanceFromCollege: 5,
    estimatedTime: 12
  }
];

export const DROP_LOCATIONS: Location[] = [
  {
    id: 'pollachi',
    areaName: 'Pollachi',
    type: 'drop',
    lat: 10.6586,
    lng: 77.0047,
    distanceFromCollege: 45,
    estimatedTime: 90
  },
  {
    id: 'eachanari',
    areaName: 'Eachanari',
    type: 'drop',
    lat: 10.9340,
    lng: 76.9768,
    distanceFromCollege: 18,
    estimatedTime: 35
  },
  {
    id: 'kinathukadavu',
    areaName: 'Kinathukadavu',
    type: 'drop',
    lat: 10.8009,
    lng: 76.9634,
    distanceFromCollege: 25,
    estimatedTime: 50
  },
  {
    id: 'vadavalli',
    areaName: 'Vadavalli',
    type: 'drop',
    lat: 11.0296,
    lng: 76.8998,
    distanceFromCollege: 20,
    estimatedTime: 40
  },
  {
    id: 'kovaipudur',
    areaName: 'Kovaipudur',
    type: 'drop',
    lat: 10.9845,
    lng: 76.7890,
    distanceFromCollege: 28,
    estimatedTime: 55
  },
  {
    id: 'sulur',
    areaName: 'Sulur',
    type: 'drop',
    lat: 11.0252,
    lng: 77.1261,
    distanceFromCollege: 22,
    estimatedTime: 45
  },
  {
    id: 'mettupalayam',
    areaName: 'Mettupalayam',
    type: 'drop',
    lat: 11.2993,
    lng: 76.9434,
    distanceFromCollege: 35,
    estimatedTime: 70
  }
];

export const ALL_LOCATIONS = [...PICKUP_LOCATIONS, ...DROP_LOCATIONS];

// Helper functions
export const getLocationById = (id: string): Location | undefined => {
  return ALL_LOCATIONS.find(location => location.id === id);
};

export const getLocationsByType = (type: 'pickup' | 'drop'): Location[] => {
  return ALL_LOCATIONS.filter(location => location.type === type);
};

export const searchLocations = (query: string, type?: 'pickup' | 'drop'): Location[] => {
  const locations = type ? getLocationsByType(type) : ALL_LOCATIONS;
  return locations.filter(location => 
    location.areaName.toLowerCase().includes(query.toLowerCase())
  );
};