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

### 2026-11-28 · Day 12 · N5 vocabulary

- Checked (third pass, focused on Thai meanings, example translations, mnemonics and verb groups): `src/data/langs/ja-n5-vocab-a.ts` (371 words) and `src/data/langs/ja-n5-vocab-b.ts` (350 words). Items in the open 2026-10-31 and 2026-11-14 PRs were not repeated.
- Fix `n5a-132` 二十歳: mnemonic called 20 the age of majority; it has been 18 since April 2022; → the legal drinking age.
- Fix `n5a-256` 安い: mnemonic transliteration "ยาซุย" → "ยาสุย" (file convention す = สุ).
- Fix `n5a-67` 生徒: "(ประถม-มัธยม)" — elementary pupils are 児童; → "(มัธยม)".
- Fix loanword sources: `n5b-220` ボタン and `n5b-34` ビール said "from button/beer (Portuguese/Dutch …)", teaching English as the source; → "from Portuguese botão / Dutch bier".
- Fix false etymology: `n5b-111` 銀行 (行 = firm, not "go"); `n5b-12` くだもの (く = old reading of 木, not "basket"); `n5b-160` 宿題 (宿 = carried over, not "home"); `n5b-226` 雨 (rain from the sky, not "under a roof").
- Fix `n5b-30` 紅茶: Thai example "ชา" reads as お茶; → "ชาฝรั่ง".
- Improvement `n5a-171` 金曜日: mnemonic "Friday is payday" → the planet 金星, like the other weekdays.
- Needs human review: `n5a-244` 右 "มิกิ" (voiced ぎ); `n5a-58` 女 pictograph (kneeling, not cross-legged); `n5b-53` 台所; `n5b-131` 電車 "รถไฟฟ้า" may read as BTS/MRT; `n5b-152` 東 and `n5b-206` 背広 folk etymologies stated as fact; `n5b-19`, `n5b-2` calque "อาหาร…เป็น…"; `n5b-121` "อ่านหนังสือ" for 勉強; `n5b-210` "ได้เลย" for a request. Left as is.
