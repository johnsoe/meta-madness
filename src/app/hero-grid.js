import React, { useState } from 'react';
import { X } from 'lucide-react';

const HeroGrid = ({ 
  allHeroes, 
  availableHeroes, 
  draftedHeroes, 
  bannedHeroes,
  preBannedHeroes, 
  gamePhase, 
  currentAction,
  onSelectHero, 
  onRemovePreBan 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHeroes = allHeroes.filter(hero => 
    hero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHeroClick = (hero) => {
    if (gamePhase === 'pre-ban' && preBannedHeroes.has(hero)) {
      onRemovePreBan(hero);
    } else {
      onSelectHero(hero);
    }
  };

  const getHeroStatus = (hero) => {
    if (draftedHeroes.has(hero)) return 'drafted';
    if (bannedHeroes.has(hero)) return 'banned';
    if (preBannedHeroes.has(hero)) return 'preBanned';
    return 'available';
  };

  const getHeroClassName = (hero) => {
    const status = getHeroStatus(hero);
    const isDisabled = status === 'drafted' || (gamePhase !== 'drafting' && gamePhase !== 'pre-ban');
    
    let baseClasses = 'p-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-[60px] flex items-center justify-center text-center';
    
    if (status === 'preBanned') {
      if (gamePhase === 'pre-ban') {
        return `${baseClasses} bg-orange-700 hover:bg-orange-600 text-orange-200 cursor-pointer border border-orange-500`;
      } else {
        return `${baseClasses} bg-orange-800 text-orange-300 cursor-not-allowed opacity-75 border border-orange-600`;
      }
    } else if (status === 'banned') {
      return `${baseClasses} bg-red-800 text-red-300 cursor-not-allowed opacity-75 border border-red-600`;
    } else if (status === 'drafted') {
      return `${baseClasses} bg-slate-700 text-slate-500 cursor-not-allowed opacity-50`;
    } else if (gamePhase === 'drafting' || gamePhase === 'pre-ban') {
      return `${baseClasses} bg-slate-600 hover:bg-slate-500 text-white cursor-pointer transform hover:scale-105`;
    } else {
      return `${baseClasses} bg-slate-600 text-slate-300 cursor-not-allowed`;
    }
  };

  const getActionText = () => {
    if (gamePhase === 'pre-ban') return 'Select heroes to pre-ban';
    if (gamePhase === 'drafting') {
      return currentAction === 'ban' ? 'Select hero to ban' : 'Select hero to pick';
    }
    return '';
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

      {/* Hero Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
        {filteredHeroes.map((hero) => {
          const status = getHeroStatus(hero);
          const isDisabled = status === 'drafted' || (gamePhase !== 'drafting' && gamePhase !== 'pre-ban');
          
          return (
            <button
              key={hero}
              onClick={() => handleHeroClick(hero)}
              disabled={isDisabled}
              className={getHeroClassName(hero)}
            >
              {hero}
            </button>
          );
        })}
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