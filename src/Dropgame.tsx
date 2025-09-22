import React, { useState, useEffect, useRef } from 'react';

// Define item types
type ItemCategory = 'Bio' | 'Cardboard' | 'Glass' | 'Metal';

// Define item interface with category
interface GameItem {
  id: number;
  x: number;
  y: number;
  category: ItemCategory;
  imageIndex: number; // Which variant of the image to use (1, 2, 3)
}

const DropGame: React.FC = () => {
  // Game area dimensions
  const gameWidth = 600;
  const gameHeight = 600;
  
  // Game state
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [playerX, setPlayerX] = useState(gameWidth / 2);
  const [items, setItems] = useState<GameItem[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [lastItemId, setLastItemId] = useState(0);
  const [selectedBin, setSelectedBin] = useState(1); // Default to bin 1 (BinBio.png)

  // Bin images mapping
  const binImages = {
    1: "BinBio.png",
    2: "BinCardboard.png",
    3: "BinGlass.png",
    4: "BinMetal.png"
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
    Bio: ["Bio1.png", "Bio2.webp", "Bio3.png"],
    Cardboard: ["Cardboard1.webp", "Cardboard2.png", "Cardboard3.png"],
    Glass: ["Glass1.png", "Glass2.png", "Glass3.png"],
    Metal: ["Metal1.png", "Metal2.png", "Metal3.webp"]
  };

  // Use a ref to track real-time values
  const playerXRef = useRef(playerX);
	const selectedBinRef = useRef(selectedBin);
  
  // Constants
  const playerWidth = 50;
  const playerHeight = 75;
  const playerSpeed = 35;
  const itemSize = 60;
  const itemSpeed = 1.5;
  const spawnRate = 1500; // ms between new items
  
  // References for game loop
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);

  // Update refs when states change
  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);
  
  useEffect(() => {
    selectedBinRef.current = selectedBin;
  }, [selectedBin]);
  
  // Handle keyboard input
  useEffect(() => {
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
  }, []);

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
    if (timestamp - lastSpawnTimeRef.current > spawnRate) {
      const newItemId = lastItemId + 1;
      const category = getRandomCategory();
      const imageIndex = getRandomImageIndex(category);
      
      setLastItemId(newItemId);
      setItems(prev => [...prev, {
        id: newItemId,
        x: Math.random() * (gameWidth - itemSize),
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
        y: item.y + itemSpeed
      }));

      // Use the refs for collision detection
      const currentPlayerX = playerXRef.current;
			const currentBin = selectedBinRef.current;
      
      // Create separate arrays for different item states
      const correctBinItems = [];
      const wrongBinItems = [];
      const missedItems = [];
      const activeItems: GameItem[] = [];
      
      // Process each item
      updatedItems.forEach(item => {
        const isColliding = 
          item.y + itemSize >= gameHeight - playerHeight &&
          item.y <= gameHeight &&
          item.x + itemSize >= currentPlayerX &&
          item.x <= currentPlayerX + playerWidth;
          
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
      
      // Update score for correct bin items
      if (correctBinItems.length > 0) {
        setScore(prev => prev + correctBinItems.length);
      }
      
      // Update missed count for wrong bin and missed items
      const totalMissed = wrongBinItems.length + missedItems.length;
      if (totalMissed > 0) {
        setMissed(prev => prev + totalMissed);
      }
      
      // Return only active items
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
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex justify-between w-full max-w-[800px]">
        <div className="text-xl font-bold">Score: {score}</div>
        <div className="text-xl font-bold text-red-500">Missed: {missed}</div>
      </div>
      
      <div 
        className="relative bg-blue-100 border-2 border-blue-400 overflow-hidden"
        style={{ width: gameWidth, height: gameHeight }}
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
      
      <div className="mt-4 text-gray-600">
        Use ← → arrow keys or A/D to move
      </div>

      {/* Bin Selection UI with Category Labels */}
      <div className="flex justify-center space-x-4 mt-4">
        {[1, 2, 3, 4].map(binNum => (
          <div 
            key={binNum} 
            className="flex flex-col items-center"
            onClick={() => setSelectedBin(binNum)}
          >
            <div 
              className={`w-12 h-12 p-1 ${selectedBin === binNum ? 'bg-green-200 ring-1 ring-green-600' : 'bg-gray-100'} rounded transition-all cursor-pointer flex items-center justify-center`}
            >
              <img 
                src={`/${binImages[binNum as keyof typeof binImages]}`} 
                alt={`Bin ${binNum}`} 
                className="max-w-full max-h-full object-contain"
                style={{ width: '75px', height: '75px' }}
              />
            </div>
            <div className="mt-1 bg-gray-300 px-1.5 py-0.5 rounded text-xs font-medium">
              {binNum} - {binCategories[binNum]}
            </div>
          </div>
        ))}
      </div>
      
      {/* Game instructions */}
      <div className="mt-4 text-sm text-gray-600 max-w-md text-center">
        Select the correct bin for each item type! Wrong bins count as misses.
      </div>
    </div>
  );
};

export default DropGame;