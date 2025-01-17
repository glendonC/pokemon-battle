'use client';

import React from 'react';
import Image from 'next/image';
import { PokemonData } from '@/app/data/battleData';

interface Scene3DProps {
  playerPokemon: PokemonData;
  enemyPokemon: PokemonData;
}

const Scene3D = ({ playerPokemon, enemyPokemon }: Scene3DProps) => {
  return (
    <div className="w-full h-full relative">
      {/* Battle Platform Glow */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-green-900/30 to-transparent" />
      
      {/* Player Pokemon */}
      <div className="absolute bottom-32 left-32 transform-gpu player-pokemon">
        <div className="relative group preserve-3d">
          <div className="absolute -inset-4 bg-green-500/20 rounded-[30%] blur-xl group-hover:bg-green-500/30 transition-all duration-300" />
          <div className="w-[400px] h-[300px] relative">
            <Image
              src={playerPokemon.sprite_url}
              alt={playerPokemon.name}
              fill
              className="relative transform hover:scale-110 transition-all duration-300 
                       animate-float drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]
                       object-contain p-4"
              style={{ 
                imageRendering: 'pixelated',
                transform: 'scaleX(-1)' // Face towards enemy
              }}
            />
          </div>
        </div>
        {/* Player Stats Bar */}
        <div className="mt-2 bg-black/50 rounded-lg p-3 backdrop-blur-sm border border-green-500/30">
          <div className="flex justify-between items-center mb-1">
            <div>
              <span className="text-green-400 font-bold">{playerPokemon.name}</span>
              <span className="text-green-400/70 text-sm ml-2">{playerPokemon.title}</span>
            </div>
            <span className="text-green-400 text-sm">Lv.{playerPokemon.level}</span>
          </div>
          <div className="w-full h-2 bg-green-900/50 rounded overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded animate-pulse"
              style={{ width: `${(playerPokemon.hp/100) * 100}%` }}
            />
          </div>
          <div className="text-green-400/80 text-xs mt-1 text-right">
            {playerPokemon.hp}/100 HP
          </div>
        </div>
      </div>

      {/* Enemy Pokemon */}
      <div className="absolute top-16 right-32 transform-gpu enemy-pokemon">
        <div className="relative group preserve-3d">
          {/* Enemy Stats Bar */}
          <div className="mb-2 bg-black/50 rounded-lg p-3 backdrop-blur-sm border border-red-500/30">
            <div className="flex justify-between items-center mb-1">
              <div>
                <span className="text-red-400 font-bold">{enemyPokemon.name}</span>
                <span className="text-red-400/70 text-sm ml-2">{enemyPokemon.title}</span>
              </div>
              <span className="text-red-400 text-sm">Lv.{enemyPokemon.level}</span>
            </div>
            <div className="w-full h-2 bg-red-900/50 rounded overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded animate-pulse"
                style={{ width: `${(enemyPokemon.hp/100) * 100}%` }}
              />
            </div>
            <div className="text-red-400/80 text-xs mt-1 text-right">
              {enemyPokemon.hp}/100 HP
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-red-500/20 rounded-[30%] blur-xl group-hover:bg-red-500/30 transition-all duration-300" />
            <div className="w-[350px] h-[250px] relative">
              <Image
                src={enemyPokemon.sprite_url}
                alt={enemyPokemon.name}
                fill
                className="relative transform hover:scale-110 transition-all duration-300 
                         animate-float-delayed drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]
                         object-contain p-4"
                style={{ 
                  imageRendering: 'pixelated'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Battle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>
    </div>
  );
};

export default Scene3D;