import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  FileAudio2,
  FileCog,
  FileSpreadsheet,
  FileText,
  Folder,
  Image as ImageIcon,
  Orbit,
  Users,
} from "lucide-react";

type DriveItem = {
  id: string;
  name: string;
  kind: "folder" | "project" | "image" | "audio" | "3d" | "document" | "sheet" | "proposal" | "board";
  location: string;
  permission: "owner" | "editor" | "viewer" | "restricted";
  activeNow: number;
  contributors: number;
  lastActivity: string;
  health: "healthy" | "watch" | "at-risk";
  attention?: string;
  nextAction: string;
};

const items: DriveItem[] = [
  {
    id: "d-1",
    name: "Product Workspace",
    kind: "folder",
    location: "My Drive",
    permission: "owner",
    activeNow: 4,
    contributors: 18,
    lastActivity: "2m ago",
    health: "healthy",
    nextAction: "Open",
  },
  {
    id: "d-2",
    name: "Finance",
    kind: "folder",
    location: "My Drive",
    permission: "restricted",
    activeNow: 0,
    contributors: 6,
    lastActivity: "1h ago",
    health: "watch",
    attention: "Access required for 2 files",
    nextAction: "Fix access",
  },
  {
    id: "f-1",
    name: "Q2 Product Launch",
    kind: "project",
    location: "My Drive / Product Workspace",
    permission: "editor",
    activeNow: 3,
    contributors: 8,
    lastActivity: "5m ago",
    health: "watch",
    attention: "2 blocked tasks",
    nextAction: "Resolve blockers",
  },
  {
    id: "f-2",
    name: "Homepage Hero Render",
    kind: "image",
    location: "My Drive / Product Workspace",
    permission: "editor",
    activeNow: 1,
    contributors: 5,
    lastActivity: "16m ago",
    health: "healthy",
    nextAction: "Review",
  },
  {
    id: "f-3",
    name: "Voiceover Draft 02",
    kind: "audio",
    location: "My Drive / Product Workspace",
    permission: "viewer",
    activeNow: 0,
    contributors: 3,
    lastActivity: "42m ago",
    health: "watch",
    attention: "Awaiting PM approval",
    nextAction: "Ping PM",
  },
  {
    id: "f-4",
    name: "Device Mockup v5",
    kind: "3d",
    location: "My Drive / Product Workspace",
    permission: "viewer",
    activeNow: 1,
    contributors: 4,
    lastActivity: "49m ago",
    health: "healthy",
    nextAction: "Attach",
  },
  {
    id: "f-5",
    name: "Growth Model 2026",
    kind: "sheet",
    location: "My Drive / Finance",
    permission: "owner",
    activeNow: 2,
    contributors: 6,
    lastActivity: "1h ago",
    health: "healthy",
    nextAction: "Publish",
  },
  {
    id: "f-6",
    name: "Client Estimation v3",
    kind: "proposal",
    location: "My Drive / Proposals",
    permission: "editor",
    activeNow: 0,
    contributors: 3,
    lastActivity: "3h ago",
    health: "at-risk",
    attention: "Missing infra estimate",
    nextAction: "Complete estimate",
  },
  {
    id: "f-7",
    name: "Architecture Discovery Board",
    kind: "board",
    location: "My Drive / Product Workspace",
    permission: "editor",
    activeNow: 5,
    contributors: 9,
    lastActivity: "Just now",
    health: "healthy",
    nextAction: "Sync decisions",
  },
  {
    id: "f-8",
    name: "Vendor Uploads",
    kind: "document",
    location: "My Drive / Operations",
    permission: "restricted",
    activeNow: 0,
    contributors: 4,
    lastActivity: "Today",
    health: "watch",
    attention: "2 files blocked by policy",
    nextAction: "Adjust permissions",
  },
];

function iconFor(kind: DriveItem["kind"]) {
  const c = "h-3.5 w-3.5";
  if (kind === "folder") return <Folder className={c} aria-hidden="true" />;
  if (kind === "project") return <FileCog className={c} aria-hidden="true" />;
  if (kind === "image") return <ImageIcon className={c} aria-hidden="true" />;
  if (kind === "audio") return <FileAudio2 className={c} aria-hidden="true" />;
  if (kind === "3d") return <Boxes className={c} aria-hidden="true" />;
  if (kind === "sheet") return <FileSpreadsheet className={c} aria-hidden="true" />;
  if (kind === "proposal") return <CheckCircle2 className={c} aria-hidden="true" />;
  if (kind === "board") return <Orbit className={c} aria-hidden="true" />;
  return <FileText className={c} aria-hidden="true" />;
}

function healthClass(h: DriveItem["health"]) {
  if (h === "healthy") return "bg-emerald-50 text-emerald-700";
  if (h === "watch") return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

function permissionClass(p: DriveItem["permission"]) {
  if (p === "owner") return "bg-indigo-50 text-indigo-700";
  if (p === "editor") return "bg-emerald-50 text-emerald-700";
  if (p === "viewer") return "bg-slate-100 text-slate-700";
  return "bg-amber-50 text-amber-700";
}

function kindLabel(kind: DriveItem["kind"]) {
  if (kind === "folder") return "Folder";
  if (kind === "project") return "Project";
  if (kind === "image") return "Image";
  if (kind === "audio") return "Audio";
  if (kind === "3d") return "3D";
  if (kind === "sheet") return "Sheet";
  if (kind === "proposal") return "Proposal";
  if (kind === "board") return "Board";
  return "Document";
}

function CompactCard({ item }: { item: DriveItem }) {
  return (
    <article className="rounded-lg border border-black/[0.08] bg-white p-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-black/[0.04] text-black/70">{iconFor(item.kind)}</span>
            <h3 className="truncate text-[13px] font-semibold text-black/90">{item.name}</h3>
          </div>
          <p className="mt-1 truncate text-[11px] text-black/45">{item.location}</p>
        </div>
        <span className="rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[10px] text-black/60">{kindLabel(item.kind)}</span>
      </div>

      <div className="mb-2 flex flex-wrap gap-1 text-[10px]">
        <span className={`rounded px-1.5 py-0.5 ${permissionClass(item.permission)}`}>{item.permission}</span>
        <span className={`rounded px-1.5 py-0.5 ${healthClass(item.health)}`}>{item.health.replace("-", " ")}</span>
        <span className="rounded bg-black/[0.04] px-1.5 py-0.5 text-black/60">
          <Users className="mr-1 inline h-3 w-3" aria-hidden="true" />
          {item.contributors}
        </span>
        <span className="rounded bg-black/[0.04] px-1.5 py-0.5 text-black/60">live {item.activeNow}</span>
      </div>

      <div className="mb-2 flex items-center justify-between text-[10px] text-black/45">
        <span>Updated {item.lastActivity}</span>
        {item.health === "at-risk" ? <AlertTriangle className="h-3 w-3 text-red-500" aria-hidden="true" /> : null}
      </div>

      {item.attention ? <p className="mb-2 line-clamp-1 text-[11px] text-amber-700">{item.attention}</p> : null}

      <button className="inline-flex items-center gap-1 text-[11px] font-medium text-black/75 hover:text-black">
        {item.nextAction}
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </button>
    </article>
  );
}

export function DrivePage4() {
  const folders = items.filter(i => i.kind === "folder").sort((a, b) => a.name.localeCompare(b.name));
  const files = items
    .filter(i => i.kind !== "folder")
    .sort((a, b) => {
      const order = { "at-risk": 0, watch: 1, healthy: 2 } as const;
      if (a.health !== b.health) return order[a.health] - order[b.health];
      return a.name.localeCompare(b.name);
    });

  return (
    <section className="h-full rounded-t-[20px] bg-white p-5 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Drive v4</h2>
          <p className="mt-1 text-sm text-black/60">Compact cards with execution metadata.</p>
        </div>
        <button className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white">New File</button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3 text-[11px]">
        <div className="rounded-lg bg-black/[0.03] px-3 py-2">Live: {items.filter(i => i.activeNow > 0).length}</div>
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-amber-800">Needs attention: {items.filter(i => i.health !== "healthy").length}</div>
        <div className="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-800">Restricted: {items.filter(i => i.permission === "restricted").length}</div>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/45">Folders</div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
          {folders.map(item => (
            <CompactCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/45">Files</div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
          {files.map(item => (
            <CompactCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
