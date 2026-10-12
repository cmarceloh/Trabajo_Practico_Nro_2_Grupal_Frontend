// Servicio para consumir la API de Open-Meteo (Sede Central en CABA)
// Coordenadas: Latitud -34.6037, Longitud -58.3816 (Obelisco / Centro CABA)

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-34.6037&longitude=-58.3816&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America%2FArgentina%2FBuenos_Aires'

// Diccionario de interpretación de códigos WMO meteorológicos a descripciones e íconos en español
export const WMO_WEATHER_MAP = {
  0: { descripcion: 'Cielo completamente despejado', icono: '☀️' },
  1: { descripcion: 'Principalmente despejado', icono: '🌤️' },
  2: { descripcion: 'Parcialmente nublado', icono: '⛅' },
  3: { descripcion: 'Nublado o cubierto', icono: '☁️' },
  45: { descripcion: 'Niebla en la zona', icono: '🌫️' },
  48: { descripcion: 'Niebla con escarcha', icono: '🌫️' },
  51: { descripcion: 'Llovizna ligera', icono: '🌦️' },
  53: { descripcion: 'Llovizna moderada', icono: '🌧️' },
  55: { descripcion: 'Llovizna intensa', icono: '🌧️' },
  61: { descripcion: 'Lluvia leve', icono: '🌦️' },
  63: { descripcion: 'Lluvia moderada', icono: '🌧️' },
  65: { descripcion: 'Lluvia torrencial o fuerte', icono: '⛈️' },
  71: { descripcion: 'Nevada ligera', icono: '🌨️' },
  73: { descripcion: 'Nevada moderada', icono: '🌨️' },
  75: { descripcion: 'Nevada intensa', icono: '❄️' },
  80: { descripcion: 'Chubascos de lluvia leves', icono: '🌦️' },
  81: { descripcion: 'Chubascos de lluvia moderados', icono: '🌧️' },
  82: { descripcion: 'Chubascos violentos', icono: '⛈️' },
  95: { descripcion: 'Tormenta eléctrica', icono: '⚡' },
  96: { descripcion: 'Tormenta con granizo leve', icono: '⛈️' },
  99: { descripcion: 'Tormenta severa con granizo pesado', icono: '⛈️' },
}

export async function fetchClimaSedeCentral() {
  const response = await fetch(WEATHER_URL)

  if (!response.ok) {
    throw new Error(
      `Error al consultar el servicio meteorológico (${response.status}: ${response.statusText})`
    )
  }

  const data = await response.json()

  if (!data || !data.current) {
    throw new Error('La respuesta de la API no contiene datos actuales válidos.')
  }

  const current = data.current
  const weatherInfo = WMO_WEATHER_MAP[current.weather_code] || {
    descripcion: `Código meteorológico ${current.weather_code}`,
    icono: '🌡️',
  }

  return {
    temperatura: current.temperature_2m,
    sensacionTermica: current.apparent_temperature,
    humedad: current.relative_humidity_2m,
    velocidadViento: current.wind_speed_10m,
    esDeDia: current.is_day === 1,
    codigoClima: current.weather_code,
    descripcionClima: weatherInfo.descripcion,
    iconoClima: current.is_day === 0 && current.weather_code === 0 ? '🌙' : weatherInfo.icono,
    fechaHora: current.time,
    zonaHoraria: data.timezone,
    latitud: data.latitude,
    longitud: data.longitude,
    elevacion: data.elevation,
  }
}
