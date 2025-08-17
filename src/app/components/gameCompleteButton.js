import React from 'react';
import { Trophy } from 'lucide-react';

const GameCompleteButton = ({ 
  team, 
  teamName, 
  onTeamWin, 
  disabled = false,
  className = "" 
}) => {
  const getTeamColors = () => {
    if (team === 'blue') {
      return {
        bg: 'bg-blue-600 hover:bg-blue-700',
        disabledBg: 'bg-blue-400',
        text: 'text-white',
        icon: 'text-blue-100'
      };
    } else {
      return {
        bg: 'bg-red-600 hover:bg-red-700',
        disabledBg: 'bg-red-400',
        text: 'text-white',
        icon: 'text-red-100'
      };
    }
  };

  const colors = getTeamColors();
  
  const handleClick = () => {
    if (!disabled && onTeamWin) {
      onTeamWin(team);
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold 
        transition-all duration-200 transform
        ${disabled 
          ? `${colors.disabledBg} cursor-not-allowed opacity-50` 
          : `${colors.bg} hover:scale-105 active:scale-95`
        }
        ${colors.text}
        ${className}
      `}
    >
      <Trophy size={18} className={colors.icon} />
      <span>{teamName} Won</span>
    </button>
  );
};

export default GameCompleteButton;