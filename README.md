# SkyCast Weather Monitor Prototype

A front-end class prototype built with HTML, CSS, and vanilla JavaScript for ISM 3113 Systems Analysis and Design, based on the Assignment 4 requirements interview.

## Features
- Weather overview with temperature, humidity, dew point, pressure, and rainfall
- Searchable sample locations (Tampa, Miami, Orlando, New York)
- Seven-day sample forecast
- Weather alerts and notification preference toggles
- Temperature trend and humidity charts
- Preferences screen with Fahrenheit/Celsius display
- Demonstration-only login/registration modal
- Responsive layout for desktop and mobile

## Important prototype limitations
- Weather data is illustrative sample data, not live weather.
- The browser geolocation button is a demo placeholder.
- Login/registration is a visual flow only. No credentials or profile data are stored or transmitted.
- Alerts are sample interface content; actual thresholds and delivery rules need stakeholder clarification.
- There is no real sensor, third-party weather API, database, or authentication integration.

## Run locally
1. Download or clone this folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension and click **Go Live**.

## Publish with GitHub Pages
1. Create a new repository on GitHub (for example `skycast-weather-prototype`).
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then click **Save**.
6. Wait for deployment and open the Pages URL shown on the settings page.

Keep all three website files together in the same folder/repository root so the CSS and JavaScript load correctly.
