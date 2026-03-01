import React, { useRef } from 'react';
import { Settings as SettingsIcon, Download, Upload, Play, Infinity, BarChart2 } from 'lucide-react';
import { Container, Typography, IconButton, PageTransition } from './UI';

export default function Home({ onStart, onSettings, onStats, store }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(store.data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `major-system-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.majorMap && imported.pegs && imported.scores) {
          store.importData(imported);
          alert('Data imported successfully!');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <PageTransition>
      <Container>
        <div className="flex-1 flex flex-col justify-center">
          <Typography.H1 className="mb-20">Majoris</Typography.H1>
          
          <div className="space-y-8">
            <button 
              onClick={() => onStart('session')} 
              className="flex items-center text-left text-2xl font-medium hover:text-zinc-500 transition-colors group"
            >
              <Play size={20} className="mr-4 text-zinc-200 dark:text-zinc-800 group-hover:text-current transition-colors" />
              <span>Session</span>
              <Typography.Mono className="text-sm text-zinc-400 dark:text-zinc-600 ml-3 align-middle">
                {store.data.sessionSize || 10}
              </Typography.Mono>
            </button>
            <button 
              onClick={() => onStart('endless')} 
              className="flex items-center text-left text-2xl font-medium hover:text-zinc-500 transition-colors group"
            >
              <Infinity size={20} className="mr-4 text-zinc-200 dark:text-zinc-800 group-hover:text-current transition-colors" />
              <span>Endless</span>
            </button>
            <button 
              onClick={onStats} 
              className="flex items-center text-left text-2xl font-medium hover:text-zinc-500 transition-colors group"
            >
              <BarChart2 size={20} className="mr-4 text-zinc-200 dark:text-zinc-800 group-hover:text-current transition-colors" />
              <span>Mastery</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-8 text-zinc-400 dark:text-zinc-600 pb-4">
          <IconButton onClick={onSettings}>
            <SettingsIcon size={12} />
            <span>Settings</span>
          </IconButton>
          <IconButton onClick={handleExport}>
            <Download size={12} />
            <span>Export</span>
          </IconButton>
          <IconButton onClick={() => fileInputRef.current?.click()}>
            <Upload size={12} />
            <span>Import</span>
          </IconButton>
          <input type="file" accept=".json" ref={fileInputRef} onChange={handleImport} className="hidden" />
        </div>
      </Container>
    </PageTransition>
  );
}


