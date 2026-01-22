
import React, { useState, useEffect } from 'react';

const ASCII_9PDO = `
 █████╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
╚██████║██████╔╝██║  ██║██║   ██║
 ╚═══██║██╔═══╝ ██║  ██║██║   ██║
 █████╔╝██║     ██████╔╝╚██████╔╝
 ╚════╝ ╚═╝     ╚═════╝  ╚═════╝ 
`;

const IntroScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [displayText, setDisplayText] = useState('');
  const [isGlitched, setIsGlitched] = useState(false);

  useEffect(() => {
    const lines = ASCII_9PDO.split('\n').filter(l => l.length > 0);
    let currentLine = 0;
    
    const typeInterval = setInterval(() => {
      if (currentLine < lines.length) {
        setDisplayText(prev => prev + lines[currentLine] + '\n');
        currentLine++;
      } else {
        clearInterval(typeInterval);
        setIsGlitched(true);
        setTimeout(() => onFinish(), 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="relative">
        <pre className={`font-mono text-xs md:text-2xl leading-none transition-all duration-75 whitespace-pre 
          ${!isGlitched ? 'text-red-700' : 'text-red-500 glow-red glitch-anim'}`}>
          {displayText}
        </pre>
        {isGlitched && (
            <div className="absolute inset-0 text-red-900 opacity-30 blur-sm pointer-events-none scale-110">
                <pre>{displayText}</pre>
            </div>
        )}
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="text-[12px] md:text-sm tracking-[0.5em] text-red-600 font-black uppercase animate-pulse">
            9PDO_HELL_SEQUENCE_INITIALIZED
        </div>
        <div className="h-[2px] w-80 bg-red-950 relative overflow-hidden">
            <div className={`h-full bg-red-500 shadow-[0_0_10px_red] transition-all duration-[1500ms] ${displayText ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className="text-[8px] text-red-900 tracking-tighter">
            HARDWARE_OVERRIDE: ACTIVE // BIOS_INJECTION: SUCCESS
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
