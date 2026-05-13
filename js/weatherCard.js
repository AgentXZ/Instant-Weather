function createCard(data) {
  const weatherTmin = document.createElement("div");
  const weatherTmax = document.createElement("div");
  const weatherPrain = document.createElement("div");
  const weatherSunHours = document.createElement("div");

  const f = data && data.forecast ? data.forecast : {};
  weatherTmin.textContent = `température minimale : ${f.tmin ?? "--"}°C`;
  weatherTmax.textContent = `température maximale : ${f.tmax ?? "--"}°C`;
  weatherPrain.textContent = `Probabilité de pluie : ${f.probarain ?? "--"}%`;
  weatherSunHours.textContent = `Ensoleillement journalier : ${displayHours(f.sun_hours)}`;

  const weatherSection = document.getElementById("results");
  const requestSection = document.getElementById("weather-form");
  weatherSection.appendChild(weatherTmin);
  weatherSection.appendChild(weatherTmax);
  weatherSection.appendChild(weatherPrain);
  weatherSection.appendChild(weatherSunHours);

  const reloadButton = document.createElement("button");
  reloadButton.textContent = "Nouvelle recherche";
  reloadButton.classList.add("reloadButton");
  weatherSection.appendChild(reloadButton);
  reloadButton.addEventListener("click", function () {
    location.reload();
  });

  if (requestSection) requestSection.style.display = "none";
  weatherSection.style.display = "flex";
}

function displayHours(sunHours) {
  if (sunHours == null) return "--";
  return sunHours + (sunHours > 1 ? " heures" : " heure");
}