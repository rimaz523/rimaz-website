---
name: review-changes
description: Review the current branch's changes by dispatching each touched sub-project to its dedicated convention reviewer subagent. Use before committing or opening a PR in this monorepo.
---

# Review changes across the monorepo

This monorepo has one convention reviewer per stack. This skill routes the diff to the right reviewer(s) so each changed sub-project is checked against its own rules.

## Steps

1. Determine what changed. Prefer the branch diff against `master`:

   ```bash
   git diff --name-only master...HEAD
   ```

   If that's empty or you want uncommitted work too, also consider `git status --porcelain` and `git diff --name-only`.

2. Map the changed paths to sub-projects and launch the matching reviewer subagent(s) **in parallel** (one Agent call each, in a single message). Only launch a reviewer if that sub-project actually has changes:

   | Changed path prefix | Subagent |
   | --- | --- |
   | `integrations-dotnet-api/` | `dotnet-api-reviewer` |
   | `website-react-spa/` | `react-reviewer` |
   | `website-angular-spa/` | `angular-reviewer` |
   | `terraform-infra/` | `terraform-reviewer` |

   - `website-vue-spa/` has no dedicated reviewer — review it inline against standard Vue 3 + Pinia + Vite conventions, or note it was skipped.
   - Root files (`Readme.md`, `CLAUDE.md`, `.claude/`, etc.) need no stack reviewer — review inline if relevant.

3. Each reviewer scopes itself with `git diff`. In the prompt, tell it which sub-project to focus on so it doesn't waste effort on unrelated paths.

4. Aggregate the findings into one report grouped by sub-project, ordered Must fix → Should fix → Nitpick. Don't drop or soften any reviewer's Must-fix items.

## Notes

- For a deeper, billed multi-agent cloud review of the whole branch, the user can run `/code-review ultra` themselves — this skill is the fast, local, convention-focused pass.
- This is a read-only review; it does not edit code. Apply fixes only if the user asks.
