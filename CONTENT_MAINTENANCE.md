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

### 2026-11-25 · Day 9 · HSK 2

- Checked: `src/data/langs/zh-hsk2.ts` — all 150 words (pinyin syllable by syllable, Thai, part of speech, mnemonics), all 8 grammar topics (key points, examples, checks, practice questions) and the full 60-item mock (structure 35 + 25, keys, true/false direction, picture and response matching, times and prices, Thai explanations, pass mark). Items already in the open 2026-10-28 content PR were not repeated.
- Fix `hsk2-g7` intro: "Chinese prepositions always come before the verb" is false in general (住在, 走到; the file's own h2-75 uses 住在); now limited to the three prepositions the topic teaches (从, 离, 往).
- Fix mock `passTh`: said the real exam is about 50 minutes plus 5 minutes for filling in the answer sheet; officially about 55 minutes including 5 minutes for personal details; corrected.
- Fix `h2-97` 快: meaning includes รีบ (adverb use, 快走吧) but pos was only คุณศัพท์; → "คุณศัพท์/คำวิเศษณ์".
- Improvement `hsk2-g1` 已经…了 key point: "มักมี 了 ปิดท้ายเสมอ" said "usually" and "always" at once; → "มักมี 了 ปิดท้ายประโยค".
- Needs human review: none new.
