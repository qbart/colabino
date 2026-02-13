# AGENTS.DATA.md

Purpose: guide future agents working on the Data page.

## Source of truth
- Page component: `ui/src/pages/DataPage.tsx`
- Shared animation styles: `ui/src/index.css`
- Route entry: `ui/src/App.tsx` at path `/data`

## Current UX contract
- Data page title is `Data`.
- Two view modes exist: `Simple` and `Signals`.
- `Signals` is currently placeholder-only.
- Simple mode shows a unified grid list with folders first.
- Audio items have play/stop toggle and fake progress bar at row bottom.

## Floating create control
- Main floating `+` button lives in Data page (not global shell).
- On click, sub-buttons fan out in an arc.
- Arc actions currently: `Folder`, `Project`, `Board`, `Sheet`, `Upload`.
- Selecting an arc action must:
  1. close the arc menu,
  2. add a new item to Data list with matching kind,
  3. visually highlight the new item.

## Highlight behavior
- No tooltip/toast near the floating button for creation events.
- New-item feedback is highlight-only.
- Highlight style uses `animate-black-fade-highlight` class defined in `index.css`.
- If you change highlight timing/intensity, do it in CSS only unless behavior requires logic changes.

## Data model notes
- `DriveItem` includes `id` and type-specific metadata (image/audio/3d/project/folder).
- Keep stable `id` keys for rendering and highlight targeting.
- `leadingVisual` and `secondaryLabel` encode many display conventions; preserve these unless intentionally changing UX.

## Guardrails for future edits
- Do not rename `/data` route without explicit request.
- Keep floating button aligned with Data section padding (`absolute right-6 bottom-6` under page section).
- Keep arc spacing visually even unless asked otherwise.
- Keep menu icon-only unless user asks for labels again.
- Keep folders sorted first in simple view.

## Validation
- Run: `bun run build` in `ui/` after Data changes.
