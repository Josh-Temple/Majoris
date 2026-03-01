import { useState, useEffect } from 'react';

export interface ScoreData {
  score: number;
  lastSeen: number;
  bad: number;
  good: number;
  easy: number;
}

export interface AppData {
  majorMap: Record<string, string>;
  pegs: Record<string, string>;
  scores: Record<string, ScoreData>;
  sessionSize: number;
  questionDirections: {
    n2p: boolean;
    p2n: boolean;
  };
  darkMode: boolean;
}

const defaultMajorMap: Record<string, string> = {
  '0': 'S, Z',
  '1': 'T, D',
  '2': 'N',
  '3': 'M',
  '4': 'R',
  '5': 'L',
  '6': 'J, SH, CH, soft G',
  '7': 'K, hard C, hard G, Q',
  '8': 'F, V',
  '9': 'B, P',
};

const defaultPegs: Record<string, string> = {
  '0': 'sea', '1': 'tea', '2': 'knee', '3': 'emu', '4': 'ray',
  '5': 'law', '6': 'shoe', '7': 'key', '8': 'ivy', '9': 'bee',
  '00': 'Sauce', '01': 'Seat', '02': 'Sun', '03': 'Seam', '04': 'Zero',
  '05': 'Seal', '06': 'Sage', '07': 'Sock', '08': 'Safe', '09': 'Soap',
  '10': 'Toes', '11': 'Tot', '12': 'Tin', '13': 'Tomb', '14': 'Tire',
  '15': 'Towel', '16': 'Dish', '17': 'Tack', '18': 'Dove', '19': 'Tape',
  '20': 'Nose', '21': 'Net', '22': 'Nun', '23': 'Name', '24': 'Nero',
  '25': 'Nail', '26': 'Notch', '27': 'Neck', '28': 'Knife', '29': 'Nib',
  '30': 'Mouse', '31': 'Mat', '32': 'Moon', '33': 'Mummy', '34': 'Mower',
  '35': 'Mole', '36': 'Match', '37': 'Mug', '38': 'Movie', '39': 'Map',
  '40': 'Rose', '41': 'Rod', '42': 'Rain', '43': 'Ram', '44': 'Rower',
  '45': 'Rail', '46': 'Roach', '47': 'Rock', '48': 'Roof', '49': 'Rope',
  '50': 'Lace', '51': 'Lad', '52': 'Lion', '53': 'Lime', '54': 'Lure',
  '55': 'Lily', '56': 'Leash', '57': 'Log', '58': 'Leaf', '59': 'Lip',
  '60': 'Cheese', '61': 'Sheet', '62': 'Chain', '63': 'Chime', '64': 'Chair',
  '65': 'Jail', '66': 'Judge', '67': 'Chalk', '68': 'Chef', '69': 'Chip',
  '70': 'Case', '71': 'Cat', '72': 'Coin', '73': 'Comb', '74': 'Car',
  '75': 'Coal', '76': 'Cage', '77': 'Cake', '78': 'Cuff', '79': 'Cap',
  '80': 'Face', '81': 'Food', '82': 'Phone', '83': 'Foam', '84': 'Fire',
  '85': 'File', '86': 'Fish', '87': 'Fog', '88': 'Fife', '89': 'Fib',
  '90': 'Bus', '91': 'Bat', '92': 'Bone', '93': 'Beam', '94': 'Bear',
  '95': 'Bell', '96': 'Bush', '97': 'Book', '98': 'Beef', '99': 'Pipe'
};

export function useAppStore() {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('majorSystemData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          majorMap: parsed.majorMap || defaultMajorMap,
          pegs: parsed.pegs || defaultPegs,
          scores: parsed.scores || {},
          sessionSize: parsed.sessionSize || 10,
          questionDirections: parsed.questionDirections || { n2p: true, p2n: true },
          darkMode: parsed.darkMode ?? false,
        };
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    return { 
      majorMap: defaultMajorMap, 
      pegs: defaultPegs, 
      scores: {}, 
      sessionSize: 10,
      questionDirections: { n2p: true, p2n: true },
      darkMode: false
    };
  });

  useEffect(() => {
    localStorage.setItem('majorSystemData', JSON.stringify(data));
  }, [data]);

  const updateScore = (id: string, grade: 'bad' | 'good' | 'easy') => {
    setData(prev => {
      const current = prev.scores[id] || { score: 50, lastSeen: 0, bad: 0, good: 0, easy: 0 };
      let newScore = current.score;
      if (grade === 'bad') newScore -= 12;
      else if (grade === 'good') newScore += 6;
      else if (grade === 'easy') newScore += 12;
      
      newScore = Math.max(0, Math.min(100, newScore));
      
      return {
        ...prev,
        scores: {
          ...prev.scores,
          [id]: {
            score: newScore,
            lastSeen: Date.now(),
            bad: current.bad + (grade === 'bad' ? 1 : 0),
            good: current.good + (grade === 'good' ? 1 : 0),
            easy: current.easy + (grade === 'easy' ? 1 : 0),
          }
        }
      };
    });
  };

  const updateMajorMap = (map: Record<string, string>) => setData(p => ({ ...p, majorMap: map }));
  const updatePegs = (pegs: Record<string, string>) => setData(p => ({ ...p, pegs }));
  const updateSessionSize = (size: number) => setData(p => ({ ...p, sessionSize: size }));
  const updateQuestionDirections = (directions: { n2p: boolean; p2n: boolean }) => setData(p => ({ ...p, questionDirections: directions }));
  const toggleDarkMode = () => setData(p => ({ ...p, darkMode: !p.darkMode }));
  const importData = (imported: AppData) => setData(imported);

  return { data, updateScore, updateMajorMap, updatePegs, updateSessionSize, updateQuestionDirections, toggleDarkMode, importData };
}
