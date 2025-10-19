
const API_KEY = "2ea55487497a8ec065c7217fc0d9467b";

export async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}
