
import React, { useState } from 'react';
import Terminal from './components/Terminal';
import SecurityGate from './components/SecurityGate';
import MatrixBackground from './components/MatrixBackground';
import IntroScreen from './components/IntroScreen';
import TargetStream from './components/TargetStream';

type AppState = 'INTRO' | 'SECURITY_GATE' | 'TERMINAL';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('INTRO');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (password: string) => {
    if (password === '9pdo') {
      setIsAuthenticated(true);
      setAppState('TERMINAL');
      return true;
    }
    return false;
  };

  const handleIntroFinish = () => {
    setAppState('SECURITY_GATE');
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden select-none">
      <MatrixBackground color={isAuthenticated ? "#00ff00" : "#ff0000"} />
      
      <div className="absolute inset-0 z-10 flex items-center justify-center p-2 md:p-8">
        {appState === 'INTRO' && <IntroScreen onFinish={handleIntroFinish} />}
        
        {appState !== 'INTRO' && (
          <div className={`w-full h-full max-w-7xl bg-black/95 border-2 transition-all duration-700 
            ${isAuthenticated 
              ? 'border-green-600 shadow-[0_0_60px_rgba(0,255,0,0.3)]' 
              : 'border-red-600 shadow-[0_0_60px_rgba(255,0,0,0.5)]'} 
            rounded-sm flex flex-col backdrop-blur-3xl overflow-hidden relative`}>
            
            {/* 9PDO'S HELL UI Header */}
            <div className={`px-4 py-2 flex items-center justify-between border-b-2 transition-colors duration-1000 
              ${isAuthenticated ? 'bg-green-950/40 border-green-600' : 'bg-red-950/40 border-red-600'}`}>
              <div className="flex space-x-3 items-center">
                <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500 animate-pulse' : 'bg-red-600 shadow-[0_0_15px_red] animate-ping'}`}></div>
                <div className="text-[10px] font-bold tracking-widest text-white/50 hidden md:block uppercase">Core: {isAuthenticated ? '9PDO_UNLEASHED' : 'LOCKED'}</div>
              </div>
              <div className={`text-sm md:text-xl font-black tracking-[0.4em] uppercase glitch-anim
                ${isAuthenticated ? 'text-green-400 glow-green' : 'text-red-600 glow-red'}`}>
                {isAuthenticated ? "9PDO'S HELL // MASTER_DASHBOARD" : "9PDO'S HELL // SECURITY_GATE"}
              </div>
              <div className="text-[10px] text-gray-500 font-mono hidden md:block">
                HELL_OS_v6.6.6_REBORN
              </div>
            </div>

            <div className="flex-grow flex overflow-hidden relative">
              {appState === 'SECURITY_GATE' && <SecurityGate onLogin={handleLogin} />}
              {appState === 'TERMINAL' && (
                <>
                  <div className="flex-grow h-full">
                    <Terminal isAuthenticated={isAuthenticated} />
                  </div>
                  <div className="hidden lg:block w-72 border-l border-green-900 bg-black/50 overflow-hidden">
                    <TargetStream />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
