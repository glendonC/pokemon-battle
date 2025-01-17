'use client';

import { useState } from 'react';
import NotificationSystem from '@/app/components/notification/NotificationSystem';
import ScannerInterface from '@/app/components/scanner/ScannerInterface';
import PokemonBattle from '@/app/components/battle/PokemonBattle';
import { PokemonData, MODEL_DATA } from '@/app/data/battleData';
import PreBattleScreen from './components/battle/PreBattleScreen';
import GeneratingScreen from './components/battle/GeneratingScreen';

export default function Home() {
  const [gameState, setGameState] = useState<'waiting' | 'scanning' | 'generating' | 'pre-battle' | 'battle'>('waiting');
  const [playerCharacter, setPlayerCharacter] = useState<PokemonData | null>(null);
  const [enemyCharacter, setEnemyCharacter] = useState<PokemonData | null>(null);
  const [scannedObject, setScannedObject] = useState<string>(''); // Add this line

  const handleScanStart = () => {
    console.log("Scan started"); // Debug log
    setGameState('scanning');
  };

  const handleScanComplete = async (characterData: PokemonData) => {
    console.log("Scan completed with full character data:", JSON.stringify(characterData, null, 2));
    setScannedObject(characterData.name.split(' ')[0]); // Store the base object name
    setGameState('generating');
    
    // Select a random enemy
    const availableEnemies = Object.values(MODEL_DATA).filter(
      char => char.name !== characterData.name
    );
    const randomEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
    
    // Simulate generation time (you can remove this if the actual generation provides enough delay)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setPlayerCharacter(characterData);
    setEnemyCharacter(randomEnemy);
    setGameState('pre-battle');
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Debug display - remove this later */}
      <div className="fixed top-0 left-0 bg-black text-white p-2 text-xs z-50">
        Current state: {gameState}
      </div>
  
      {gameState === 'waiting' && (
        <NotificationSystem onScanStart={handleScanStart} />
      )}
      
      {gameState === 'scanning' && (
        <ScannerInterface onComplete={handleScanComplete} />
      )}

      {gameState === 'generating' && (
        <GeneratingScreen objectName={scannedObject} />
      )}
  
      {gameState === 'pre-battle' && playerCharacter && enemyCharacter && (
        <PreBattleScreen
          playerPokemon={playerCharacter}
          enemyPokemon={enemyCharacter}
          onBattleStart={() => setGameState('battle')}
        />
      )}
      
      {gameState === 'battle' && playerCharacter && enemyCharacter && (
        <PokemonBattle 
          playerPokemon={playerCharacter}
          enemyPokemon={enemyCharacter}
        />
      )}
    </main>
  );
}