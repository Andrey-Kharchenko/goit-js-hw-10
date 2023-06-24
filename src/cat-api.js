import axios from "axios";

const apiKey = "live_SEdTERaAoxbzajHN8rQSdb59oUZ1fjCpRFVETB05nIviuT8VqgVwEjvovO3i6WQM";

axios.defaults.headers.common["x-api-key"] = apiKey;

// Запрос списка пород
export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
    return response.data;
  });
}

// Запрос информации о коте по породе
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then((response) => {
    return response.data[0];
  });
}