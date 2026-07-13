"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// ── types ──
type Verdict = "Accepted" | "Wrong Answer" | "TLE" | "MLE" | "Runtime Error" | "Compilation Error" | null;
type TestResult = {
  input: string;
  expected: string;
  actual: string;
  verdict: string;
  exec_time_ms: number;
  is_Hidden: boolean;
};
type Problem = {
  id: string;
  title: string;
  description: string;
  diffculty: string;
  time_limit_ms: number;
  memory_limit_kb: number;
  TestCases: { input: string; expected_Output: string; is_Hidden: boolean }[];
};

const LANGUAGES = ["javascript" ];

const STARTER_CODE: Record<string, string> = {
  javascript: `function solution() {\n  // write your code here\n}\n`,
//   python:     `def solution():\n    # write your code here\n    pass\n`,
//   cpp:        `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // write your code here\n    return 0;\n}\n`,
//   java:       `import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // write your code here\n    }\n}\n`,
//   c:          `#include <stdio.h>\n\nint main() {\n    // write your code here\n    return 0;\n}\n`,
};

const diffColor = (d: string) =>
  d === "easy"   ? "text-[#2ECC71] bg-[#2ECC71]/10" :
  d === "medium" ? "text-[#F4D03F] bg-[#F4D03F]/10" :
                   "text-[#E63946] bg-[#E63946]/10";

const verdictColor = (v: string) =>
  v === "Accepted"  ? "text-[#2ECC71]" :
  v === "TLE"       ? "text-[#F4D03F]" :
                      "text-[#E63946]";

export default function BattleGround({
  matchId,
  userId,
  problem,
}: {
  matchId: string;
  userId: string;
  problem : Problem;
}) {
  const router = useRouter();

  // ── editor state ──
  const [code, setCode]             = useState(STARTER_CODE["javascript"]);
  const [language, setLanguage]     = useState("javascript");
  const [activeTab, setActiveTab]   = useState<"problem" | "results">("problem");

  // ── match state ──
  const [timeLeft, setTimeLeft]     = useState(30 * 60); // 30 min
  const [opponentDone, setOpponentDone] = useState(false);
  const [opponentVerdict, setOpponentVerdict] = useState<string | null>(null);

  // ── submission state ──
  const [isRunning, setIsRunning]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResults, setRunResults] = useState<TestResult[] | null>(null);
  const [submitVerdict, setSubmitVerdict] = useState<Verdict>(null);
  const [submitTime, setSubmitTime] = useState<number | null>(null);
  const [submitMemory, setSubmitMemory] = useState<number | null>(null);
  const [submitted, setSubmitted]   = useState(false);

  // ── websocket ──
  const wsRef = useRef<WebSocket | null>(null);

  // ── countdown ──
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 0) { clearInterval(t); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // ── websocket connection ──
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "user-connect",
        id: userId,
        matchId,
      }));
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === "opponent-submitted") {
        setOpponentDone(true);
        setOpponentVerdict(msg.verdict ?? "Submitted");
      }

      if (msg.type === "match-ended") {
        // both submitted — go to results
        setTimeout(() => router.push(`/results/${matchId}`), 1500);
      }
    };

    return () => ws.close();
  }, [matchId, userId]);

  // ── format time ──
  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // ── change language ──
  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    setCode(STARTER_CODE[lang]);
  };

  // ── run code (visible test cases only) ──
  const handleRun = async () => {
    setIsRunning(true);
    setRunResults(null);
    setActiveTab("results");
    try {
      const form = new FormData();
      form.append("code", code);
      form.append("language", language);
      form.append("problemId", problem.id);

      const res  = await fetch("/api/submissions/check-code", { method: "POST", body: form });
      const data = await res.json();
      setRunResults(data.result?.testResults ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  // ── submit code (all test cases) ──
  const handleSubmit = async () => {
    if (submitted) return;
    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("code", code);
      form.append("language", language);
      form.append("problemId", problem.id);
      form.append("matchId", matchId);
      form.append("userId", userId);

      const res  = await fetch("/api/submissions/submit", { method: "POST", body: form });
      const data = await res.json();

      setSubmitVerdict(data.result?.verdict ?? "Wrong Answer");
      setSubmitTime(data.result?.exec_time_ms ?? null);
      setSubmitMemory(data.result?.memory_kb ?? null);
      setSubmitted(true);
      setActiveTab("results");

      // notify opponent via websocket
      wsRef.current?.send(JSON.stringify({
        type: "player-submitted",
        matchId,
        userId,
        verdict: data.result?.verdict,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timerColor = timeLeft < 300 ? "text-[#E63946]" : timeLeft < 600 ? "text-[#F4D03F]" : "text-[#F0EFF4]";

  return (
    <main className="bg-[#0A0A0F] text-[#F0EFF4] h-screen flex flex-col overflow-hidden font-sans">

      {/* ── TOP BAR ── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-[#1E1E2E] bg-[#111118] shrink-0">

        {/* logo + problem */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold">
            Code<span className="text-[#E63946]">Duel</span>
          </span>
          <div className="w-px h-4 bg-[#1E1E2E]" />
          <span className="text-sm font-medium">{problem.title}</span>
          <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wide ${diffColor(problem.diffculty)}`}>
            {problem.diffculty}
          </span>
        </div>

        {/* timer */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#6B6B80] uppercase tracking-wider">Time</span>
          <span className={`font-mono text-xl font-bold tabular-nums ${timerColor}`}>
            {fmt(timeLeft)}
          </span>
        </div>

        {/* opponent status */}
        <div className="flex items-center gap-3">
          {opponentDone ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20">
              <div className="w-2 h-2 rounded-full bg-[#E63946]" />
              <span className="font-mono text-xs text-[#E63946]">Opponent submitted</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E1E2E]">
              <div className="w-2 h-2 rounded-full bg-[#6B6B80] animate-pulse" />
              <span className="font-mono text-xs text-[#6B6B80]">Opponent coding{" "}
                <span className="opacity-60">···</span>
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN SPLIT ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT — problem + results ── */}
        <div className="w-[420px] shrink-0 flex flex-col border-r border-[#1E1E2E] overflow-hidden">

          {/* tabs */}
          <div className="flex border-b border-[#1E1E2E] bg-[#111118] shrink-0">
            {(["problem", "results"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-white border-[#E63946]"
                    : "text-[#6B6B80] border-transparent hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* tab content */}
          <div className="flex-1 overflow-y-auto p-5">

            {/* PROBLEM TAB */}
            {activeTab === "problem" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-bold mb-1">{problem.title}</h2>
                  <div className="flex gap-2 items-center">
                    <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase ${diffColor(problem.diffculty)}`}>
                      {problem.diffculty}
                    </span>
                    <span className="font-mono text-[10px] text-[#6B6B80]">{problem.time_limit_ms}ms limit</span>
                    <span className="font-mono text-[10px] text-[#6B6B80]">{problem.memory_limit_kb}KB memory</span>
                  </div>
                </div>

                {/* description */}
                <div className="text-sm text-[#B0B0C0] leading-relaxed whitespace-pre-wrap">
                  {problem.description}
                </div>

                {/* visible test cases */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#6B6B80] mb-3">
                    Examples
                  </p>
                  {problem.TestCases.filter(tc => !tc.is_Hidden).map((tc, i) => (
                    <div key={i} className="mb-3 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg p-3">
                      <p className="font-mono text-[10px] text-[#6B6B80] mb-2">Example {i + 1}</p>
                      <div className="font-mono text-xs text-[#F0EFF4] space-y-1">
                        <div><span className="text-[#6B6B80]">Input: </span>{tc.input}</div>
                        <div><span className="text-[#6B6B80]">Output: </span>{tc.expected_Output}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESULTS TAB */}
            {activeTab === "results" && (
              <div className="space-y-4">

                {/* submit verdict */}
                {submitVerdict && (
                  <div className={`p-4 rounded-xl border ${
                    submitVerdict === "Accepted"
                      ? "bg-[#2ECC71]/10 border-[#2ECC71]/30"
                      : "bg-[#E63946]/10 border-[#E63946]/30"
                  }`}>
                    <p className={`font-mono text-sm font-bold ${verdictColor(submitVerdict)}`}>
                      {submitVerdict === "Accepted" ? "✓ " : "✗ "}{submitVerdict}
                    </p>
                    {submitTime && (
                      <div className="flex gap-4 mt-2">
                        <span className="font-mono text-xs text-[#6B6B80]">⚡ {submitTime}ms</span>
                        <span className="font-mono text-xs text-[#6B6B80]">💾 {submitMemory}KB</span>
                      </div>
                    )}
                  </div>
                )}

                {/* running spinner */}
                {isRunning && (
                  <div className="flex items-center gap-3 p-4 bg-[#111118] border border-[#1E1E2E] rounded-xl">
                    <div className="w-4 h-4 border-2 border-[#E63946] border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono text-xs text-[#6B6B80]">Running test cases...</span>
                  </div>
                )}

                {/* run results */}
                {runResults && runResults.map((r, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${
                    r.verdict === "Accepted"
                      ? "border-[#2ECC71]/20 bg-[#2ECC71]/5"
                      : "border-[#E63946]/20 bg-[#E63946]/5"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[#6B6B80]">
                        Test Case {i + 1}
                      </span>
                      <span className={`font-mono text-[10px] font-bold ${verdictColor(r.verdict)}`}>
                        {r.verdict === "Accepted" ? "✓ Pass" : "✗ Fail"}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] space-y-1 text-[#B0B0C0]">
                      <div><span className="text-[#6B6B80]">Input: </span>{r.input}</div>
                      <div><span className="text-[#6B6B80]">Expected: </span>{r.expected}</div>
                      <div><span className="text-[#6B6B80]">Got: </span>
                        <span className={r.verdict === "Accepted" ? "text-[#2ECC71]" : "text-[#E63946]"}>
                          {r.actual ?? "null"}
                        </span>
                      </div>
                      {r.exec_time_ms && (
                        <div className="text-[#6B6B80]">⚡ {r.exec_time_ms}ms</div>
                      )}
                    </div>
                  </div>
                ))}

                {!runResults && !isRunning && !submitVerdict && (
                  <div className="text-center py-12 text-[#6B6B80] text-sm">
                    <p className="text-2xl mb-3">▶</p>
                    <p>Run your code to see results here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT — editor ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* editor header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E1E2E] bg-[#111118] shrink-0">
            <div className="flex gap-1">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLangChange(lang)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    language === lang
                      ? "bg-[#E63946] text-white"
                      : "text-[#6B6B80] hover:text-white hover:bg-[#1E1E2E]"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {/* run */}
              <button
                onClick={handleRun}
                disabled={isRunning || isSubmitting}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E1E2E] text-xs font-semibold text-[#F0EFF4] hover:border-[#6B6B80] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isRunning ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                ) : "▶"}
                Run
              </button>

              {/* submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitted || isRunning}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  submitted
                    ? "bg-[#2ECC71]/20 border border-[#2ECC71]/30 text-[#2ECC71] cursor-not-allowed"
                    : "bg-[#E63946] text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                ) : null}
                {submitted ? "✓ Submitted" : isSubmitting ? "Judging..." : "Submit"}
              </button>
            </div>
          </div>

          {/* code editor — textarea (replace with Monaco for production) */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              className="absolute inset-0 w-full h-full bg-[#0D0D14] text-[#ABB2BF] font-mono text-sm leading-relaxed p-5 resize-none focus:outline-none"
              style={{ tabSize: 2 }}
              onKeyDown={e => {
                // Tab key inserts spaces instead of switching focus
                if (e.key === "Tab") {
                  e.preventDefault();
                  const start = e.currentTarget.selectionStart;
                  const end   = e.currentTarget.selectionEnd;
                  const newCode = code.substring(0, start) + "  " + code.substring(end);
                  setCode(newCode);
                  setTimeout(() => {
                    e.currentTarget.selectionStart = start + 2;
                    e.currentTarget.selectionEnd   = start + 2;
                  }, 0);
                }
              }}
            />
          </div>

          {/* bottom bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#1E1E2E] bg-[#111118] shrink-0">
            <div className="flex gap-4">
              <span className="font-mono text-[10px] text-[#6B6B80]">
                {code.split("\n").length} lines
              </span>
              <span className="font-mono text-[10px] text-[#6B6B80]">
                {language}
              </span>
            </div>
            {submitted && submitVerdict && (
              <span className={`font-mono text-[10px] font-bold ${verdictColor(submitVerdict)}`}>
                Final: {submitVerdict}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── MATCH ENDED OVERLAY ── */}
      {opponentDone && submitted && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8 text-center max-w-sm w-full mx-4">
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-xl font-bold mb-2">Both players submitted!</h3>
            <p className="text-sm text-[#6B6B80] mb-4">Calculating results...</p>
            <div className="w-full h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
              <div className="h-full bg-[#E63946] animate-pulse" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}