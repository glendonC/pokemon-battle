// app/utils/battleAnimations.ts

interface AnimationEffect {
  duration: number;
  class: string;
  message?: string;
  color: string;
}

const TYPE_EFFECTS: Record<string, AnimationEffect> = {
  'Normal': {
    duration: 400,
    class: 'basic-hit',
    message: 'POW!',
    color: '#FFFFFF'
  },
  'Water': {
    duration: 600,
    class: 'water-splash',
    message: 'SPLASH!',
    color: '#3498db'
  },
  'Fire': {
    duration: 500,
    class: 'fire-burst',
    message: 'BURN!',
    color: '#e74c3c'
  },
  'Electric': {
    duration: 300,
    class: 'electric-shock',
    message: 'ZAP!',
    color: '#f1c40f'
  },
  'Ice': {
    duration: 500,
    class: 'ice-freeze',
    message: 'FREEZE!',
    color: '#00f7ff'
  },
  'Fighting': {
    duration: 400,
    class: 'impact-burst',
    message: 'SMASH!',
    color: '#e67e22'
  },
  'Defense': {
    duration: 700,
    class: 'shield-glow',
    message: 'GUARD!',
    color: '#2ecc71'
  },
  'Psychic': {
    duration: 600,
    class: 'psychic-waves',
    message: 'WARP!',
    color: '#9b59b6'
  },
  'Light': {
    duration: 500,
    class: 'light-flash',
    message: 'FLASH!',
    color: '#f1c40f'
  },
  'Metal': {
    duration: 500,
    class: 'metal-clang',
    message: 'CLANG!',
    color: '#95a5a6'
  },
  'Grass': {
    duration: 500,
    class: 'grass-rustle',
    message: 'SLASH!',
    color: '#27ae60'
  }
};

const createEffectElement = (message: string, x: number, y: number, color: string) => {
  const element = document.createElement('div');
  element.className = 'battle-effect-text';
  element.textContent = message;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.color = color;
  
  // Add color-based glow effect
  element.style.textShadow = `0 0 10px ${color}, 2px 2px 0 #000`;
  
  document.body.appendChild(element);

  // Add random slight offset to prevent text overlapping
  const offset = Math.random() * 40 - 20;
  element.style.transform = `translate(${offset}px, 0)`;

  setTimeout(() => element.remove(), 1000);
};

export const playAttackAnimation = (isPlayer: boolean, moveType: string = 'Normal', moveName: string) => {
  // Get both Pokemon elements
  const attackerElement = isPlayer ? 
    document.querySelector('.player-pokemon') : 
    document.querySelector('.enemy-pokemon');
    
  const defenderElement = isPlayer ? 
    document.querySelector('.enemy-pokemon') : 
    document.querySelector('.player-pokemon');

  if (!attackerElement || !defenderElement) return;

  const effect = TYPE_EFFECTS[moveType] || TYPE_EFFECTS['Normal'];

  // Add type-specific effect class to attacker for charge-up
  attackerElement.classList.add(`${effect.class}-charge`);

  // Basic lunge animation
  attackerElement.classList.add(isPlayer ? 'lunge-right' : 'lunge-left');

  // After lunge reaches its peak, start defender animations
  setTimeout(() => {
    // Remove charge effect
    attackerElement.classList.remove(`${effect.class}-charge`);
    
    // Add type-specific effect to defender
    defenderElement.classList.add(effect.class);
    defenderElement.classList.add('shake-animation');
    defenderElement.classList.add('damage-flash');
    defenderElement.classList.add('recoil');

    // Create and position effect text
    const rect = defenderElement.getBoundingClientRect();
    createEffectElement(
      effect.message || 'HIT!', 
      rect.x + rect.width / 2, 
      rect.y,
      effect.color
    );

    const moveNameToUse = moveName || 'DEFAULT_MOVE'; // Use the original moveName or a default

    // Add move name with slight delay and offset
    setTimeout(() => {
      createEffectElement(
        moveNameToUse + '!',
        rect.x + rect.width / 2,
        rect.y + 40,
        effect.color
      );
    }, 200);

    // Remove defender classes after animation
    setTimeout(() => {
      defenderElement.classList.remove(effect.class);
      defenderElement.classList.remove('shake-animation');
      defenderElement.classList.remove('damage-flash');
      defenderElement.classList.remove('recoil');
    }, effect.duration);
  }, 200);

  // Remove attacker classes after animation
  setTimeout(() => {
    attackerElement.classList.remove('lunge-right');
    attackerElement.classList.remove('lunge-left');
  }, 400);
};