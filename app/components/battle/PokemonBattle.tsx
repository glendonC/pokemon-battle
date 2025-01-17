// app/components/battle/PokemonBattle.tsx
'use client';

import React, { useState } from 'react';
import Scene3D from './Scene3D';
import { PokemonData, PokemonMove } from '@/app/data/battleData';
import { playAttackAnimation } from '@/app/utils/battleAnimations';
import BattleEndScreen from './BattleEndScreen';

interface PokemonBattleProps {
  playerPokemon: PokemonData;
  enemyPokemon: PokemonData;
}

interface BattleLogEntry {
  message: string;
  type: 'system' | 'player' | 'enemy' | 'damage' | 'effect' | 'faint';
}

const PokemonBattle = ({ playerPokemon, enemyPokemon }: PokemonBattleProps) => {
  console.log("Battle Started with:", {
    player: {
      name: playerPokemon.name,
      moves: playerPokemon.moves
    },
    enemy: {
      name: enemyPokemon.name,
      moves: enemyPokemon.moves
    }
  });
  // Battle State
  const [battleState, setBattleState] = useState({
    playerHP: playerPokemon.hp,
    enemyHP: enemyPokemon.hp,
    isPlayerTurn: true,
    battleEnded: false
  });

  const [battleEnd, setBattleEnd] = useState<{
    winner: PokemonData;
    loser: PokemonData;
    isPlayerWinner: boolean;
  } | null>(null);

  const [battleLog, setBattleLog] = useState<BattleLogEntry[]>([
    { message: `Wild ${enemyPokemon.name} appeared!`, type: 'system' },
    { message: `Go! ${playerPokemon.name}!`, type: 'system' },
  ]);

  // Add log entry with optional delay
  const addToBattleLog = (message: string, type: BattleLogEntry['type']) => {
    setBattleLog(prev => [...prev, { message, type }]);
  };

  // Calculate damage with some randomness
  const calculateDamage = (move: PokemonMove) => {
    const baseMultiplier = 0.8 + Math.random() * 0.4; // Random between 0.8 and 1.2
    return Math.floor(move.damage * baseMultiplier);
  };

  // Enemy AI: randomly select a move
  const getEnemyMove = () => {
    const moveIndex = Math.floor(Math.random() * enemyPokemon.moves.length);
    return enemyPokemon.moves[moveIndex];
  };

  // Handle move selection
  const handleMove = async (move: PokemonMove) => {
    if (!battleState.isPlayerTurn || battleState.battleEnded) return;

    // Player's turn
    addToBattleLog(`${playerPokemon.name} used ${move.name}!`, 'player');
    
    // Play attack animation
    setTimeout(() => {
      playAttackAnimation(true, move.type, move.name);
    }, 200);

    const playerDamage = calculateDamage(move);
    const newEnemyHP = Math.max(0, battleState.enemyHP - playerDamage);
    
    setTimeout(() => {
      addToBattleLog(`Dealt ${playerDamage} damage!`, 'damage');
    }, 700);

    setBattleState(prev => ({
      ...prev,
      enemyHP: newEnemyHP,
      isPlayerTurn: false
    }));

    if (newEnemyHP <= 0) {
      setTimeout(() => {
        addToBattleLog(`${enemyPokemon.name} fainted!`, 'faint');
        setBattleEnd({
          winner: playerPokemon,
          loser: enemyPokemon,
          isPlayerWinner: true
        });
        setBattleState(prev => ({ ...prev, battleEnded: true }));
      }, 1000);
      return;
    }

    // Enemy's turn
    setTimeout(() => {
      const enemyMove = getEnemyMove();
      addToBattleLog(`${enemyPokemon.name} used ${enemyMove.name}!`, 'enemy');
      
      setTimeout(() => {
        playAttackAnimation(false, enemyMove.type, enemyMove.name);
      }, 200);

      const enemyDamage = calculateDamage(enemyMove);
      const newPlayerHP = Math.max(0, battleState.playerHP - enemyDamage);

      setTimeout(() => {
        addToBattleLog(`Dealt ${enemyDamage} damage!`, 'damage');
      }, 700);

      setBattleState(prev => ({
        ...prev,
        playerHP: newPlayerHP,
        isPlayerTurn: true
      }));

      if (newPlayerHP <= 0) {
        setTimeout(() => {
          addToBattleLog(`${playerPokemon.name} fainted!`, 'faint');
          setBattleEnd({
            winner: enemyPokemon,
            loser: playerPokemon,
            isPlayerWinner: false
          });
          setBattleState(prev => ({ ...prev, battleEnded: true }));
        }, 1000);
        return;
      }
    }, 1500);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-black text-gray-100">
      {/* Battle Scene */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1"
          style={{
            backgroundImage: "radial-gradient(circle, #00ff00, #003300 80%)",
            backgroundSize: "300% 300%",
            animation: "pulse 4s infinite alternate",
            opacity: 0.1,
          }}
        />
        <Scene3D 
          playerPokemon={{...playerPokemon, hp: battleState.playerHP}}
          enemyPokemon={{...enemyPokemon, hp: battleState.enemyHP}}
        />
      </div>

      {/* Battle Controls */}
      <div className="h-48 grid grid-cols-2 gap-4 p-4 bg-black border-t-2 border-green-600">
          {/* Moves */}
          <div className="bg-black bg-opacity-80 p-4 rounded-lg border border-green-600 shadow-neon">
            <div className="grid grid-cols-2 gap-2 h-full">
              {playerPokemon.moves.map((move, index) => (
                <button
                  key={index}
                  onClick={() => handleMove(move)}
                  disabled={!battleState.isPlayerTurn || battleState.battleEnded}
                  className={`
                    bg-green-800 hover:bg-green-700 rounded p-3 text-left shadow-lg 
                    text-neon-green transition duration-200
                    ${(!battleState.isPlayerTurn || battleState.battleEnded) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="font-bold">{move.name}</div>
                  <div className="text-sm text-green-300">
                    PP: {move.pp}
                    <span className="ml-2">Type: {move.type}</span>
                  </div>
                </button>
              ))}
            </div>
        </div>

        {/* Battle Log */}
        <div className="bg-black bg-opacity-80 p-4 rounded-lg border border-green-600 shadow-neon overflow-y-auto">
          <div className="space-y-2">
            {battleLog.map((log, index) => (
              <div 
                key={index} 
                className={`text-sm log-${log.type}`}
              >
                {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {battleEnd && (
        <BattleEndScreen
          winner={battleEnd.winner}
          loser={battleEnd.loser}
          isPlayerWinner={battleEnd.isPlayerWinner}
          onRematch={() => {
            setBattleState({
              playerHP: playerPokemon.hp,
              enemyHP: enemyPokemon.hp,
              isPlayerTurn: true,
              battleEnded: false
            });
            setBattleEnd(null);
            setBattleLog([
              { message: `Wild ${enemyPokemon.name} appeared!`, type: 'system' },
              { message: `Go! ${playerPokemon.name}!`, type: 'system' },
            ]);
          }}
          onHome={() => {
            window.location.reload();
          }}
        />
      )}

      <style jsx>{`
        .text-neon-green {
          color: #00ff00;
        }
        .shadow-neon {
          box-shadow: 0 0 10px #00ff00, 0 0 30px #00ff00, 0 0 60px #00ff00;
        }
      `}</style>
    </div>
  );
};

export default PokemonBattle;