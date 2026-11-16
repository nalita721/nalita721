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

### 2026-11-17 · Day 1 · English vocabulary, chapters 8–13

- Checked: `src/data/vocabulary.ts` chapters marketing, IT, logistics, real estate, manufacturing and advanced business C1 (240 words): Thai meanings in the business sense, part of speech, Thai pronunciation, mnemonic roots, examples and their Thai, synonyms/antonyms; duplicate terms across all 520 words (none).
- Fix `it-6` backup example: "Please backup your files" used the noun as a verb; → "back up".
- Fix `log-27` tariff mnemonic: the town of Tarifa story is folk etymology; → Arabic ta'rif (notification) via Italian tariffa.
- Fix `log-9` dispatch mnemonic: not from pactum; → dis- + Italian impacciare (hinder) = remove what hinders.
- Fix `re-26` foreclosure mnemonic: for- is Old French "out" (forclore), not fore = "in advance"; corrected.
- Fix `c1-4` contingency mnemonic: Latin tingere means "dye"; the root is contingere (con + tangere "touch"); corrected.
- Fix `it-31` cybersecurity pronunciation: "ซี-คิว" → "ซิ-เคียว" (/sɪˈkjʊr-/).
- Fix `mkt-12` demographic: meaning "ข้อมูลประชากร" is demographics, and the example uses the adjective; → pos "n./adj.", "กลุ่มประชากร/เกี่ยวกับประชากร", Thai example to match.
- Fix `mf-19` maintenance example: a machine is not "closed"; → "The machine is down for scheduled maintenance." with matching Thai.
- Fix pos n./v. or v./n. with only one meaning: `it-29` malfunction, `mkt-28` segment, `re-18` sublease — the missing sense added.
- Improvement `mkt-16` impression: meaning gave only the ad-metric sense; → "การแสดงผลโฆษณา (ต่อครั้ง)/ความประทับใจ".
- Needs human review: `c1-4` contingency meaning fits only "contingency plan"; `c1-24` stipulate straw story is doubtful; `c1-25` conglomerate (noun) ends "-เริท" not "-เรท"; `mf-8` capacity mnemonic splits "city"; `it-36` deploy, `log-40` expedite, `log-2` inventory, `log-7` logistics roots loosely stated; `it-27` configure "เกอร์" vs /ɡjər/; `log-34` just-in-time meaning written as a noun; `log-33` Thai repeats คำสั่งซื้อ; `log-24` freight cost overlaps `log-3` freight; `mf-3`, `mf-5` examples slightly stilted. Left as is.
