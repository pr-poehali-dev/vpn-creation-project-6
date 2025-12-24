export interface ServerLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  load: number;
  ping: number;
  coordinates: [number, number];
}

export const serverLocations: ServerLocation[] = [
  { id: '1', name: 'RU-Moscow-01', country: 'Россия', city: 'Москва', flag: '🇷🇺', load: 45, ping: 12, coordinates: [37.6173, 55.7558] },
  { id: '2', name: 'RU-SPB-01', country: 'Россия', city: 'Санкт-Петербург', flag: '🇷🇺', load: 38, ping: 15, coordinates: [30.3351, 59.9343] },
  { id: '3', name: 'US-NY-01', country: 'США', city: 'Нью-Йорк', flag: '🇺🇸', load: 62, ping: 145, coordinates: [-74.006, 40.7128] },
  { id: '4', name: 'US-LA-01', country: 'США', city: 'Лос-Анджелес', flag: '🇺🇸', load: 55, ping: 178, coordinates: [-118.2437, 34.0522] },
  { id: '5', name: 'DE-BER-01', country: 'Германия', city: 'Берлин', flag: '🇩🇪', load: 41, ping: 45, coordinates: [13.405, 52.52] },
  { id: '6', name: 'UK-LON-01', country: 'Великобритания', city: 'Лондон', flag: '🇬🇧', load: 58, ping: 52, coordinates: [-0.1276, 51.5074] },
  { id: '7', name: 'JP-TOK-01', country: 'Япония', city: 'Токио', flag: '🇯🇵', load: 33, ping: 198, coordinates: [139.6917, 35.6762] },
  { id: '8', name: 'SG-SIN-01', country: 'Сингапур', city: 'Сингапур', flag: '🇸🇬', load: 47, ping: 215, coordinates: [103.8198, 1.3521] },
  { id: '9', name: 'FR-PAR-01', country: 'Франция', city: 'Париж', flag: '🇫🇷', load: 52, ping: 48, coordinates: [2.3522, 48.8566] },
  { id: '10', name: 'NL-AMS-01', country: 'Нидерланды', city: 'Амстердам', flag: '🇳🇱', load: 44, ping: 42, coordinates: [4.9041, 52.3676] },
  { id: '11', name: 'AU-SYD-01', country: 'Австралия', city: 'Сидней', flag: '🇦🇺', load: 39, ping: 245, coordinates: [151.2093, -33.8688] },
  { id: '12', name: 'CA-TOR-01', country: 'Канада', city: 'Торонто', flag: '🇨🇦', load: 51, ping: 135, coordinates: [-79.3832, 43.6532] },
  { id: '13', name: 'BR-SAO-01', country: 'Бразилия', city: 'Сан-Паулу', flag: '🇧🇷', load: 67, ping: 185, coordinates: [-46.6333, -23.5505] },
  { id: '14', name: 'IN-MUM-01', country: 'Индия', city: 'Мумбаи', flag: '🇮🇳', load: 72, ping: 165, coordinates: [72.8777, 19.076] },
  { id: '15', name: 'ZA-JNB-01', country: 'ЮАР', city: 'Йоханнесбург', flag: '🇿🇦', load: 48, ping: 225, coordinates: [28.0473, -26.2041] },
];
