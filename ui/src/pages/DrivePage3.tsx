import {
  Activity,
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
  MessageSquareWarning,
  Orbit,
  ShieldCheck,
  Users,
} from "lucide-react";

type DriveCard = {
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

const driveCards: DriveCard[] = [
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
    id: "d-2",
    name: "Finance",
    kind: "folder",
    location: "My Drive",
    ownerTeam: "Finance",
    permission: "restricted",
    activeNow: 0,
    contributors: 6,
    lastActivity: "1h ago",
    health: "watch",
    attention: "2 files need access grant",
    nextAction: "Fix access",
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

function itemKindLabel(kind: DriveCard["kind"]) {
  if (kind === "folder") return "Folder";
  if (kind === "project") return "Project";
  if (kind === "image") return "Image";
  if (kind === "audio") return "Audio";
  if (kind === "3d") return "3D Asset";
  if (kind === "sheet") return "Semantic Sheet";
  if (kind === "proposal") return "Proposal";
  if (kind === "board") return "Board";
  return "Document";
}

function itemIcon(item: DriveCard) {
  const c = "h-4 w-4";
  switch (item.kind) {
    case "folder":
      return <Folder className={c} aria-hidden="true" />;
    case "project":
      return <FileCog className={c} aria-hidden="true" />;
    case "image":
      return (
        <span className="relative block h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-100 via-sky-100 to-amber-100">
          <ImageIcon className="absolute bottom-1 right-1 h-4 w-4 text-black/55" aria-hidden="true" />
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

function permissionPill(permission: DriveCard["permission"]) {
  if (permission === "owner") return "bg-indigo-50 text-indigo-700";
  if (permission === "editor") return "bg-emerald-50 text-emerald-700";
  if (permission === "viewer") return "bg-slate-100 text-slate-700";
  return "bg-amber-50 text-amber-700";
}

function healthPill(health: DriveCard["health"]) {
  if (health === "healthy") return "bg-emerald-50 text-emerald-700";
  if (health === "watch") return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

function Card({ item }: { item: DriveCard }) {
  const folderCard = item.kind === "folder";

  return (
    <article className="rounded-xl border border-black/[0.08] bg-white p-4 shadow-[0_3px_10px_rgba(15,23,42,0.06)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg text-black/70 ${
              item.kind === "image" ? "bg-transparent" : "bg-black/[0.04]"
            }`}
          >
            {itemIcon(item)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-black/90">{item.name}</h3>
            <p className="truncate text-[11px] text-black/45">{item.location}</p>
          </div>
        </div>
        <span className="rounded-md bg-black/[0.04] px-2 py-1 text-[11px] text-black/65">{itemKindLabel(item.kind)}</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5 text-[11px]">
        <span className={`rounded-md px-2 py-1 ${permissionPill(item.permission)}`}>{item.permission}</span>
        <span className={`rounded-md px-2 py-1 ${healthPill(item.health)}`}>{item.health.replace("-", " ")}</span>
        <span className="rounded-md bg-black/[0.04] px-2 py-1 text-black/65">{item.ownerTeam}</span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-black/65">
        <div className="rounded-lg bg-black/[0.03] p-2">
          <div className="mb-1 inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            People
          </div>
          <div className="font-medium">{item.contributors}</div>
        </div>
        <div className="rounded-lg bg-black/[0.03] p-2">
          <div className="mb-1 inline-flex items-center gap-1">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            Active now
          </div>
          <div className="font-medium">{item.activeNow}</div>
        </div>
      </div>

      <div className="mb-3 text-xs text-black/50">Last activity {item.lastActivity}</div>

      {item.attention ? (
        <div className="mb-3 inline-flex w-full items-start gap-1 rounded-lg bg-amber-50 px-2.5 py-2 text-xs text-amber-700">
          <MessageSquareWarning className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{item.attention}</span>
        </div>
      ) : (
        <div className="mb-3 inline-flex w-full items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-2 text-xs text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>No blockers reported</span>
        </div>
      )}

      <button className="inline-flex items-center gap-1.5 text-xs font-medium text-black/80 hover:text-black">
        {item.nextAction}
        {item.health === "at-risk" ? (
          <AlertTriangle className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>

      {folderCard ? <div className="mt-2 text-[11px] text-black/40">Container workspace</div> : null}
    </article>
  );
}

export function DrivePage3() {
  const folders = driveCards.filter(item => item.kind === "folder").sort((a, b) => a.name.localeCompare(b.name));
  const files = driveCards
    .filter(item => item.kind !== "folder")
    .sort((a, b) => {
      const order = { "at-risk": 0, watch: 1, healthy: 2 } as const;
      if (a.health !== b.health) return order[a.health] - order[b.health];
      return a.name.localeCompare(b.name);
    });

  return (
    <section className="h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Drive v3</h2>
          <p className="mt-1 text-sm text-black/60">
            Card-based representation for scanning ownership, collaboration state, and next actions.
          </p>
        </div>
        <button className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white">New File</button>
      </div>

      <div className="mb-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">Folders</div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {folders.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">Files</div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {files.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
