const form = document.getElementById("weather-form");
const codePostalInput = document.getElementById("cp");
const communeSelect = document.getElementById("commune");
const searchCommuneButton = document.getElementById("btn-search-cp");
const submitButton = document.getElementById("btn-submit");
const daysSlider = document.getElementById("days-slider");
const daysValue = document.getElementById("days-value");

if (daysSlider && daysValue) {
  daysSlider.value = 1;
  daysValue.textContent = "1";

  daysSlider.addEventListener("input", () => {
    daysValue.textContent = daysSlider.value;
  });
}

async function fetchCommunesByCodePostal(codePostal) {
  try {
    const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API communes :", error);
    throw error;
  }
}

function displayCommunes(data) {
  communeSelect.innerHTML = "";

  if (Array.isArray(data) && data.length) {
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Sélectionnez une commune";
    communeSelect.appendChild(placeholderOption);

    data.forEach((commune) => {
      const option = document.createElement("option");
      option.value = commune.code;
      option.textContent = commune.nom;
      communeSelect.appendChild(option);
    });

    communeSelect.disabled = false;
    submitButton.disabled = false;
    return;
  }

  communeSelect.innerHTML = "<option value=''>Aucune commune trouvée</option>";
  communeSelect.disabled = true;
  submitButton.disabled = true;
  alert("Aucune commune trouvée pour ce code postal.");
}

async function fetchMeteoByCommune(selectedCommune) {
  try {
    const url = `https://api.meteo-concept.com/api/forecast/daily?token=3c0ab2700bc954b08a86164da919e704558e1e9a5b36c3864c46d9aaef378018&insee=${selectedCommune}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur API météo :", error);
    return null;
  }
}

searchCommuneButton.addEventListener("click", async () => {
  const codePostal = codePostalInput.value.trim();

  communeSelect.disabled = true;
  submitButton.disabled = true;

  if (codePostal.length !== 5) {
    alert("Saisissez un code postal à 5 chiffres, par ex. 35000.");
    return;
  }

  const data = await fetchCommunesByCodePostal(codePostal);
  displayCommunes(data);
});

communeSelect.addEventListener("change", () => {
  submitButton.disabled = !communeSelect.value;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selectedCommune = communeSelect.value;
  const nomCommune = communeSelect.options[communeSelect.selectedIndex].text;

  if (!selectedCommune) return;

  // Curseur récup
  const selectedDays = parseInt(document.getElementById('days-slider').value, 10);

  const optionsMeteo = {
    lat: document.getElementById("chk-lat").checked,
    lon: document.getElementById("chk-lon").checked,
    rain: document.getElementById("chk-rain").checked,
    wind: document.getElementById("chk-wind").checked,
    windDir: document.getElementById("chk-wind-dir").checked,
    days: selectedDays // On peut l'ajouter ici pour l'utiliser plus tard
  };

  try {
    const data = await fetchMeteoByCommune(selectedCommune);
    if (data) createCard(data, nomCommune, optionsMeteo);
  } catch (error) {
    console.error("Erreur lors de la récupération météo :", error);
    alert("Impossible de récupérer la météo pour l'instant.");
  }
});