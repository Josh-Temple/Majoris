import { AppData } from '../store';

export interface TrainingItem {
  id: string;
  type: 'd2p' | 'p2d' | 'n2p' | 'p2n';
  question: string;
  answer: string;
  score: number;
  lastSeen: number;
}

export function generatePool(data: AppData): TrainingItem[] {
  const pool: TrainingItem[] = [];
  
  // Number <-> Peg (0-9, 00-99)
  const allNumbers = [
    ...Array.from({length: 10}, (_, i) => i.toString()), 
    ...Array.from({length: 100}, (_, i) => i.toString().padStart(2, '0'))
  ];
  
  const directions = data.questionDirections || { n2p: true, p2n: true };
  
  for (const num of allNumbers) {
    const peg = data.pegs[num];
    if (peg && peg.trim() !== '') {
      if (directions.n2p) {
        const scoreDataN2P = data.scores[`n2p-${num}`] || { score: 50, lastSeen: 0 };
        pool.push({
          id: `n2p-${num}`,
          type: 'n2p',
          question: num,
          answer: peg,
          score: scoreDataN2P.score,
          lastSeen: scoreDataN2P.lastSeen,
        });
      }

      if (directions.p2n) {
        const scoreDataP2N = data.scores[`p2n-${num}`] || { score: 50, lastSeen: 0 };
        pool.push({
          id: `p2n-${num}`,
          type: 'p2n',
          question: peg,
          answer: num,
          score: scoreDataP2N.score,
          lastSeen: scoreDataP2N.lastSeen,
        });
      }
    }
  }

  return pool;
}

export function selectNextItem(pool: TrainingItem[], recentIds: string[]): TrainingItem {
  if (pool.length === 0) throw new Error("Pool is empty");

  // Exploration rate 15%
  if (Math.random() < 0.15) {
    const available = pool.filter(i => !recentIds.includes(i.id));
    if (available.length > 0) {
      return available[Math.floor(Math.random() * available.length)];
    }
  }

  const now = Date.now();
  let totalWeight = 0;
  const weights = pool.map(item => {
    if (recentIds.includes(item.id)) return 0;
    
    const timeSinceSeen = now - item.lastSeen;
    const notSeenBoost = item.lastSeen === 0 ? 5000 : Math.min(5000, timeSinceSeen / 10000); 
    
    const weight = Math.pow(101 - item.score, 2) + notSeenBoost;
    totalWeight += weight;
    return weight;
  });

  if (totalWeight === 0) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  let r = Math.random() * totalWeight;
  for (let i = 0; i < pool.length; i++) {
    if (weights[i] === 0) continue;
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}
