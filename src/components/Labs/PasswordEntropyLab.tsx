import React, { useState } from 'react';
import { KeyRound, ShieldCheck, ShieldAlert, Cpu, Eye, EyeOff } from 'lucide-react';

export const PasswordEntropyLab: React.FC = () => {
  const [password, setPassword] = useState<string>('P@ssw0rd2026!');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Compute charset size
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 33;

  const length = password.length;
  // Entropy (bits) = L * log2(R)
  const entropyBits = length > 0 && charsetSize > 0 ? Math.round(length * Math.log2(charsetSize)) : 0;

  // GPU RTX 4090 cluster: ~100 Billion hashes/sec for SHA-256
  const hashesPerSecGpu = 100_000_000_000;
  const totalCombinations = Math.pow(charsetSize || 1, length);
  const secondsToCrackFast = totalCombinations / hashesPerSecGpu;

  const formatCrackTime = (seconds: number) => {
    if (seconds < 0.001) return 'Instantaneous (<1 millisecond)';
    if (seconds < 1) return `${Math.round(seconds * 1000)} milliseconds`;
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
    return 'Centuries / Billions of years';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Lab 05
          </span>
          <h3 className="text-lg font-bold text-white">Password Entropy & GPU Cracking Speed Calculator</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
          <Cpu className="w-3.5 h-3.5" /> RTX 4090 Benchmark Mode
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
          <label className="text-xs font-mono text-slate-400 block mb-1">Test Password String:</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-2 text-xs font-mono text-cyan-300 focus:outline-none pr-8"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-[10px] text-slate-500 font-mono block">Length</span>
              <span className="text-sm font-bold text-white">{length} chars</span>
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-[10px] text-slate-500 font-mono block">Charset Pool</span>
              <span className="text-sm font-bold text-cyan-300">{charsetSize} symbols</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-slate-500 font-mono">Presets:</span>
            <button
              onClick={() => setPassword('password')}
              className="text-[10px] bg-slate-850 hover:bg-slate-800 text-rose-400 px-2 py-0.5 rounded font-mono"
            >
              "password" (Weak)
            </button>
            <button
              onClick={() => setPassword('Spring2026!')}
              className="text-[10px] bg-slate-850 hover:bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono"
            >
              "Spring2026!" (Medium)
            </button>
            <button
              onClick={() => setPassword('correct-horse-battery-staple')}
              className="text-[10px] bg-slate-850 hover:bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono"
            >
              Passphrase (Strong)
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" /> Shannon Entropy:
              </span>
              <span
                className={`text-sm font-mono font-bold ${
                  entropyBits > 64 ? 'text-emerald-400' : entropyBits > 40 ? 'text-amber-400' : 'text-rose-400'
                }`}
              >
                {entropyBits} Bits
              </span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  entropyBits > 64 ? 'bg-emerald-500' : entropyBits > 40 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, (entropyBits / 80) * 100)}%` }}
              />
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Plain Fast Hash (MD5 / SHA-256):</span>
                <span className={`font-semibold ${secondsToCrackFast < 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {formatCrackTime(secondsToCrackFast)}
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Memory-Hard (Argon2id 64MB):</span>
                <span className="font-semibold text-emerald-400">
                  {formatCrackTime(secondsToCrackFast * 1_000_000)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800">
            {entropyBits >= 60 ? (
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Robust Entropy! Resistant to offline brute-forcing.
              </div>
            ) : (
              <div className="text-xs text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" /> Low Entropy! Can be cracked via GPU wordlists in seconds.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
