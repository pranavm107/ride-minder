export const TAMIL_NADU_LOCATIONS = [
  // Coimbatore District
  { value: 'coimbatore', label: 'Coimbatore', district: 'Coimbatore' },
  { value: 'pollachi', label: 'Pollachi', district: 'Coimbatore' },
  { value: 'tirupur', label: 'Tirupur', district: 'Tirupur' },
  { value: 'erode', label: 'Erode', district: 'Erode' },
  { value: 'salem', label: 'Salem', district: 'Salem' },
  { value: 'namakkal', label: 'Namakkal', district: 'Namakkal' },
  { value: 'karur', label: 'Karur', district: 'Karur' },
  { value: 'dindigul', label: 'Dindigul', district: 'Dindigul' },
  
  // Coimbatore City Areas
  { value: 'gandhipuram', label: 'Gandhipuram', district: 'Coimbatore' },
  { value: 'rs-puram', label: 'R.S. Puram', district: 'Coimbatore' },
  { value: 'peelamedu', label: 'Peelamedu', district: 'Coimbatore' },
  { value: 'saravanampatti', label: 'Saravanampatti', district: 'Coimbatore' },
  { value: 'singanallur', label: 'Singanallur', district: 'Coimbatore' },
  { value: 'ukkadam', label: 'Ukkadam', district: 'Coimbatore' },
  { value: 'town-hall', label: 'Town Hall', district: 'Coimbatore' },
  { value: 'cross-cut-road', label: 'Cross Cut Road', district: 'Coimbatore' },
  { value: 'kovaipudur', label: 'Kovaipudur', district: 'Coimbatore' },
  { value: 'vadavalli', label: 'Vadavalli', district: 'Coimbatore' },
  { value: 'thudiyalur', label: 'Thudiyalur', district: 'Coimbatore' },
  
  // Popular College Areas
  { value: 'avinashi-road', label: 'Avinashi Road', district: 'Coimbatore' },
  { value: 'sitra', label: 'Sitra', district: 'Coimbatore' },
  { value: 'sulur', label: 'Sulur', district: 'Coimbatore' },
  { value: 'pallapalayam', label: 'Pallapalayam', district: 'Namakkal' },
  { value: 'perundurai', label: 'Perundurai', district: 'Erode' },
  { value: 'sankari', label: 'Sankari', district: 'Salem' },
  { value: 'rasipuram', label: 'Rasipuram', district: 'Namakkal' },
  
  // Major Cities
  { value: 'chennai', label: 'Chennai', district: 'Chennai' },
  { value: 'madurai', label: 'Madurai', district: 'Madurai' },
  { value: 'trichy', label: 'Trichy', district: 'Tiruchirappalli' },
  { value: 'vellore', label: 'Vellore', district: 'Vellore' },
  { value: 'thanjavur', label: 'Thanjavur', district: 'Thanjavur' },
  { value: 'kanchipuram', label: 'Kanchipuram', district: 'Kanchipuram' },
  { value: 'cuddalore', label: 'Cuddalore', district: 'Cuddalore' },
  { value: 'villupuram', label: 'Villupuram', district: 'Villupuram' },
  
  // Kongu Region
  { value: 'krishnagiri', label: 'Krishnagiri', district: 'Krishnagiri' },
  { value: 'dharmapuri', label: 'Dharmapuri', district: 'Dharmapuri' },
  { value: 'hosur', label: 'Hosur', district: 'Krishnagiri' },
  { value: 'mettur', label: 'Mettur', district: 'Salem' },
  { value: 'bhavani', label: 'Bhavani', district: 'Erode' },
  { value: 'gobichettipalayam', label: 'Gobichettipalayam', district: 'Erode' },
  { value: 'sathyamangalam', label: 'Sathyamangalam', district: 'Erode' },
  
  // Others
  { value: 'tenkasi', label: 'Tenkasi', district: 'Tenkasi' },
  { value: 'tirunelveli', label: 'Tirunelveli', district: 'Tirunelveli' },
  { value: 'tuticorin', label: 'Tuticorin', district: 'Thoothukudi' },
  { value: 'kanyakumari', label: 'Kanyakumari', district: 'Kanyakumari' },
  { value: 'sivakasi', label: 'Sivakasi', district: 'Virudhunagar' },
  { value: 'ramanathapuram', label: 'Ramanathapuram', district: 'Ramanathapuram' },
];

export const getLocationsByDistrict = (district: string) => {
  return TAMIL_NADU_LOCATIONS.filter(location => location.district === district);
};

export const searchLocations = (query: string) => {
  return TAMIL_NADU_LOCATIONS.filter(location => 
    location.label.toLowerCase().includes(query.toLowerCase()) ||
    location.district.toLowerCase().includes(query.toLowerCase())
  );
};
