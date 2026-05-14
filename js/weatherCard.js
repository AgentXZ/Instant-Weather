class WeatherCard {
  constructor(forecastData, cityData, communeName, dayIndex, options) {
    this.f = forecastData;
    this.city = cityData;
    this.communeName = communeName;
    this.dayIndex = dayIndex;
    this.options = options;
    this.weatherInfo = this.getWeatherInfo(this.f.weather);
  }

  getWeatherInfo(weatherCode) {
    let icon = "cloudy.svg";
    let bgGradient = "var(--glass-bg)";
    let conditionText = "Inconnu";
    let textColor = "#ffffff";
    let effect = null;

    if (weatherCode === 0) {
      icon = "day.svg";
      bgGradient = "linear-gradient(135deg, rgba(79, 172, 254, 0.3) 0%, rgba(0, 242, 254, 0.3) 100%)";
      conditionText = "Ensoleillé";
    } else if (weatherCode >= 1 && weatherCode <= 2) {
      icon = "cloudy-day-1.svg";
      bgGradient = "linear-gradient(135deg, rgba(137, 247, 254, 0.3) 0%, rgba(102, 166, 255, 0.3) 100%)";
      conditionText = "Peu nuageux";
    } else if (weatherCode >= 3 && weatherCode <= 5) {
      icon = "cloudy.svg";
      bgGradient = "linear-gradient(135deg, rgba(189, 195, 199, 0.4) 0%, rgba(44, 62, 80, 0.4) 100%)";
      conditionText = "Nuageux";
    } else if (weatherCode >= 6 && weatherCode <= 7) {
      icon = "cloudy.svg";
      bgGradient = "linear-gradient(135deg, rgba(207, 217, 223, 0.5) 0%, rgba(226, 235, 240, 0.5) 100%)";
      conditionText = "Brouillard";
      textColor = "#1e3c72";
    } else if ((weatherCode >= 10 && weatherCode <= 16) || (weatherCode >= 40 && weatherCode <= 48)) {
      icon = "rainy-1.svg";
      bgGradient = "linear-gradient(135deg, rgba(75, 108, 183, 0.5) 0%, rgba(24, 40, 72, 0.5) 100%)";
      conditionText = "Pluvieux";
      effect = "rain";
    } else if ((weatherCode >= 20 && weatherCode <= 22) || (weatherCode >= 60 && weatherCode <= 68)) {
      icon = "snowy-1.svg";
      bgGradient = "linear-gradient(135deg, rgba(224, 234, 252, 0.5) 0%, rgba(207, 222, 243, 0.5) 100%)";
      conditionText = "Neige";
      textColor = "#1e3c72";
      effect = "snow";
    } else if (weatherCode >= 100 && weatherCode <= 142) {
      icon = "thunder.svg";
      bgGradient = "linear-gradient(135deg, rgba(20, 30, 48, 0.6) 0%, rgba(36, 59, 85, 0.6) 100%)";
      conditionText = "Orage";
      effect = "rain";
    }

    return {
      iconUrl: `https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${icon}`,
      bgGradient: bgGradient,
      conditionText: conditionText,
      textColor: textColor,
      effect: effect
    };
  }

  displayHours(sunHours) {
    if (sunHours == null) return "--";
    return sunHours + (sunHours > 1 ? " heures" : " heure");
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("weather-card");

    card.style.width = "100%";
    card.style.maxWidth = "350px";
    card.style.padding = "2.5rem";
    card.style.fontSize = "1.1rem";

    card.style.background = this.weatherInfo.bgGradient;
    card.style.color = this.weatherInfo.textColor;

    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("card-content");
    contentWrapper.style.position = "relative";
    contentWrapper.style.zIndex = "1";

    const title = document.createElement("h2");

    let dateStr = `Jour ${this.dayIndex + 1}`;
    if (this.f.datetime) {
      const dateObj = new Date(this.f.datetime);
      dateStr = dateObj.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long' });
      dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }

    title.textContent = `${this.communeName} - ${dateStr}`;
    title.style.fontSize = "1.5rem";
    title.style.marginBottom = "1.5rem";
    title.style.textAlign = "center";
    contentWrapper.appendChild(title);

    const iconContainer = document.createElement("div");
    iconContainer.style.display = "flex";
    iconContainer.style.flexDirection = "column";
    iconContainer.style.alignItems = "center";
    iconContainer.style.marginBottom = "1.5rem";

    const iconImg = document.createElement("img");
    iconImg.src = this.weatherInfo.iconUrl;
    iconImg.alt = this.weatherInfo.conditionText;
    iconImg.style.width = "100px";
    iconImg.style.height = "100px";

    const conditionLabel = document.createElement("span");
    conditionLabel.textContent = this.weatherInfo.conditionText;
    conditionLabel.style.fontWeight = "bold";
    conditionLabel.style.fontSize = "1.2rem";
    conditionLabel.style.marginTop = "0.5rem";

    iconContainer.appendChild(iconImg);
    iconContainer.appendChild(conditionLabel);
    contentWrapper.appendChild(iconContainer);

    let contenuHTML = `
      <p style="margin: 12px 0;"><strong>Temp. minimale :</strong> ${this.f.tmin ?? "--"}°C</p>
      <p style="margin: 12px 0;"><strong>Temp. maximale :</strong> ${this.f.tmax ?? "--"}°C</p>
      <p style="margin: 12px 0;"><strong>Risque de pluie :</strong> ${this.f.probarain ?? "--"}%</p>
      <p style="margin: 12px 0;"><strong>Ensoleillement :</strong> ${this.displayHours(this.f.sun_hours)}</p>
    `;

    if (this.options.lat) {
      contenuHTML += `<p style="margin: 12px 0;"><strong>Latitude :</strong> ${this.city.latitude ?? "--"}</p>`;
    }
    if (this.options.lon) {
      contenuHTML += `<p style="margin: 12px 0;"><strong>Longitude :</strong> ${this.city.longitude ?? "--"}</p>`;
    }
    if (this.options.rain) {
      contenuHTML += `<p style="margin: 12px 0;"><strong>Cumul de pluie :</strong> ${this.f.rr10 ?? "--"} mm</p>`;
    }
    if (this.options.wind) {
      contenuHTML += `<p style="margin: 12px 0;"><strong>Vent moyen :</strong> ${this.f.wind10m ?? "--"} km/h</p>`;
    }
    if (this.options.windDir) {
      contenuHTML += `<p style="margin: 12px 0;"><strong>Direction du vent :</strong> ${this.f.dirwind10m ?? "--"}°</p>`;
    }

    contentWrapper.innerHTML += contenuHTML;

    // Effet pluie/neige
    if (this.weatherInfo.effect) {
      const effectContainer = document.createElement("div");
      effectContainer.classList.add("effect-container");

      const numParticles = 30; // nbr de gouttes/flocons
      for (let j = 0; j < numParticles; j++) {
        const particle = document.createElement("div");
        particle.classList.add(this.weatherInfo.effect === "rain" ? "rain-drop" : "snow-flake");

        // position de l'animation
        particle.style.left = `${Math.random() * 100}%`;

        if (this.weatherInfo.effect === "rain") {
          particle.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
          particle.style.animationDelay = `${Math.random() * 2}s`;
        } else {
          particle.style.animationDuration = `${Math.random() * 2 + 2}s`;
          particle.style.animationDelay = `${Math.random() * 3}s`;
        }

        effectContainer.appendChild(particle);
      }
      card.appendChild(effectContainer);
    }

    card.appendChild(contentWrapper);
    return card;
  }
}

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

    const weatherCard = new WeatherCard(f, city, communeName, i, options);
    const cardElement = weatherCard.render();

    cardsContainer.appendChild(cardElement);
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