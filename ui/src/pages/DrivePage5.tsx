import {
  AlertTriangle,
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

type ItemType = "folder" | "project" | "image" | "audio" | "3d" | "document" | "sheet" | "proposal" | "board";

type DriveItem = {
  id: string;
  name: string;
  type: ItemType;
  location: string;
  permission: "owner" | "editor" | "viewer" | "restricted";
  contributors: number;
  activeNow: number;
  updatedAt: string;
  tags?: string[];
  projectMetrics?: {
    completion: number;
    burndown: "on-track" | "at-risk";
    blocked: number;
  };
};

const data: DriveItem[] = [
  { id: "d1", name: "Product Workspace", type: "folder", location: "My Drive", permission: "owner", contributors: 18, activeNow: 4, updatedAt: "2m ago" },
  { id: "d2", name: "Finance", type: "folder", location: "My Drive", permission: "restricted", contributors: 6, activeNow: 0, updatedAt: "1h ago" },
  {
    id: "p1",
    name: "Q2 Product Launch",
    type: "project",
    location: "My Drive / Product Workspace",
    permission: "editor",
    contributors: 8,
    activeNow: 3,
    updatedAt: "5m ago",
    projectMetrics: { completion: 64, burndown: "at-risk", blocked: 2 },
  },
  {
    id: "i1",
    name: "Homepage Hero Render",
    type: "image",
    location: "My Drive / Product Workspace",
    permission: "editor",
    contributors: 5,
    activeNow: 1,
    updatedAt: "16m ago",
    tags: ["hero", "landing", "approved"],
  },
  { id: "a1", name: "Voiceover Draft 02", type: "audio", location: "My Drive / Product Workspace", permission: "viewer", contributors: 3, activeNow: 0, updatedAt: "42m ago", tags: ["voice", "draft"] },
  { id: "m1", name: "Device Mockup v5", type: "3d", location: "My Drive / Product Workspace", permission: "viewer", contributors: 4, activeNow: 1, updatedAt: "49m ago", tags: ["3d", "device"] },
  { id: "s1", name: "Growth Model 2026", type: "sheet", location: "My Drive / Finance", permission: "owner", contributors: 6, activeNow: 2, updatedAt: "1h ago", tags: ["forecast"] },
  { id: "pr1", name: "Client Estimation v3", type: "proposal", location: "My Drive / Proposals", permission: "editor", contributors: 3, activeNow: 0, updatedAt: "3h ago", tags: ["client", "estimate"] },
  { id: "b1", name: "Architecture Discovery Board", type: "board", location: "My Drive / Product Workspace", permission: "editor", contributors: 9, activeNow: 5, updatedAt: "Just now", tags: ["workshop"] },
  { id: "doc1", name: "Vendor Uploads", type: "document", location: "My Drive / Operations", permission: "restricted", contributors: 4, activeNow: 0, updatedAt: "Today", tags: ["vendor"] },
];

function permissionClass(permission: DriveItem["permission"]) {
  if (permission === "owner") return "bg-indigo-50 text-indigo-700";
  if (permission === "editor") return "bg-emerald-50 text-emerald-700";
  if (permission === "viewer") return "bg-slate-100 text-slate-700";
  return "bg-amber-50 text-amber-700";
}

function iconFor(type: ItemType) {
  const c = "h-3.5 w-3.5";
  if (type === "folder") return <Folder className={c} aria-hidden="true" />;
  if (type === "project") return <FileCog className={c} aria-hidden="true" />;
  if (type === "audio") return <FileAudio2 className={c} aria-hidden="true" />;
  if (type === "3d") return <Boxes className={c} aria-hidden="true" />;
  if (type === "sheet") return <FileSpreadsheet className={c} aria-hidden="true" />;
  if (type === "proposal") return <CheckCircle2 className={c} aria-hidden="true" />;
  if (type === "board") return <Orbit className={c} aria-hidden="true" />;
  return <FileText className={c} aria-hidden="true" />;
}

function CompactProjectCard({ item }: { item: DriveItem }) {
  const metrics = item.projectMetrics!;
  const isRisk = metrics.burndown === "at-risk";

  return (
    <article className="rounded-lg border border-black/[0.1] bg-white p-2.5">
      <div className="mb-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-black/85">
          <span className="grid h-5 w-5 place-items-center rounded bg-black/[0.05]">{iconFor(item.type)}</span>
          <span className="truncate">{item.name}</span>
        </div>
        <span className={`rounded px-1.5 py-0.5 text-[10px] ${permissionClass(item.permission)}`}>{item.permission}</span>
      </div>
      <div className="mb-2 grid grid-cols-3 gap-1 text-[10px]">
        <div className="rounded bg-black/[0.03] px-1.5 py-1">
          <div className="text-black/40">Done</div>
          <div className="font-semibold text-black/80">{metrics.completion}%</div>
        </div>
        <div className="rounded bg-black/[0.03] px-1.5 py-1">
          <div className="text-black/40">Blocked</div>
          <div className="font-semibold text-black/80">{metrics.blocked}</div>
        </div>
        <div className={`rounded px-1.5 py-1 ${isRisk ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
          <div className="text-[9px]">Burndown</div>
          <div className="font-semibold">{isRisk ? "Risk" : "Good"}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-black/45">
        <span>{item.updatedAt}</span>
        <span>{item.activeNow} live</span>
      </div>
    </article>
  );
}

function CompactImageCard({ item }: { item: DriveItem }) {
  return (
    <article className="rounded-lg border border-black/[0.1] bg-white p-2.5">
      <div className="mb-2 overflow-hidden rounded-md bg-gradient-to-br from-indigo-100 via-sky-100 to-amber-100">
        <div className="relative h-18">
          <ImageIcon className="absolute bottom-1 right-1 h-4 w-4 text-black/55" aria-hidden="true" />
        </div>
      </div>
      <div className="truncate text-[12px] font-semibold text-black/85">{item.name}</div>
      <div className="mt-1 flex flex-wrap gap-1">
        {(item.tags ?? []).map(tag => (
          <span key={tag} className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[10px] text-black/60">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function CompactGenericCard({ item }: { item: DriveItem }) {
  return (
    <article className="rounded-lg border border-black/[0.1] bg-white p-2.5">
      <div className="mb-1 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-black/85">
            <span className="grid h-5 w-5 place-items-center rounded bg-black/[0.05] text-black/70">{iconFor(item.type)}</span>
            <span className="truncate">{item.name}</span>
          </div>
          <p className="mt-1 truncate text-[10px] text-black/45">{item.location}</p>
        </div>
        <span className={`rounded px-1.5 py-0.5 text-[10px] ${permissionClass(item.permission)}`}>{item.permission}</span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[10px] text-black/55">
        <span className="inline-flex items-center gap-1 rounded bg-black/[0.04] px-1.5 py-0.5">
          <Users className="h-3 w-3" aria-hidden="true" />
          {item.contributors}
        </span>
        <span className="rounded bg-black/[0.04] px-1.5 py-0.5">live {item.activeNow}</span>
        <span>{item.updatedAt}</span>
      </div>

      {item.tags && item.tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags.map(tag => (
            <span key={tag} className="rounded bg-black/[0.04] px-1.5 py-0.5 text-[10px] text-black/60">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function renderCard(item: DriveItem) {
  if (item.type === "project") return <CompactProjectCard item={item} />;
  if (item.type === "image") return <CompactImageCard item={item} />;
  return <CompactGenericCard item={item} />;
}

export function DrivePage5() {
  const folders = data.filter(item => item.type === "folder").sort((a, b) => a.name.localeCompare(b.name));
  const files = data.filter(item => item.type !== "folder");

  return (
    <section className="h-full rounded-t-[20px] bg-white p-4 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold">My Drive v5</h2>
          <p className="mt-1 text-xs text-black/55">Ultra-compact, vertical, type-specific cards.</p>
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] text-black/50">
          <span className="inline-flex items-center gap-1 rounded bg-red-50 px-1.5 py-0.5 text-red-700">
            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
            {data.filter(item => item.type === "project" && item.projectMetrics?.burndown === "at-risk").length}
          </span>
          <span>{data.filter(item => item.activeNow > 0).length} live</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-black/45">Folders</div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 2xl:grid-cols-5">
          {folders.map(item => (
            <div key={item.id}>{renderCard(item)}</div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-black/45">Files</div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 2xl:grid-cols-5">
          {files.map(item => (
            <div key={item.id}>{renderCard(item)}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
