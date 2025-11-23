## Trash Dash


## Tech Stack

### Frontend
- **Framework**: React (18.3.1)
- **Language**: TypeScript
- **Styling**: TailwindCSS

### Backend
- **Framework**: Express.js (Node.js)
- **Language**: TypeScript
- **Database**: MongoDB
- **Docs**: Swagger

## Getting Started

1. Install dependencies
    ```
    cd client & run npm i
    cd server & run npm i
    ```
2. copy or change ```.env.sample``` to ```.env```:
        fill all the needed information

3. Run both in on separate ones consoles with ```npm start```


By default:

Frontend: `http://localhost:3000/`  
Backend: `http://localhost:5000/`



## Project Structure

### Backend Structure

```
server/
├── docs
│   └── openapi.yaml
├── jest.config.ts
├── package-lock.json
├── package.json
├── src
│   ├── __tests__
│   │   └── index.test.ts
│   ├── models
│   │   └── Leaderboard.ts
│   ├── router.ts
│   ├── Server.ts
│   ├── swagger.ts
│   └── types
│       ├── apiTypes.ts
│       └── MessageTypes.ts
└── tsconfig.json
```



### Frontend Structure

```
client/
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── styles.css
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── DropgameEnd.tsx
│   │   ├── Endscreen.tsx
│   │   ├── GameCard.tsx
│   │   ├── guide
│   │   │   ├── SpecificWaste.tsx
│   │   │   └── WasteSearchBar.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── Leaderboards.tsx
│   │   ├── Mistakes.tsx
│   │   ├── MistakesDetail.tsx
│   │   ├── PlayMode.tsx
│   │   ├── PlayModeFinish.tsx
│   │   ├── PlayModeModal.tsx
│   │   ├── recydle
│   │   │   ├── Keypad.tsx
│   │   │   ├── RecydleEnd.tsx
│   │   │   ├── RecydleGame.tsx
│   │   │   ├── RecydleGuide.tsx
│   │   │   └── RecydleRow.tsx
│   │   ├── TrashBinButton.tsx
│   │   └── TrashorsmashMistakes.tsx
│   ├── contexts
│   │   ├── PlayContext.tsx
│   │   ├── PointContext.tsx
│   │   └── UserContext.tsx
│   ├── data
│   │   ├── constants.ts
│   │   └── gameData.ts
│   ├── hooks
│   │   ├── useCurrentGuess.ts
│   │   └── useTrashGame.ts
│   ├── index.css
│   ├── index.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── locales
│   │   ├── en.json
│   │   ├── fi.json
│   │   └── sv.json
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── types
│   │   ├── apiTypes.ts
│   │   ├── MessageTypes.ts
│   │   └── recydleTypes.ts
│   ├── utils
│   │   ├── gameStorage.ts
│   │   ├── getTilesState.ts
│   │   └── i18n.ts
│   └── views
│       ├── Dropgame.tsx
│       ├── Home.tsx
│       ├── Leaderboard.tsx
│       ├── PickTheGame.tsx
│       ├── RecycleGuide.tsx
│       ├── Recydle.tsx
│       └── Trashorsmash.tsx
├── tailwind.config.js
└── tsconfig.json
```

