// src/app/data/battleData.ts

export interface PokemonMove {
  name: string;
  pp: string;
  type: string;
  damage: number;
}

export interface PokemonData {
  name: string;
  sprite_url: string;
  model_path?: string;
  title?: string;
  description?: string;
  level: number;
  hp: number;
  moves: PokemonMove[];
}

export const MODEL_DATA: Record<string, PokemonData> = {
  'cell phone': {
    model_path: '/models/cellphone.glb',
    sprite_url: '/sprites/cellphone.jpg',
    name: 'Callix',
    title: 'the Pixel Plasma',
    description: 'A sleek, modern smartphone with a vibrant, gradient color scheme of cyan and magenta. Its body is adorned with glowing, holographic buttons, while its screen displays a dynamic, pulsating aura.',
    level: 50,
    hp: 100,
    moves: [
      { name: "Digital Surge", pp: "10/10", type: "Electric", damage: 30 },
      { name: "Screen Flash", pp: "15/15", type: "Light", damage: 25 },
      { name: "Data Pulse", pp: "20/20", type: "Psychic", damage: 35 },
      { name: "Hologram Shield", pp: "5/5", type: "Defense", damage: 20 }
    ]
  },
  'bottle': {
    model_path: '/models/bottle.glb',
    sprite_url: '/sprites/bottle.jpg',
    name: 'Glassaur',
    title: 'the Eternal Container',
    description: 'A large, ancient, and intricately decorated bottle with a cork stopper. Its body is a deep ocean blue, adorned with golden vines that come alive. The cork stopper transforms into a fierce, glowing face in battle.',
    level: 50,
    hp: 100,
    moves: [
      { name: "Liquid Lance", pp: "10/10", type: "Water", damage: 35 },
      { name: "Cork Cannon", pp: "15/15", type: "Normal", damage: 25 },
      { name: "Vine Wrap", pp: "20/20", type: "Grass", damage: 30 },
      { name: "Glass Guard", pp: "5/5", type: "Defense", damage: 20 }
    ]
  },
  'glasses': {
    sprite_url: '/sprites/glasses.jpg',
    name: 'Spectacled Spectra',
    title: 'the Luminous Observer',
    description: 'A luminous being evolved from a pair of antique spectacles. Its main body takes the form of a sturdy, round frame, with two transparent, jewel-like lenses serving as eyes. Tiny, flexible arm-like projections sprout from the sides of the frame, acting as sensory feelers.',
    level: 50,
    hp: 100,
    moves: [
      { name: "Crystal Beam", pp: "10/10", type: "Light", damage: 35 },
      { name: "Focus Lens", pp: "15/15", type: "Psychic", damage: 30 },
      { name: "Clarity Guard", pp: "5/5", type: "Defense", damage: 20 },
      { name: "Spectral Flash", pp: "20/20", type: "Light", damage: 25 }
    ]
  },
  'wallet': {
    sprite_url: '/sprites/wallet.jpg',
    name: 'Billfold',
    title: 'the Treasure Guardian',
    description: 'A unique being evolved from an everyday wallet. Its main body takes the shape of a thick, leather pouch, with a prominent coin compartment on its back resembling a small, rounded hump. Two elongated flaps serve as appendages, acting as both defensive shields and offensive blades.',
    level: 50,
    hp: 100,
    moves: [
      { name: "Gold Rush", pp: "10/10", type: "Metal", damage: 35 },
      { name: "Leather Shield", pp: "5/5", type: "Defense", damage: 20 },
      { name: "Card Slash", pp: "15/15", type: "Normal", damage: 30 },
      { name: "Coin Barrage", pp: "20/20", type: "Metal", damage: 25 }
    ]
  },
  'book': {
    sprite_url: '/sprites/book.jpg',
    name: 'Libromon',
    title: 'the Mystical Tome',
    description: 'A towering tome with a cover adorned with intricate, glowing runes. Its pages fan out like wings, serving as both a protective barrier and a means of flight. The spine pulses with soft, blue energy, while quill-like protrusions extend from its sides.',
    level: 50,
    hp: 100,
    moves: [
      { name: "Quillstorm", pp: "10/10", type: "Flying", damage: 35 },
      { name: "Page Barrier", pp: "5/5", type: "Defense", damage: 20 },
      { name: "Runic Blast", pp: "15/15", type: "Psychic", damage: 30 },
      { name: "Knowledge Surge", pp: "20/20", type: "Psychic", damage: 25 }
    ]
  },
  'chair': {
    sprite_url: '/sprites/chair.jpg',
    name: 'Sit-Sentinel',
    title: 'the Frozen Throne',
    description: 'An evolved mystical, sentient chair. Its main body resembles an icy, armored armchair, complete with wings on the side and icy talon-like feet. Covering its back and sides are ice shards that protrude out.',
    level: 50,
    hp: 100,
    moves: [
      { name: "Frost Throne", pp: "10/10", type: "Ice", damage: 35 },
      { name: "Wing Guard", pp: "5/5", type: "Defense", damage: 20 },
      { name: "Ice Shard Storm", pp: "15/15", type: "Ice", damage: 30 },
      { name: "Talon Strike", pp: "20/20", type: "Normal", damage: 25 }
    ]
  },

  'vase': {
    sprite_url: '/sprites/vase.jpg',
    name: 'Vase',
    title: 'the Enigmatic Artifact',
    description: 'A watercolor illustration of The creature is known as the Vasex, a Pokémon that evolved from an ancient vase found deep within the ruins of an ancient civilization. Its main body is a smooth, elongated structure reminiscent of a traditional vase, with a wide base and a tapering neck. The Vasexs body is adorned with intricate, glazed patterns that shimmer with a subtle iridescence, resembling the delicate decorations found on ancient pottery. Its primary appendages are two graceful, flowing stems that sprout from the base of the body. These stems are flexible and can bend and twist to manipulate objects with surprising precision. The This character embodies the essence of a vase.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Pot Shatter', pp: '10/10', type: 'Fighting', damage: 40 },
      { name: 'Glaze Guard', pp: '15/15', type: 'Defense', damage: 0 },
      { name: 'Vase Twirl', pp: '20/20', type: 'Normal', damage: 25 },
      { name: 'Iridescent Glaze', pp: '10/10', type: 'Water', damage: 35 }
    ]
  },
  'laptop': {
    sprite_url: '/sprites/laptop.jpg',
    name: 'Bytenoid',
    title: 'the Digital Dynamo',
    description: 'A watercolor illustration of The creature, known as Bytenoid, evolved from a Laptop in the digital realm of Cyberia. Its main body resembles a sleek, polished aluminum shell, with a glowing, semi-transparent screen serving as its primary sensory organ. Keyboard keys protrude from its underside, acting as sturdy legs, while the touchpad functions as a flexible, responsive tail. Bytenoids screen changes color and pattern based on its emotions, displaying vibrant hues of blue for calmness, fiery red for anger, and electric green for excitement. Its signature element is Electric, a testament to its rapid processing power and speed. By This character embodies the essence of a Laptop.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Data Burst', pp: '10/10', type: 'Electric', damage: 35 },
      { name: 'Keyboard Crunches', pp: '15/15', type: 'Normal', damage: 20 },
      { name: 'Screen Shock', pp: '20/20', type: 'Electric', damage: 25 },
      { name: 'Virus Shield', pp: '5/5', type: 'Psychic', damage: 0 }
    ]
  },
  'watch': {
    sprite_url: '/sprites/watch.jpg',
    name: 'Temporal Tick',
    title: 'the Chronomaster',
    description: 'A watercolor illustration of The Watch-mon has a spherical, polished body resembling an antique pocket watch, adorned with intricate, golden engravings. Its metallic hands sweep across its face, serving as limbs, while the watchs crown functions as a flexible, multi-jointed neck. The minute and hour hands have transformed into sharp, movable appendages, used for grasping and manipulating objects. This Time-Type Watch-mon has the unique ability to manipulate time within a small area, either slowing down or speeding up the flow of time. This skill, known as Temporal Tick, can be used to either prolong battles or quickly move through long periods of time This character embodies the essence of a Watch.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Temporal Tick', pp: '5/5', type: 'Time', damage: 0 },
      { name: 'Winding Wave', pp: '10/10', type: 'Water', damage: 30 },
      { name: 'Clockwork Clutch', pp: '15/15', type: 'Steel', damage: 25 },
      { name: 'Hourglass Halt', pp: '20/20', type: 'Ground', damage: 0 }
    ]
  },
  'pen': {
    sprite_url: '/sprites/pen.jpg',
    name: 'Inkling',
    title: 'the Arcane Scribe',
    description: 'A watercolor illustration of The creature is known as the Inkling, a Pokémon inspired by the Pen. Its main body resembles a sleek, metallic quill, with a finely pointed tip that glows with an electric blue hue. Two flexible, feather-like appendages extend from its back, allowing it to write on surfaces with ease. The Inklings primary mode of movement is by rolling across the ground, much like a pen rolls across a desk. Its signature element is Electric, reflecting its quick, agile nature and the charge it generates when writing. The Inkling possesses a unique ability called Ink Splash, which allows it to spurt a stream This character embodies the essence of a Pen.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Rolling Ink', pp: '10/10', type: 'Special', damage: 25 },
      { name: 'Electroquill', pp: '8/8', type: 'Electric', damage: 30 },
      { name: 'Feather Dash', pp: '15/15', type: 'Flying', damage: 15 },
      { name: 'Ink Shield', pp: '15/15', type: 'None', damage: 0 }
    ]
  },
  'keys': {
    sprite_url: '/sprites/keys.jpg',
    name: 'Lockmaster',
    title: 'the Gatekeeper',
    description: 'A watercolor illustration of The creature is known as the Lockmaster, a key-inspired Pokémon that evolved from the ancient symbiosis of keys and locksmiths. Its main body resembles a large, intricately designed key, with a long, slender shaft and a sprawling, multi-toothed bit at the front. The Lockmasters head is a stylized representation of a lock, complete with a dial and a small, glowing aperture for its single, piercing eye. Six long, flexible ribbons extend from the Lockmasters body, each ending in a small, sharp hook. These ribbons serve as both arms and legs, allowing the Lock This character embodies the essence of a Keys.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Key Rip', pp: '10/10', type: 'Normal', damage: 30 },
      { name: 'Lock Pick', pp: '15/15', type: 'Fairy', damage: 25 },
      { name: 'Ribbon Whip', pp: '20/20', type: 'Ghost', damage: 20 },
      { name: 'Lock Barrier', pp: '5/5', type: 'Steel', damage: 0 }
    ]
  },
  'potato': {
    sprite_url: '/sprites/potato.jpg',
    name: 'Starchy Stumbler',
    title: 'the Verdant Titan',
    description: 'A watercolor illustration of The creature is known as the Starchy Stumbler, a Potato Pokémon that has evolved from the common tuber found in the dense soil of the Verdant Valley. Its main body is a plump, oblong shape, resembling a colossal potato with a rough, earthy exterior. The Starchy Stumblers skin is covered in a network of cracks and ridges, mimicking the natural texture of a potato, while its distinctive markings resemble the eyes and facial features of a potato when it is cut in half. Its appendages are long, thin, and tubular, similar to potato sprouts. These slender stalks are used This character embodies the essence of a potato.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Mash Attack', pp: '10/10', type: 'Normal', damage: 40 },
      { name: 'Sprout Shield', pp: '15/15', type: 'Grass', damage: 0 },
      { name: 'Tuber Toss', pp: '20/20', type: 'Ground', damage: 30 },
      { name: 'Root Burst', pp: '15/15', type: 'Water', damage: 25 }
    ]
  },

  'shoes': {
    sprite_url: '/sprites/shoes.jpg',
    name: 'Solemite',
    title: 'the Mystery Object',
    description: 'A watercolor illustration of The creature is known as Solemite, a Pokémon evolved from a discarded pair of athletic shoes. Its main body resembles a sturdy sneaker, complete with a rubber sole and fabric upper. The laces have transformed into whip-like appendages, capable of striking opponents at great speed. Solemites signature element is Ground, reflecting the shoes original purpose for running and support. Its unique markings mimic the wear patterns of well-used athletic shoes, each one telling a story of battles past. Solemites most notable ability is Boost Run, which allows it to charge up its energy by running in place. This character embodies the essence of a shoes.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Lace Whip', pp: '10/10', type: 'Ground', damage: 30 },
      { name: 'Step Stomp', pp: '8/8', type: 'Ground', damage: 40 },
      { name: 'Boost Run', pp: '6/6', type: 'None', damage: 0 },
      { name: 'Sole Slide', pp: '15/15', type: 'Ground', damage: 25 }
    ]
  },
  'hat': {
    sprite_url: '/sprites/hat.jpg',
    name: 'Brimboon',
    title: 'the Mystery Object',
    description: 'A watercolor illustration of The creature is known as the Brimboon, a Pokémon evolved from a wide-brimmed sun hat. Its main body takes the shape of a flat, broad disc, reminiscent of the hats brim. Four long, flexible, leaf-like appendages sprout from the center of its body, serving as its primary means of locomotion. The Brimboons body is adorned with intricate, woven patterns that mimic the weave of the original hat, while its edge is adorned with colorful, feather-like plumes that flutter in the wind. Its eyes are two small, bead-like orbs set within the This character embodies the essence of a hat.',
    level: 50,
    hp: 100,
    moves: [
      { name: 'Wind Sway', pp: '10/10', type: 'Grass', damage: 30 },
      { name: 'Brim Bash', pp: '15/15', type: 'Fighting', damage: 25 },
      { name: 'Feather Fortress', pp: '20/20', type: 'Flying', damage: 0 },
      { name: 'Sun Hat Shield', pp: '5/5', type: 'Normal', damage: 0 }
    ]
  },};

export const playerPokemon = MODEL_DATA['bottle'];
export const enemyPokemon = MODEL_DATA['cell phone'];