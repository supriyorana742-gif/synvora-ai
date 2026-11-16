"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Inbox, Tags, Search, Database, Send, ShieldCheck, type LucideIcon } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  log: string;
  x: number;
  y: number;
  icon: LucideIcon;
}

// Illustrative workflow: one inbound request moving through a chain of agents.
const nodes: GraphNode[] = [
  { id: "inbox", label: "Inbox", log: "New inquiry received", x: 80, y: 60, icon: Inbox },
  { id: "classify", label: "Classify", log: "Intent: sales question", x: 250, y: 60, icon: Tags },
  { id: "research", label: "Research", log: "Company details gathered", x: 420, y: 150, icon: Search },
  { id: "crm", label: "Update CRM", log: "Record created, owner assigned", x: 250, y: 250, icon: Database },
  { id: "review", label: "Human review", log: "Draft waiting for approval", x: 80, y: 250, icon: ShieldCheck },
  { id: "reply", label: "Reply", log: "Approved reply sent", x: 250, y: 370, icon: Send },
];

// Edges by node index.
const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
];

const NODE_W = 148;
const NODE_H = 50;
const STEP_MS = 1500;

export function AgentGraph() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), STEP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const current = nodes[active];

  return (
    <figure className="relative mx-auto w-full max-w-[34rem]">
      <div className="absolute inset-0 -z-10 rounded-full bg-brand/15 blur-[90px]" aria-hidden />
      <div className="glass rounded-(--radius-card) p-4 sm:p-6">
        <svg
          viewBox="0 0 500 430"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Illustration of an automated workflow: an inbound request is classified, researched, recorded in a CRM, reviewed by a person, and answered."
        >
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#477BFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#9066FF" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {edges.map(([a, b]) => {
            const from = nodes[a];
            const to = nodes[b];
            const lit = active === a || active === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={lit ? "url(#edge)" : "rgb(255 255 255 / 0.12)"}
                strokeWidth={lit ? 1.6 : 1}
                className={lit && !reduce ? "flow-line" : undefined}
              />
            );
          })}

          {nodes.map((n, i) => {
            const on = i === active;
            const Icon = n.icon;
            return (
              <g key={n.id} transform={`translate(${n.x - NODE_W / 2} ${n.y - NODE_H / 2})`}>
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill={on ? "#151f33" : "#101827"}
                  stroke={on ? "#477BFF" : "rgb(255 255 255 / 0.14)"}
                  strokeWidth={on ? 1.5 : 1}
                  style={{ transition: "stroke 0.3s, fill 0.3s" }}
                />
                <Icon
                  x={14}
                  y={NODE_H / 2 - 9}
                  width={18}
                  height={18}
                  color={on ? "#8fb0ff" : "#A1A9BA"}
                  strokeWidth={1.8}
                />
                <text x={40} y={NODE_H / 2 + 5} fontSize={14} fill={on ? "#fff" : "#A1A9BA"} style={{ fontFamily: "var(--font-sans)" }}>
                  {n.label}
                </text>
              </g>
            );
          })}

          {/* The task token */}
          <motion.circle
            r={6}
            fill="#fff"
            initial={false}
            animate={{ cx: current.x + NODE_W / 2, cy: current.y - NODE_H / 2 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 15 }}
          />
          <motion.circle
            r={14}
            fill="#477BFF"
            opacity={0.25}
            initial={false}
            animate={{ cx: current.x + NODE_W / 2, cy: current.y - NODE_H / 2 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 15 }}
          />
        </svg>

        <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3 text-xs text-muted">
          <span aria-hidden className="truncate">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-ok align-middle" />
            {current.log}
          </span>
          <span className="shrink-0">Illustrative workflow</span>
        </figcaption>
      </div>
    </figure>
  );
}
