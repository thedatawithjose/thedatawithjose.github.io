export const questions = [
  {
    "id": "hypothesis",
    "group": "Hypothesis",
    "prompt": "Are the entry, exit and position rules explicit enough to reproduce?",
    "action": "Write a versioned rule specification before running new tests.",
    "critical": false
  },
  {
    "id": "acceptance",
    "group": "Hypothesis",
    "prompt": "Were the benchmark and acceptance criteria set before evaluating the results?",
    "action": "Define the benchmark and decision criteria before further testing.",
    "critical": false
  },
  {
    "id": "data",
    "group": "Data integrity",
    "prompt": "Is the dataset free of known material errors that invalidate the results?",
    "action": "Repair material data defects and rerun the affected experiment.",
    "critical": true
  },
  {
    "id": "coverage",
    "group": "Data integrity",
    "prompt": "Have coverage, timestamps, missing observations and market-specific data issues been checked?",
    "action": "Audit data coverage, timestamp conventions and missing observations.",
    "critical": false
  },
  {
    "id": "lookahead",
    "group": "Backtest integrity",
    "prompt": "Is the experiment free of known look-ahead bias?",
    "action": "Remove future-information leakage and rerun the experiment.",
    "critical": true
  },
  {
    "id": "leakage",
    "group": "Backtest integrity",
    "prompt": "Is validation free of known contamination from tuning or test-set reuse?",
    "action": "Reserve a genuinely untouched test sample and repeat validation.",
    "critical": true
  },
  {
    "id": "trials",
    "group": "Statistical evidence",
    "prompt": "Were the strategy variants and parameter trials recorded and selection bias considered?",
    "action": "Record all trials and account for selection bias.",
    "critical": false
  },
  {
    "id": "uncertainty",
    "group": "Statistical evidence",
    "prompt": "Was uncertainty evaluated with a method appropriate to the sample and temporal dependence?",
    "action": "Estimate uncertainty accounting for dependence and sample limitations.",
    "critical": false
  },
  {
    "id": "oos",
    "group": "Robustness",
    "prompt": "Was performance evaluated on unseen chronological data?",
    "action": "Run chronological out-of-sample validation.",
    "critical": false
  },
  {
    "id": "sensitivity",
    "group": "Robustness",
    "prompt": "Was sensitivity to parameters and relevant market conditions evaluated?",
    "action": "Test plausible parameter changes and market conditions.",
    "critical": false
  },
  {
    "id": "costs",
    "group": "Execution realism",
    "prompt": "Were relevant fees, spread, slippage and instrument-specific costs included?",
    "action": "Model relevant costs and rerun the net-performance analysis.",
    "critical": false
  },
  {
    "id": "fills",
    "group": "Execution realism",
    "prompt": "Were order fills, liquidity and timing assumptions checked for realism?",
    "action": "Test realistic fills, liquidity and execution timing.",
    "critical": false
  },
  {
    "id": "net",
    "group": "Risk assessment",
    "prompt": "Did net out-of-sample results meet the predeclared research criteria?",
    "action": "Review net results against the original criteria; revise or stop research.",
    "critical": false
  },
  {
    "id": "risk",
    "group": "Risk assessment",
    "prompt": "Did measured risk meet the predeclared risk limits?",
    "action": "Review drawdown, exposures and adverse scenarios before advancing.",
    "critical": false
  }
];

/** @param {Record<string, string>} answers @param {typeof questions} [items] */
export function assess(answers, items = questions) {
 const rows=items.map(q=>({...q,answer:["yes","no","unknown"].includes(answers[q.id])?answers[q.id]:"unknown"}));
 const failed=rows.filter(q=>q.answer==="no"),missing=rows.filter(q=>q.answer==="unknown");
 const state=failed.some(q=>q.critical)?"INVALID EVIDENCE (DECLARED)":missing.length?"INSUFFICIENT EVIDENCE":failed.length?"RESEARCH REQUIRED":"DECLARED CONTROLS COMPLETE";
 return {state,failed,missing,completed:rows.filter(q=>q.answer==="yes").length,rows};
}
