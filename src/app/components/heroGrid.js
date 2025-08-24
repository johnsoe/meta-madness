import React, { useState } from 'react';
import Image from 'next/image';
import choGallService from '../services/choGallService';

const HeroGrid = ({ 
  allHeroes, 
  availableHeroes, 
  draftedHeroes, 
  bannedHeroes,
  preBannedHeroes, 
  gamePhase, 
  currentAction,
  onSelectHero, 
  currentStep,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHeroes = allHeroes.filter(hero => 
    hero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHeroClick = (hero) => {
    onSelectHero(hero);
  };

  const getHeroStatus = (hero) => {
    if (draftedHeroes.has(hero)) return 'drafted';
    if (bannedHeroes.has(hero)) return 'banned';
    if (preBannedHeroes.has(hero)) return 'preBanned';
    if (choGallService.isChoOrGall(hero) && !choGallService.isChoGallAvailable(bannedHeroes, draftedHeroes, currentStep) && currentAction === 'pick') return 'unavailable';
    return 'available';
  };

  const getHeroImagePath = (heroName) => {
    // Convert hero name to filename format (lowercase, replace spaces and special chars)
    const filename = heroName
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[.']/g, '')
      .replace(/ü/g, 'u')
      .replace(/é/g, 'e');
    return `/assets/portrait_${filename}.png`;
  };

  const getHexagonStyles = (hero) => {
    const status = getHeroStatus(hero);
    const isClickable = gamePhase === 'drafting' && status === 'available';
    
    let overlayColor = 'transparent';
    let opacity = '1';
    
    if (status === 'preBanned') {
      overlayColor = 'rgba(194, 65, 12, 0.8)'; // orange-700 with transparency
    } else if (status === 'banned') {
      overlayColor = 'rgba(185, 28, 28, 0.8)'; // red-700 with transparency
    } else if (status === 'drafted' || status === 'unavailable') {
      overlayColor = 'rgba(51, 65, 85, 0.8)'; // slate-700 with transparency
      opacity = '0.5';
    }

    return {
      overlayColor,
      opacity,
      cursor: isClickable ? 'pointer' : 'not-allowed',
      transform: isClickable ? 'scale(1)' : 'scale(1)',
      transition: 'all 0.2s ease-in-out'
    };
  };

  const getActionText = () => {
    if (gamePhase === 'drafting') {
      return currentAction === 'ban' ? 'Select hero to ban' : 'Select hero to pick';
    }
    return '';
  };

  const columns = 15; // Reduced to prevent overcrowding
  const rows = Math.ceil(filteredHeroes.length / columns);
  const hexWidth = 80;
  const containerWidth = columns * hexWidth + (hexWidth / 2); // Account for offset rows
  const containerHeight = rows * 69 + 92; // 75% of height + one full height

  // Calculate grid layout - hexagons need offset rows (pointy-top orientation)
  const getHexPosition = (index, columns) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const isOddRow = row % 2 === 1;
    
    // Hexagon dimensions (pointy-top orientation)
    const hexWidth = 80;
    const hexHeight = 92;
    
    // For pointy-top hexagons:
    // - Horizontal spacing should be the full width (no overlap)
    // - Vertical spacing uses 3/4 of height (75%)
    // - Odd rows are offset by half the horizontal spacing
    const horizontalSpacing = hexWidth; // Full width spacing
    const verticalSpacing = hexHeight * 0.75; // 3/4 of height
    
    const x = col * horizontalSpacing + (isOddRow ? horizontalSpacing / 2 : 0);
    const y = row * verticalSpacing;
    
    return { x, y };
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">Hero Pool</span>
          <span className="text-slate-400">
            Available: {availableHeroes.length} | Drafted: {draftedHeroes.size} | Banned: {bannedHeroes.size} | Pre-banned: {preBannedHeroes.size}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-300">Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter heroes..."
            className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 focus:border-slate-500 focus:outline-none w-48"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-white text-sm px-2 py-1 hover:bg-slate-600 rounded transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Action indicator */}
      {gamePhase !== 'series-complete' && (
        <div className="mb-4 p-3 bg-slate-800 rounded-lg text-center">
          <div className="text-slate-300 font-medium">
            {getActionText()}
          </div>
        </div>
      )}

      {/* Hexagonal Hero Grid */}
      <div className="overflow-x-auto">
        <div 
          className="relative mx-auto"
          style={{ 
            width: `${containerWidth}px`, 
            height: `${containerHeight}px`,
            minWidth: '800px',
          }}
        >
          {filteredHeroes.map((hero, index) => {
            const position = getHexPosition(index, columns);
            const styles = getHexagonStyles(hero);
            const status = getHeroStatus(hero);
            const isDisabled = status === 'drafted' || gamePhase !== 'drafting' || status === 'banned' || status === 'preBanned';
            
            return (
              <div
                key={hero}
                className="absolute"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  width: '80px',
                  height: '92px',
                }}
              >
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => !isDisabled && handleHeroClick(hero)}
                  style={{ 
                    cursor: styles.cursor,
                    opacity: styles.opacity,
                    transform: styles.transform,
                    transition: styles.transition
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled) {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }
                    e.currentTarget.style.zIndex = '10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.zIndex = '1';
                  }}
                >
                  {/* Hexagon Container */}
                  <div 
                    className="w-full h-full relative"
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      border: 'none',
                      backgroundColor: '#1e293b', // slate-800
                    }}
                  >
                    {/* Hero Portrait */}
                    <Image
                      src={getHeroImagePath(hero)}
                      alt={hero}
                      className="w-full h-full object-cover"
                      width="82"
                      height="90"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback text (hidden by default) */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white text-center px-1 leading-tight"
                      style={{ 
                        display: 'none',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      }}
                    >
                      {hero}
                    </div>

                    {/* Status Overlay */}
                    {styles.overlayColor !== 'transparent' && (
                      <div 
                        className="absolute inset-0"
                        style={{
                          backgroundColor: styles.overlayColor,
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}
                      />
                    )}

                    {/* Status Icons */}
                    {status === 'banned' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">×</span>
                        </div>
                      </div>
                    )}
                    
                    {status === 'preBanned' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">!</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hero Name Tooltip */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                    {hero}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* No results message */}
      {filteredHeroes.length === 0 && searchTerm && (
        <div className="text-center py-8 text-slate-400">
          No heroes found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default HeroGrid;