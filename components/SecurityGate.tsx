
import React, { useState, useEffect, useRef } from 'react';

const ASCII_9PDO_RED = `
 █████╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
╚██████║██████╔╝██║  ██║██║   ██║
 ╚═══██║██╔═══╝ ██║  ██║██║   ██║
 █████╔╝██║     ██████╔╝╚██████╔╝
 ╚════╝ ╚═╝     ╚═════╝  ╚═════╝ 
`;

interface SecurityGateProps {
  onLogin: (password: string) => boolean;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [warning, setWarning] = useState('SOUL_VERIFICATION_REQUIRED');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const warnings = [
      'YOU_ARE_BEING_WATCHED',
      '9PDO_KNOWS_YOUR_LOCATION',
      'WIFI_SNIFFING_ENABLED',
      'DOSS_VECTORS_ARMED',
      'NO_TURNING_BACK'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setWarning(warnings[i % warnings.length]);
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      setPassword('');
      // Dramatic flash
      const overlay = document.querySelector('.crt-overlay') as HTMLElement;
      if (overlay) {
        overlay.classList.add('shake');
        overlay.style.boxShadow = 'inset 0 0 200px rgba(255,0,0,0.5)';
        setTimeout(() => {
            overlay.classList.remove('shake');
            overlay.style.boxShadow = 'none';
        }, 500);
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-full p-6 text-red-600 font-mono ${shaking ? 'shake' : ''}`}>
      <pre className="text-[6px] md:text-[10px] leading-tight mb-10 text-red-700 glow-red glitch-anim opacity-80">
        {ASCII_9PDO_RED}
      </pre>

      <div className="mb-8 text-center">
        <div className="text-4xl md:text-6xl font-black mb-2 glow-red tracking-tight italic">9PDO'S_HELL</div>
        <div className="text-[10px] md:text-xs tracking-[0.5em] text-red-500 font-bold uppercase animate-pulse">{warning}</div>
      </div>

      <div className="w-full max-w-sm border-2 border-red-900 p-10 bg-black relative shadow-[0_0_40px_rgba(150,0,0,0.3)]">
        <div className="absolute -top-3 left-6 px-2 bg-black text-red-600 text-[10px] font-black uppercase italic">HELL_GATE_v2</div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-red-900">
                <span>IDENTITY_KEY</span>
                <span className="animate-pulse">TRACING...</span>
            </div>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`w-full bg-red-950/10 border-b-4 outline-none py-4 px-4 text-center text-3xl tracking-[0.6em] transition-all duration-300 
                ${error ? 'border-red-600 text-red-600 animate-bounce' : 'border-red-900 focus:border-red-600 text-red-500'}`}
              placeholder="VOID"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-red-700 text-black font-black text-sm tracking-[0.8em] uppercase hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(255,0,0,0.5)] group"
          >
            SACRIFICE
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-2 text-[9px] font-black uppercase tracking-tighter opacity-40">
        <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span><span>IP_TRACER: ON</span></div>
        <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-red-600 rounded-full"></span><span>DOSS_READY: YES</span></div>
      </div>
    </div>
  );
};

export default SecurityGate;
