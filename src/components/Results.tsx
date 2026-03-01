import React, { useMemo } from 'react';
import { generatePool } from '../utils/selection';
import { Frown, Smile, Zap, Home } from 'lucide-react';
import { Container, Typography, IconButton, PageTransition } from './UI';

export default function Results({ stats, store, onHome }: any) {
  const weakestItems = useMemo(() => {
    const pool = generatePool(store.data);
    return pool.sort((a, b) => a.score - b.score).slice(0, 10);
  }, [store.data]);

  return (
    <PageTransition>
      <Container className="overflow-y-auto">
        <div className="mt-12 mb-16">
          <Typography.H2 className="mb-2">Results</Typography.H2>
          <Typography.Mono className="text-sm text-zinc-400 dark:text-zinc-600">{stats.completed} completed</Typography.Mono>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-16 border-t border-b border-zinc-100 dark:border-zinc-900 py-8">
          <div>
            <Typography.Label className="flex items-center space-x-1 mb-2">
              <Frown size={10} />
              <span>Bad</span>
            </Typography.Label>
            <div className="text-3xl font-light">{stats.bad}</div>
          </div>
          <div>
            <Typography.Label className="flex items-center space-x-1 mb-2">
              <Smile size={10} />
              <span>Good</span>
            </Typography.Label>
            <div className="text-3xl font-light">{stats.good}</div>
          </div>
          <div>
            <Typography.Label className="flex items-center space-x-1 mb-2">
              <Zap size={10} />
              <span>Easy</span>
            </Typography.Label>
            <div className="text-3xl font-light">{stats.easy}</div>
          </div>
        </div>

        <div className="flex-1">
          <Typography.Label className="mb-6">Weakest</Typography.Label>
          <div className="space-y-4">
            {weakestItems.map((item) => (
              <div key={item.id} className="flex justify-between items-baseline">
                <div className="text-lg font-medium">
                  {item.question} <span className="text-zinc-300 dark:text-zinc-700 mx-2">→</span> {item.answer}
                </div>
                <Typography.Mono className="text-xs text-zinc-400 dark:text-zinc-600">
                  {Math.round(item.score)}
                </Typography.Mono>
              </div>
            ))}
          </div>
        </div>

        <IconButton onClick={onHome} className="mt-16 pb-8">
          <Home size={12} />
          <span>Home</span>
        </IconButton>
      </Container>
    </PageTransition>
  );
}


