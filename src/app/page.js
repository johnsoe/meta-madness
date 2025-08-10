"use client";
import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Users } from 'lucide-react';

const HotsDraftTool = () => {
  // Sample hero data - in a real app, this would be comprehensive
  const allHeroes = [
    // Assassins
    'Azmodan', 'Cassia', 'Chromie', 'Falstad', 'Fenix', 'Gall', 'Genji', 'Greymane', 'Gul\'dan', 'Hanzo',
    'Illidan', 'Jaina', 'Kael\'thas', 'Kel\'Thuzad', 'Kerrigan', 'Li-Ming', 'Lunara', 'Malthael', 'Mephisto',
    'Nazeebo', 'Nova', 'Orphea', 'Probius', 'Qhira', 'Raynor', 'Sylvanas', 'Thrall', 'Tracer', 'Tychus',
    'Valla', 'Zagara', 'Zeratul', 'Zuljin',
    // Warriors/Tanks
    'Anub\'arak', 'Arthas', 'Blaze', 'Chen', 'Cho', 'Diablo', 'E.T.C.', 'Garrosh', 'Johanna', 'Mal\'Ganis',
    'Muradin', 'Stitches', 'Tyrael', 'Varian', 'Yrel',
    // Bruisers
    'Artanis', 'D.Va', 'Dehaka', 'Imperius', 'Leoric', 'Ragnaros', 'Rexxar', 'Sonya', 'The Butcher', 'Xul',
    // Healers/Support
    'Alexstrasza', 'Ana', 'Anduin', 'Auriel', 'Brightwing', 'Deckard', 'Kharazim', 'Li Li', 'Lt. Morales',
    'Lucio', 'Malfurion', 'Rehgar', 'Stukov', 'Tyrande', 'Uther', 'Whitemane',
    // Specialists (now mostly reclassified)
    'Abathur', 'Gazlowe', 'Medivh', 'Murky', 'Sgt. Hammer', 'The Lost Vikings', 'Tassadar', 'Vikhr'
  ].sort();

  const [seriesFormat, setSeriesFormat] = useState(3); // 3 or 5
  const [firstPickTeam, setFirstPickTeam] = useState('blue'); // Which team picks first
  const [currentGame, setCurrentGame] = useState(1);
  const [teamScores, setTeamScores] = useState({ blue: 0, red: 0 });
  const [bannedHeroes, setBannedHeroes] = useState(new Set());
  const [currentDraft, setCurrentDraft] = useState([]);
  const [gameHistory, setGameHistory] = useState([]); // Store completed games
  const [currentTeam, setCurrentTeam] = useState('blue');
  const [currentPick, setCurrentPick] = useState(1);
  const [picksInCurrentTurn, setPicksInCurrentTurn] = useState(0);
  const [gamePhase, setGamePhase] = useState('drafting'); // 'drafting', 'game-complete', 'series-complete'

  const availableHeroes = allHeroes.filter(hero => !bannedHeroes.has(hero));
  const maxGames = Math.ceil(seriesFormat / 2);

  // Snake draft order: Blue(1) -> Red(2) -> Blue(2) -> Red(2) -> Blue(2) -> Red(1)
  const getPicksForCurrentTurn = () => {
    if (currentPick === 1) return 1; // Blue's first pick
    if (currentPick === 10) return 1; // Red's last pick
    return 2; // All other picks are 2 at a time
  };

  const resetSeries = () => {
    setCurrentGame(1);
    setTeamScores({ blue: 0, red: 0 });
    setBannedHeroes(new Set());
    setCurrentDraft([]);
    setGameHistory([]);
    setCurrentTeam(firstPickTeam);
    setCurrentPick(1);
    setPicksInCurrentTurn(0);
    setGamePhase('drafting');
  };

  const selectHero = (hero) => {
    if (bannedHeroes.has(hero) || gamePhase !== 'drafting') return;

    const newDraft = [...currentDraft, { hero, team: currentTeam, pick: currentPick }];
    setCurrentDraft(newDraft);
    setBannedHeroes(prev => new Set([...prev, hero]));

    const newPicksInTurn = picksInCurrentTurn + 1;
    const requiredPicksThisTurn = getPicksForCurrentTurn();

    if (currentPick === 10) {
      setGamePhase('game-complete');
    } else if (newPicksInTurn >= requiredPicksThisTurn) {
      // Turn complete, switch teams and reset picks in turn
      const nextTeam = currentTeam === 'blue' ? 'red' : 'blue';
      setCurrentTeam(nextTeam);
      setCurrentPick(currentPick + 1);
      setPicksInCurrentTurn(0);
    } else {
      // Continue with same team
      setCurrentPick(currentPick + 1);
      setPicksInCurrentTurn(newPicksInTurn);
    }
  };

  const completeGame = (winner) => {
    // Save the completed game to history
    const completedGame = {
      gameNumber: currentGame,
      winner: winner,
      draft: currentDraft,
      bluePicks: getTeamDraft('blue'),
      redPicks: getTeamDraft('red')
    };
    setGameHistory(prev => [...prev, completedGame]);

    const newScores = { ...teamScores };
    newScores[winner]++;
    setTeamScores(newScores);

    if (newScores[winner] === maxGames) {
      setGamePhase('series-complete');
    } else {
      setCurrentGame(currentGame + 1);
      setCurrentDraft([]);
      setCurrentTeam(firstPickTeam);
      setCurrentPick(1);
      setPicksInCurrentTurn(0);
      setGamePhase('drafting');
    }
  };

  const getTeamDraft = (team) => {
    return currentDraft.filter(pick => pick.team === team);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">Heroes of the Storm</h1>
          <h2 className="text-2xl font-semibold text-slate-300">Meta Madness Draft Tool</h2>
        </div>

        {/* Series Controls */}
        <div className="flex justify-center items-center gap-6 mb-6 p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Series Format:</span>
            <select 
              value={seriesFormat} 
              onChange={(e) => setSeriesFormat(Number(e.target.value))}
              className="bg-slate-700 text-white px-3 py-1 rounded"
              disabled={currentGame > 1}
            >
              <option value={3}>Best of 3</option>
              <option value={5}>Best of 5</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">First Pick:</span>
            <select 
              value={firstPickTeam} 
              onChange={(e) => {
                setFirstPickTeam(e.target.value);
                setCurrentTeam(e.target.value);
              }}
              className="bg-slate-700 text-white px-3 py-1 rounded"
              disabled={gamePhase !== 'drafting' || currentPick > 1}
            >
              <option value="blue">Blue Team</option>
              <option value="red">Red Team</option>
            </select>
          </div>
          <button 
            onClick={resetSeries}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
          >
            <RotateCcw size={16} />
            Reset Series
          </button>
        </div>

        {/* Series Status */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Blue Team Score */}
          <div className="bg-blue-900/50 p-4 rounded-lg text-center">
            <div className="text-blue-400 font-semibold mb-2">Blue Team</div>
            <div className="text-3xl font-bold">{teamScores.blue}</div>
          </div>

          {/* Game Status */}
          <div className="bg-slate-800 p-4 rounded-lg text-center">
            {gamePhase === 'series-complete' ? (
              <div>
                <div className="text-yellow-400 font-semibold mb-2 flex items-center justify-center gap-2">
                  <Trophy size={20} />
                  Series Complete!
                </div>
                <div className="text-xl">
                  {teamScores.blue > teamScores.red ? 'Blue Team' : 'Red Team'} Wins!
                </div>
              </div>
            ) : (
              <div>
                <div className="text-slate-300 font-semibold mb-2">Game {currentGame}</div>
                {gamePhase === 'drafting' ? (
                  <div className="text-sm">
                    <div className={`font-semibold ${currentTeam === 'blue' ? 'text-blue-400' : 'text-red-400'}`}>
                      {currentTeam === 'blue' ? 'Blue' : 'Red'} Team
                    </div>
                    <div className="text-xs text-slate-400">
                      Pick {picksInCurrentTurn + 1} of {getPicksForCurrentTurn()} 
                      ({currentPick}/10 total)
                    </div>
                  </div>
                ) : (
                  <div className="text-yellow-400">Draft Complete</div>
                )}
              </div>
            )}
          </div>

          {/* Red Team Score */}
          <div className="bg-red-900/50 p-4 rounded-lg text-center">
            <div className="text-red-400 font-semibold mb-2">Red Team</div>
            <div className="text-3xl font-bold">{teamScores.red}</div>
          </div>
        </div>

        {/* Current Draft Display */}
        {currentDraft.length > 0 && gamePhase === 'drafting' && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Current Game Draft</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Blue Team</h4>
                <div className="space-y-1">
                  {getTeamDraft('blue').map((pick, idx) => (
                    <div key={idx} className="text-sm bg-blue-900/30 px-2 py-1 rounded">
                      {pick.hero}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">Red Team</h4>
                <div className="space-y-1">
                  {getTeamDraft('red').map((pick, idx) => (
                    <div key={idx} className="text-sm bg-red-900/30 px-2 py-1 rounded">
                      {pick.hero}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Complete Actions */}
        {gamePhase === 'game-complete' && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Game {currentGame} Complete - Who Won?</h3>
            
            {/* Show current game draft */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-left">
              <div className="bg-blue-900/20 p-3 rounded">
                <h4 className="text-blue-400 font-semibold mb-2">Blue Team</h4>
                <div className="space-y-1">
                  {getTeamDraft('blue').map((pick, idx) => (
                    <div key={idx} className="text-sm bg-blue-900/30 px-2 py-1 rounded">
                      {pick.hero}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-900/20 p-3 rounded">
                <h4 className="text-red-400 font-semibold mb-2">Red Team</h4>
                <div className="space-y-1">
                  {getTeamDraft('red').map((pick, idx) => (
                    <div key={idx} className="text-sm bg-red-900/30 px-2 py-1 rounded">
                      {pick.hero}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => completeGame('blue')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors"
              >
                Blue Team Won
              </button>
              <button 
                onClick={() => completeGame('red')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition-colors"
              >
                Red Team Won
              </button>
            </div>
          </div>
        )}

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Game History</h3>
            <div className="space-y-4">
              {gameHistory.map((game, idx) => (
                <div key={idx} className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">Game {game.gameNumber}</h4>
                    <div className={`px-3 py-1 rounded text-sm font-semibold ${
                      game.winner === 'blue' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {game.winner === 'blue' ? 'Blue' : 'Red'} Team Won
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-blue-400 font-semibold mb-2 text-sm">Blue Team Picks</h5>
                      <div className="flex flex-wrap gap-1">
                        {game.bluePicks.map((pick, pickIdx) => (
                          <span key={pickIdx} className="text-xs bg-blue-900/40 px-2 py-1 rounded">
                            {pick.hero}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-semibold mb-2 text-sm">Red Team Picks</h5>
                      <div className="flex flex-wrap gap-1">
                        {game.redPicks.map((pick, pickIdx) => (
                          <span key={pickIdx} className="text-xs bg-red-900/40 px-2 py-1 rounded">
                            {pick.hero}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Pool Status */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Hero Pool</span>
            <span className="text-slate-400">
              Available: {availableHeroes.length} | Banned: {bannedHeroes.size}
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {allHeroes.map((hero) => {
            const isBanned = bannedHeroes.has(hero);
            return (
              <button
                key={hero}
                onClick={() => selectHero(hero)}
                disabled={isBanned || gamePhase !== 'drafting'}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-[60px] flex items-center justify-center text-center
                  ${isBanned 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50' 
                    : gamePhase === 'drafting'
                    ? 'bg-slate-600 hover:bg-slate-500 text-white cursor-pointer transform hover:scale-105'
                    : 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  }
                `}
              >
                {hero}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <h3 className="font-semibold mb-2">Legend</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-600 rounded"></div>
              <span>Available Hero</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-700 opacity-50 rounded"></div>
              <span>Banned Hero</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotsDraftTool;