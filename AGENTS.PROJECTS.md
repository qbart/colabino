# AGENTS.PROJECTS

Project-specific guidance for future agents working in this repository.

## Scope
- Primary page:
  - `ui/src/pages/ProjectPage.tsx`
- App integration:
  - `ui/src/App.tsx`

## Current Product State
- `Project2` was removed.
- The issue-list experience now lives in `ProjectPage.tsx` and is exposed as `Project`.
- Route: `/project`
- Sidebar icon: `SquareKanban`

## Visual Direction
- Theme: light only.
- Layout: one continuous full-width issue list surface (not card-per-section).
- Section order:
  1. `In Review`
  2. `In Progress`
  3. `Todo`
  4. `Done`
- Section headers are compact bars with: status icon, title, count, and `+` action.

## Row Layout Contract (Do Not Break)
- Rows are fixed-grid aligned and must keep vertical alignment for:
  - priority
  - issue ID
  - status icon
- Current column pattern:
  - priority icon
  - issue ID
  - status icon
  - title
  - right metadata block

## Priority Rules
- Compact icon-only priority column using Lucide battery icons:
  - `URGENT` -> `BatteryWarning` (red)
  - `HIGH` -> `BatteryFull` (neutral)
  - `MEDIUM` -> `BatteryMedium` (neutral)
  - `LOW` -> `BatteryLow` (neutral)

## Status Icon Rules
- `In Review` -> `CircleDot`
- `In Progress` -> `CircleDashed`
- `Todo` -> `Circle`
- `Done` -> `CircleCheck`
- Keep section-header icon and row-status icon consistent.

## Row Metadata Order
- Right-side order in each issue row:
  1. labels/tags
  2. project badge with `SquareKanban` icon
  3. assignee avatar chip
  4. creation date
- Project name should exist only inside issue rows, not in the top header.

## Corner Rules
- Overall surface is flatter.
- Rounded corners stay on labels/chips (tags, top labels, project badge, avatar).

## Validation
- After edits:
  - `cd /Users/kiwi/d/colabino/ui && bun run build`
- Known non-blocking warning:
  - Vite warns about deprecated `esbuild` option from `vite:react-swc`.
