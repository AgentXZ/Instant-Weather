function createCard(data, communeName, options = {}) {
  const weatherSection = document.getElementById("results");
  weatherSection.innerHTML = ""; 

  const city = data && data.city ? data.city : {};
  const forecastList = data && data.forecast ? data.forecast.slice(0, options.days) : [];

  const cardsContainer = document.createElement("div");
  cardsContainer.style.display = "flex";
  cardsContainer.style.flexWrap = "wrap";
  cardsContainer.style.justifyContent = "center";
  cardsContainer.style.gap = "20px";
  cardsContainer.style.width = "100%";

  forecastList.forEach((f, index) => {
    const card = document.createElement("div");
    card.classList.add("weather-card");
    card.style.flex = "1 1 300px";
    card.style.maxWidth = "350px";
    card.style.padding = "1.5rem";

    const dateTitle = document.createElement("h3");
    dateTitle.textContent = index === 0 ? `Aujourd'hui à ${communeName}` : `Jour ${index + 1}`;
    card.appendChild(dateTitle);

    let contenuHTML = `
      <p><strong>Temp. min :</strong> ${f.tmin ?? "--"}°C</p>
      <p><strong>Temp. max :</strong> ${f.tmax ?? "--"}°C</p>
      <p><strong>Pluie :</strong> ${f.probarain ?? "--"}%</p>
      <p><strong>Soleil :</strong> ${f.sun_hours ?? "--"}h</p>
    `;

    if (options.lat) contenuHTML += `<p><strong>Lat :</strong> ${city.latitude ?? "--"}</p>`;
    if (options.lon) contenuHTML += `<p><strong>Lon :</strong> ${city.longitude ?? "--"}</p>`;
    if (options.rain) contenuHTML += `<p><strong>Cumul pluie :</strong> ${f.rr10 ?? "--"}mm</p>`;
    if (options.wind) contenuHTML += `<p><strong>Vent :</strong> ${f.wind10m ?? "--"}km/h</p>`;
    if (options.windDir) contenuHTML += `<p><strong>Direction :</strong> ${f.dirwind10m ?? "--"}°</p>`;

    card.innerHTML += contenuHTML;
    cardsContainer.appendChild(card);
  });

  weatherSection.appendChild(cardsContainer);

  const reloadButton = document.createElement("button");
  reloadButton.textContent = "Nouvelle recherche";
  reloadButton.style.marginTop = "2rem";
  reloadButton.addEventListener("click", () => location.reload());
  weatherSection.appendChild(reloadButton);

  const formContainer = document.querySelector(".form-container");
  if (formContainer) formContainer.style.display = "none";
  weatherSection.style.display = "flex";
  weatherSection.style.flexDirection = "column";
  weatherSection.style.alignItems = "center";
}

function displayHours(sunHours) {
  if (sunHours == null) return "--";
  return sunHours + (sunHours > 1 ? " heures" : " heure");
}