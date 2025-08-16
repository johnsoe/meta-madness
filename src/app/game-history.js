import React from 'react';

const GameHistory = ({ gameHistory, teamNames }) => {
  // Don't render anything if there's no history
  if (gameHistory.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-slate-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Game History</h3>
      <div className="space-y-4">
        {gameHistory.map((game, idx) => (
          <div key={idx} className="bg-slate-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">Game {game.gameNumber}</h4>
                {game.map && <div className="text-sm text-purple-400">Map: {game.map}</div>}
              </div>
              <div className={`px-3 py-1 rounded text-sm font-semibold ${
                game.winner === 'blue' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {teamNames[game.winner]} Won
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-blue-400 font-semibold mb-2 text-sm">{teamNames.blue}</h5>
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-1">Picks:</div>
                  <div className="flex flex-wrap gap-1">
                    {game.bluePicks.length > 0 ? (
                      game.bluePicks.map((pick, pickIdx) => (
                        <span key={pickIdx} className="text-xs bg-blue-900/40 px-2 py-1 rounded">
                          {pick.hero}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No picks</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Bans:</div>
                  <div className="flex flex-wrap gap-1">
                    {game.blueBans.length > 0 ? (
                      game.blueBans.map((ban, banIdx) => (
                        <span key={banIdx} className="text-xs bg-orange-900/40 px-2 py-1 rounded text-orange-200">
                          {ban.hero}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No bans</span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-red-400 font-semibold mb-2 text-sm">{teamNames.red}</h5>
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-1">Picks:</div>
                  <div className="flex flex-wrap gap-1">
                    {game.redPicks.length > 0 ? (
                      game.redPicks.map((pick, pickIdx) => (
                        <span key={pickIdx} className="text-xs bg-red-900/40 px-2 py-1 rounded">
                          {pick.hero}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No picks</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Bans:</div>
                  <div className="flex flex-wrap gap-1">
                    {game.redBans.length > 0 ? (
                      game.redBans.map((ban, banIdx) => (
                        <span key={banIdx} className="text-xs bg-orange-900/40 px-2 py-1 rounded text-orange-200">
                          {ban.hero}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No bans</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;