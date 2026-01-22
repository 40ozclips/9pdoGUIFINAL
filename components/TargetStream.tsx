
import React, { useState, useEffect } from 'react';

interface Target {
  ip: string;
  port: number;
  status: 'EXPLOITING' | 'TRACED' | 'DOSSING' | 'BREACHED' | 'FRYING';
  latency: string;
}

const TargetStream: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);

  const generateTarget = (): Target => {
    const statuses: Target['status'][] = ['EXPLOITING', 'TRACED', 'DOSSING', 'BREACHED', 'FRYING'];
    return {
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      port: Math.floor(Math.random() * 65535),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      latency: (Math.random() * 200).toFixed(1) + 'ms'
    };
  };

  useEffect(() => {
    const initial = Array.from({ length: 15 }, generateTarget);
    setTargets(initial);

    const interval = setInterval(() => {
      setTargets(prev => [generateTarget(), ...prev.slice(0, 14)]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col p-3 font-mono text-[10px]">
      <div className="text-green-600 font-black mb-4 border-b border-green-900 pb-1 flex justify-between uppercase">
        <span>Active_Scans</span>
        <span className="animate-pulse">Live</span>
      </div>
      <div className="space-y-3 overflow-hidden">
        {targets.map((t, i) => (
          <div key={i} className="flex flex-col border-l border-green-950 pl-2 py-1 hover:bg-green-950/20 transition-colors group">
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-bold group-hover:text-green-300">{t.ip}</span>
              <span className="text-green-900 text-[8px]">{t.latency}</span>
            </div>
            <div className="flex justify-between items-center text-[8px] mt-1">
              <span className="text-gray-500 italic">PORT: {t.port}</span>
              <span className={`font-black tracking-tighter ${
                t.status === 'FRYING' ? 'text-red-500 animate-pulse' : 
                t.status === 'BREACHED' ? 'text-emerald-500' : 'text-blue-500'
              }`}>
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-green-900">
        <div className="flex items-center justify-between text-[8px] text-green-900 mb-2">
            <span>PACKET_LOAD</span>
            <span>{Math.floor(Math.random() * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-green-950 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-[pulse_1s_infinite]" style={{ width: '65%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TargetStream;
