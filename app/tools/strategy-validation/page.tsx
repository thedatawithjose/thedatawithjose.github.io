'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { assess, questions } from '@/lib/strategy-validation.mjs';

const options = [['yes', 'Yes'], ['no', 'No'], ['unknown', 'Not sure']] as const;
const groups = [...new Set(questions.map(q => q.group))];
export default function StrategyValidationPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const result = assess(answers);
  function downloadReport() {
    const report = ['AJ Trading Systems — Strategy Validation Assessment v1.0', result.state, 'Self-reported controls only; not an independent audit or proof of profitability.', ...result.rows.map(q => q.group + ' | ' + q.prompt + ' | ' + q.answer + (q.answer !== 'yes' ? ' | Next step: ' + q.action : ''))].join('\n');
    const url = URL.createObjectURL(new Blob([report], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'strategy-validation-report.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="min-h-screen bg-[#050B14] text-white"><Header />
    <main className="max-w-4xl mx-auto px-5 pt-36 pb-20">
      <p className="text-[#00E5A0] font-semibold uppercase tracking-wider text-sm">Free research tool · AJ Trading Systems</p>
      <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-5">Trading Strategy Validation Toolkit</h1>
      <p className="text-lg text-gray-300 mb-3">Find gaps in your research before committing development time or capital. Answer 14 questions and get a prioritized research checklist.</p>
      <p className="text-sm text-gray-400 mb-8">No registration. Your answers stay in this page's local state and are not sent by this tool. This self-assessment does not independently verify your backtest or predict profitability. Choose Not sure when you lack evidence.</p>
      <div className="text-sm text-gray-300 mb-5" aria-live="polite">{Object.keys(answers).length} of {questions.length} answered · {result.completed} controls declared complete</div>
      <form onSubmit={e => {e.preventDefault(); setShowResults(true);}}>
        {groups.map(group => <section key={group} className="border border-[#1E2D45] rounded-2xl p-5 md:p-7 mb-5 bg-[#0D1B30]">
          <h2 className="text-xl font-semibold text-[#00E5A0] mb-4">{group}</h2>
          {questions.filter(q => q.group === group).map(q => <fieldset key={q.id} className="border-0 mb-6 last:mb-0">
            <legend className="font-medium mb-3">{q.prompt}</legend>
            <div className="flex flex-wrap gap-3">{options.map(([value,label]) => <label key={value} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#41566e] cursor-pointer"><input type="radio" name={q.id} value={value} checked={answers[q.id]===value} onChange={() => {setAnswers(old=>({...old,[q.id]:value})); setShowResults(false);}} className="accent-[#00E5A0]" />{label}</label>)}</div>
          </fieldset>)}
        </section>)}
        <div className="flex flex-wrap gap-4"><button type="submit" className="bg-[#00E5A0] text-[#050B14] px-6 py-3 rounded-xl font-bold">View assessment</button><button type="button" onClick={()=>{setAnswers({});setShowResults(false);}} className="border border-gray-500 px-6 py-3 rounded-xl">Reset</button></div>
      </form>
      {showResults && <section aria-live="polite" className="mt-8 rounded-2xl border border-[#41566e] bg-[#0D1B30] p-6">
        <h2 className="text-xl md:text-2xl font-bold">{result.state}</h2>
        <p className="my-3 text-gray-300">Self-reported assessment: {result.completed} declared complete, {result.failed.length} gaps, {result.missing.length} unknown. Even a complete assessment requires independent evidence review before progressing.</p>
        {[...result.failed.filter(q=>q.critical),...result.failed.filter(q=>!q.critical),...result.missing].map(q=><div key={q.id} className="border-t border-[#1E2D45] py-3"><p className="font-semibold">{q.group} · {q.answer==='no'?'Declared gap':'Evidence missing'}</p><p className="text-gray-300">{q.action}</p></div>)}
        <button onClick={downloadReport} className="border border-[#00E5A0] text-[#00E5A0] rounded-lg px-4 py-3 my-3">Download text report</button>
        <div className="mt-5 border-t border-[#1E2D45] pt-5"><h3 className="font-bold text-lg">Need help validating your strategy?</h3><p className="text-gray-300 my-3">Discuss your research gaps in a free 30-minute discovery call.</p><a href="https://calendly.com/ajtradingsystems/30min" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#00E5A0] text-[#050B14] font-bold rounded-lg px-5 py-3">Book a discovery call</a><Link href="/services/" className="inline-block ml-4 underline text-gray-200">Explore services</Link></div>
      </section>}
    </main><Footer /></div>;
}
