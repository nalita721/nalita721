# Daily content maintenance

A scheduled Claude session runs once a day to check that the learning content
is correct and to improve it a little at a time. This file is its plan and its
log. People can edit the backlog and rotation; the session appends to the log.

## Each run

1. `git pull`, then `npm ci` if `node_modules` is missing.
2. `npm run validate:content` — must end with `errors: 0` before and after any change.
3. Pick today's area from the rotation: day number = days since 2026-10-19
   (Asia/Bangkok date) mod 14.
4. **Check correctness** of that area by actually reading it: meanings and
   Thai translations, pinyin tones / kana readings / kanji, grammar
   explanations, answer keys (exactly one defensible answer), explanations
   matching the audio or passage, natural example sentences. Fix every real
   error found. Keep ids stable so learners' saved progress still matches.
5. **Update**: make one small, safe improvement in the same area (clarify a
   confusing explanation, replace a weak distractor, add a missing example).
   On Sundays instead take the top unchecked item from the backlog below and
   complete it fully, or a clear part of it.
6. `npm run validate:content`, `npx tsc -b`, `npm run lint` on changed files,
   `npm run build`. Only commit when all pass.
7. Append a log entry below (date, area, what was checked, every fix with id,
   the improvement made).
8. **Changes go through a pull request, never straight to the live branch.**
   Start from the latest `claude/toeic-vocabulary-web-gf8mya`, create the
   branch `content/YYYY-MM-DD`, commit everything in one commit, push that
   branch and open a pull request into `claude/toeic-vocabulary-web-gf8mya`
   titled `Content check YYYY-MM-DD · Day N · <area>`. The description lists,
   in Thai, every fix (id, what was wrong, what it is now), the improvement,
   and anything marked "needs human review". Never merge it yourself: the
   site owner reviews and merges, and Vercel posts a preview link on the PR.
9. If nothing needed fixing, still log the check (in a PR as above). Never
   push a change that is uncertain; note it in the log as "needs human
   review" instead.
10. If an earlier content PR is still open, base today's branch on the live
   branch anyway (PRs stay independent); if both touch the log, the later one
   is merged after resolving the log lines.

## Rotation (14 days)

| Day | Area | Files |
|---|---|---|
| 0 | English vocabulary, chapters 1–7 | `src/data/vocabulary.ts` |
| 1 | English vocabulary, chapters 8–13 | `src/data/vocabulary.ts` |
| 2 | English grammar lessons and questions | `src/data/grammar.ts` |
| 3 | English listening lessons + Mock set 1 listening | `src/data/listeningLessons.ts`, `src/data/fullMockExam.ts` |
| 4 | English reading passages + Mock set 1 reading | `src/data/reading.ts`, `src/data/fullMockExam.ts` |
| 5 | Mock sets 2 and 3 (answer keys, explanations) | `src/data/fullMockExamSet2.ts`, `src/data/fullMockExamSet3.ts` |
| 6 | Mock set 4 | `src/data/fullMockExamSet4.ts` |
| 7 | Chinese pinyin foundations | `src/data/langs/zh-foundations.ts` |
| 8 | HSK 1 (vocab, grammar, mock) | `src/data/langs/zh-hsk1.ts` |
| 9 | HSK 2 | `src/data/langs/zh-hsk2.ts` |
| 10 | HSK 3 | `src/data/langs/zh-hsk3.ts`, `zh-hsk3-vocab.ts` |
| 11 | Japanese kana + N5 kanji | `src/data/langs/ja-kana.ts`, `ja-n5-kanji.ts` |
| 12 | N5 vocabulary | `src/data/langs/ja-n5-vocab-a.ts`, `ja-n5-vocab-b.ts` |
| 13 | N5 grammar + mock | `src/data/langs/ja-n5.ts` |

## Backlog (Sundays, top first)

- [ ] HSK 4 vocabulary part 1 (300 of 600 new words) as `src/data/langs/zh-hsk4-vocab.ts`
- [ ] HSK 4 vocabulary part 2 (remaining 300 words)
- [ ] HSK 4 grammar topics + mock exam, then enable `load` for HSK 4 in `src/data/langs/index.ts`
- [ ] Explanations (`explanationTh`) for Mock set 2 listening questions
- [ ] Explanations for Mock sets 3 and 4 listening questions
- [ ] New TOEIC vocabulary chapter (B2): Legal & Contracts, 40 words, on the learning path
- [ ] HSK 5 (1,300 words) — split into several Sundays
- [ ] HSK 6 (2,500 words) — split into several Sundays

## Log

<!-- newest first: ### YYYY-MM-DD · Day N · Area -->

### 2026-11-18 · Day 2 · English grammar

- Checked: `src/data/grammar.ts` — all 11 topics (word-form, tense, preposition, conjunction, relative-clause, comparative, basic-sentence, present-tenses, inversion, mixed-conditionals, cleft-sentences): every key point, example and Thai, check, writing prompt and practice question (keys, single defensible answer, explanations).
- Fix two defensible answers (distractor replaced, key unchanged): `inv-1` "The company had never faced…" was also correct → "Never" moved into the stem; `inv-7` "could we" also correct → "we can"; `mix-9` "would have been finished by now" also correct → "will be"; `clft-9` "who" is allowed by the lesson for people → "what"/"whose"; `tn-6` "opens" (scheduled present simple) also correct → "open"; `bs-1`, `bs-3`, `bs-7`, `pt-3`, `pt-9` the past-tense distractor (reviewed, worked, placed, exported, announced) was also correct with no past time marker → "to review", "to work", "to place", "exporting", "announcing".
- Fix `mix-2`: "he would catch the error before submission" also worked as a general statement; stem → "…the error in last week's report"; explanation and `mix-7` explanation called "If he were…" "a condition that is always true"; → "unreal in the present".
- Fix `pt-3` explanation: "every year" is a repeated action, not a general truth; reworded.
- Fix inversion intro: "คำจำกัดความ" means "definition"; → "คำที่มีความหมายจำกัด".
- Fix `cj-w3` hint "..., however, ..." was a comma splice the lesson warns against; → "...; however, ...".
- Fix `wf-4` explanation: "ประธานรอง" (secondary subject) → "แกนของประธานในประโยค".
- Fix basic-sentence tip: "he/she/it always adds -s" holds only in the present simple; now says so.
- Improvement word-form suffix rule: the caution now also names -al/-ive nouns (approval, proposal, representative, initiative), common TOEIC Part 5 traps.
- Needs human review: `pp-6` "at the third floor conference room" is arguably acceptable besides "in"; `bs-10` "attend orientation this week" reads oddly in the simple present; word-form possessive point says a noun follows "always" (an adjective may come between); cleft tip says It is…that emphasises only nouns (key point 5 also covers time/place phrases); `rc-8` could note formal "whom"; suffix example Thai "อนุมัติแนวทางแก้ไขที่ได้ผลอย่างรวดเร็ว" is ambiguous. Left as is.
