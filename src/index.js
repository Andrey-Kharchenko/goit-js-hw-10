import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

loader.style.display = "none";
error.style.display = "none";

// Загрузка списка пород
fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.addEventListener("change", handleBreedSelect);
    breedSelect.disabled = false;
  })
  .catch((err) => {
    console.error("Error fetching breeds:", err);
    showError();
  });

// Обработчик выбора породы
function handleBreedSelect() {
  const selectedBreedId = breedSelect.value;
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      displayCatInfo(catData);
      hideLoader();
    })
    .catch((err) => {
      console.error("Error fetching cat by breed:", err);
      showError();
      hideLoader();
    });
}

// Отображение информации о коте
function displayCatInfo(catData) {
  const imageUrl = catData.url;
  const breedName = catData.breeds[0]?.name || "Unknown Breed";
  const description = catData.breeds[0]?.description || "No description available";
  const temperament = catData.breeds[0]?.temperament || "Unknown temperament";

  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  imageElement.alt = "Cat Image";

  const breedNameElement = document.createElement("h3");
  breedNameElement.textContent = breedName;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  const temperamentElement = document.createElement("p");
  temperamentElement.textContent = `Temperament: ${temperament}`;

  catInfo.innerHTML = "";
  catInfo.appendChild(imageElement);
  catInfo.appendChild(breedNameElement);
  catInfo.appendChild(descriptionElement);
  catInfo.appendChild(temperamentElement);
}

// Показать загрузчик
function showLoader() {
  loader.style.display = "block";
}

// Скрыть загрузчик
function hideLoader() {
  loader.style.display = "none";
}

// Показать ошибку
function showError() {
  error.style.display = "block";
}

// Скрыть ошибку
function hideError() {
  error.style.display = "none";
}