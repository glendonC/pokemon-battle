// src/app/data/battleData.ts

export interface Move {
    name: string;
    pp: string;
    type: string;
  }
  
  export interface PokemonData {
    model_path: string;
    name: string;
    title: string;
    description: string;
    level: number;
    moves: Move[];
  }
  
  export const MODEL_DATA: Record<string, PokemonData> = {
    'cell phone': {
      model_path: '/models/cellphone.glb',
      name: 'Callix',
      title: 'the Pixel Plasma Pokémon',
      description: 'A sleek, modern smartphone with a vibrant, gradient color scheme of cyan and magenta. Its body is adorned with glowing, holographic buttons, while its screen displays a dynamic, pulsating aura.',
      level: 50,
      moves: [
        { name: "Digital Surge", pp: "10/10", type: "Electric" },
        { name: "Screen Flash", pp: "15/15", type: "Light" },
        { name: "Data Pulse", pp: "20/20", type: "Psychic" },
        { name: "Hologram Shield", pp: "5/5", type: "Defense" }
      ]
    },
    'bottle': {
      model_path: '/models/bottle.glb',
      name: 'Glassaur',
      title: 'the Eternal Container',
      description: 'A large, ancient, and intricately decorated bottle with a cork stopper. Its body is a deep ocean blue, adorned with golden vines that come alive. The cork stopper transforms into a fierce, glowing face in battle.',
      level: 50,
      moves: [
        { name: "Liquid Lance", pp: "10/10", type: "Water" },
        { name: "Cork Cannon", pp: "15/15", type: "Normal" },
        { name: "Vine Wrap", pp: "20/20", type: "Grass" },
        { name: "Glass Guard", pp: "5/5", type: "Defense" }
      ]
    }
  };
  
  export type PokemonKey = keyof typeof MODEL_DATA;