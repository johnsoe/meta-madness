"use client";
import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Users, X } from 'lucide-react';
import Legend from './components/legend';
import DisabledHeroesDisplay from './components/disabledHeroesDisplay';
import GameHistory from './components/gameHistory';
import HeroGrid from './components/heroGrid';
import TeamScore from './components/teamScore';
import preBanService from './services/preBanService';
import GameCompleteButton from './components/gameCompleteButton';
import choGallService from './services/choGallService';
import draftService from './services/draftService';

const HotsDraftTool = () => {
  // Sample hero data - in a real app, this would be comprehensive
  const allHeroes = [
    // Complete list of all 90 Heroes of the Storm characters
    'Abathur', 'Alarak', 'Alexstrasza', 'Ana', 'Anduin', 'Anub\'arak', 'Artanis', 'Arthas', 'Auriel', 'Azmodan',
    'Blaze', 'Brightwing', 'Cassia', 'Chen', 'Cho', 'Chromie', 'Deckard', 'Deathwing', 'Dehaka',
    'Diablo', 'D.Va', 'E.T.C.', 'Falstad', 'Fenix', 'Gall', 'Garrosh', 'Gazlowe', 'Genji', 'Greymane', 'Gul\'dan',
    'Hanzo', 'Hogger', 'Illidan', 'Imperius', 'Jaina', 'Johanna', 'Junkrat', 'Kael\'thas', 'Kel\'Thuzad', 'Kerrigan',
    'Kharazim', 'Leoric', 'Li Li', 'Li-Ming', 'Lt. Morales', 'Lucio', 'Lunara', 'Maiev', 'Mal\'Ganis', 'Malfurion',
    'Malthael', 'Medivh', 'Mei', 'Mephisto', 'Muradin', 'Murky', 'Nazeebo', 'Nova', 'Orphea', 'Probius',
    'Qhira', 'Ragnaros', 'Raynor', 'Rehgar', 'Rexxar', 'Samuro', 'Sgt. Hammer', 'Sonya', 'Stitches', 'Stukov',
    'Sylvanas', 'Tassadar', 'The Butcher', 'The Lost Vikings', 'Thrall', 'Tracer', 'Tyrael', 'Tyrande', 'Tychus', 'Uther',
    'Valeera', 'Valla', 'Varian', 'Whitemane', 'Xul', 'Yrel', 'Zagara', 'Zarya', 'Zeratul', 'Zuljin',
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
  const [teamNames, setTeamNames] = useState({ blue: 'Blue Team', red: 'Red Team' });
  const [currentGame, setCurrentGame] = useState(1);
  const [teamScores, setTeamScores] = useState({ blue: 0, red: 0 });
  const [draftedHeroes, setDraftedHeroes] = useState(new Set()); // Heroes drafted in current game
  const [seriesDraftedHeroes, setSeriesDraftedHeroes] = useState(new Set()); // All heroes drafted across series
  const [bannedHeroes, setBannedHeroes] = useState(new Set()); // Heroes banned during current draft
  const [currentDraft, setCurrentDraft] = useState([]);
  const [gameHistory, setGameHistory] = useState([]); // Store completed games
  const [currentTeam, setCurrentTeam] = useState('blue');
  const [currentStep, setCurrentStep] = useState(1); // Current step in draft (1-12)
  const [gamePhase, setGamePhase] = useState('drafting'); // 'drafting', 'game-complete', 'series-complete'
  const [selectedMap, setSelectedMap] = useState(''); // Selected map for current game
  const [gameMapHistory, setGameMapHistory] = useState([]); // Track maps used in each game

  const availableHeroes = allHeroes.filter(hero => 
    !seriesDraftedHeroes.has(hero) && 
    !preBanService.isPreBanned(hero) && 
    !bannedHeroes.has(hero)
  );
  const maxGames = Math.ceil(seriesFormat / 2);

  // Adjust draft order based on first pick team
  const adjustedDraftOrder = draftService.draftOrder.map(step => {
    if (firstPickTeam === 'red') {
      return { ...step, team: step.team === 'blue' ? 'red' : 'blue' };
    }
    return step;
  });

  const getCurrentDraftStep = () => {
    return adjustedDraftOrder[currentStep - 1] || { team: 'blue', action: 'pick' };
  };

  const resetSeries = () => {
    setCurrentGame(1);
    setTeamScores({ blue: 0, red: 0 });
    setDraftedHeroes(new Set());
    setSeriesDraftedHeroes(new Set());
    setBannedHeroes(new Set());
    setCurrentDraft([]);
    setGameHistory([]);
    setGameMapHistory([]);
    setSelectedMap('');
    setCurrentStep(1);
    setCurrentTeam(adjustedDraftOrder[0]?.team || 'blue');
    setGamePhase('drafting');
  };

  const startDraftPhase = () => {
    setGamePhase('drafting');
  };

  const selectHero = (hero) => {
    if (draftedHeroes.has(hero) || preBanService.isPreBanned(hero) || bannedHeroes.has(hero) || gamePhase !== 'drafting') return;
    const currentAction = getCurrentDraftStep().action;
    
    if (currentAction === 'ban') {
      // Ban the hero
      const newBanned = new Set([...bannedHeroes, hero]);
      setBannedHeroes(newBanned);
      
      const newDraftEntry = { 
        hero, 
        team: getCurrentDraftStep().team, 
        action: 'ban', 
        step: currentStep 
      };
      setCurrentDraft(prev => [...prev, newDraftEntry]);
      advanceDraft(1)
    } else {
      if (choGallService.isChoOrGall(hero)) {
        pickHero(hero)
        pickHero(choGallService.getOtherHead(hero))
        advanceDraft(2)
      } else {
        pickHero(hero)
        advanceDraft(1)
      }
    }
    console.log(getCurrentDraftStep())
  };

  const pickHero = (hero) => {
    // Pick the hero
    const newDrafted = new Set([...draftedHeroes, hero]);
    setDraftedHeroes(newDrafted);
    
    // Also add to series-wide tracking
    setSeriesDraftedHeroes(prev => new Set([...prev, hero]));
    
    const newDraftEntry = { 
      hero, 
      team: getCurrentDraftStep().team, 
      action: 'pick', 
      step: currentStep 
    };
    setCurrentDraft(prev => [...prev, newDraftEntry]);
  }

  const advanceDraft = (delta) => {
    if (currentStep === draftService.draftOrder.length) {
      setGamePhase('game-complete');
    } else {
      const nextStep = currentStep + delta;
      setCurrentStep(nextStep);
      setCurrentTeam(adjustedDraftOrder[nextStep - 1]?.team || 'blue');
    }
  }

  const completeGame = (winner) => {
    // Save the completed game to history
    const completedGame = {
      gameNumber: currentGame,
      winner: winner,
      map: selectedMap,
      draft: currentDraft,
      bluePicks: getTeamPicks('blue'),
      redPicks: getTeamPicks('red'),
      blueBans: getTeamBans('blue'),
      redBans: getTeamBans('red')
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
      setDraftedHeroes(new Set());
      setBannedHeroes(new Set());
      setSelectedMap('');
      setCurrentStep(1);
      setCurrentTeam(adjustedDraftOrder[0]?.team || 'blue');
      setGamePhase('drafting');
      // Note: seriesDraftedHeroes is NOT cleared, so heroes from previous games remain disabled
    }
  };

  const getTeamPicks = (team) => {
    return currentDraft.filter(entry => entry.team === team && entry.action === 'pick');
  };

  const getTeamBans = (team) => {
    return currentDraft.filter(entry => entry.team === team && entry.action === 'ban');
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
            <span className="text-slate-300">First Pick:</span>
            <select 
              value={firstPickTeam} 
              onChange={(e) => {
                setFirstPickTeam(e.target.value);
                // Update current team to match the first step of the draft order
                const newFirstPickTeam = e.target.value;
                const newDraftOrder = draftService.draftOrder.map(step => {
                  if (newFirstPickTeam === 'red') {
                    return { ...step, team: step.team === 'blue' ? 'red' : 'blue' };
                  }
                  return step;
                });
                setCurrentTeam(newDraftOrder[0]?.team || 'blue');
              }}
              className="bg-slate-700 text-white px-3 py-1 rounded"
              disabled={gamePhase !== 'drafting'}
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
          <TeamScore
            team="blue"
            teamName={teamNames.blue}
            score={teamScores.blue}
            onTeamNameChange={(team, newName) => {
              setTeamNames(prev => ({
                ...prev,
                [team]: newName
              }));
            }}
          />

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
            ) : gamePhase === 'drafting' ? (
              <div>
                <div className="text-slate-300 font-semibold mb-2">
                  Game {currentGame}
                  {selectedMap && <div className="text-sm text-purple-400 font-normal">Map: {selectedMap}</div>}
                </div>
                <div className="text-sm">
                  <div className={`font-semibold ${getCurrentDraftStep().team === 'blue' ? 'text-blue-400' : 'text-red-400'}`}>
                    {teamNames[getCurrentDraftStep().team]}
                  </div>
                  <div className="text-xs text-slate-400 capitalize">
                    {getCurrentDraftStep().action} ({currentStep}/14)
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-yellow-400">Draft Complete</div>
              </div>
            )}
          </div>

          {/* Red Team Score */}
          <TeamScore
            team="red"
            teamName={teamNames.red}
            score={teamScores.red}
            onTeamNameChange={(team, newName) => {
              setTeamNames(prev => ({
                ...prev,
                [team]: newName
              }));
            }}
          />
        </div>

        <DisabledHeroesDisplay 
          preBannedHeroes={preBanService.getPreBannedHeroes()}
          seriesDraftedHeroes={seriesDraftedHeroes}
        />

        {/* Current Draft Display */}
        {currentDraft.length > 0 && gamePhase === 'drafting' && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Current Game Draft</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">{teamNames.blue}</h4>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 mb-1">Picks:</div>
                  {getTeamPicks('blue').map((entry, idx) => (
                    <div key={idx} className="text-sm bg-blue-900/30 px-2 py-1 rounded">
                      {entry.hero}
                    </div>
                  ))}
                  <div className="text-xs text-slate-400 mb-1 mt-2">Bans:</div>
                  {getTeamBans('blue').map((entry, idx) => (
                    <div key={idx} className="text-sm bg-orange-900/30 px-2 py-1 rounded text-orange-200">
                      {entry.hero}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">{teamNames.red}</h4>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 mb-1">Picks:</div>
                  {getTeamPicks('red').map((entry, idx) => (
                    <div key={idx} className="text-sm bg-red-900/30 px-2 py-1 rounded">
                      {entry.hero}
                    </div>
                  ))}
                  <div className="text-xs text-slate-400 mb-1 mt-2">Bans:</div>
                  {getTeamBans('red').map((entry, idx) => (
                    <div key={idx} className="text-sm bg-orange-900/30 px-2 py-1 rounded text-orange-200">
                      {entry.hero}
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
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-1">Picks:</div>
                  <div className="space-y-1">
                    {getTeamPicks('blue').map((entry, idx) => (
                      <div key={idx} className="text-sm bg-blue-900/30 px-2 py-1 rounded">
                        {entry.hero}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Bans:</div>
                  <div className="space-y-1">
                    {getTeamBans('blue').map((entry, idx) => (
                      <div key={idx} className="text-sm bg-orange-900/30 px-2 py-1 rounded text-orange-200">
                        {entry.hero}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-red-900/20 p-3 rounded">
                <h4 className="text-red-400 font-semibold mb-2">{teamNames.red}</h4>
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-1">Picks:</div>
                  <div className="space-y-1">
                    {getTeamPicks('red').map((entry, idx) => (
                      <div key={idx} className="text-sm bg-red-900/30 px-2 py-1 rounded">
                        {entry.hero}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Bans:</div>
                  <div className="space-y-1">
                    {getTeamBans('red').map((entry, idx) => (
                      <div key={idx} className="text-sm bg-orange-900/30 px-2 py-1 rounded text-orange-200">
                        {entry.hero}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <GameCompleteButton
                team="blue"
                teamName={teamNames.blue}
                onTeamWin={completeGame}
                disabled={!selectedMap}
              />
              <GameCompleteButton
                team="red" 
                teamName={teamNames.red}
                onTeamWin={completeGame}
                disabled={!selectedMap}
              />
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
          seriesDraftedHeroes={seriesDraftedHeroes}
          bannedHeroes={bannedHeroes}
          preBannedHeroes={preBanService.getPreBannedHeroes()}
          gamePhase={gamePhase}
          currentAction={getCurrentDraftStep().action}
          onSelectHero={selectHero}
          currentStep={currentStep}
        />

        {/* Legend */}
        <Legend />
      </div>
    </div>
  );
};

export default HotsDraftTool;