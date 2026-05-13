function createCard(data, communeName = "Prévisions Météo", options = {}) {
  const weatherSection = document.getElementById("results");
  weatherSection.innerHTML = ""; 
  
  const f = data && data.forecast ? data.forecast : {};
  const city = data && data.city ? data.city : {};

  const card = document.createElement("div");
  card.classList.add("weather-card"); 
  
  card.style.width = "100%";
  card.style.maxWidth = "450px"; 
  card.style.padding = "2.5rem"; 
  card.style.fontSize = "1.1rem"; 

  const title = document.createElement("h2");
  title.textContent = communeName;
  title.style.fontSize = "1.8rem"; 
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
  weatherSection.appendChild(card);

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