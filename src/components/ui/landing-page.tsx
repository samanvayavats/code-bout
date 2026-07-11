"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "while(true) { duel(); }";
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setTyped(fullText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const b = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(b);
  }, []);

  return (
    <main >

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* red glow */}
       
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-6">
          Real-time 1v1 coding battles
        </p>
        <h1 className="text-[clamp(48px,7vw,96px)] font-bold leading-none tracking-[-2px] mb-6">
          Code Faster.<br />
          Think <em className="not-italic text-[#E63946]">Sharper.</em><br />
          Win Live.
        </h1>
        <div className="font-mono text-[clamp(14px,2vw,20px)] text-[#6B6B80] mb-12 min-h-[30px]">
          <span>{typed}</span>
          <span
            className="inline-block w-[2px] h-[1.1em] bg-[#E63946] align-middle ml-[2px] transition-opacity duration-100"
            style={{ opacity: cursorVisible ? 1 : 0 }}
          />
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/signup"
            className="text-sm font-semibold px-8 py-3 rounded-lg bg-[#E63946] text-white hover:-translate-y-0.5 hover:opacity-90 transition-all"
          >
            Enter the Arena
          </Link>
          <a
            href="#how"
            className="text-sm font-medium px-8 py-3 rounded-lg border border-[#1E1E2E] text-white hover:border-[#6B6B80] hover:-translate-y-0.5 transition-all"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="flex justify-center border-t border-b border-[#1E1E2E] bg-[#111118]">
        {[
          { num: "54+",  label: "Problems" },
          { num: "14",   label: "Topics" },
          { num: "1v1",  label: "Live Battles" },
          { num: "<60s", label: "Matchmaking" },
        ].map((s, i, arr) => (
          <div
            key={s.label}
            className={`flex-1 max-w-[220px] py-8 px-6 text-center ${i < arr.length - 1 ? "border-r border-[#1E1E2E]" : ""}`}
          >
            <div className="font-mono text-4xl font-semibold text-[#E63946] leading-none">{s.num}</div>
            <div className="text-[11px] text-[#6B6B80] mt-2 uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── BATTLE PREVIEW ── */}
      <section className="flex flex-col items-center px-12 py-24">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-4">Live battle preview</p>
        <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-center mb-16 max-w-xl">
          The arena is always open
        </h2>
        <div className="w-full max-w-4xl border border-[#1E1E2E] rounded-xl overflow-hidden bg-[#111118]">

          {/* battle header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E1E2E] bg-[#E63946]/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECC71]/15 text-[#2ECC71] text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71]" /> you
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#6B6B80] px-2 py-1 border border-[#1E1E2E] rounded">VS</span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#E63946]/15 text-[#E63946] text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-[#E63946]" /> opponent
              </div>
            </div>
            <span className="font-mono text-lg font-semibold text-[#F4D03F]">14:32</span>
          </div>

          {/* battle body */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* problem pane */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-[#1E1E2E]">
              <div className="text-sm font-semibold mb-2">Two Sum</div>
              <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#2ECC71]/15 text-[#2ECC71] font-mono uppercase tracking-wide mb-3">
                Easy
              </span>
              <p className="text-xs text-[#6B6B80] leading-relaxed mb-4">
                Given an array of integers and a target, return indices of the two numbers that add up to target. Each input has exactly one solution.
              </p>
              <div className="bg-[#0A0A0F] rounded-md p-3 font-mono text-xs text-white leading-loose">
                <div><span className="text-[#6B6B80]">Input: </span>nums = [2,7,11,15], target = 9</div>
                <div><span className="text-[#6B6B80]">Output: </span>[0,1]</div>
              </div>
            </div>

            {/* editor pane */}
            <div>
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E2E]">
                <select className="font-mono text-xs bg-[#0A0A0F] border border-[#1E1E2E] text-white rounded px-2 py-1">
                  <option>JavaScript</option>
                </select>
                <button className="text-xs font-semibold px-4 py-1.5 rounded bg-[#E63946] text-white">▶ Run</button>
              </div>
              <div className="p-4 font-mono text-xs leading-loose text-[#ABB2BF] bg-[#0A0A0F] min-h-[200px]">
                <div><span className="text-[#C678DD]">function</span> <span className="text-[#61AFEF]">twoSum</span>(nums, target) {"{"}</div>
                <div>&nbsp;&nbsp;<span className="text-[#C678DD]">const</span> map = <span className="text-[#C678DD]">new</span> <span className="text-[#61AFEF]">Map</span>();</div>
                <div>&nbsp;&nbsp;<span className="text-[#C678DD]">for</span> (<span className="text-[#C678DD]">let</span> i = <span className="text-[#D19A66]">0</span>; i {"<"} nums.length; i++) {"{"}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#C678DD]">const</span> comp = target - nums[i];</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#C678DD]">if</span> (map.<span className="text-[#61AFEF]">has</span>(comp))</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#C678DD]">return</span> [map.<span className="text-[#61AFEF]">get</span>(comp), i];</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;map.<span className="text-[#61AFEF]">set</span>(nums[i], i);</div>
                <div>&nbsp;&nbsp;{"}"}</div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>

          {/* test case footer */}
          <div className="flex gap-4 items-center px-5 py-3 border-t border-[#1E1E2E]">
            {[
              { label: "Test 1: Passed", color: "bg-[#2ECC71]" },
              { label: "Test 2: Passed", color: "bg-[#2ECC71]" },
              { label: "Test 3: Hidden", color: "bg-[#1E1E2E]" },
            ].map(tc => (
              <div key={tc.label} className="flex items-center gap-2 text-xs text-[#6B6B80]">
                <div className={`w-2 h-2 rounded-full ${tc.color}`} />
                {tc.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="border-t border-[#1E1E2E] px-12 py-24">
        <div className="flex flex-col items-center mb-16">
          <p className="font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-4">The flow</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-center max-w-xl">
            From queue to winner in minutes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto border border-[#1E1E2E] rounded-xl overflow-hidden divide-x divide-y divide-[#1E1E2E]">
          {[
            { step: "01", title: "Join Queue",      desc: "Pick a topic and difficulty. Redis matches you with someone on the same problem." },
            { step: "02", title: "Battle Starts",   desc: "Both players join a WebSocket room. The problem loads simultaneously." },
            { step: "03", title: "Write & Submit",  desc: "Use the in-browser editor. Run against visible cases then submit for hidden ones." },
            { step: "04", title: "Judge0 Runs It",  desc: "Code runs in a sandbox. Time, memory, and correctness are measured." },
            { step: "05", title: "Winner Decided",  desc: "Correctness first. Then speed. Then memory. Best score wins the duel." },
          ].map(c => (
            <div key={c.step} className="bg-[#111118] p-8">
              <div className="font-mono text-[11px] text-[#E63946] tracking-[2px] uppercase mb-4">{c.step}</div>
              <div className="text-base font-semibold mb-2">{c.title}</div>
              <div className="text-sm text-[#6B6B80] leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCORING ── */}
      <section className="border-t border-[#1E1E2E] px-12 py-24 flex flex-col items-center">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-4">Scoring system</p>
        <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-center mb-16 max-w-xl">
          How winners are picked
        </h2>
        <div className="flex gap-4 flex-wrap justify-center max-w-2xl w-full">
          {[
            { icon: "✓", name: "Correctness", desc: "All hidden test cases must pass. Wrong answer = 0 points.", bar: "bg-[#E63946] w-full" },
            { icon: "⚡", name: "Speed",       desc: "Faster execution time earns bonus points on top.",         bar: "bg-[#F4D03F] w-[70%]" },
            { icon: "💾", name: "Memory",      desc: "Lower memory usage breaks ties between equal scores.",     bar: "bg-[#2ECC71] w-[50%]" },
          ].map(s => (
            <div key={s.name} className="flex-1 min-w-[180px] bg-[#111118] border border-[#1E1E2E] rounded-xl p-7 text-center">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-sm font-semibold mb-2">{s.name}</div>
              <div className="text-xs text-[#6B6B80] leading-relaxed">{s.desc}</div>
              <div className={`h-[3px] rounded-sm mt-4 ${s.bar}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="border-t border-[#1E1E2E] px-12 py-20 flex flex-col items-center">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-[#E63946] mb-4">Problem bank</p>
        <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight text-center mb-12 max-w-xl">
          54 problems across 14 topics
        </h2>
        <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
          {[
            "Arrays","Strings","Linked List","Stack & Queue","Trees","Graphs",
            "Dynamic Programming","Hashing","Recursion","Binary Search",
            "Two Pointers","Heap","Trie","Bit Manipulation",
          ].map(t => (
            <span
              key={t}
              className="font-mono text-xs px-4 py-2 rounded-full border border-[#1E1E2E] text-[#6B6B80] bg-[#111118] hover:border-[#E63946] hover:text-white transition-all cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative border-t border-[#1E1E2E] px-12 py-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(230,57,70,0.1), transparent 70%)" }}
        />
        <h2 className="text-[clamp(36px,5vw,64px)] font-bold tracking-[-2px] mb-4">Ready to duel?</h2>
        <p className="text-base text-[#6B6B80] mb-10">Find your opponent. Write your code. Win the match.</p>
        <Link
          href="/signup"
          className="inline-block text-base font-semibold px-10 py-4 rounded-xl bg-[#E63946] text-white hover:-translate-y-1 hover:opacity-90 transition-all"
        >
          Enter the Arena →
        </Link>
      </section>

    </main>
  );
}
