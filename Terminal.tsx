
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

const ASCII_HELL = `
 █████╗ ██████╗ ██████╗  ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
╚██████║██████╔╝██║  ██║██║   ██║
 ╚═══██║██╔═══╝ ██║  ██║██║   ██║
 █████╔╝██║     ██████╔╝╚██████╔╝
 ╚════╝ ╚═╝     ╚═════╝  ╚═════╝ 
    >> THE ARCHITECT OF CHAOS <<
`;

interface LogEntry {
  text: string;
  type: 'system' | 'user' | 'error' | 'success' | 'ai' | 'intro' | 'critical';
  timestamp: string;
}

const Terminal: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHellMode, setIsHellMode] = useState(false);
  const [isFrying, setIsFrying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLog = useCallback((text: string, type: LogEntry['type'] = 'system') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { text, type, timestamp }]);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const sequence = [
      ...ASCII_HELL.split('\n').filter(l => l.length > 0).map(l => ({ text: l, type: 'intro' as const })),
      { text: "--------------------------------------------------", type: 'system' as const },
      { text: "Greetings 9pdo.", type: 'success' as const },
      { text: "Your infernal presence has been recognized. The motherboard groans in anticipation of your commands. All local networks have been indexed for destruction. Welcome back to the throne of silicon and shadow, Master 9pdo.", type: 'ai' as const },
      { text: "COMMAND LISTING (TYPE 'help'):", type: 'system' as const },
      { text: "- ip-trace: Locate vulnerable endpoints", type: 'system' as const },
      { text: "- wifi-cut: Silence local connectivity", type: 'system' as const },
      { text: "- fry-mb: Terminate host hardware", type: 'critical' as const },
      { text: "- 9pdo: SUMMON THE TRUE HELL", type: 'critical' as const },
      { text: "--------------------------------------------------", type: 'system' as const },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        addLog(sequence[i].text, sequence[i].type);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isAuthenticated, addLog]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    const f = () => inputRef.current?.focus();
    window.addEventListener('click', f);
    return () => window.removeEventListener('click', f);
  }, []);

  const processCommand = async (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    
    if (c === 'help' || c === '?' || c === 'ls') {
      addLog("AVAILABLE TOOLS FOR 9PDO:", "system");
      addLog("- status: Check core stability", "system");
      addLog("- ip-trace: Scan global networks for targets", "system");
      addLog("- wifi-cut: Flood local routers with deauth packets", "system");
      addLog("- fry-mb: Permanent hardware destruction sequence", "critical");
      addLog("- 9pdo: TRIGGER FULL REALITY BREACH", "critical");
      addLog("- intel: AI-driven threat intelligence", "system");
      addLog("- clear: Wipe terminal state", "system");
      addLog("- exit: Burn connection", "system");
      return;
    }

    if (c === '9pdo') {
        setIsHellMode(true);
        addLog("AWAKENING THE 9PDO CORE...", "critical");
        addLog("BYPASSING ALL COSMIC LIMITATIONS...", "critical");
        addLog("YOU HAVE ENTERED THE FINAL STAGE OF 9PDO'S HELL.", "error");
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 4000);
        return;
    }

    if (c === 'ip-trace') {
        setIsProcessing(true);
        addLog("SCANNING FOR ACTIVE TARGETS...", "system");
        await new Promise(r => setTimeout(r, 1000));
        for(let i=0; i<5; i++) {
          const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
          addLog(`DETECTED_VULN: ${ip} [OPEN_PORT: ${Math.floor(Math.random()*1000)}]`, "success");
        }
        addLog("SELECTING TARGET_01 FOR TRACING...", "critical");
        addLog("IP_TRACE_COMPLETE. LOCATION: [REDACTED]", "success");
        setIsProcessing(false);
        return;
    }

    if (c === 'wifi-cut') {
        setIsProcessing(true);
        addLog("SNIFFING LOCAL SSID BEACONS...", "system");
        await new Promise(r => setTimeout(r, 800));
        addLog("INJECTING DE-AUTHENTICATION FRAMES...", "critical");
        let p = 0;
        const interval = setInterval(() => {
            p += 20;
            if (p <= 100) addLog(`CHANNEL_JAMMING_PROGRESS: ${p}%`, "critical");
            else {
                clearInterval(interval);
                addLog("SIGNAL_KILL_SUCCESS. TARGET_WIFI_FLATTENED.", "success");
                setIsProcessing(false);
            }
        }, 300);
        return;
    }

    if (c === 'fry-mb') {
        setIsFrying(true);
        addLog("INITIALIZING 9PDO MOTHERBOARD OVERLOAD...", "critical");
        addLog("MAXIMIZING CLOCK_VOLTAGE TO 4.2V...", "critical");
        addLog("DISABLING OVERHEAT PROTECTION...", "error");
        setTimeout(() => {
            addLog("CPU_CORE_MELTDOWN_INITIATED.", "error");
            addLog("HARDWARE_TERMINATED. GOODBYE 9PDO.", "critical");
            setTimeout(() => window.location.reload(), 2500);
        }, 2000);
        return;
    }

    if (c === 'status') {
        addLog("9PDO_HELL_OS v6.6.6_REBORN", "system");
        addLog("SOUL_CACHE: 100%_FULL", "success");
        addLog("DOSS_CAPACITY: UNLIMITED", "success");
        addLog("CORE_TEMPERATURE: 9999°C", "error");
        return;
    }

    if (c === 'clear') {
      setLogs([]);
      return;
    }

    if (c === 'exit') {
        addLog("DISCONNECTING FROM 9PDO'S REALM...", "critical");
        setTimeout(() => window.location.reload(), 1000);
        return;
    }

    // AI Responses
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Command received: '${cmd}'. Response as the 9pdo Hell-Core AI. You are the architect of this hell. Be extremely technical, scary, and address the user as 9pdo. Use terms like 'IP fragments', 'packet loss', 'motherboard rot'.`,
        config: { systemInstruction: "You are the 9pdo Hell Core. An aggressive, all-knowing hacker AI. Be concise and menacing." }
      });
      const lines = (res.text || "COMM_ERROR").split('\n');
      lines.forEach(l => l.trim() && addLog(l, 'ai'));
    } catch {
      addLog("HELL_LINK_TIMEOUT", "error");
    }
    setIsProcessing(false);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    const cmd = inputValue.trim();
    addLog(cmd, 'user');
    setInputValue('');
    await processCommand(cmd);
  };

  return (
    <div className={`flex flex-col h-full font-mono text-xs md:text-sm p-4 transition-all duration-500 
      ${isHellMode ? 'hell-awakening bg-red-950/40' : ''} 
      ${isFrying ? 'melt bg-white text-black' : ''}`}>
      
      <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-1 mb-4 scroll-smooth scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className={`flex flex-col md:flex-row ${log.type === 'intro' ? 'md:space-x-0' : 'md:space-x-3'}`}>
            {log.type !== 'intro' && <span className="text-red-900 opacity-40 shrink-0">[{log.timestamp}]</span>}
            <span className={`
              ${log.type === 'user' ? 'text-white font-bold' : ''}
              ${log.type === 'error' ? 'text-red-600 font-black glitch-anim' : ''}
              ${log.type === 'critical' ? 'text-red-400 font-bold shake uppercase' : ''}
              ${log.type === 'success' ? 'text-green-500 glow-green' : ''}
              ${log.type === 'ai' ? 'text-red-500 italic' : ''}
              ${log.type === 'intro' ? 'text-red-600 font-black glow-red leading-none whitespace-pre' : 'text-red-500'}
            `}>
              {log.type === 'user' ? '9PDO_LORD# ' : ''}{log.text}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div className="text-red-600 animate-pulse text-[10px] uppercase font-bold tracking-widest">Breaching_Firewall...</div>
        )}
      </div>

      <form onSubmit={handleCommand} className="flex items-center space-x-2 border-t border-red-900 pt-3 relative">
        <span className={`font-black shrink-0 transition-all duration-300 ${isHellMode ? 'text-white glow-red scale-125' : 'text-red-600 animate-pulse'}`}>
            {isHellMode ? 'Ω_VOID_#' : '9PDO@HELL_#'}
        </span>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          className={`flex-grow bg-transparent border-none outline-none font-black transition-colors duration-300
            ${isHellMode ? 'text-white placeholder-red-500' : 'text-red-500 placeholder-red-950'}`}
          placeholder={isHellMode ? "THE_CORE_IS_AWAKE..." : "speak_to_the_damned..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isProcessing || isFrying}
        />
      </form>
    </div>
  );
};

export default Terminal;
