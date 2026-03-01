import React, { useMemo } from 'react';
import { generatePool } from '../utils/selection';
import { ArrowLeft, BarChart2, Target } from 'lucide-react';
import { Container, Typography, IconButton, PageTransition } from './UI';

export default function Stats({ store, onBack }: any) {
  const pool = useMemo(() => generatePool(store.data), [store.data]);

  const stats = useMemo(() => {
    const total = pool.length;
    const average = pool.reduce((acc, curr) => acc + curr.score, 0) / (total || 1);
    const mastered = pool.filter(i => i.score >= 90).length;
    const learning = pool.filter(i => i.score > 10 && i.score < 90).length;
    const struggling = pool.filter(i => i.score <= 10).length;

    return { total, average, mastered, learning, struggling };
  }, [pool]);

  const sortedPool = useMemo(() => {
    return [...pool].sort((a, b) => a.score - b.score);
  }, [pool]);

  return (
    <PageTransition>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between p-8 pb-4 sticky top-0 bg-inherit z-10">
          <IconButton onClick={onBack} className="text-zinc-400 dark:text-zinc-600">
            <ArrowLeft size={14} />
            <span>Back</span>
          </IconButton>
          <Typography.Label className="text-black dark:text-white font-bold">Mastery</Typography.Label>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-20">
          <div className="mt-8 mb-16 grid grid-cols-2 gap-8">
            <div>
              <Typography.Label className="mb-2">Average</Typography.Label>
              <div className="text-4xl font-light">{Math.round(stats.average)}%</div>
            </div>
            <div>
              <Typography.Label className="mb-2">Mastered</Typography.Label>
              <div className="text-4xl font-light">{stats.mastered}</div>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <Typography.Label className="mb-6 flex items-center space-x-2">
                <Target size={12} />
                <span>Struggling Items</span>
              </Typography.Label>
              <div className="space-y-4">
                {sortedPool.slice(0, 10).map((item) => (
                  <div key={item.id} className="flex justify-between items-baseline border-b border-zinc-50 dark:border-zinc-900 pb-2">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-tighter text-zinc-300 dark:text-zinc-700 mb-1">
                        {item.type.replace('n2p', 'Num → Peg').replace('p2n', 'Peg → Num')}
                      </span>
                      <div className="text-lg font-medium">
                        {item.question} <span className="text-zinc-300 dark:text-zinc-700 mx-2">→</span> {item.answer}
                      </div>
                    </div>
                    <Typography.Mono className="text-xs text-red-400">{Math.round(item.score)}%</Typography.Mono>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography.Label className="mb-6 flex items-center space-x-2">
                <BarChart2 size={12} />
                <span>All Items</span>
              </Typography.Label>
              <div className="grid grid-cols-5 gap-2">
                {sortedPool.map((item) => (
                  <div 
                    key={item.id} 
                    title={`${item.question}: ${Math.round(item.score)}%`}
                    className={`aspect-square rounded-sm transition-colors ${
                      item.score >= 90 ? 'bg-current' : 
                      item.score >= 70 ? 'bg-zinc-400 dark:bg-zinc-600' : 
                      item.score >= 40 ? 'bg-zinc-200 dark:bg-zinc-800' : 
                      'bg-zinc-100 dark:bg-zinc-900'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-4 text-[8px] uppercase tracking-widest text-zinc-300 dark:text-zinc-700">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-zinc-100 dark:bg-zinc-900 rounded-sm" />
                  <span>New</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                  <span>Learning</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-sm" />
                  <span>Known</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-current rounded-sm" />
                  <span>Mastered</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

