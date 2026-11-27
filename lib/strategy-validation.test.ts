import { describe, it, expect } from 'vitest';
import { assess, questions } from './strategy-validation.mjs';
describe('strategy validation self-assessment', () => {
 const yes = Object.fromEntries(questions.map(q => [q.id,'yes']));
 it('does not approve missing evidence',()=>expect(assess({}).state).toBe('INSUFFICIENT EVIDENCE'));
 it('does not claim validation for all yes',()=>expect(assess(yes).state).toBe('DECLARED CONTROLS COMPLETE'));
 it('prioritizes a declared critical bias even with missing evidence',()=>expect(assess({lookahead:'no'}).state).toBe('INVALID EVIDENCE (DECLARED)'));
 it('requires research when costs or risk fail',()=>{for(const id of ['costs','net','risk','oos']) expect(assess({...yes,[id]:'no'}).state).toBe('RESEARCH REQUIRED');});
 it('treats malformed input as unknown',()=>expect(assess({...yes,risk:'bad'}).state).toBe('INSUFFICIENT EVIDENCE'));
 it('identifies next actions for every unresolved control',()=>expect(assess({}).missing.every(q=>q.action.length>0)).toBe(true));
});
