import React, { useState } from 'react';
import { ArrowLeft, Check, Hash, List, Timer } from 'lucide-react';
import { Typography, IconButton, PageTransition, ListItem } from './UI';

export default function Settings({ store, onBack }: any) {
  const [tab, setTab] = useState<'general' | 'major' | 'pegs'>('general');
  const [majorMap, setMajorMap] = useState({ ...store.data.majorMap });
  const [pegs, setPegs] = useState({ ...store.data.pegs });
  const [sessionSize, setSessionSize] = useState(store.data.sessionSize || 10);
  const [directions, setDirections] = useState(store.data.questionDirections || { n2p: true, p2n: true });
  const [darkMode, setDarkMode] = useState(store.data.darkMode || false);

  const handleSave = () => {
    store.updateMajorMap(majorMap);
    store.updatePegs(pegs);
    store.updateSessionSize(Number(sessionSize));
    store.updateQuestionDirections(directions);
    if (darkMode !== store.data.darkMode) {
      store.toggleDarkMode();
    }
    onBack();
  };

  return (
    <PageTransition>
      <div className="flex-1 flex flex-col h-full">
        <div className="flex items-center justify-between p-8 pb-4 sticky top-0 bg-inherit z-10">
          <IconButton onClick={onBack} className="text-zinc-400 dark:text-zinc-600">
            <ArrowLeft size={14} />
            <span>Back</span>
          </IconButton>
          <IconButton onClick={handleSave} className="hover:text-zinc-500">
            <Check size={14} />
            <span>Save</span>
          </IconButton>
        </div>

        <div className="px-8 pb-4 sticky top-[60px] bg-inherit z-10 border-b border-zinc-100 dark:border-zinc-900 flex space-x-6">
          <IconButton 
            onClick={() => setTab('general')} 
            className={tab === 'general' ? 'text-current font-bold' : 'text-zinc-400 dark:text-zinc-600'}
          >
            <Timer size={12} />
            <span>General</span>
          </IconButton>
          <IconButton 
            onClick={() => setTab('major')} 
            className={tab === 'major' ? 'text-current font-bold' : 'text-zinc-400 dark:text-zinc-600'}
          >
            <Hash size={12} />
            <span>Major</span>
          </IconButton>
          <IconButton 
            onClick={() => setTab('pegs')} 
            className={tab === 'pegs' ? 'text-current font-bold' : 'text-zinc-400 dark:text-zinc-600'}
          >
            <List size={12} />
            <span>Pegs</span>
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pb-20">
          {tab === 'general' && (
            <div className="space-y-12">
              <section>
                <Typography.Label className="mb-6">Session Settings</Typography.Label>
                <ListItem label="Session Size">
                  <input 
                    type="number" 
                    value={sessionSize}
                    onChange={(e) => setSessionSize(e.target.value)}
                    className="outline-none text-xl font-medium bg-transparent w-full"
                    min="1"
                    max="100"
                  />
                </ListItem>
              </section>

              <section>
                <Typography.Label className="mb-6">Question Directions</Typography.Label>
                <div className="space-y-6">
                  <button 
                    onClick={() => setDirections({...directions, n2p: !directions.n2p})}
                    className="w-full text-left"
                  >
                    <ListItem label="Number → Peg" sublabel="e.g. 21 → Net">
                      <div className="flex justify-end -mt-8">
                        <div className={`w-4 h-4 rounded-full border transition-colors ${directions.n2p ? 'bg-current border-current' : 'border-zinc-200 dark:border-zinc-800'}`} />
                      </div>
                    </ListItem>
                  </button>

                  <button 
                    onClick={() => setDirections({...directions, p2n: !directions.p2n})}
                    className="w-full text-left"
                  >
                    <ListItem label="Peg → Number" sublabel="e.g. Net → 21">
                      <div className="flex justify-end -mt-8">
                        <div className={`w-4 h-4 rounded-full border transition-colors ${directions.p2n ? 'bg-current border-current' : 'border-zinc-200 dark:border-zinc-800'}`} />
                      </div>
                    </ListItem>
                  </button>
                  
                  {(!directions.n2p && !directions.p2n) && (
                    <Typography.Mono className="text-[10px] text-red-400">At least one direction must be enabled.</Typography.Mono>
                  )}
                </div>
              </section>

              <section>
                <Typography.Label className="mb-6">Appearance</Typography.Label>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-full text-left"
                >
                  <ListItem label="Dark Mode" sublabel="Minimalist dark aesthetic">
                    <div className="flex justify-end -mt-8">
                      <div className={`w-4 h-4 rounded-full border transition-colors ${darkMode ? 'bg-current border-current' : 'border-zinc-200 dark:border-zinc-800'}`} />
                    </div>
                  </ListItem>
                </button>
              </section>
            </div>
          )}

          {tab === 'major' && (
            <div className="space-y-6">
              {Array.from({length: 10}).map((_, i) => {
                const digit = i.toString();
                return (
                  <div key={digit} className="flex items-baseline border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <div className="w-12 text-2xl font-light text-zinc-400 dark:text-zinc-600">{digit}</div>
                    <input 
                      type="text" 
                      value={majorMap[digit] || ''}
                      onChange={(e) => setMajorMap({...majorMap, [digit]: e.target.value})}
                      className="flex-1 outline-none text-xl font-medium bg-transparent"
                      placeholder="..."
                    />
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'pegs' && (
            <div className="space-y-12">
              <div>
                <Typography.Label className="mb-6">0-9</Typography.Label>
                <div className="grid grid-cols-1 gap-4">
                  {Array.from({length: 10}).map((_, i) => {
                    const num = i.toString();
                    return (
                      <div key={num} className="flex items-baseline border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <Typography.Mono className="w-12 text-xl text-zinc-400 dark:text-zinc-600">{num}</Typography.Mono>
                        <input 
                          type="text" 
                          value={pegs[num] || ''}
                          onChange={(e) => setPegs({...pegs, [num]: e.target.value})}
                          className={`flex-1 outline-none text-lg font-medium bg-transparent ${!pegs[num] ? 'text-red-400' : 'text-current'}`}
                          placeholder="Missing"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <Typography.Label className="mb-6">00-99</Typography.Label>
                <div className="grid grid-cols-1 gap-4">
                  {Array.from({length: 100}).map((_, i) => {
                    const num = i.toString().padStart(2, '0');
                    return (
                      <div key={num} className="flex items-baseline border-b border-zinc-100 dark:border-zinc-900 pb-2">
                        <Typography.Mono className="w-12 text-xl text-zinc-400 dark:text-zinc-600">{num}</Typography.Mono>
                        <input 
                          type="text" 
                          value={pegs[num] || ''}
                          onChange={(e) => setPegs({...pegs, [num]: e.target.value})}
                          className={`flex-1 outline-none text-lg font-medium bg-transparent ${!pegs[num] ? 'text-red-400' : 'text-current'}`}
                          placeholder="Missing"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

