import React, { useState, useEffect } from 'react';
import { Key, Lock, Unlock, Shuffle, Check, AlertCircle } from 'lucide-react';

async function computeSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hexToBinary(hex: string): string {
  return hex
    .split('')
    .map((char) => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');
}

export const CryptoHasherLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'avalanche' | 'salt' | 'rsa'>('avalanche');

  // Avalanche state
  const [input1, setInput1] = useState<string>('NPTEL Ethical Hacking 2026');
  const [input2, setInput2] = useState<string>('NPTEL Ethical Hacking 2027');
  const [hash1, setHash1] = useState<string>('');
  const [hash2, setHash2] = useState<string>('');
  const [flippedBits, setFlippedBits] = useState<number>(0);

  // Salt state
  const [password, setPassword] = useState<string>('Admin@123');
  const [salt, setSalt] = useState<string>('x8K9#Lp2!');
  const [plainHash, setPlainHash] = useState<string>('');
  const [saltedHash, setSaltedHash] = useState<string>('');

  // RSA demo state
  const [rsaMessage, setRsaMessage] = useState<string>('Target server compromised at 04:00 UTC');
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [rsaMode, setRsaMode] = useState<'confidentiality' | 'signature'>('confidentiality');

  useEffect(() => {
    async function updateHashes() {
      const h1 = await computeSha256(input1);
      const h2 = await computeSha256(input2);
      setHash1(h1);
      setHash2(h2);

      const b1 = hexToBinary(h1);
      const b2 = hexToBinary(h2);
      let diff = 0;
      for (let i = 0; i < Math.min(b1.length, b2.length); i++) {
        if (b1[i] !== b2[i]) diff++;
      }
      setFlippedBits(diff);
    }
    updateHashes();
  }, [input1, input2]);

  useEffect(() => {
    async function updateSalt() {
      const hPlain = await computeSha256(password);
      const hSalted = await computeSha256(password + salt);
      setPlainHash(hPlain);
      setSaltedHash(hSalted);
    }
    updateSalt();
  }, [password, salt]);

  const generateNewSalt = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let s = '';
    for (let i = 0; i < 10; i++) {
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSalt(s);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Lab 02
          </span>
          <h3 className="text-lg font-bold text-white">Cryptographic Hashes & Avalanche Effect Lab</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('avalanche')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'avalanche' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Avalanche Effect
          </button>
          <button
            onClick={() => setActiveTab('salt')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'salt' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Salt vs Rainbow Tables
          </button>
          <button
            onClick={() => setActiveTab('rsa')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'rsa' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Asymmetric RSA Simulator
          </button>
        </div>
      </div>

      {activeTab === 'avalanche' && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-slate-400">
            Edit the two inputs below. Notice how changing even a single letter flips approximately 50% (128 out of 256) of the SHA-256 output bits!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <label className="text-xs font-mono text-slate-400 block mb-1">Input String A:</label>
              <input
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="mt-2">
                <span className="text-[11px] text-slate-500 font-mono">SHA-256 Digest:</span>
                <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-[11px] text-cyan-300 break-all select-all">
                  {hash1}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <label className="text-xs font-mono text-slate-400 block mb-1">Input String B (Different by 1 char):</label>
              <input
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="mt-2">
                <span className="text-[11px] text-slate-500 font-mono">SHA-256 Digest:</span>
                <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-[11px] text-cyan-300 break-all select-all">
                  {hash2}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold font-mono text-cyan-300">{flippedBits} / 256</div>
              <div>
                <div className="text-xs font-semibold text-white">Bits Flipped (Avalanche Rate)</div>
                <div className="text-[11px] text-cyan-200">
                  {((flippedBits / 256) * 100).toFixed(1)}% of all output bits changed drastically!
                </div>
              </div>
            </div>
            <div className="hidden sm:block text-xs font-mono text-cyan-400 bg-cyan-900/40 px-3 py-1.5 rounded border border-cyan-700">
              Ideal Target: ~50%
            </div>
          </div>
        </div>
      )}

      {activeTab === 'salt' && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-slate-400">
            Unsalted hashes always produce the same value and can be looked up in pre-computed Rainbow Tables instantly. Adding a random Salt forces attackers to recompute tables for each account.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <label className="text-xs font-mono text-slate-400 block mb-1">Common User Password:</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="mt-3">
                <span className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Plain Unsalted SHA-256 (Vulnerable to Rainbow Tables):
                </span>
                <div className="p-2 bg-slate-900/90 rounded border border-rose-900/50 font-mono text-[11px] text-rose-300 break-all select-all mt-1">
                  {plainHash}
                </div>
                <div className="text-[11px] text-rose-400 mt-1">
                  Status: Present in public crack databases (e.g. crackstation.net)!
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-emerald-400">Cryptographic Salt (Per User):</label>
                <button
                  onClick={generateNewSalt}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-mono"
                >
                  <Shuffle className="w-3 h-3" /> New Salt
                </button>
              </div>
              <input
                type="text"
                value={salt}
                onChange={(e) => setSalt(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="mt-3">
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Salted SHA-256 (Hash of [Password + Salt]):
                </span>
                <div className="p-2 bg-slate-900/90 rounded border border-emerald-900/50 font-mono text-[11px] text-emerald-300 break-all select-all mt-1">
                  {saltedHash}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  Status: Rainbow table lookup fails! Attacker must brute-force from zero.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rsa' && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => {
                setRsaMode('confidentiality');
                setIsEncrypted(false);
              }}
              className={`px-3 py-1 text-xs rounded font-medium ${
                rsaMode === 'confidentiality'
                  ? 'bg-cyan-700 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              Mode 1: Confidentiality (Encrypt with Bob's Public Key)
            </button>
            <button
              onClick={() => {
                setRsaMode('signature');
                setIsEncrypted(false);
              }}
              className={`px-3 py-1 text-xs rounded font-medium ${
                rsaMode === 'signature'
                  ? 'bg-cyan-700 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              Mode 2: Digital Signature (Sign with Alice's Private Key)
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <label className="text-xs font-mono text-slate-400 block mb-1">Original Plaintext Payload:</label>
            <input
              type="text"
              value={rsaMessage}
              onChange={(e) => setRsaMessage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
            />

            <div className="my-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsEncrypted(!isEncrypted)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                  isEncrypted
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
              >
                {isEncrypted ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {isEncrypted ? 'Decrypt with Private Key' : 'Encrypt / Sign with Key'}
              </button>
            </div>

            <div className="bg-slate-900/90 p-3 rounded border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                {isEncrypted ? 'Ciphertext / Digital Signature Stream:' : 'Decrypted Output / Verified Signature:'}
              </div>
              <div className="font-mono text-xs text-cyan-300 break-all">
                {isEncrypted
                  ? '8f2a991b8d27715ecb91f00a45e998124b89ff0123ca77bb61c28f00192a3489eeb0201c77fa...'
                  : rsaMessage}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
