import React, { useState, useRef, createRef } from 'react';
import TinderCard from 'react-tinder-card';

const Trashorsmash = () => {
  const [cards, setCards] = useState([
    { id: '1', name: 'Plastic Bottle', image: '/assets/coca-cola.png' },
    { id: '2', name: 'Soda Can', image: '/assets/box.jpg' },
    { id: '3', name: 'Pizza Box', image: '/assets/waste-paper-reduce.jpg' },
  ]);

  // Create refs for each card
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
                <button type="button" className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0">
                  Sortti-asemat
                </button>
              </li>
              <li>
                <button type="button" className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0">
                  Jäteopas
                </button>
              </li>
              <li>
                <button type="button" className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0">
                  Asiakaspalvelu
                </button>
              </li>
              <li>
                <button type="button" className="font-bold text-primary block py-2 px-3 rounded-sm hover:underline md:p-0">
                  OmaHSY
                </button>
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

          <p className="text-white font-medium mb-4 text-lg">
            Mihin roskikseen tämä menee?
          </p>

          <div className="relative w-full h-48 sm:h-56 md:h-64 mb-4">
            {cards.map((card, index) => (
              // @ts-ignore
              <TinderCard
                ref={childRefs.current[index] as any}
                key={card.id}
                onSwipe={(dir) => onSwipe(dir, card.name)}
                onCardLeftScreen={() => onCardLeftScreen(card.name)}
                preventSwipe={['up', 'down']}
              >
                <div className="absolute w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-600 left-1/2 -translate-x-1/2">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TinderCard>
            ))}
          </div>

          {/* Swipe Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center px-2">
            <button
              onClick={() => swipe('left')}
              className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-red-600"
            >
              &larr;
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <button
              onClick={() => swipe('right')}
              className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl hover:bg-green-600"
            >
              &rarr;
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-footer text-gray-400 text-sm p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-xl mx-auto text-center">
          &copy; 2024 HSY. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Trashorsmash;
