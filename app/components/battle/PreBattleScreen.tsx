import React, { useState } from 'react';
import Image from 'next/image';
import { PokemonData } from '@/app/data/battleData';
import { ChevronRight, Swords } from 'lucide-react';

interface PreBattleScreenProps {
  playerPokemon: PokemonData;
  enemyPokemon: PokemonData;
  onBattleStart: () => void;
}

const PreBattleScreen = ({
  playerPokemon,
  enemyPokemon,
  onBattleStart
}: PreBattleScreenProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* VS Header */}
      <div className="text-center py-6 bg-green-900/20">
        <h1 className="text-4xl font-bold">
          <span className="text-green-400">{playerPokemon.name}</span>
          <span className="mx-4 text-yellow-400">VS</span>
          <span className="text-red-400">{enemyPokemon.name}</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-8 p-8">
        {/* Player Pokemon Card */}
        <div className="relative animate-[slideInLeft_0.5s_ease-out]">
          {/* Character Image */}
          <div className="relative h-[400px] mb-6">
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-green-500/0 rounded-lg" />
            <Image
              src={playerPokemon.sprite_url}
              alt={playerPokemon.name}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* Character Info */}
          <div className="space-y-4 p-6 bg-green-900/20 rounded-lg border border-green-500/30">
            <div>
              <h2 className="text-2xl font-bold text-green-400">{playerPokemon.name}</h2>
              <p className="text-green-400/70">{playerPokemon.title}</p>
            </div>
            <p className="text-gray-300">{playerPokemon.description}</p>
          </div>
        </div>

        {/* Right Side Info Panel */}
        <div className="space-y-6 animate-[slideInRight_0.5s_ease-out]">
          {/* Moves List */}
          <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold mb-4 text-green-400">Special Moves</h3>
            <div className="grid gap-4">
              {playerPokemon.moves.map((move, index) => (
                <div 
                  key={index}
                  className="bg-black/50 p-4 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-300">{move.name}</span>
                    <span className="text-sm text-green-400/70">PP: {move.pp}</span>
                  </div>
                  <div className="mt-1 text-sm text-green-400/50">Type: {move.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enemy Preview */}
          <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold mb-4 text-red-400">Enemy Information</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={enemyPokemon.sprite_url}
                  alt={enemyPokemon.name}
                  fill
                  className="object-contain opacity-50"
                />
              </div>
              <div>
                <p className="font-bold text-red-400">{enemyPokemon.name}</p>
                <p className="text-sm text-red-400/70">{enemyPokemon.title}</p>
              </div>
            </div>
          </div>

          {/* Battle Button */}
          <button
            onClick={() => {
              setIsReady(true);
              setTimeout(onBattleStart, 500);
            }}
            disabled={isReady}
            className={`
              w-full py-4 px-8 rounded-lg font-bold text-lg
              flex items-center justify-center gap-3
              transition-all duration-300
              ${isReady 
                ? 'bg-green-600/50 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]'
              }
            `}
          >
            {isReady ? (
              <>
                <Swords className="animate-bounce" />
                Preparing Battle...
              </>
            ) : (
              <>
                Begin Battle
                <ChevronRight />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add animations */}
      <style jsx global>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default PreBattleScreen;