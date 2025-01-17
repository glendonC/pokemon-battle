// app/components/battle/BattleArena.tsx
'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PokemonData } from '@/app/data/battleData';

const Scene3D = dynamic(() => import('./Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-green-500">
      Loading 3D Scene...
    </div>
  )
});

interface BattleArenaProps {
  playerPokemon: PokemonData;
  enemyPokemon: PokemonData;
  playerHP: number;
  enemyHP: number;
}

export function BattleArena({
  playerPokemon,
  enemyPokemon,
  playerHP,
  enemyHP
}: BattleArenaProps) {
  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Scene3D 
            playerPokemon={playerPokemon}
            enemyPokemon={enemyPokemon}
          />
        </Suspense>
      </div>

      {/* HP Bars Overlay */}
      <div className="absolute top-4 right-4 bg-black/50 p-4 rounded-lg">
        <div className="text-green-400 mb-1">{enemyPokemon.name}</div>
        <div className="w-48 h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${enemyHP}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg">
        <div className="text-green-400 mb-1">{playerPokemon.name}</div>
        <div className="w-48 h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${playerHP}%` }}
          />
        </div>
      </div>
    </div>
  );
}