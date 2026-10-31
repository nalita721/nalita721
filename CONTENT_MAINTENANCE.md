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

### 2026-11-01 · Day 13 · N5 grammar + mock (Sunday: backlog)

- Checked: `src/data/langs/ja-n5.ts` — all 15 grammar topics (key points, explanations, examples and readings, checks, practice questions) and the full mock (keys, ★ word-order and passage-gap items, arithmetic, times and days, Thai explanations, ids, timing and pass mark).
- Fix `n5-m-l1-q3`: the man says the station is 20 minutes from the cinema, so meeting at 2:00 for a 2:30 film would still be on time and his reason for 1:30 did not hold; → 40分 (key 1時半 unchanged).
- Fix `n5-g1` か check: distractor ね also works (山田さんは会社員ですね。はい、そうです); → を.
- Fix `n5-g6` intro: said the place always takes に while listing events (งาน) under あります; events take で (パーティーは学校であります); now says so.
- Fix `n5-g9` ～たい: "only for yourself" was too strong (何が食べたいですか is normal); now "yourself or asking the listener, not a third person directly".
- Fix `n5-g9-q3`: distractor 食べたいです is also a valid (indirect) invitation; → 食べませんでした.
- Fix `n5-g9` tip: said "3 levels of invitation" but lists 2; → 2.
- Fix `n5-g11` ～たり～たりします: "always ends with します" ignored しました; → "ends with する (します/しました)".
- Fix `n5-g12-q5`: distractor 前 (食事の前、くすりを…) is also acceptable; → 前が.
- Fix `n5-g13` より: "(สิ่งที่ด้อยกว่า)" (the inferior thing) is misleading; → "(ฐานที่ใช้เปรียบเทียบ)".
- Backlog (Sunday): HSK 4 vocabulary part 1 continued — new file `src/data/langs/zh-hsk4-vocab-b.ts` with words h4-101 … h4-200 in chapters 5–8 (feelings and health; study; society and nature; common verbs), each with pinyin, part of speech, Thai meaning, mnemonic, example, its pinyin and Thai. It is a separate file so it does not depend on the still-open PR with h4-1 … h4-100; checked against HSK 1–3 and h4-1 … h4-100 for repeats (none), example sentences use HSK 1–4 words. Not shown in the app yet. Progress: 200 of 300 words for part 1.
- Needs human review: the mock is shorter than the real N5 (vocabulary 21 vs 35, grammar 17 vs 26, reading 5 vs 6 items) though its header says "full"; `BUNSHOU_PASSAGE` uses ～ないで (N4); `n5-g7-q1` 高くなかった fits if read as past; several particle questions are decided only by the Thai gloss; `n5-g12` tip says こと・前に・つもり・のが all follow the dictionary form (つもり also takes V-ない); `n5-g15` から remark about Thai word order. A native speaker spot-check of the 100 new HSK 4 examples. Left as is.
