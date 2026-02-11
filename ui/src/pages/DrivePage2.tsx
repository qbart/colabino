import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock3,
  FileAudio2,
  FileCog,
  FileSpreadsheet,
  FileText,
  Folder,
  Image as ImageIcon,
  MessageSquareWarning,
  Orbit,
  ShieldCheck,
  Users,
} from "lucide-react";

type DriveItem = {
  id: string;
  name: string;
  kind: "folder" | "project" | "image" | "audio" | "3d" | "document" | "sheet" | "proposal" | "board";
  location: string;
  ownerTeam: string;
  permission: "owner" | "editor" | "viewer" | "restricted";
  activeNow: number;
  contributors: number;
  lastActivity: string;
  health: "healthy" | "watch" | "at-risk";
  attention?: string;
  nextAction: string;
};

const driveItems: DriveItem[] = [
  {
    id: "d-1",
    name: "Product Workspace",
    kind: "folder",
    location: "My Drive",
    ownerTeam: "Product Ops",
    permission: "owner",
    activeNow: 4,
    contributors: 18,
    lastActivity: "2m ago",
    health: "healthy",
    nextAction: "Open folder",
  },
  {
    id: "f-1",
    name: "Q2 Product Launch",
    kind: "project",
    location: "My Drive / Product Workspace",
    ownerTeam: "Platform Team",
    permission: "editor",
    activeNow: 3,
    contributors: 8,
    lastActivity: "5m ago",
    health: "watch",
    attention: "2 tasks blocked by API review",
    nextAction: "Resolve blockers",
  },
  {
    id: "f-2",
    name: "Homepage Hero Render",
    kind: "image",
    location: "My Drive / Product Workspace",
    ownerTeam: "Design",
    permission: "editor",
    activeNow: 1,
    contributors: 5,
    lastActivity: "16m ago",
    health: "healthy",
    nextAction: "Review final",
  },
  {
    id: "f-3",
    name: "Voiceover Draft 02",
    kind: "audio",
    location: "My Drive / Product Workspace",
    ownerTeam: "Brand",
    permission: "viewer",
    activeNow: 0,
    contributors: 3,
    lastActivity: "42m ago",
    health: "watch",
    attention: "Approval pending from PM",
    nextAction: "Request approval",
  },
  {
    id: "f-4",
    name: "Device Mockup v5",
    kind: "3d",
    location: "My Drive / Product Workspace",
    ownerTeam: "Design",
    permission: "viewer",
    activeNow: 1,
    contributors: 4,
    lastActivity: "49m ago",
    health: "healthy",
    nextAction: "Attach to launch docs",
  },
  {
    id: "f-5",
    name: "Growth Model 2026",
    kind: "sheet",
    location: "My Drive / Finance",
    ownerTeam: "Finance",
    permission: "owner",
    activeNow: 2,
    contributors: 6,
    lastActivity: "1h ago",
    health: "healthy",
    nextAction: "Publish scenario v3",
  },
  {
    id: "f-6",
    name: "Client Estimation v3",
    kind: "proposal",
    location: "My Drive / Proposals",
    ownerTeam: "Solutions",
    permission: "editor",
    activeNow: 0,
    contributors: 3,
    lastActivity: "3h ago",
    health: "at-risk",
    attention: "Missing estimate for infra migration",
    nextAction: "Complete estimation block",
  },
  {
    id: "f-7",
    name: "Architecture Discovery Board",
    kind: "board",
    location: "My Drive / Product Workspace",
    ownerTeam: "Architecture",
    permission: "editor",
    activeNow: 5,
    contributors: 9,
    lastActivity: "Just now",
    health: "healthy",
    nextAction: "Sync decisions to project file",
  },
  {
    id: "f-8",
    name: "Vendor Uploads",
    kind: "document",
    location: "My Drive / Operations",
    ownerTeam: "Ops",
    permission: "restricted",
    activeNow: 0,
    contributors: 4,
    lastActivity: "Today",
    health: "watch",
    attention: "2 files need access grant",
    nextAction: "Adjust permissions",
  },
];

function itemIcon(item: DriveItem) {
  const c = "h-4 w-4";
  switch (item.kind) {
    case "folder":
      return <Folder className={c} aria-hidden="true" />;
    case "project":
      return <FileCog className={c} aria-hidden="true" />;
    case "image":
      return (
        <span className="relative block h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-indigo-100 via-sky-100 to-amber-100">
          <ImageIcon className="absolute bottom-1 right-1 h-3.5 w-3.5 text-black/55" aria-hidden="true" />
        </span>
      );
    case "audio":
      return <FileAudio2 className={c} aria-hidden="true" />;
    case "3d":
      return <Boxes className={c} aria-hidden="true" />;
    case "sheet":
      return <FileSpreadsheet className={c} aria-hidden="true" />;
    case "proposal":
      return <CheckCircle2 className={c} aria-hidden="true" />;
    case "board":
      return <Orbit className={c} aria-hidden="true" />;
    default:
      return <FileText className={c} aria-hidden="true" />;
  }
}

function permissionPill(p: DriveItem["permission"]) {
  if (p === "owner") return <span className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-700">Owner</span>;
  if (p === "editor") return <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">Editor</span>;
  if (p === "viewer") return <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">Viewer</span>;
  return <span className="rounded-md bg-amber-50 px-2 py-1 text-amber-700">Restricted</span>;
}

function healthPill(h: DriveItem["health"]) {
  if (h === "healthy") return <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">Healthy</span>;
  if (h === "watch") return <span className="rounded-md bg-amber-50 px-2 py-1 text-amber-700">Watch</span>;
  return <span className="rounded-md bg-red-50 px-2 py-1 text-red-700">At risk</span>;
}

export function DrivePage2() {
  const items = [...driveItems].sort((a, b) => {
    if (a.kind === "folder" && b.kind !== "folder") return -1;
    if (a.kind !== "folder" && b.kind === "folder") return 1;
    if (a.health !== b.health) {
      const order = { "at-risk": 0, watch: 1, healthy: 2 } as const;
      return order[a.health] - order[b.health];
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Drive v2</h2>
          <p className="mt-1 text-sm text-black/60">
            Prioritized for delivery execution: ownership, current activity, risk, and next action.
          </p>
        </div>
        <button className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white">New File</button>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-3 text-xs">
        <div className="rounded-lg bg-black/[0.03] p-3">
          <div className="mb-1 text-black/50">Live sessions</div>
          <div className="font-semibold">6 files active now</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3">
          <div className="mb-1 text-amber-700">Needs attention</div>
          <div className="font-semibold text-amber-800">{items.filter(i => i.health !== "healthy").length} items</div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-3">
          <div className="mb-1 text-indigo-700">Access issues</div>
          <div className="font-semibold text-indigo-800">{items.filter(i => i.permission === "restricted").length} restricted</div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3">
          <div className="mb-1 text-emerald-700">Healthy flow</div>
          <div className="font-semibold text-emerald-800">{items.filter(i => i.health === "healthy").length} on track</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/8">
        <div className="grid grid-cols-[2fr_1.2fr_1fr_1.4fr] bg-black/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-black/50">
          <span>Item</span>
          <span>Collaboration</span>
          <span>Ownership</span>
          <span>Health and next action</span>
        </div>
        <div>
          {items.map(item => (
            <article
              key={item.id}
              className="grid grid-cols-[2fr_1.2fr_1fr_1.4fr] items-center border-t border-black/[0.06] px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg text-black/70 ${
                    item.kind === "image" ? "bg-transparent" : "bg-black/[0.04]"
                  }`}
                >
                  {itemIcon(item)}
                </span>
                <div>
                  <div className="font-medium text-black/90">{item.name}</div>
                  <div className="text-xs text-black/45">{item.location}</div>
                </div>
              </div>

              <div className="text-xs text-black/60">
                <div className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-2 py-1">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.contributors}
                  <span className="text-black/40">contributors</span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1">
                  {item.activeNow > 0 ? (
                    <>
                      <Activity className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span className="text-emerald-700">{item.activeNow} live now</span>
                    </>
                  ) : (
                    <>
                      <Clock3 className="h-3.5 w-3.5 text-black/40" aria-hidden="true" />
                      <span className="text-black/45">Last active {item.lastActivity}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-xs text-black/60">
                <div className="mb-1 inline-flex items-center gap-1 rounded-md bg-black/[0.04] px-2 py-1">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.ownerTeam}
                </div>
                <div>{permissionPill(item.permission)}</div>
              </div>

              <div className="text-xs text-black/65">
                <div className="mb-1">{healthPill(item.health)}</div>
                {item.attention ? (
                  <div className="mb-1 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-amber-700">
                    <MessageSquareWarning className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.attention}
                  </div>
                ) : (
                  <div className="mb-1 text-black/40">No blockers reported</div>
                )}
                <button className="inline-flex items-center gap-1 font-medium text-black/80 hover:text-black">
                  {item.nextAction}
                  {item.health === "at-risk" ? (
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
