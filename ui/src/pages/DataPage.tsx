import {
  Activity,
  AudioLines,
  CircleDollarSign,
  Cylinder,
  FileText,
  FilePenLine,
  Folder,
  Grid3X3,
  Image as ImageIcon,
  StickyNote,
  SquareKanban,
  Table2,
  Play,
  Square,
  Plus,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../logo.png";

type ItemKind = "folder" | "project" | "image" | "audio" | "3d" | "document" | "sheet" | "proposal" | "board";
type DriveItem = {
  id: string;
  name: string;
  kind: ItemKind;
  ribbon?: "red" | "blue" | "green" | "amber";
  previewSrc?: string;
  fileCount?: number;
  imageType?: "PNG" | "JPG" | "WEBP";
  resolution?: string;
  audioType?: "WAV" | "FLAC" | "MP3";
  duration?: string;
  modelType?: "GLTF" | "USDZ" | "OBJ";
  tris?: string;
  projectMilestone?: string;
  openTasks?: number;
};

type QuickCreateAction = {
  type: "Folder" | "Project" | "Board" | "Sheet" | "Upload";
  icon: JSX.Element;
  angleDeg: number;
  radius: number;
};

const initialItems: DriveItem[] = [
  { id: "d1", name: "Product Docs", kind: "folder", fileCount: 24 },
  { id: "p1", name: "Q2 Product Launch", kind: "project", projectMilestone: "Sprint 14", openTasks: 8, ribbon: "red" },
  { id: "d2", name: "Design Assets", kind: "folder", fileCount: 57 },
  { id: "i1", name: "Homepage Hero Render", kind: "image", previewSrc: logo, imageType: "PNG", resolution: "600x200", ribbon: "blue" },
  { id: "i2", name: "Product Team Photo", kind: "image", imageType: "JPG", resolution: "3024x2016" },
  { id: "a1", name: "Voiceover Draft 02", kind: "audio", audioType: "WAV", duration: "3.4s", ribbon: "amber" },
  { id: "a2", name: "Narration Take Final", kind: "audio", audioType: "FLAC", duration: "2:32m" },
  { id: "m1", name: "Device Mockup v5", kind: "3d", modelType: "GLTF", tris: "1.4M tris", ribbon: "green" },
  { id: "d3", name: "Finance", kind: "folder", fileCount: 13 },
  { id: "s1", name: "Growth Model 2026", kind: "sheet" },
  { id: "d4", name: "Operations", kind: "folder", fileCount: 31 },
  { id: "pr1", name: "Client Estimation v3", kind: "proposal" },
  { id: "b1", name: "Architecture Discovery Board", kind: "board" },
  { id: "d5", name: "Legal", kind: "folder", fileCount: 8 },
  { id: "doc1", name: "Q2 Planning Notes.docx", kind: "document" },
  { id: "doc2", name: "Homepage Copy v4.txt", kind: "document" },
  { id: "doc3", name: "Vendor List.csv", kind: "document" },
] as const satisfies ReadonlyArray<DriveItem>;

function kindLabel(kind: ItemKind) {
  if (kind === "folder") return "Folder";
  if (kind === "project") return "Project";
  if (kind === "image") return "Image";
  if (kind === "audio") return "Audio";
  if (kind === "3d") return "3D";
  if (kind === "sheet") return "Sheet";
  if (kind === "proposal") return "Proposal";
  if (kind === "board") return "Board";
  return "Doc";
}

function secondaryLabel(item: DriveItem) {
  if (item.kind === "folder") {
    return `${item.fileCount ?? 0} files`;
  }
  if (item.kind === "project") {
    return `${item.projectMilestone ?? "Sprint"}, ${item.openTasks ?? 0} open tasks`;
  }
  if (item.kind === "image") {
    return `${item.imageType ?? "PNG"}, ${item.resolution ?? "600x200"}`;
  }
  if (item.kind === "audio") {
    return `${item.audioType ?? "WAV"}, ${item.duration ?? "3.4s"}`;
  }
  if (item.kind === "3d") {
    return `${item.modelType ?? "GLTF"}, ${item.tris ?? "1.4M tris"}`;
  }
  return kindLabel(item.kind);
}

function kindIcon(kind: ItemKind) {
  if (kind === "folder") return <Folder className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "project") return <SquareKanban className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "image") return <ImageIcon className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "audio") return <AudioLines className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "3d") return <Cylinder className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "sheet") return <Table2 className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "proposal") return <FilePenLine className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "board") return <StickyNote className="h-5 w-5 shrink-0 rotate-180 text-black/70" aria-hidden="true" />;
  return <FileText className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
}

function leadingVisual(item: DriveItem) {
  if (item.name === "Client Estimation v3") {
    return <CircleDollarSign className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  }
  if (item.kind === "image" && item.previewSrc) {
    return <img src={item.previewSrc} alt="" className="h-7 w-7 shrink-0 rounded object-cover" aria-hidden="true" />;
  }
  return kindIcon(item.kind);
}

function ribbonClass(ribbon?: DriveItem["ribbon"]) {
  if (ribbon === "red") return "bg-red-500";
  if (ribbon === "blue") return "bg-sky-500";
  if (ribbon === "green") return "bg-emerald-500";
  if (ribbon === "amber") return "bg-amber-500";
  return "";
}

function durationToSeconds(raw?: string) {
  if (!raw) return 3;
  if (raw.endsWith("s")) return Number.parseFloat(raw.replace("s", "")) || 3;
  if (raw.endsWith("m")) {
    const value = raw.replace("m", "");
    if (value.includes(":")) {
      const [mins, secs] = value.split(":");
      const minsNum = Number.parseInt(mins ?? "0", 10);
      const secsNum = Number.parseInt(secs ?? "0", 10);
      return minsNum * 60 + secsNum;
    }
    return (Number.parseFloat(value) || 1) * 60;
  }
  return 3;
}

export function DataPage() {
  const [view, setView] = useState<"simple" | "signals">("simple");
  const [items, setItems] = useState<DriveItem[]>(initialItems);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [playProgress, setPlayProgress] = useState(0);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const quickCreateActions: QuickCreateAction[] = [
    { type: "Folder", icon: <Folder className="h-4 w-4" aria-hidden="true" />, angleDeg: 200, radius: 122 },
    { type: "Project", icon: <SquareKanban className="h-4 w-4" aria-hidden="true" />, angleDeg: 220, radius: 122 },
    { type: "Board", icon: <StickyNote className="h-4 w-4 rotate-180" aria-hidden="true" />, angleDeg: 240, radius: 122 },
    { type: "Sheet", icon: <Table2 className="h-4 w-4" aria-hidden="true" />, angleDeg: 260, radius: 122 },
    { type: "Upload", icon: <Upload className="h-4 w-4" aria-hidden="true" />, angleDeg: 280, radius: 122 },
  ];

  useEffect(() => {
    if (!playingItem) return;
    const item = items.find(candidate => candidate.name === playingItem);
    const totalSeconds = durationToSeconds(item?.duration);
    const tickMs = 80;
    const step = 100 / ((totalSeconds * 1000) / tickMs);

    const timer = window.setInterval(() => {
      setPlayProgress(previous => {
        const next = previous + step;
        if (next >= 100) {
          window.clearInterval(timer);
          setPlayingItem(null);
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [playingItem, items]);

  const sortedItems = [...items].sort((a, b) => {
    if (a.kind === "folder" && b.kind !== "folder") return -1;
    if (a.kind !== "folder" && b.kind === "folder") return 1;
    return 0;
  });

  function createItem(type: QuickCreateAction["type"]) {
    const id = `new-${Date.now()}`;
    const newItem: DriveItem =
      type === "Folder"
        ? { id, name: "New Folder", kind: "folder", fileCount: 0 }
        : type === "Project"
          ? { id, name: "New Project", kind: "project", projectMilestone: "Sprint 1", openTasks: 0 }
          : type === "Board"
            ? { id, name: "New Board", kind: "board" }
            : type === "Sheet"
              ? { id, name: "New Sheet", kind: "sheet" }
              : { id, name: "Uploaded File", kind: "document" };

    setItems(previous => [newItem, ...previous]);
    setHighlightedItemId(id);
    window.setTimeout(() => {
      setHighlightedItemId(current => (current === id ? null : current));
    }, 1200);
  }

  return (
    <section className="relative h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Data</h2>
        <div className="inline-flex items-center rounded-lg border border-black/10 bg-black/[0.02] p-1 text-xs">
          <button
            type="button"
            onClick={() => setView("simple")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${
              view === "simple" ? "bg-white text-black shadow-sm" : "text-black/60"
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" aria-hidden="true" />
            Simple
          </button>
          <button
            type="button"
            onClick={() => setView("signals")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${
              view === "signals" ? "bg-white text-black shadow-sm" : "text-black/60"
            }`}
          >
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            Signals
          </button>
        </div>
      </div>
      {view === "simple" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedItems.map(item => (
            <article
              key={item.id}
              className={`relative flex min-h-14 items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-left transition-all hover:bg-black/[0.02] ${
                highlightedItemId === item.id ? "animate-black-fade-highlight" : ""
              }`}
            >
              {item.ribbon ? <span className={`absolute inset-y-0 left-0 w-1 ${ribbonClass(item.ribbon)}`} /> : null}
              <div className="flex min-w-0 items-center gap-2">
                {leadingVisual(item)}
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium text-black/85">{item.name}</div>
                  <div className="text-[10px] text-black/50">{secondaryLabel(item)}</div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {item.kind === "audio" ? (
                  <button
                    type="button"
                    aria-label={playingItem === item.name ? `Stop ${item.name}` : `Play ${item.name}`}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/15 text-black/70 hover:bg-black/[0.03]"
                    onClick={() => {
                      if (playingItem === item.name) {
                        setPlayingItem(null);
                        setPlayProgress(0);
                        return;
                      }
                      setPlayProgress(0);
                      setPlayingItem(item.name);
                    }}
                  >
                    {playingItem === item.name ? (
                      <Square className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <Play className="h-3 w-3" aria-hidden="true" />
                    )}
                  </button>
                ) : null}
              </div>
              {item.kind === "audio" && playingItem === item.name ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-black/10">
                  <div className="h-full bg-black/60 transition-[width] duration-75" style={{ width: `${playProgress}%` }} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="grid min-h-52 place-items-center rounded-xl border border-dashed border-black/15 bg-black/[0.02] p-6 text-sm text-black/45">
          Signals view coming soon.
        </div>
      )}

      <div className="pointer-events-none absolute right-6 bottom-6 z-30">
        <div className="pointer-events-auto relative">
          {quickCreateActions.map(action => {
            const radians = (action.angleDeg * Math.PI) / 180;
            const x = Math.cos(radians) * action.radius;
            const y = Math.sin(radians) * action.radius;

            return (
              <button
                key={action.type}
                type="button"
                onClick={() => {
                  createItem(action.type);
                  setIsCreateMenuOpen(false);
                }}
                className={`absolute right-0 bottom-0 transition-all duration-220 ${
                  isCreateMenuOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                style={{
                  transform: isCreateMenuOpen
                    ? `translate(${x}px, ${y}px) scale(1)`
                    : "translate(0px, 0px) scale(0.55)",
                }}
                aria-label={`Create ${action.type}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black shadow-[0_6px_16px_rgba(15,23,42,0.16)]">
                  {action.icon}
                </span>
              </button>
            );
          })}
          <button
            type="button"
            aria-label="Create new"
            onClick={() => setIsCreateMenuOpen(open => !open)}
            className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-black text-white shadow-[0_8px_20px_rgba(15,23,42,0.22)] hover:bg-black/90"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
