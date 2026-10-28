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

### 2026-10-29 · Day 10 · HSK 3

- Checked: `src/data/langs/zh-hsk3-vocab.ts` (all 300 words: pinyin of word and example syllable by syllable, Thai, part of speech, mnemonics and component claims; no duplicates) and `src/data/langs/zh-hsk3.ts` (all 10 grammar topics with every key point, example, check and practice question; the full 80-item mock: keys, true/false direction, explanations, numbers and times, counts, pass mark).
- Fix `hsk3-m-l39`: "你应该早点儿休息，这样对身体不好" can be heard as "resting early is bad for you"; clauses swapped to "这样对身体不好，你应该早点儿休息".
- Fix `hsk3-m-l31`: 按时 is an HSK 4 word; "别忘了按时还" → "别忘了还" (key and explanation unchanged).
- Fix `hsk3-g10-q3`: distractor "说来" is a standard variant (对我说来), so two answers were correct; → "说话".
- Fix `hsk3-g7` 越…越 key point: pattern "越 + V/Adj + 越 + Adj" contradicted its own examples 越看越喜欢 / 越听越喜欢; → "越 + V/Adj + 越 + Adj/V".
- Fix `hsk3-g2-q7`: distractor "发现" (那个问题已经被发现了) was also grammatical and natural; → "参加", explanation updated.
- Fix `h3-225` 满意: mnemonic "= เต็มใจ = พอใจ" equated satisfied with willing (เต็มใจ is the file's meaning for 愿意); → "ใจเต็มอิ่ม = พอใจ".
- Fix `h3-287` 多么: example "这个熊猫" used 个 for an animal while h3-290 teaches 只; → "这只熊猫" (pinyin updated).
- Improvement `hsk3-g1` 把 key point: "the verb must always take a complement" did not list reduplicated verbs / 一下, which its own `hsk3-g1-q8` uses (看看); added.
- Needs human review: the HSK 3 word list may differ from the official HSK 2.0 list (笔记本, 欢迎, 回答, 葡萄, 普通话 are absent; 留学 and 以为 may be HSK 4) — worth checking against an official list. `h3-258` 一般 is tagged adj. but used as an adverb; `hsk3-g5` "不能听懂 ชาวจีนไม่พูดกัน" is slightly absolute; `hsk3-g3-q6` 打完电话 and `hsk3-g10` 除了 distractors are grammatical but ruled out by the Thai; `h3-62` 香蕉 mnemonic "กล้วยหอม" names one variety; `h3-115` 东 mnemonic is a folk etymology. Left as is.
