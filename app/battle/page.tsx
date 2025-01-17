// app/battle/page.tsx
'use client';

import PokemonBattle from '../components/battle/PokemonBattle';
import { playerPokemon, enemyPokemon } from '../data/battleData';

export default function BattlePage() {
  return <PokemonBattle playerPokemon={playerPokemon} enemyPokemon={enemyPokemon} />;
}