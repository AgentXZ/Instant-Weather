# 🌤️ Instant Weather

**Instant Weather** est une application web élégante et intuitive qui permet de consulter les prévisions météorologiques de n'importe quelle commune française. Grâce à une interface moderne basée sur le "Glassmorphism" et des animations dynamiques, la consultation de la météo devient une expérience visuellement agréable.

## 🚀 Fonctionnalités

* **Recherche de localité simplifiée :** Saisissez un code postal à 5 chiffres pour obtenir instantanément la liste des communes correspondantes.
* **Prévisions sur mesure :** Un curseur interactif permet de choisir d'afficher la météo de **1 à 7 jours**.
* **Options avancées (V2) :** Possibilité d'enrichir les cartes météo avec des données spécifiques :
    * Latitude et Longitude
    * Cumul de pluie (en mm)
    * Vitesse moyenne du vent (en km/h)
    * Direction du vent (en degrés)
* **Interface dynamique :** * Fond d'écran avec un dégradé animé.
    * Cartes météorologiques avec effet de transparence (Glassmorphism).
    * Icônes animées selon les conditions (soleil, nuages, orage...).
    * **Effets visuels immersifs :** Chute de pluie ou de neige animée en CSS directement sur les cartes lorsque la météo le nécessite.

## 🛠️ Technologies utilisées

* **HTML5 :** Structure sémantique de l'application.
* **CSS3 :** Mise en page (Flexbox/Grid), variables CSS, animations clés (`@keyframes`), effets de flou (`backdrop-filter`) pour le style "Glassmorphism".
* **JavaScript (ES6+) :** * Manipulation du DOM.
    * Appels asynchrones (`async/await`, `fetch`) vers les API.
    * Programmation Orientée Objet (POO) avec l'utilisation de la classe `WeatherCard` pour générer dynamiquement les résultats.

## 📡 API utilisées

L'application repose sur deux API publiques pour récupérer ses données :

1.  **API Géo (Gouvernement Français) :** `https://geo.api.gouv.fr/communes`
    * Utilisée pour convertir le code postal saisi en une liste de communes valides.
2.  **API Météo Concept :** `https://api.meteo-concept.com`
    * Fournit les prévisions météorologiques détaillées via le code INSEE de la commune sélectionnée.

## 📁 Structure du projet

```text
/
├── index.html          # Point d'entrée de l'application
├── css/
│   └── style.css       # Styles, animations et design Glassmorphism
└── js/
    ├── app.js          # Logique principale (gestion du formulaire et requêtes API)
    └── weatherCard.js  # Classe dédiée à la création et au rendu des cartes météo
