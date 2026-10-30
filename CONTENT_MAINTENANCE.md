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

### 2026-10-31 · Day 12 · N5 vocabulary

- Checked: `src/data/langs/ja-n5-vocab-a.ts` (371 words) and `src/data/langs/ja-n5-vocab-b.ts` (350 words) — kana readings of every word and example (irregular day/month readings, sound changes, small っ/ゃ, long vowels, particles), romaji, kanji, Thai meanings and translations, part of speech and verb groups, mnemonics, examples containing their word, duplicate ids and words within and across both files.
- Fix `n5a-95` 四十: mnemonic said 四 before 十 is *always* よん; しじゅう also exists; now "mainly よん".
- Fix `n5b-79` ストーブ: meaning "เตาผิง" (fireplace, 暖炉) was wrong; → "เครื่องทำความร้อน, ฮีตเตอร์".
- Fix `n5b-107` 国: mnemonic said the box surrounds land; it surrounds 玉; corrected.
- Fix `n5b-174` ページ: example reading じゅうぺーじ → じゅっぺーじ (十ページ).
- Fix `n5b-288` 消す: mnemonic had a Thai letter ม in place of katakana ム (消しゴム).
- Fix `n5b-222` 脱ぐ: mnemonic said it is used for everything you wear; glasses/neckties take 外す; corrected.
- Improvement `n5a-324` 立つ: Thai "ครูยืนอยู่ข้างหน้า" (is standing) described a state; → "ครูไปยืนข้างหน้า" (the action 立つ describes).
- Needs human review: words often listed at N4 (自分, 店員, ご主人, 会社員, おかげさまで, 空港, 信号, 新幹線, 冷蔵庫, パソコン, 授業, サンドイッチ, 黒板, 意味, 野球) — useful extras, kept. File B writes katakana as hiragana in exampleReading (こーひー) while file A keeps katakana; same word value used twice for 十 (じゅう/とお) and 時 (じ/とき). `n5a-200` 今日は月がきれい is translated "คืนนี้". `n5b-324` 知る: example あの人の名前を知る人はいません is written-style; speech uses 知っている人, but the validator requires the example to contain 知る, so a new example is needed. Left as is.
