import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Code2, Database, AlertTriangle } from 'lucide-react';

export const WebSecuritySandbox: React.FC = () => {
  const [tab, setTab] = useState<'sqli' | 'xss'>('sqli');

  // SQLi State
  const [username, setUsername] = useState<string>("admin' OR '1'='1");
  const [password, setPassword] = useState<string>('randomPass');
  const [isSecure, setIsSecure] = useState<boolean>(false);

  // XSS State
  const [xssInput, setXssInput] = useState<string>("<script>alert('Session stolen: ' + document.cookie)</script>");
  const [enableSanitization, setEnableSanitization] = useState<boolean>(false);
  const [enableHttpOnly, setEnableHttpOnly] = useState<boolean>(true);

  // SQLi Query generation
  const rawQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const preparedStatement = `PREPARE stmt FROM 'SELECT * FROM users WHERE username = ? AND password = ?';\nEXECUTE stmt USING ('${username.replace(/'/g, "\\'")}', '${password}');`;

  const isSqliBypass = !isSecure && (username.includes("' OR '") || username.includes("' OR 1=1") || username.includes("' --") || username.includes("' OR '1'='1"));

  const sanitizeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Lab 04
          </span>
          <h3 className="text-lg font-bold text-white">Web Security Sandbox: SQLi & XSS Defense</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('sqli')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              tab === 'sqli' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            SQL Injection Sandbox
          </button>
          <button
            onClick={() => setTab('xss')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              tab === 'xss' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            XSS & Cookie Security Lab
          </button>
        </div>
      </div>

      {tab === 'sqli' && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-300">Architecture Mode:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSecure(false)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  !isSecure ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Vulnerable: String Concatenation
              </button>
              <button
                onClick={() => setIsSecure(true)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  isSecure ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Secure: Prepared Statements (Parameterized)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-white">Simulated Login Form</div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Username Input:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Password Input:</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                />
              </div>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] text-slate-500 font-mono">Quick Payloads:</span>
                <button
                  onClick={() => setUsername("admin' --")}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-0.5 rounded font-mono"
                >
                  admin' --
                </button>
                <button
                  onClick={() => setUsername("admin' OR '1'='1")}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-0.5 rounded font-mono"
                >
                  admin' OR '1'='1
                </button>
                <button
                  onClick={() => setUsername("' UNION SELECT 1,'hacked','hash' --")}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-0.5 rounded font-mono"
                >
                  UNION SELECT...
                </button>
              </div>
            </div>

            {/* Backend Query Execution View */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" /> Backend Database Engine Evaluator
                </div>
                <div className="bg-slate-900 p-2.5 rounded font-mono text-xs break-all border border-slate-800">
                  {isSecure ? (
                    <div className="text-emerald-300 whitespace-pre-wrap">{preparedStatement}</div>
                  ) : (
                    <div className="text-slate-300">
                      <span>SELECT * FROM users WHERE username = '</span>
                      <span className="text-rose-400 font-bold bg-rose-950/60 px-1 rounded">{username}</span>
                      <span>' AND password = '{password}'</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                {isSqliBypass ? (
                  <div className="p-3 bg-rose-950/50 border border-rose-800 rounded flex items-start gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-rose-300">SQL INJECTION SUCCESSFUL!</div>
                      <div className="text-[11px] text-rose-200 mt-0.5">
                        Tautology evaluated to TRUE. Attacker authenticated as Administrator without password!
                      </div>
                    </div>
                  </div>
                ) : isSecure ? (
                  <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-emerald-300">INJECTION NEUTRALIZED</div>
                      <div className="text-[11px] text-emerald-200 mt-0.5">
                        Input treated 100% as a literal data parameter. Query structure preserved.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-400">
                    Query executed normally. Enter an injection payload to test bypass.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'xss' && (
        <div className="mt-4 space-y-4">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-300">Defensive Controls:</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableSanitization}
                  onChange={(e) => setEnableSanitization(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
                />
                Context Output Encoding (HTML Entities)
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableHttpOnly}
                  onChange={(e) => setEnableHttpOnly(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
                />
                HttpOnly Cookie Flag
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
              <label className="text-xs font-mono text-slate-400 block mb-1">Untrusted User Input (Search Parameter):</label>
              <textarea
                value={xssInput}
                onChange={(e) => setXssInput(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setXssInput("<script>alert(document.cookie)</script>")}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded font-mono"
                >
                  &lt;script&gt; payload
                </button>
                <button
                  onClick={() => setXssInput("<img src=x onerror=alert('XSS')>")}
                  className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded font-mono"
                >
                  &lt;img onerror&gt; payload
                </button>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Rendered Browser DOM Output
                </div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 font-mono text-xs break-all">
                  {enableSanitization ? (
                    <span className="text-emerald-400">{sanitizeHtml(xssInput)}</span>
                  ) : (
                    <span className="text-rose-400 font-bold bg-rose-950/60 p-1 rounded">{xssInput}</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                {!enableSanitization ? (
                  <div className="p-3 bg-rose-950/50 border border-rose-800 rounded flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-rose-300">XSS EXECUTED IN BROWSER!</div>
                      <div className="text-[11px] text-rose-200 mt-0.5">
                        {enableHttpOnly
                          ? 'Script executes, but document.cookie returns empty because HttpOnly flag is active.'
                          : 'CRITICAL: Attacker script stole raw session cookie via document.cookie!'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-emerald-300">SECURE: HTML ENCODED</div>
                      <div className="text-[11px] text-emerald-200 mt-0.5">
                        Characters &lt; and &gt; converted into &amp;lt; and &amp;gt;. Browser renders string harmlessly.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
