# AGENTS.CHAT.md

Purpose: guide future agents working on the Chat page.

## Source of truth
- Page component: `ui/src/pages/ChatPage.tsx`
- Route entry: `ui/src/App.tsx` at path `/chat`

## Current UX contract
- Right sidebar contains channels and people.
- People statuses allowed: `online`, `busy`, `offline`.
- Bottom-right sidebar utility buttons use Spectrum S2 `Button` components.
- Message composer is multiline with floating send button inside textarea.
- Placeholder must remain exactly: `Write a message` (unless user asks otherwise).

## Header behavior
- Normal channel mode:
  - shows channel title/description,
  - tabs (`Messages`, `Pins`, `Threads`) near options.
- Thread mode:
  - minimal header: title `Thread` + single `Leave thread` button.

## Message/thread behavior
- Message bubble actions include pin and open-thread.
- In thread mode, body shows only parent message being replied to.
- No thread-of-thread UI.
- Bubble footer should not display `Start thread`; only show reply counts when > 0.

## Formatting behavior
- Supports multiline and simple formatting:
  - line breaks,
  - bullet lines (`- item`, `* item`),
  - ordered lines (`1. item`).
- Cmd/Ctrl + Enter sends; Enter creates newline.

## S2 integration scope
- App provider/style setup is in `ui/src/main.jsx`.
- Chat currently uses S2 buttons in sidebar utility row.
- Keep S2 usage consistent when editing those controls.

## Important maintenance note
- Keep an eye out for stale/dead thread helper logic when refactoring.
- Avoid adding duplicate send/thread handlers; keep a single send path.

## Validation
- Run: `bun run build` in `ui/` after Chat changes.
