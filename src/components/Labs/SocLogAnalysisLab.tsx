import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, Terminal } from 'lucide-react';

interface LogIncident {
  id: string;
  sourceIp: string;
  timestamp: string;
  service: string;
  rawLog: string;
  attackType: string;
  cvssScore: number;
  mitigation: string;
  recommendedPlaybook: string;
}

const INCIDENTS: LogIncident[] = [
  {
    id: 'inc-1',
    sourceIp: '185.220.101.5',
    timestamp: '2026-10-12 03:14:22',
    service: 'sshd[14022]',
    rawLog: 'Failed password for invalid user root from 185.220.101.5 port 54122 ssh2 (Attempt 48/50 in 60s)',
    attackType: 'SSH Credential Brute-Force / Password Spray',
    cvssScore: 7.5,
    mitigation: 'Implement Fail2ban / IP rate-limiting and disable password-based SSH root login (enforce public-key auth only).',
    recommendedPlaybook: 'Block Source IP via Perimeter Firewall & Invalidate Session Tokens',
  },
  {
    id: 'inc-2',
    sourceIp: '194.26.29.112',
    timestamp: '2026-10-12 03:18:05',
    service: 'nginx/access.log',
    rawLog: 'GET /catalog.php?id=1%20UNION%20SELECT%20null,schema_name,3%20FROM%20information_schema.schemata-- HTTP/1.1 200 4892 "sqlmap/1.6.4"',
    attackType: 'Automated SQL Injection (UNION-based) & Information Schema Enumeration',
    cvssScore: 8.8,
    mitigation: 'Migrate catalog query to Parameterized Prepared Statement and enable Web Application Firewall (WAF) rule SQLi-942100.',
    recommendedPlaybook: 'Enable WAF Virtual Patch & Review Backend Query Code',
  },
  {
    id: 'inc-3',
    sourceIp: '103.14.26.89',
    timestamp: '2026-10-12 03:22:40',
    service: 'apache2/access.log',
    rawLog: 'GET /download.php?file=../../../../../../etc/passwd HTTP/1.1 200 2410 "Mozilla/5.0"',
    attackType: 'Path Traversal / Local File Inclusion (LFI)',
    cvssScore: 8.6,
    mitigation: 'Implement strict filename whitelisting and sanitize filepath with basename() to strip directory traversal sequences.',
    recommendedPlaybook: 'Quarantine Vulnerable Endpoint & Patch File Handler',
  },
];

export const SocLogAnalysisLab: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<LogIncident>(INCIDENTS[0]);
  const [triagedIds, setTriagedIds] = useState<string[]>([]);
  const [selectedPlaybook, setSelectedPlaybook] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyMitigation = () => {
    if (selectedPlaybook === selectedIncident.recommendedPlaybook) {
      setFeedback('SUCCESS: Incident effectively contained and mitigated! IoC registered in SIEM.');
      if (!triagedIds.includes(selectedIncident.id)) {
        setTriagedIds([...triagedIds, selectedIncident.id]);
      }
    } else {
      setFeedback('INCORRECT ACTION: That playbook does not address the root threat vector of this incident.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Interactive Lab 06
          </span>
          <h3 className="text-lg font-bold text-white">Security Operations Center (SOC) Log Triage Lab</h3>
        </div>
        <div className="text-xs font-mono text-cyan-400">
          Triaged: {triagedIds.length} / {INCIDENTS.length} Incidents
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Incident Queue */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Active Alert Queue:</div>
          {INCIDENTS.map((inc) => (
            <button
              key={inc.id}
              onClick={() => {
                setSelectedIncident(inc);
                setSelectedPlaybook('');
                setFeedback(null);
              }}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedIncident.id === inc.id
                  ? 'bg-slate-800 border-cyan-500 shadow-sm'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{inc.service}</span>
                {triagedIds.includes(inc.id) ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] bg-rose-950/80 text-rose-300 px-1.5 py-0.5 rounded font-mono">
                    CVSS {inc.cvssScore}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1 truncate">{inc.sourceIp}</div>
            </button>
          ))}
        </div>

        {/* Incident Details & Playbook action */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Raw SIEM Log Event:</span>
              <span className="text-[11px] font-mono text-slate-400">{selectedIncident.timestamp}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-rose-300 border border-slate-800 break-all">
              <Terminal className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              {selectedIncident.rawLog}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div>
                <span className="text-slate-500 block">Identified Attack Vector:</span>
                <span className="font-semibold text-cyan-300">{selectedIncident.attackType}</span>
              </div>
              <div>
                <span className="text-slate-500 block">CVSS v3.1 Severity Rating:</span>
                <span className="font-semibold text-rose-400 font-mono">{selectedIncident.cvssScore} (High)</span>
              </div>
            </div>
          </div>

          {/* Containment Playbook Selector */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-white block">Select Incident Response Containment Action:</span>
            <div className="space-y-2">
              {[
                selectedIncident.recommendedPlaybook,
                'Reboot the Web Server immediately without taking forensic memory dump',
                'Ignore alert as harmless background internet noise',
              ]
                .sort()
                .map((pb, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-2.5 p-2.5 rounded border text-xs cursor-pointer transition-colors ${
                      selectedPlaybook === pb
                        ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="playbook"
                      value={pb}
                      checked={selectedPlaybook === pb}
                      onChange={() => setSelectedPlaybook(pb)}
                      className="mt-0.5"
                    />
                    <span>{pb}</span>
                  </label>
                ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleApplyMitigation}
                disabled={!selectedPlaybook}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium text-xs rounded transition-colors"
              >
                Execute Containment
              </button>
            </div>

            {feedback && (
              <div
                className={`p-3 rounded text-xs flex items-start gap-2 ${
                  feedback.includes('SUCCESS')
                    ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                    : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                }`}
              >
                {feedback.includes('SUCCESS') ? (
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold">{feedback}</div>
                  {feedback.includes('SUCCESS') && (
                    <div className="text-[11px] mt-1 text-emerald-200">
                      Technical Solution: {selectedIncident.mitigation}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
