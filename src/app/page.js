"use client";
import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Users, Edit2, Check, X } from 'lucide-react';
import Legend from './legend';
import GameHistory from './game-history';
import HeroGrid from './hero-grid';

const HotsDraftTool = () => {
  // Sample hero data - in a real app, this would be comprehensive
  const allHeroes = [
    // Complete list of all 90 Heroes of the Storm characters
    'Abathur', 'Alarak', 'Alexstrasza', 'Ana', 'Anduin', 'Anub\'arak', 'Artanis', 'Arthas', 'Auriel', 'Azmodan',
    'Blaze', 'Brightwing', 'Cassia', 'Chen', 'Cho', 'Chromie', 'D.Va', 'Deckard', 'Deathwing', 'Dehaka',
    'Diablo', 'E.T.C.', 'Falstad', 'Fenix', 'Gall', 'Garrosh', 'Gazlowe', 'Genji', 'Greymane', 'Gul\'dan',
    'Hanzo', 'Hogger', 'Illidan', 'Imperius', 'Jaina', 'Johanna', 'Junkrat', 'Kael\'thas', 'Kel\'Thuzad', 'Kerrigan',
    'Kharazim', 'Leoric', 'Li Li', 'Li-Ming', 'Lt. Morales', 'Lucio', 'Lunara', 'Maiev', 'Mal\'Ganis', 'Malfurion',
    'Malthael', 'Medivh', 'Mei', 'Mephisto', 'Muradin', 'Murky', 'Nazeebo', 'Nova', 'Orphea', 'Probius',
    'Qhira', 'Ragnaros', 'Raynor', 'Rehgar', 'Rexxar', 'Samuro', 'Sgt. Hammer', 'Sonya', 'Stitches', 'Stukov',
    'Sylvanas', 'Tassadar', 'The Butcher', 'The Lost Vikings', 'Thrall', 'Tracer', 'Tyrael', 'Tyrande', 'Tychus', 'Uther',
    'Valeera', 'Valla', 'Varian', 'Whitemane', 'Xul', 'Yrel', 'Zagara', 'Zeratul', 'Zuljin', 'Vikhr'
  ].sort();

  const allMaps = [
    'Alterac Pass',
    'Battlefield of Eternity',
    'Blackheart\'s Bay',
    'Braxis Holdout',
    'Cursed Hollow',
    'Dragon Shire',
    'Garden of Terror',
    'Hanamura Temple',
    'Haunted Mines',
    'Infernal Shrines',
    'Sky Temple',
    'Tomb of the Spider Queen',
    'Towers of Doom',
    'Volskaya Foundry',
    'Warhead Junction'
  ].sort();

  const [seriesFormat, setSeriesFormat] = useState(3); // 3 or 5
  const [firstPickTeam, setFirstPickTeam] = useState('blue'); // Which team picks first
  const [preBanEnabled, setPreBanEnabled] = useState(false); // Whether pre-banning is enabled
  const [preBannedHeroes, setPreBannedHeroes] = useState(new Set());
  const [preBanPhase, setPreBanPhase] = useState(false); // Are we in pre-ban phase?
  const [teamNames, setTeamNames] = useState({ blue: 'Blue Team', red: 'Red Team' });
  const [editingTeam, setEditingTeam] = useState(null); // 'blue', 'red', or null
  const [editingName, setEditingName] = useState('');
  const [currentGame, setCurrentGame] = useState(1);
  const [teamScores, setTeamScores] = useState({ blue: 0, red: 0 });
  const [draftedHeroes, setDraftedHeroes] = useState(new Set());
  const [currentDraft, setCurrentDraft] = useState([]);
  const [gameHistory, setGameHistory] = useState([]); // Store completed games
  const [currentTeam, setCurrentTeam] = useState('blue');
  const [currentPick, setCurrentPick] = useState(1);
  const [picksInCurrentTurn, setPicksInCurrentTurn] = useState(0);
  const [gamePhase, setGamePhase] = useState('drafting'); // 'drafting', 'game-complete', 'series-complete'
  const [selectedMap, setSelectedMap] = useState(''); // Selected map for current game
  const [gameMapHistory, setGameMapHistory] = useState([]); // Track maps used in each game

  const availableHeroes = allHeroes.filter(hero => !draftedHeroes.has(hero) && !preBannedHeroes.has(hero));
  const maxGames = Math.ceil(seriesFormat / 2);

  // Snake draft order: Blue(1) -> Red(2) -> Blue(2) -> Red(2) -> Blue(2) -> Red(1)
  const getPicksForCurrentTurn = () => {
    if (currentPick === 1) return 1; // Blue's first pick
    if (currentPick === 10) return 1; // Red's last pick
    return 2; // All other picks are 2 at a time
  };

  const startEditingTeam = (team) => {
    setEditingTeam(team);
    setEditingName(teamNames[team]);
  };

  const cancelEditingTeam = () => {
    setEditingTeam(null);
    setEditingName('');
  };

  const saveTeamName = () => {
    if (editingName.trim()) {
      setTeamNames(prev => ({
        ...prev,
        [editingTeam]: editingName.trim()
      }));
    }
    setEditingTeam(null);
    setEditingName('');
  };

  const resetSeries = () => {
    setCurrentGame(1);
    setTeamScores({ blue: 0, red: 0 });
    setDraftedHeroes(new Set());
    setPreBannedHeroes(new Set());
    setPreBanPhase(preBanEnabled);
    setCurrentDraft([]);
    setGameHistory([]);
    setGameMapHistory([]);
    setSelectedMap('');
    setCurrentTeam(firstPickTeam);
    setCurrentPick(1);
    setPicksInCurrentTurn(0);
    setGamePhase(preBanEnabled ? 'pre-ban' : 'drafting');
  };

  const startDraftPhase = () => {
    setPreBanPhase(false);
    setGamePhase('drafting');
  };

  const togglePreBan = () => {
    const newPreBanEnabled = !preBanEnabled;
    setPreBanEnabled(newPreBanEnabled);
    
    if (newPreBanEnabled) {
      // Enable pre-banning
      setPreBanPhase(true);
      setGamePhase('pre-ban');
      setCurrentDraft([]); // Clear any existing draft
    } else {
      // Disable pre-banning
      setPreBanPhase(false);
      setPreBannedHeroes(new Set()); // Clear all pre-bans
      setCurrentDraft([]); // Clear current draft
      setGamePhase('drafting'); // Go back to drafting
    }
  };

  const selectPreBan = (hero) => {
    if (preBannedHeroes.has(hero) || draftedHeroes.has(hero)) return;
    
    const newPreBanned = new Set([...preBannedHeroes, hero]);
    setPreBannedHeroes(newPreBanned);
    
    // No automatic transition - users can ban as many heroes as they want
  };

  const removePreBan = (hero) => {
    const newPreBanned = new Set([...preBannedHeroes]);
    newPreBanned.delete(hero);
    setPreBannedHeroes(newPreBanned);
  };

  const selectHero = (hero) => {
    if (gamePhase === 'pre-ban') {
      selectPreBan(hero);
      return;
    }
    
    if (draftedHeroes.has(hero) || preBannedHeroes.has(hero) || gamePhase !== 'drafting') return;

    const newDraft = [...currentDraft, { hero, team: currentTeam, pick: currentPick }];
    setCurrentDraft(newDraft);
    setDraftedHeroes(prev => new Set([...prev, hero]));

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
      map: selectedMap,
      draft: currentDraft,
      bluePicks: getTeamDraft('blue'),
      redPicks: getTeamDraft('red')
    };
    setGameHistory(prev => [...prev, completedGame]);
    setGameMapHistory(prev => [...prev, selectedMap]);

    const newScores = { ...teamScores };
    newScores[winner]++;
    setTeamScores(newScores);

    if (newScores[winner] === maxGames) {
      setGamePhase('series-complete');
    } else {
      setCurrentGame(currentGame + 1);
      setCurrentDraft([]);
      setSelectedMap('');
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
        <div className="flex justify-center items-center gap-6 mb-6 p-4 bg-slate-800 rounded-lg flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Series Format:</span>
            <select 
              value={seriesFormat} 
              onChange={(e) => setSeriesFormat(Number(e.target.value))}
              className="bg-slate-700 text-white px-3 py-1 rounded"
              disabled={currentGame > 1 || gamePhase !== 'drafting'}
            >
              <option value={3}>Best of 3</option>
              <option value={5}>Best of 5</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Map:</span>
            <select 
              value={selectedMap} 
              onChange={(e) => setSelectedMap(e.target.value)}
              className="bg-slate-700 text-white px-3 py-1 rounded min-w-[180px]"
              disabled={gamePhase === 'series-complete'}
            >
              <option value="">Select Map...</option>
              {allMaps.map(map => (
                <option key={map} value={map}>{map}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Pre-bans:</span>
            <button
              onClick={togglePreBan}
              className={`
                flex items-center gap-2 px-4 py-2 rounded transition-colors
                ${preBanEnabled
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
                }
              `}
              disabled={currentGame > 1 || gamePhase !== 'drafting'}
            >
              {preBanEnabled ? 'Disable Pre-bans' : 'Enable Pre-bans'}
            </button>
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
              <option value="blue">{teamNames.blue}</option>
              <option value="red">{teamNames.red}</option>
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
            <div className="text-blue-400 font-semibold mb-2 flex items-center justify-center gap-2">
              {editingTeam === 'blue' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="bg-blue-800/50 text-blue-200 px-2 py-1 rounded text-sm w-24 text-center"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveTeamName();
                      if (e.key === 'Escape') cancelEditingTeam();
                    }}
                  />
                  <button onClick={saveTeamName} className="text-green-400 hover:text-green-300">
                    <Check size={14} />
                  </button>
                  <button onClick={cancelEditingTeam} className="text-red-400 hover:text-red-300">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{teamNames.blue}</span>
                  <button 
                    onClick={() => startEditingTeam('blue')}
                    className="text-blue-300 hover:text-blue-200 opacity-70 hover:opacity-100"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
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
                  {teamScores.blue > teamScores.red ? teamNames.blue : teamNames.red} Wins!
                </div>
              </div>
            ) : gamePhase === 'pre-ban' ? (
              <div>
                <div className="text-orange-400 font-semibold mb-2">Pre-Ban Phase</div>
                <div className="text-sm text-slate-300 mb-3">
                  Select heroes to pre-ban (no limit)
                </div>
                <button
                  onClick={startDraftPhase}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors"
                >
                  Start Draft
                </button>
              </div>
            ) : (
              <div>
                <div className="text-slate-300 font-semibold mb-2">
                  Game {currentGame}
                  {selectedMap && <div className="text-sm text-purple-400 font-normal">Map: {selectedMap}</div>}
                </div>
                {gamePhase === 'drafting' ? (
                  <div className="text-sm">
                    <div className={`font-semibold ${currentTeam === 'blue' ? 'text-blue-400' : 'text-red-400'}`}>
                      {teamNames[currentTeam]}
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
            <div className="text-red-400 font-semibold mb-2 flex items-center justify-center gap-2">
              {editingTeam === 'red' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="bg-red-800/50 text-red-200 px-2 py-1 rounded text-sm w-24 text-center"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveTeamName();
                      if (e.key === 'Escape') cancelEditingTeam();
                    }}
                  />
                  <button onClick={saveTeamName} className="text-green-400 hover:text-green-300">
                    <Check size={14} />
                  </button>
                  <button onClick={cancelEditingTeam} className="text-red-400 hover:text-red-300">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{teamNames.red}</span>
                  <button 
                    onClick={() => startEditingTeam('red')}
                    className="text-red-300 hover:text-red-200 opacity-70 hover:opacity-100"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold">{teamScores.red}</div>
          </div>
        </div>

        {/* Pre-banned Heroes Display */}
        {preBannedHeroes.size > 0 && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-orange-400">Pre-banned Heroes</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(preBannedHeroes).map((hero) => (
                <span key={hero} className="text-sm bg-orange-900/40 text-orange-200 px-2 py-1 rounded flex items-center gap-1">
                  {hero}
                  <button onClick={() => removePreBan(hero)} className="text-orange-300 hover:text-orange-200 text-xs">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Current Draft Display */}
        {currentDraft.length > 0 && gamePhase === 'drafting' && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Current Game Draft</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">{teamNames.blue}</h4>
                <div className="space-y-1">
                  {getTeamDraft('blue').map((pick, idx) => (
                    <div key={idx} className="text-sm bg-blue-900/30 px-2 py-1 rounded">
                      {pick.hero}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">{teamNames.red}</h4>
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
            <h3 className="text-lg font-semibold mb-2">Game {currentGame} Complete - Who Won?</h3>
            {selectedMap && (
              <div className="text-purple-400 font-medium mb-4">Map: {selectedMap}</div>
            )}
            
            {/* Show current game draft */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-left">
              <div className="bg-blue-900/20 p-3 rounded">
                <h4 className="text-blue-400 font-semibold mb-2">{teamNames.blue}</h4>
                <div className="space-y-1">
                  {getTeamDraft('blue').map((pick, idx) => (
                    <div key={idx} className="text-sm bg-blue-900/30 px-2 py-1 rounded">
                      {pick.hero}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-900/20 p-3 rounded">
                <h4 className="text-red-400 font-semibold mb-2">{teamNames.red}</h4>
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
                disabled={!selectedMap}
              >
                {teamNames.blue} Won
              </button>
              <button 
                onClick={() => completeGame('red')}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition-colors"
                disabled={!selectedMap}
              >
                {teamNames.red} Won
              </button>
            </div>
            {!selectedMap && (
              <div className="text-yellow-400 text-sm mt-2">Please select a map before declaring the winner</div>
            )}
          </div>
        )}

        {/* Game History */}
        <GameHistory gameHistory={gameHistory} teamNames={teamNames} />

        {/* Hero Grid with Search */}
        <HeroGrid 
          allHeroes={allHeroes}
          availableHeroes={availableHeroes}
          draftedHeroes={draftedHeroes}
          preBannedHeroes={preBannedHeroes}
          gamePhase={gamePhase}
          onSelectHero={selectHero}
          onRemovePreBan={removePreBan}
        />

        {/* Legend */}
        <Legend />
      </div>
    </div>
  );
};

export default HotsDraftTool;