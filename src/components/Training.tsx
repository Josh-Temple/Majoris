import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Frown, Smile, Zap, X } from 'lucide-react';
import { generatePool, selectNextItem, TrainingItem } from '../utils/selection';
import { Container, Typography, IconButton, PageTransition } from './UI';

export default function Training({ mode, store, onBack, onFinish }: any) {
  const pool = useMemo(() => generatePool(store.data), [store.data]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<TrainingItem | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [stats, setStats] = useState({ completed: 0, bad: 0, good: 0, easy: 0 });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (pool.length > 0 && !currentItem) {
      nextQuestion();
    }
  }, [pool]);

  const nextQuestion = () => {
    if (pool.length === 0) return;
    const next = selectNextItem(pool, recentIds);
    setCurrentItem(next);
    setRevealed(false);
    setRecentIds(prev => {
      const updated = [...prev, next.id];
      if (updated.length > 5) updated.shift();
      return updated;
    });
  };

  const handleGrade = (grade: 'bad' | 'good' | 'easy') => {
    if (!revealed || !currentItem) return;

    store.updateScore(currentItem.id, grade);

    const newStats = {
      ...stats,
      completed: stats.completed + 1,
      bad: stats.bad + (grade === 'bad' ? 1 : 0),
      good: stats.good + (grade === 'good' ? 1 : 0),
      easy: stats.easy + (grade === 'easy' ? 1 : 0),
    };
    setStats(newStats);

    if (mode === 'session' && newStats.completed >= (store.data.sessionSize || 10)) {
      onFinish(newStats);
    } else {
      nextQuestion();
    }
  };

  if (!currentItem) return <div className="flex-1 flex items-center justify-center text-zinc-400 font-light">Loading...</div>;

  const typeLabel = {
    'd2p': 'Digit → Phonemes',
    'p2d': 'Phonemes → Digit',
    'n2p': 'Number → Peg',
    'p2n': 'Peg → Number',
  }[currentItem.type];

  return (
    <PageTransition>
      <Container className="justify-between relative">
        <div className="flex items-center justify-between">
          <IconButton onClick={() => setShowConfirm(true)} className="text-zinc-400 dark:text-zinc-600">
            <ArrowLeft size={14} />
            <span>Quit</span>
          </IconButton>
          
          <div className="flex flex-col items-end">
            <Typography.Label>{mode === 'session' ? 'Session' : 'Endless'}</Typography.Label>
            <Typography.Mono className="text-[10px] text-zinc-300 dark:text-zinc-700">
              {mode === 'session' ? `${stats.completed} / ${store.data.sessionSize || 10}` : stats.completed}
            </Typography.Mono>
          </div>
        </div>

        <div 
          className="flex-1 flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={() => !revealed && setRevealed(true)}
        >
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center"
              >
                <Typography.Label className="mb-4">{typeLabel}</Typography.Label>
                <div className="text-7xl font-light tracking-tighter">{currentItem.question}</div>
                <Typography.Label className="mt-12 animate-pulse">
                  Tap to reveal
                </Typography.Label>
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Typography.Label className="mb-4">Answer</Typography.Label>
                <div className="text-7xl font-light tracking-tighter mb-4">{currentItem.answer}</div>
                <div className="text-sm font-mono text-zinc-400 dark:text-zinc-600 lowercase tracking-widest">
                  {currentItem.phonetic}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-32 flex items-center justify-center">
          <AnimatePresence>
            {revealed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex space-x-12"
              >
                <button onClick={(e) => { e.stopPropagation(); handleGrade('bad'); }} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full border border-zinc-100 dark:border-zinc-900 flex items-center justify-center mb-2 group-hover:bg-red-50 dark:group-hover:bg-red-950/20 group-hover:border-red-100 transition-colors">
                    <Frown size={20} className="text-zinc-300 dark:text-zinc-700 group-hover:text-red-400 transition-colors" />
                  </div>
                  <Typography.Label className="group-hover:text-red-400 transition-colors">Bad</Typography.Label>
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleGrade('good'); }} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full border border-zinc-100 dark:border-zinc-900 flex items-center justify-center mb-2 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 transition-colors">
                    <Smile size={20} className="text-zinc-300 dark:text-zinc-700 group-hover:text-current transition-colors" />
                  </div>
                  <Typography.Label className="group-hover:text-current transition-colors">Good</Typography.Label>
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleGrade('easy'); }} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full border border-zinc-100 dark:border-zinc-900 flex items-center justify-center mb-2 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/20 group-hover:border-emerald-100 transition-colors">
                    <Zap size={20} className="text-zinc-300 dark:text-zinc-700 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <Typography.Label className="group-hover:text-emerald-400 transition-colors">Easy</Typography.Label>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm Modal */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-8 z-50 cursor-default" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-sm">
                <Typography.H2 className="mb-2">End?</Typography.H2>
                <Typography.Mono className="text-sm text-zinc-400 dark:text-zinc-600 mb-12">{stats.completed} completed</Typography.Mono>
                <div className="flex flex-col space-y-6">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onFinish(stats); }}
                    className="text-left text-2xl font-medium hover:text-zinc-500 transition-colors"
                  >
                    End Now
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowConfirm(false); }}
                    className="text-left text-2xl font-medium text-zinc-300 dark:text-zinc-700 hover:text-current transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </PageTransition>
  );
}


