import React from 'react';
import { PokemonData } from '@/app/data/battleData';
import { Trophy, RotateCw, Home, RotateCwIcon } from 'lucide-react';

interface BattleEndScreenProps {
  winner: PokemonData;
  loser: PokemonData;
  isPlayerWinner: boolean;
  onRematch: () => void;
  onHome: () => void;
}

const BattleEndScreen = ({
  winner,
  loser,
  isPlayerWinner,
  onRematch,
  onHome
}: BattleEndScreenProps) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-2xl w-full mx-4">
        {/* Victory/Defeat Banner */}
        <div className={`text-center mb-8 ${isPlayerWinner ? 'text-green-500' : 'text-red-500'} 
          animate-[fadeIn_1s_ease-out] font-bold text-6xl tracking-wider`}>
          {isPlayerWinner ? 'VICTORY!' : 'DEFEAT!'}
        </div>

        {/* Battle Result Card */}
        <div className="bg-gray-900/80 rounded-lg p-8 border-2 
          border-green-500/30 shadow-[0_0_15px_rgba(0,255,0,0.3)]
          animate-[slideUp_0.5s_ease-out_0.5s_both]">
          
          {/* Winner Section */}
          <div className="flex items-center gap-4 mb-6">
            <Trophy className={`w-8 h-8 ${isPlayerWinner ? 'text-green-500' : 'text-red-500'}`} />
            <div>
              <div className="text-gray-400 text-sm">Winner</div>
              <div className="text-2xl font-bold text-white">{winner.name}</div>
            </div>
          </div>

          {/* Battle Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded p-4">
              <div className="text-gray-400 text-sm mb-1">Winner's Title</div>
              <div className="text-white">{winner.title}</div>
            </div>
            <div className="bg-gray-800/50 rounded p-4">
              <div className="text-gray-400 text-sm mb-1">Special Move</div>
              <div className="text-white">{winner.moves[0].name}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onRematch}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 
                text-white rounded-lg py-3 px-6 transition-all duration-300
                hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]"
            >
              <RotateCw className="w-5 h-5" />
              Rematch
            </button>
            <button
              onClick={onHome}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 
                text-white rounded-lg py-3 px-6 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BattleEndScreen;