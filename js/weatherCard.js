function createCard(data, communeName = "Prévisions Météo", options = {}) {
  const weatherSection = document.getElementById("results");
  weatherSection.innerHTML = ""; 
  
  const numDays = options.days ? parseInt(options.days, 10) : 1;
  const forecasts = data && data.forecast ? data.forecast : [];
  const city = data && data.city ? data.city : {};
  
  const cardsContainer = document.createElement("div");
  cardsContainer.style.display = "flex";
  cardsContainer.style.flexWrap = "wrap";
  cardsContainer.style.gap = "20px";
  cardsContainer.style.justifyContent = "center";
  cardsContainer.style.width = "100%";

  for (let i = 0; i < numDays; i++) {
    const f = forecasts[i] || {};
    
    const card = document.createElement("div");
    card.classList.add("weather-card"); 
    
    card.style.width = "100%";
    card.style.maxWidth = "350px"; 
    card.style.padding = "2.5rem"; 
    card.style.fontSize = "1.1rem"; 
    
    const title = document.createElement("h2");
    
    let dateStr = `Jour ${i + 1}`;
    if (f.datetime) {
      const dateObj = new Date(f.datetime);
      dateStr = dateObj.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long' });
      dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    title.textContent = `${communeName} - ${dateStr}`;
    title.style.fontSize = "1.5rem"; 
    title.style.marginBottom = "1.5rem";
    card.appendChild(title);

    let contenuHTML = `
      <p style="margin: 12px 0;"><strong>Temp. minimale :</strong> ${f.tmin ?? "--"}°C</p>
      <p style="margin: 12px 0;"><strong>Temp. maximale :</strong> ${f.tmax ?? "--"}°C</p>
      <p style="margin: 12px 0;"><strong>Risque de pluie :</strong> ${f.probarain ?? "--"}%</p>
      <p style="margin: 12px 0;"><strong>Ensoleillement :</strong> ${displayHours(f.sun_hours)}</p>
    `;

    if (options.lat) {
      contenuHTML += `<p style="margin: 12px 0; color: #0056b3;"><strong>Latitude :</strong> ${city.latitude ?? "--"}</p>`;
    }
    if (options.lon) {
      contenuHTML += `<p style="margin: 12px 0; color: #0056b3;"><strong>Longitude :</strong> ${city.longitude ?? "--"}</p>`;
    }
    if (options.rain) {
      contenuHTML += `<p style="margin: 12px 0; color: #0056b3;"><strong>Cumul de pluie :</strong> ${f.rr10 ?? "--"} mm</p>`;
    }
    if (options.wind) {
      contenuHTML += `<p style="margin: 12px 0; color: #0056b3;"><strong>Vent moyen :</strong> ${f.wind10m ?? "--"} km/h</p>`;
    }
    if (options.windDir) {
      contenuHTML += `<p style="margin: 12px 0; color: #0056b3;"><strong>Direction du vent :</strong> ${f.dirwind10m ?? "--"}°</p>`;
    }

    card.innerHTML += contenuHTML;
    cardsContainer.appendChild(card);
  }

  weatherSection.appendChild(cardsContainer);

  const btnContainer = document.createElement("div");
  btnContainer.style.marginTop = "2rem";

  const reloadButton = document.createElement("button");
  reloadButton.textContent = "Nouvelle recherche";
  reloadButton.style.padding = "0.8rem 1.5rem"; 
  reloadButton.style.fontSize = "1rem";
  
  reloadButton.addEventListener("click", function () {
    location.reload();
  });

  btnContainer.appendChild(reloadButton);
  weatherSection.appendChild(btnContainer);

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