import React, { useState, useRef, createRef } from 'react';
import TinderCard from 'react-tinder-card';

const Trashorsmash = () => {
  const [cards, setCards] = useState([
    { id: '1', name: 'Plastic Bottle', image: '/assets/coca-cola.jpg' },
    { id: '2', name: 'Plastic bag', image: '/assets/plastic-bag.png' },
    { id: '3', name: 'Banana', image: '/assets/banana.png' },
  ]);

  const [username] = useState('Matti Meikäläinen');
  const [score] = useState(0);

  const childRefs = useRef<Array<React.RefObject<any>>>(
    Array(cards.length)
      .fill(0)
      .map(() => createRef())
  );

  const onSwipe = (direction: string, name: string) => {
    console.log(`Swiped ${direction} on ${name}`);
  };

  const onCardLeftScreen = (name: string) => {
    console.log(`${name} left the screen`);
    setCards((prevCards) => prevCards.filter((card) => card.name !== name));
  };

  const swipe = (dir: 'left' | 'right') => {
    const cardsLeft = cards.length;
    if (cardsLeft) {
      const index = cardsLeft - 1;
      childRefs.current[index].current?.swipe(dir);
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="./" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/assets/hsy-logo_600px.png" className="h-8" alt="HSY Logo" />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-sans font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="https://www.hsy.fi/jatteet-ja-kierratys/sortti-asemat-ja-muut-kierratyspalvelut/"
                  className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0"
                >
                  Sortti-asemat
                </a>
              </li>
              <li>
                <a
                  href="https://www.hsy.fi/jatteet-ja-kierratys/jateopas-ja-lajitteluohjeet/"
                  className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0"
                >
                  Jäteopas
                </a>
              </li>
              <li>
                <a
                  href="https://www.hsy.fi/hsy/asiakaspalvelu/"
                  className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0"
                >
                  Asiakaspalvelu
                </a>
              </li>
              <li>
                <a
                  href="https://www.hsy.fi/hsy/omahsy-asiointipalvelu/"
                  className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0"
                >
                  OmaHSY
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="bg-primary flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-3xl bg-gray-800/60 rounded-2xl shadow-2xl shadow-indigo-500/10 border border-gray-700 flex flex-col items-center justify-center text-center p-8 transition-all duration-300 hover:shadow-indigo-500/20 hover:border-gray-600 relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2">
            Trash or Smash?
          </h1>

          <p className="text-white font-medium mb-4 text-lg">Which bin does it go in?</p>

          <div className="relative w-full h-64 sm:h-72 md:h-80 mb-4 flex items-center justify-center">
            <div className="absolute inset-y-0 left-0 flex flex-col items-center justify-center px-4">
              <button
                onClick={() => swipe('left')}
                className="bg-red-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center hover:bg-red-600 overflow-hidden shadow-lg transform transition hover:scale-105"
              >
                <img
                  src="/assets/food-waste-bin.png"
                  alt="Biowaste Bin"
                  className="w-12 h-12 object-contain"
                />
              </button>
              <p className="text-white font-medium mt-2 text-lg">Biowaste</p>
            </div>

            <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center px-4">
              <button
                onClick={() => swipe('right')}
                className="bg-green-500 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center hover:bg-green-600 overflow-hidden shadow-lg transform transition hover:scale-105"
              >
                <img
                  src="/assets/recycle-trash-bin-plastic-icon.jpg"
                  alt="Plastic Bin"
                  className="w-12 h-12 object-contain"
                />
              </button>
              <p className="text-white font-medium mt-2 text-lg">Plastic</p>
            </div>

            {cards.map((card, index) => (
              <TinderCard
                ref={childRefs.current[index]}
                key={card.id}
                onSwipe={(dir) => onSwipe(dir, card.name)}
                onCardLeftScreen={() => onCardLeftScreen(card.name)}
                preventSwipe={['up', 'down']}
                className="absolute"
                {...({} as any)}
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 sm:w-32 md:w-36 h-24 sm:h-32 md:h-36 rounded-2xl overflow-hidden bg-secondary shadow-lg border-4 border-black/20">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </TinderCard>
            ))}
          </div>

          <div className="w-full flex justify-between items-center text-white">
            <div className="font-bold text-lg">
              <span className="font-normal text-gray-300">{username}</span>
            </div>
            <div className="font-bold text-lg">
              Score: <span className="font-normal text-gray-300">{score}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-footer text-gray-400 text-sm p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-xl mx-auto text-center">
          &copy; 2025 HSY. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Trashorsmash;
