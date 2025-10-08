import React, { useState, useEffect, useRef } from 'react';
import DropGameEnd from '../components/DropgameEnd';

// Define item types
type ItemCategory = 'Bio' | 'Cardboard' | 'Glass' | 'Metal';

// Define item interface with category
interface GameItem {
  id: number;
  x: number;
  y: number;
  category: ItemCategory;
  imageIndex: number;
}

// Define mistakes interface
interface MistakeData {
  missed: number;
  wrongBins: {
    Bio: number;
    Cardboard: number;
    Glass: number;
    Metal: number;
  };
}

const DropGame: React.FC = () => {
  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Game area dimensions - will adjust based on mobile/desktop
  const [gameWidth, setGameWidth] = useState<number>(600);
  const [gameHeight, setGameHeight] = useState<number>(600);
  
  // Game state
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [playerX, setPlayerX] = useState(300); // Will adjust after dimensions are set
  const [items, setItems] = useState<GameItem[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [lastItemId, setLastItemId] = useState(0);
  const [selectedBin, setSelectedBin] = useState(1); // Default to bin 1 (BinBio.png)

  // Game over state and mistake tracking
  const [isGameOver, setIsGameOver] = useState(false);
  const [mistakeData, setMistakeData] = useState<MistakeData>({
    missed: 0,
    wrongBins: {
      Bio: 0,
      Cardboard: 0,
      Glass: 0,
      Metal: 0
    }
  });

  // Bin images mapping
  const binImages = {
    1: "./assets/BinBio.png",
    2: "./assets/BinCardboard.png",
    3: "./assets/BinGlass.png",
    4: "./assets/BinMetal.png"
  };
  
  // Map bin numbers to categories
  const binCategories: Record<number, ItemCategory> = {
    1: "Bio",
    2: "Cardboard", 
    3: "Glass",
    4: "Metal"
  };
  
  // Item images mapping - each category has multiple images
  const itemImages: Record<ItemCategory, string[]> = {
    Bio: ["./assets/Bio1.png", "./assets/Bio2.webp", "./assets/Bio3.png"],
    Cardboard: ["./assets/Cardboard1.webp", "./assets/Cardboard2.png", "./assets/Cardboard3.png"],
    Glass: ["./assets/Glass1.png", "./assets/Glass2.png", "./assets/Glass3.png"],
    Metal: ["./assets/Metal1.png", "./assets/Metal2.png", "./assets/Metal3.webp"]
  };

  // Use a ref to track real-time values
  const playerXRef = useRef(playerX);
  const selectedBinRef = useRef(selectedBin);
  const gameWidthRef = useRef(gameWidth);
  
  // Constants - adjust based on mobile/desktop
  const playerWidth = isMobile ? 40 : 50;
  const playerHeight = isMobile ? 60 : 75;
  const playerSpeed = isMobile ? 25 : 35;
  const itemSize = isMobile ? 45 : 60;

  // Changing item speed and spawn rate for difficulty scaling
  const [itemSpeed, setItemSpeed] = useState<number>(isMobile ? 1.2 : 1.2);
  const [spawnRate, setSpawnRate] = useState<number>(1500); // Start at 1500ms between spawns
  
  // References for game loop
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const isMobileRef = useRef(isMobile);
  const itemSpeedRef = useRef<number>(itemSpeed);
  const spawnRateRef = useRef<number>(spawnRate);

  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overscroll-behavior: none;
        touch-action: none;
      }
    `;
    document.head.appendChild(style);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, []);
  
  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Adjust game dimensions based on screen size
      if (mobile) {
        // Account for safe area on mobile - more conservative
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Use more conservative dimensions to ensure no overflow
        const newWidth = Math.min(viewportWidth - 40, 350); // More padding on sides
        const newHeight = Math.min(viewportHeight - 280, 450);
        
        setGameWidth(newWidth);
        setGameHeight(newHeight);
        setPlayerX(newWidth / 2);
      } else {
        // Desktop dimensions
        setGameWidth(600);
        setGameHeight(600);
        setPlayerX(300);
      }
    };
    
    // Check immediately
    checkMobile();
    
    // Also recheck after a short delay to catch any viewport adjustments
    const timeoutId = setTimeout(checkMobile, 100);
    
    // Handle resize events
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Update refs when states change
  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);
  
  useEffect(() => {
    selectedBinRef.current = selectedBin;
  }, [selectedBin]);

  // Update ref when gameWidth changes
  useEffect(() => {
    gameWidthRef.current = gameWidth;
  }, [gameWidth]);

  // Update the ref when isMobile changes
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  // Update the ref when itemSpeed changes
  useEffect(() => {
    itemSpeedRef.current = itemSpeed;
  }, [itemSpeed]);

  // Add effect to update the ref when spawnRate changes
  useEffect(() => {
    spawnRateRef.current = spawnRate;
  }, [spawnRate]);
  
  // Handle keyboard input (desktop)
  useEffect(() => {
    if (isMobile) return; // Skip keyboard controls on mobile
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerX(prev => Math.max(0, prev - playerSpeed));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerX(prev => Math.min(gameWidth - playerWidth, prev + playerSpeed));
      } else if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        // Change selected bin when pressing number keys
        setSelectedBin(parseInt(e.key));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, gameWidth, playerSpeed, playerWidth]);

  // Handle touch input for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    const gameContainer = e.currentTarget.getBoundingClientRect();
    const relativeX = touch.clientX - gameContainer.left;
    
    // Center the bin under the touch point
    const newX = Math.max(0, Math.min(gameWidth - playerWidth, relativeX - playerWidth / 2));
    setPlayerX(newX);
  };

  // Mobile control buttons
  const moveLeft = () => {
    setPlayerX(prev => Math.max(0, prev - playerSpeed));
  };
  
  const moveRight = () => {
    setPlayerX(prev => Math.min(gameWidth - playerWidth, prev + playerSpeed));
  };

  // Get random item category
  const getRandomCategory = (): ItemCategory => {
    const categories: ItemCategory[] = ["Bio", "Cardboard", "Glass", "Metal"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  // Get random image index for a category
  const getRandomImageIndex = (category: ItemCategory): number => {
    const imageCount = itemImages[category].length;
    return Math.floor(Math.random() * imageCount);
  };
  
  // Game loop
  const gameLoop = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    // Spawn new items
    if (timestamp - lastSpawnTimeRef.current > spawnRateRef.current) {
      const newItemId = lastItemId + 1;
      const category = getRandomCategory();
      const imageIndex = getRandomImageIndex(category);

      // Use the current game width from the ref
      const currentGameWidth = gameWidthRef.current;

      // Add a safety margin to ensure items spawn fully within view
      const safeItemSize = itemSize * 1.1; // Add 10% safety margin
      
      setLastItemId(newItemId);
      setItems(prev => [...prev, {
        id: newItemId,
        x: Math.random() * (currentGameWidth - safeItemSize),
        y: 0,
        category: category,
        imageIndex: imageIndex
      }]);
      lastSpawnTimeRef.current = timestamp;
    }
    
    // Move items down
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => ({
        ...item,
        y: item.y + itemSpeedRef.current // Use ref for real-time speed
      }));

      // Use the refs for collision detection
      const currentPlayerX = playerXRef.current;
      const currentBin = selectedBinRef.current;
      
      // Create separate arrays for different item states
      const correctBinItems = [];
      const wrongBinItems: GameItem[] = [];
      const missedItems = [];
      const activeItems: GameItem[] = [];
      
      // Process each item
    updatedItems.forEach(item => {

      // Add mobile-specific offset - increase this value to move detection with the bin higher
      const mobileOffset = isMobileRef.current ? 165 : 0;

      // Simplified collision detection focused on bin top
      const binTopY = gameHeight - playerHeight - mobileOffset;
      
      // Check if item's bottom edge crosses the top of the bin
      // AND if item is horizontally aligned with the bin
      const isColliding =  
        item.y + itemSize >= binTopY && // Item bottom edge at or below bin top
        item.y < binTopY + itemSize && // Item hasn't moved completely past bin top
        item.x + (itemSize/2) >= currentPlayerX && // Item center is right of bin left edge
        item.x + (itemSize/2) <= currentPlayerX + playerWidth; // Item center is left of bin right edge
          
      // Check if item was missed (fell below screen)
      if (item.y > gameHeight) {
        missedItems.push(item);
      }
      // Check if item collided with player
      else if (isColliding) {
        // Check if correct bin was used
        const currentBinCategory = binCategories[currentBin];
        if (currentBinCategory === item.category) {
          correctBinItems.push(item);
        } else {
          wrongBinItems.push(item);
        }
      }
      // Item is still active
      else {
        activeItems.push(item);
      }
    });
    
    // Score counting
    if (correctBinItems.length > 0) {
      setScore(prev => prev + correctBinItems.length); // Each correct item gives 1 point

      // Increase item speed slightly for each correct item
      setItemSpeed(prevSpeed => prevSpeed + (0.01 * correctBinItems.length));

      // Decrease spawn time (making items spawn faster)
      setSpawnRate(prev => Math.max(300, prev - (10 * correctBinItems.length)));
    }
    
    // Fix the miss counting
    const totalMissed = wrongBinItems.length + missedItems.length;
      if (totalMissed > 0) {
        setMissed(prev => {
          const newMissed = prev + totalMissed;
          // Check if game over (5 or more mistakes)
          if (newMissed >= 5 && isGameRunning) {
            setIsGameOver(true);
            setIsGameRunning(false);
          }
          return newMissed;
        });
        
        // Update detailed mistake data
        setMistakeData(prev => {
          const newMistakeData = { ...prev };
          
          // Update missed count
          newMistakeData.missed += missedItems.length;
          
          // Update wrong bin counts
          wrongBinItems.forEach(item => {
            newMistakeData.wrongBins[item.category] += 0.5; // Use 0.5 since we're counting double
          });
          
          return newMistakeData;
        });
      }
      
      return activeItems;
    });
    
    if (isGameRunning) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };
  
  // Start/stop game loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameRunning]);
  
  return (
    <>
      {!isGameOver ? (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="mb-4 flex justify-between w-full" style={{ maxWidth: gameWidth }}>
            <div className="text-xl font-bold">Score: {score}</div>
            <div className="text-xl font-bold text-red-500">Missed: {missed}</div>
          </div>
          
          <div 
            className="relative bg-blue-100 border-2 border-blue-400 overflow-hidden"
            style={{ width: gameWidth, height: gameHeight }}
            onTouchMove={handleTouchMove}
          >
            {/* Player - Trash Bin */}
            <div 
              className="absolute"
              style={{
                width: playerWidth,
                height: playerHeight,
                bottom: 0,
                left: playerX,
                zIndex: 10
              }}
            >
              <img 
                src={`/${binImages[selectedBin as keyof typeof binImages]}`} 
                alt="Trash Bin" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Falling Items with Category Images */}
            {items.map(item => (
              <div
                key={item.id}
                className="absolute"
                style={{
                  width: itemSize,
                  height: itemSize,
                  top: item.y,
                  left: item.x,
                  zIndex: 5
                }}
              >
                <img 
                  src={`/${itemImages[item.category][item.imageIndex]}`} 
                  alt={`${item.category} Item`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Mobile controls */}
          {isMobile && (
            <div className="flex justify-between w-full mt-4" style={{ maxWidth: gameWidth }}>
              <button 
                className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl select-none"
                onTouchStart={moveLeft}
                onClick={moveLeft}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', minWidth: '50px', minHeight: '50px', fontSize: '1.5rem' }}
              >
                ←
              </button>
              <button 
                className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl select-none"
                onTouchStart={moveRight}
                onClick={moveRight}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', minWidth: '50px', minHeight: '50px', fontSize: '1.5rem' }}
              >
                →
              </button>
            </div>
          )}
          
          {!isMobile && (
            <div className="mt-4 text-gray-600">
              Use ← → arrow keys or A/D to move
            </div>
          )}

          {/* Bin Selection UI with Category Labels - Mobile optimized */}
          <div className={`flex justify-center ${isMobile ? 'space-x-2' : 'space-x-4'} mt-4`}>
            {[1, 2, 3, 4].map(binNum => (
              <div 
                key={binNum} 
                className="flex flex-col items-center"
                onClick={() => setSelectedBin(binNum)}
              >
                <div 
                  className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} p-1 ${selectedBin === binNum ? 'bg-green-200 ring-1 ring-green-600' : 'bg-gray-100'} rounded transition-all cursor-pointer flex items-center justify-center`}
                >
                  <img 
                    src={`/${binImages[binNum as keyof typeof binImages]}`} 
                    alt={`Bin ${binNum}`} 
                    className="max-w-full max-h-full object-contain"
                    style={{ width: isMobile ? '55px' : '75px', height: isMobile ? '55px' : '75px' }}
                  />
                </div>
                <div className={`mt-1 bg-gray-300 px-1.5 py-0.5 rounded ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium`}>
                  {isMobile ? binCategories[binNum] : `${binNum} - ${binCategories[binNum]}`}
                </div>
              </div>
            ))}
          </div>
          
          {/* Game instructions - adjusted for mobile */}
          <div className={`mt-4 ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 max-w-md text-center`}>
            {isMobile ? 'Tap the correct bin for each item type! Arrow buttons recommended for moving the bin.' : 'Select the correct bin for each item type! Wrong bins count as misses.'}
          </div>
        </div>
      ) : (
        <DropGameEnd score={score} mistakeData={mistakeData} />
      )}
    </>
  );
};

export default DropGame;