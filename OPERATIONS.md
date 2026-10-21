# Operations: backups, releases, content updates

## Daily data backup

Learner data (accounts, progress, friends, duels, reminder settings) lives in
Upstash Redis. Every morning the reminder cron (`/api/send-reminders?slot=morning`,
01:00 UTC = 08:00 Bangkok) also runs the backup in `api/_backup.ts`: it exports every
key except login sessions, one-time login tokens and rate-limit counters, gzips the
JSON and emails it as an attachment to `BACKUP_EMAIL`. Each day's email stays
in the inbox, so older copies are kept as long as the emails are.

**Setup (once):** Vercel → Project → Settings → Environment Variables → add
`BACKUP_EMAIL` = the address that should receive backups, then redeploy. Until
it is set the backup is skipped (the cron response says `BACKUP_EMAIL is not set`).
With Resend's test sender (`onboarding@resend.dev`) mail can only go to the
Resend account's own address.

**Run a backup now:**
`curl -H "Authorization: Bearer $CRON_SECRET" https://toeic-nu.vercel.app/api/backup`
(needs `CRON_SECRET` set in Vercel).

**Restore:** download the `.json.gz` from the backup email, set
`UPSTASH_REDIS_REST_KV_REST_API_URL` and `UPSTASH_REDIS_REST_KV_REST_API_TOKEN`
(copy from Vercel) in your shell, then
```
npm run backup:restore -- linguamaster-backup-YYYY-MM-DD.json.gz          # dry run: shows what it would write
npm run backup:restore -- linguamaster-backup-YYYY-MM-DD.json.gz --write  # restores
```
Keys in the backup overwrite current ones; other keys are left alone.
Learners only need to log in again afterwards.

## Releases and rollback

The live site deploys from `claude/toeic-vocabulary-web-gf8mya`. Every push
to it (a feature release or a merged content PR) is tagged automatically by
the GitHub Action `.github/workflows/tag-release.yml` as `vYYYY.MM.DD`
(Bangkok date; `-2`, `-3` for later releases the same day), with the commit
title as the tag message. Tags are listed on GitHub under Tags/Releases.
**To roll back:** in Vercel → Deployments, pick the deployment of the last
good tag and "Promote to Production" (instant, no code change). To also roll
the code back, `git revert` the bad commits on the live branch (never force-push).
List releases with `git tag -n`.

## Daily content updates

A scheduled Claude session checks content every morning following
`CONTENT_MAINTENANCE.md` and opens a pull request `content/YYYY-MM-DD`
instead of pushing to the live branch. Review the PR (Vercel adds a preview
link), then merge it on GitHub to publish.
