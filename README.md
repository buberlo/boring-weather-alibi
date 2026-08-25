# Boring Weather Alibi

> Turn your city's weather into a legally plausible excuse for missing work.

Users paste their location and meeting type, and the app invents a calm, credible weather-based excuse with a confidence score. It keeps a local alibi ledger so repeated weather excuses don't sound lazy.

## Features
- GeoJSON weather lookup with plain-language excuse templates
- Alibi confidence meter that penalizes overuse
- Copy-to-calendar one-click output
- Private local ledger of past excuses

## Stack
- Next.js
- OpenWeather API
- SQLite

## Getting started
```
Run npm install, add OPENWEATHER_API_KEY to .env.local, then run npm run dev and open http://localhost:3000.
```

---
*Farmed 🚜 by [Appshaker](https://github.com/buberlo) — shaken into existence.*
