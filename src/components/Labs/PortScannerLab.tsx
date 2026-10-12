import React, { useState } from 'react';
import { Terminal, Play, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ScanResult {
  port: number;
  proto: string;
  state: 'open' | 'closed' | 'filtered';
  service: string;
  version?: string;
  reason: string;
}

export const PortScannerLab: React.FC = () => {
  const [scanType, setScanType] = useState<string>('-sS');
  const [target, setTarget] = useState<string>('target.internal.nptel');
  const [portRange, setPortRange] = useState<string>('top-ports');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [outputLines, setOutputLines] = useState<string[]>([
    '# HackSprint Virtual Nmap Scanner v7.94',
    '# Type or select scan parameters below to initiate network exploration.',
  ]);
  const [results, setResults] = useState<ScanResult[] | null>(null);

  const runScan = () => {
    setIsScanning(true);
    setResults(null);
    setOutputLines([
      `Starting Nmap 7.94 ( https://nmap.org ) at 2026-10-12 04:30 UTC`,
      `Initiating ${scanType === '-sS' ? 'SYN Stealth Scan' : scanType === '-sT' ? 'Connect Scan' : 'Xmas Scan'} against ${target}...`,
    ]);

    setTimeout(() => {
      let simulatedResults: ScanResult[] = [];

      if (scanType === '-sS' || scanType === '-sT') {
        simulatedResults = [
          { port: 22, proto: 'tcp', state: 'open', service: 'ssh', version: 'OpenSSH 8.9p1 Ubuntu', reason: 'syn-ack' },
          { port: 23, proto: 'tcp', state: 'closed', service: 'telnet', reason: 'reset (RST/ACK received)' },
          { port: 80, proto: 'tcp', state: 'open', service: 'http', version: 'Apache httpd 2.4.52', reason: 'syn-ack' },
          { port: 445, proto: 'tcp', state: 'filtered', service: 'microsoft-ds', reason: 'no-response (Firewall dropped)' },
          { port: 3306, proto: 'tcp', state: 'filtered', service: 'mysql', reason: 'admin-prohibited (ICMP type 3)' },
        ];
      } else if (scanType === '-sX') {
        simulatedResults = [
          { port: 22, proto: 'tcp', state: 'open', service: 'ssh', reason: 'no-response (RFC 793 open port dropped xmas)' },
          { port: 23, proto: 'tcp', state: 'closed', service: 'telnet', reason: 'reset (RST received)' },
          { port: 80, proto: 'tcp', state: 'open', service: 'http', reason: 'no-response (RFC 793 open port dropped xmas)' },
          { port: 445, proto: 'tcp', state: 'filtered', service: 'microsoft-ds', reason: 'no-response' },
        ];
      }

      setResults(simulatedResults);
      setOutputLines((prev) => [
        ...prev,
        `Scanning completed in 1.42s`,
        `Nmap scan report for ${target} (192.168.10.45)`,
        `Host is up (0.00041s latency).`,
        `Not shown: 995 closed tcp ports (reset)`,
        `PORT     STATE    SERVICE       VERSION`,
        ...simulatedResults.map(
          (r) =>
            `${(r.port + '/' + r.proto).padEnd(9)} ${r.state.padEnd(8)} ${r.service.padEnd(13)} ${r.version || ''}`
        ),
        `\nNmap done: 1 IP address (1 host up) scanned in 1.42 seconds`,
      ]);
      setIsScanning(false);
    }, 900);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Lab 03
          </span>
          <h3 className="text-lg font-bold text-white">Nmap Port Scanner & Banner Enumerator</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Isolated Lab Network
          </span>
        </div>
      </div>

      {/* Command configuration bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1">Scan Flag:</label>
          <select
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none"
          >
            <option value="-sS">-sS (TCP SYN Stealth Scan - Raw)</option>
            <option value="-sT">-sT (TCP Connect Scan - Full Handshake)</option>
            <option value="-sX">-sX (Xmas Scan - FIN+PSH+URG)</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1">Target Host:</label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs font-mono text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1">Ports:</label>
          <select
            value={portRange}
            onChange={(e) => setPortRange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs font-mono text-white focus:outline-none"
          >
            <option value="top-ports">Common Ports (21, 22, 23, 80, 445, 3306)</option>
            <option value="web-only">Web Only (80, 443, 8080)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={runScan}
            disabled={isScanning}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium text-xs rounded transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            {isScanning ? 'Probing...' : 'Execute Scan'}
          </button>
        </div>
      </div>

      {/* Terminal display */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 min-h-[160px] max-h-[240px] overflow-y-auto">
        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>terminal@hacksprint:~$ nmap {scanType} -v {target}</span>
        </div>
        <div className="mt-2 space-y-1">
          {outputLines.map((line, i) => (
            <div
              key={i}
              className={`${
                line.includes('open')
                  ? 'text-emerald-400 font-semibold'
                  : line.includes('filtered')
                  ? 'text-amber-400'
                  : line.includes('Starting')
                  ? 'text-cyan-400'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Port state analysis breakdown */}
      {results && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-3 rounded-lg border border-emerald-900/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Open Ports (Active Services)
            </div>
            <p className="text-[11px] text-slate-400">
              Returned SYN-ACK packet. Service is actively listening for incoming TCP connections.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-amber-900/40">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
              <HelpCircle className="w-3.5 h-3.5" /> Filtered Ports (Firewall Blocked)
            </div>
            <p className="text-[11px] text-slate-400">
              Probes dropped silently or blocked with ICMP admin-prohibited. Firewall rules prevent reaching host.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-1">
              <span>●</span> Closed Ports
            </div>
            <p className="text-[11px] text-slate-400">
              Target host received probe and responded with RST packet. Host is online, but no service is listening.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
