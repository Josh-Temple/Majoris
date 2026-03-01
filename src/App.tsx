/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useAppStore } from './store';
import Home from './components/Home';
import Training from './components/Training';
import Results from './components/Results';
import Settings from './components/Settings';
import Stats from './components/Stats';

export type Screen = 'home' | 'training' | 'results' | 'settings' | 'stats';
export type Mode = 'session' | 'endless';

export interface SessionStats {
  mode: Mode;
  completed: number;
  bad: number;
  good: number;
  easy: number;
}

export default function App() {
  const store = useAppStore();
  const [screen, setScreen] = useState<Screen>('home');
  const [mode, setMode] = useState<Mode>('session');
  const [stats, setStats] = useState<SessionStats | null>(null);

  const startTraining = (selectedMode: Mode) => {
    setMode(selectedMode);
    setStats({ mode: selectedMode, completed: 0, bad: 0, good: 0, easy: 0 });
    setScreen('training');
  };

  const finishTraining = (finalStats: any) => {
    setStats({ ...finalStats, mode });
    setScreen('results');
  };

  return (
    <div className={`min-h-screen flex justify-center transition-colors duration-500 ${store.data.darkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      <div className="w-full max-w-md min-h-screen overflow-hidden flex flex-col relative">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <Home 
              key="home"
              onStart={startTraining} 
              onSettings={() => setScreen('settings')} 
              onStats={() => setScreen('stats')} 
              store={store} 
            />
          )}
          {screen === 'training' && stats && (
            <Training 
              key="training"
              mode={mode} 
              store={store} 
              onBack={() => setScreen('home')}
              onFinish={finishTraining} 
            />
          )}
          {screen === 'results' && stats && (
            <Results 
              key="results"
              stats={stats} 
              store={store} 
              onHome={() => setScreen('home')} 
            />
          )}
          {screen === 'settings' && (
            <Settings 
              key="settings"
              store={store} 
              onBack={() => setScreen('home')} 
            />
          )}
          {screen === 'stats' && (
            <Stats 
              key="stats"
              store={store} 
              onBack={() => setScreen('home')} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

