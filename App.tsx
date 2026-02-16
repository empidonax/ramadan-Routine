import React, { useState } from 'react';
import { useRamadanPlanner } from './hooks/useRamadanPlanner';
import { SetupScreen } from './components/SetupScreen';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { AppView } from './types';
import { HomeIcon, BarChartIcon } from './components/Icons';

function App() {
  const { settings, days, initializePlanner, toggleTask, addTask, deleteTask, resetData } = useRamadanPlanner();
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);

  // If no settings exist, force Setup Mode
  if (!settings) {
    return <SetupScreen onComplete={initializePlanner} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-emerald-500/30">
      
      <main className="min-h-screen">
        {view === AppView.DASHBOARD && (
          <Dashboard 
            days={days} 
            toggleTask={toggleTask}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        )}
        
        {view === AppView.ANALYTICS && (
          <Analytics days={days} onReset={resetData} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800 pb-safe-area">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <button
            onClick={() => setView(AppView.DASHBOARD)}
            className={`flex flex-col items-center p-3 rounded-xl transition-all w-24 ${
              view === AppView.DASHBOARD ? 'text-emerald-500 bg-emerald-900/10' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Daily</span>
          </button>

          <button
            onClick={() => setView(AppView.ANALYTICS)}
            className={`flex flex-col items-center p-3 rounded-xl transition-all w-24 ${
              view === AppView.ANALYTICS ? 'text-emerald-500 bg-emerald-900/10' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <BarChartIcon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Progress</span>
          </button>
        </div>
      </nav>
      
      {/* Safe Area spacing for iOS home indicator */}
      <div className="h-6 bg-gray-900 w-full fixed bottom-0 -z-10"></div>
    </div>
  );
}

export default App;