import React from 'react';

const DisabledHeroesDisplay = ({ 
  preBannedHeroes, 
  seriesDraftedHeroes 
}) => {
  const hasPreBanned = preBannedHeroes.size > 0;
  const hasSeriesDrafted = seriesDraftedHeroes.size > 0;
  
  // Don't render if no disabled heroes
  if (!hasPreBanned && !hasSeriesDrafted) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-slate-300">Disabled Heroes</h3>
      
      <div className="space-y-4">
        {/* Pre-banned Heroes Section */}
        {hasPreBanned && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-medium text-orange-400">Pre-banned Heroes</h4>
              <span className="text-xs text-slate-400">({preBannedHeroes.size})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from(preBannedHeroes).map((hero) => (
                <span 
                  key={`prebanned-${hero}`} 
                  className="text-sm bg-orange-900/40 text-orange-200 px-2 py-1 rounded border border-orange-700/50"
                >
                  {hero}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Series Drafted Heroes Section */}
        {hasSeriesDrafted && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-sm font-medium text-slate-400">Series Drafted Heroes</h4>
              <span className="text-xs text-slate-500">({seriesDraftedHeroes.size})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from(seriesDraftedHeroes).map((hero) => (
                <span 
                  key={`drafted-${hero}`} 
                  className="text-sm bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-600/50"
                >
                  {hero}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisabledHeroesDisplay;