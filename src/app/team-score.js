import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

const TeamScore = ({ 
  team, 
  teamName, 
  score, 
  onTeamNameChange 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(teamName);

  const startEditing = () => {
    setIsEditing(true);
    setEditingName(teamName);
  };

  const saveEditing = () => {
    if (editingName.trim()) {
      onTeamNameChange(team, editingName.trim());
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingName(teamName);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const getTeamColors = () => {
    if (team === 'blue') {
      return {
        bg: 'bg-blue-900/50',
        text: 'text-blue-400',
        inputBg: 'bg-blue-800/50',
        inputText: 'text-blue-200',
        editButton: 'text-blue-300 hover:text-blue-200',
        saveButton: 'text-green-400 hover:text-green-300',
        cancelButton: 'text-red-400 hover:text-red-300'
      };
    } else {
      return {
        bg: 'bg-red-900/50',
        text: 'text-red-400',
        inputBg: 'bg-red-800/50',
        inputText: 'text-red-200',
        editButton: 'text-red-300 hover:text-red-200',
        saveButton: 'text-green-400 hover:text-green-300',
        cancelButton: 'text-red-400 hover:text-red-300'
      };
    }
  };

  const colors = getTeamColors();

  return (
    <div className={`${colors.bg} p-4 rounded-lg text-center`}>
      <div className={`${colors.text} font-semibold mb-2 flex items-center justify-center gap-2`}>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className={`${colors.inputBg} ${colors.inputText} px-2 py-1 rounded text-sm w-24 text-center`}
              autoFocus
              onKeyDown={handleKeyDown}
            />
            <button onClick={saveEditing} className={colors.saveButton}>
              <Check size={14} />
            </button>
            <button onClick={cancelEditing} className={colors.cancelButton}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{teamName}</span>
            <button 
              onClick={startEditing}
              className={`${colors.editButton} opacity-70 hover:opacity-100`}
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold">{score}</div>
    </div>
  );
};

export default TeamScore;
