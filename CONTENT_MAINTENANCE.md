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

### 2026-10-28 · Day 9 · HSK 2

- Checked: `src/data/langs/zh-hsk2.ts` — all 150 words (pinyin of word and example syllable by syllable, Thai, part of speech, mnemonics; no duplicates or HSK 1 overlap), all 8 grammar topics with every key point, example, check and practice question, and the full 60-item mock (keys, true/false direction, picture and response matching, explanations, counts, pass mark).
- Fix `hsk2-m-r25`: reply B "是，是我妻子送我的。" to "是新买的吗？" said "yes, bought" and then "a gift"; → "不是，是我妻子送我的。" (key unchanged).
- Fix `hsk2-g3-q4`: distractor "没" is a normal spoken short form of 没有 in comparisons (我没你高), so it was also correct; → "从".
- Fix `hsk2-g6` 或者 check: "我们星期六___星期天去都可以" also accepts 还是 ("A 还是 B 都可以"); sentence now "你可以星期六___星期天来。" where only 或者 fits.
- Fix `hsk2-g4-q5`: distractor "歌唱" is itself a verb, so 她歌唱得很好 was also grammatical; → "唱着".
- Fix `hsk2-g8-q4`: distractor "给" ("let", 不给我出去玩) is common in speech; → "离".
- Fix `hsk2-g2` V1着V2 example: Thai "เธอยิ้มแล้วพูดว่า" (smiled, then said) contradicted the point (both at once); → "เธอยิ้มพร้อมกับพูดว่า".
- Fix `h2-67` 次: mnemonic "一次 สองครั้ง 两次" read as if 一次 meant twice; → "一次 หนึ่งครั้ง, 两次 สองครั้ง".
- Fix `h2-91` 走: mnemonic said the lower part is 足; it is a foot shape from 止; corrected.
- Improvement `hsk2-g1` 没 key point: "never use 不 for past events" was too broad (他以前不喝酒); now says that to deny that an event happened you use 没, not 不.
- Needs human review: 欢迎 (huānyíng, HSK 2.0) is missing from the HSK 1–3 lists. `hsk2-g8-q7` and the 让 check still use 给 as a distractor (weak in speech); `hsk2-g3-q7` 比我老两岁 is heard casually; `hsk2-m-l34` uses 才 (HSK 3); `hsk2-m-r11` passage is first person but the statement says 他. Left as is.
