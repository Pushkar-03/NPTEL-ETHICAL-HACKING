import React, { useState } from 'react';
import { Play, RotateCcw, ShieldAlert, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export const PacketAnalyzerLab: React.FC = () => {
  const [mode, setMode] = useState<'normal' | 'syn_flood' | 'syn_stealth'>('normal');
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [serverState, setServerState] = useState<string>('LISTEN');
  const [backlogCount, setBacklogCount] = useState<number>(0);

  const handleStart = () => {
    setStep(1);
    setIsRunning(true);
    setServerState('SYN_RCVD');
    setBacklogCount(mode === 'syn_flood' ? 12 : 1);
  };

  const handleNextStep = () => {
    if (mode === 'normal') {
      if (step === 1) {
        setStep(2);
        setServerState('SYN_RCVD');
      } else if (step === 2) {
        setStep(3);
        setServerState('ESTABLISHED');
        setBacklogCount(0);
        setIsRunning(false);
      }
    } else if (mode === 'syn_stealth') {
      if (step === 1) {
        setStep(2); // Server sent SYN-ACK
      } else if (step === 2) {
        setStep(3); // Client sent RST
        setServerState('LISTEN');
        setBacklogCount(0);
        setIsRunning(false);
      }
    } else if (mode === 'syn_flood') {
      if (step === 1) {
        setStep(2);
        setBacklogCount((prev) => Math.min(100, prev + 35));
      } else if (step === 2) {
        setStep(3);
        setServerState('EXHAUSTED (DoS)');
        setBacklogCount(100);
        setIsRunning(false);
      }
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsRunning(false);
    setServerState('LISTEN');
    setBacklogCount(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Lab 01
          </span>
          <h3 className="text-lg font-bold text-white">TCP 3-Way Handshake & Packet Flags Inspector</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('normal');
              handleReset();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              mode === 'normal' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Normal Handshake
          </button>
          <button
            onClick={() => {
              setMode('syn_stealth');
              handleReset();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              mode === 'syn_stealth' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Nmap SYN Stealth (-sS)
          </button>
          <button
            onClick={() => {
              setMode('syn_flood');
              handleReset();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              mode === 'syn_flood' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            SYN Flood Attack
          </button>
        </div>
      </div>

      {/* Simulator diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
        {/* Client Host */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-center">
          <div className="text-xs font-mono text-slate-400">Client Host (Ethical Tester)</div>
          <div className="text-sm font-semibold text-cyan-300 mt-1">192.168.1.50 : 49152</div>
          <div className="mt-3 inline-block px-2.5 py-1 rounded bg-slate-800/80 font-mono text-xs text-slate-300">
            {step === 0 && 'IDLE'}
            {step === 1 && 'SENT: [SYN] (Seq=1000)'}
            {step === 2 && mode === 'normal' && 'RECEIVED: [SYN, ACK]'}
            {step === 2 && mode === 'syn_stealth' && 'RECEIVED: [SYN, ACK]'}
            {step === 2 && mode === 'syn_flood' && 'SPOOFED FLOODING...'}
            {step === 3 && mode === 'normal' && 'SENT: [ACK] (Seq=1001, Ack=5001)'}
            {step === 3 && mode === 'syn_stealth' && 'SENT: [RST] (Teardown!)'}
            {step === 3 && mode === 'syn_flood' && 'NO ACK SENT (Ghost Spoof)'}
          </div>
        </div>

        {/* In-Flight Packet Channel */}
        <div className="flex flex-col items-center justify-center p-3 text-center">
          {step === 0 && (
            <div className="text-xs text-slate-500 font-mono">Click "Start Sequence" to dispatch TCP packets</div>
          )}
          {step === 1 && (
            <div className="animate-pulse flex flex-col items-center">
              <span className="text-xs font-mono text-cyan-400 mb-1">
                {mode === 'syn_flood' ? 'BURST: [SYN] (Multiple Spoofed IPs)' : 'Packet 1 ➔ [SYN] flag set'}
              </span>
              <div className="flex items-center gap-1 text-cyan-400">
                <span className="font-mono text-xs">Seq=1000</span>
                <ArrowRight className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-pulse flex flex-col items-center">
              <span className="text-xs font-mono text-emerald-400 mb-1">
                {mode === 'syn_flood' ? 'Server queue filling up rapidly!' : 'Packet 2 ◄─ [SYN, ACK]'}
              </span>
              <div className="flex items-center gap-1 text-emerald-400">
                <ArrowRight className="w-5 h-5 text-emerald-400 rotate-180" />
                <span className="font-mono text-xs">Seq=5000, Ack=1001</span>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col items-center">
              {mode === 'normal' && (
                <>
                  <span className="text-xs font-mono text-cyan-400 mb-1">Packet 3 ➔ [ACK]</span>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <span className="font-mono text-xs">Ack=5001</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </>
              )}
              {mode === 'syn_stealth' && (
                <>
                  <span className="text-xs font-mono text-amber-400 mb-1">Packet 3 ➔ [RST] (Reset)</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span className="font-mono text-xs">RST=1 (Close half-open)</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </>
              )}
              {mode === 'syn_flood' && (
                <div className="text-rose-400 font-mono text-xs text-center flex flex-col items-center">
                  <ShieldAlert className="w-6 h-6 mb-1 animate-bounce" />
                  <span>Connection Backlog Saturated (100%)</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Server Target */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 text-center">
          <div className="text-xs font-mono text-slate-400">Target Server (Web App)</div>
          <div className="text-sm font-semibold text-emerald-400 mt-1">10.0.0.1 : 80 (HTTP)</div>
          <div className="mt-3 flex flex-col gap-1 items-center">
            <span
              className={`px-2 py-0.5 rounded font-mono text-xs ${
                serverState.includes('EXHAUSTED')
                  ? 'bg-rose-900/60 text-rose-300 font-bold'
                  : serverState === 'ESTABLISHED'
                  ? 'bg-emerald-900/60 text-emerald-300'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              State: {serverState}
            </span>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  backlogCount > 75 ? 'bg-rose-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${backlogCount}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Half-Open TCB Backlog: {backlogCount}%
            </span>
          </div>
        </div>
      </div>

      {/* Control Actions & Explanation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {step === 0 ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" /> Start Handshake Sequence
            </button>
          ) : step < 3 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors"
            >
              <ArrowRight className="w-4 h-4" /> Advance to Step {step + 1}
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Sequence Completed
            </div>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            {mode === 'normal' && 'Normal connection: 3 packets synchronize sequence numbers cleanly.'}
            {mode === 'syn_stealth' && 'Stealth scan: Nmap sends RST immediately after SYN-ACK so the app never logs the connection.'}
            {mode === 'syn_flood' && 'Denial of Service: Floods half-open requests with no ACK, exhausting the server TCB table.'}
          </span>
        </div>
      </div>
    </div>
  );
};
