import React from 'react';

const Legend = () => {
  return (
    <div className="mt-6 p-4 bg-slate-800 rounded-lg">
      <h3 className="font-semibold mb-2">Legend</h3>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-600 rounded"></div>
          <span>Available Hero</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-700 border border-orange-500 rounded"></div>
          <span>Pre-banned Hero (click to remove)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-800 border border-red-600 rounded"></div>
          <span>Banned Hero</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-700 opacity-50 rounded"></div>
          <span>Drafted Hero</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;