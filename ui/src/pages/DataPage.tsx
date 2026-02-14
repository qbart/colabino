import {
  Activity,
  AudioLines,
  CircleDollarSign,
  Clock4,
  Cylinder,
  FileText,
  FilePenLine,
  Folder,
  Grid3X3,
  HardDrive,
  History,
  Image as ImageIcon,
  MessageSquare,
  Send,
  StickyNote,
  SquareKanban,
  Download,
  Table2,
  Play,
  Square,
  Plus,
  Upload,
  UserRound,
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
  size?: string;
  updatedAt?: string;
  owner?: string;
};

type ImageVersion = {
  id: string;
  label: string;
  date: string;
  size: string;
  resolution: string;
  format: string;
  author: string;
  note?: string;
  previewSrc?: string;
};

type ImageComment = {
  id: string;
  author: string;
  date: string;
  text: string;
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
  {
    id: "i1",
    name: "Homepage Hero Render",
    kind: "image",
    previewSrc: logo,
    imageType: "PNG",
    resolution: "2560x1120",
    size: "4.2 MB",
    ribbon: "blue",
    updatedAt: "Feb 12, 2026 2:10 PM",
    owner: "Design",
  },
  {
    id: "i2",
    name: "Product Team Photo",
    kind: "image",
    imageType: "JPG",
    resolution: "4032x2268",
    size: "6.8 MB",
    updatedAt: "Jan 28, 2026 11:06 AM",
    owner: "People Ops",
  },
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

const imageVersionHistory: Partial<Record<string, ImageVersion[]>> = {
  i1: [
    {
      id: "i1-v5",
      label: "v5 (latest)",
      date: "Feb 12, 2026 2:10 PM",
      size: "4.2 MB",
      resolution: "2560x1120",
      format: "PNG",
      author: "J. Rivera",
      note: "Color balance tuned and exported at 2.5k width",
      previewSrc: logo,
    },
    {
      id: "i1-v4",
      label: "v4",
      date: "Feb 9, 2026 5:42 PM",
      size: "3.9 MB",
      resolution: "2200x960",
      format: "PNG",
      author: "J. Rivera",
      note: "CTA glow pulled back; typography nudged",
      previewSrc: logo,
    },
    {
      id: "i1-v3",
      label: "v3",
      date: "Feb 5, 2026 1:15 PM",
      size: "3.4 MB",
      resolution: "2048x896",
      format: "PNG",
      author: "A. Patel",
      note: "First pass on lighting",
      previewSrc: logo,
    },
  ],
  i2: [
    {
      id: "i2-v2",
      label: "v2 (latest)",
      date: "Jan 28, 2026 11:06 AM",
      size: "6.8 MB",
      resolution: "4032x2268",
      format: "JPG",
      author: "M. Chen",
      note: "Cropped and de-noised",
    },
    {
      id: "i2-v1",
      label: "v1",
      date: "Jan 18, 2026 9:44 AM",
      size: "8.1 MB",
      resolution: "4032x3024",
      format: "JPG",
      author: "M. Chen",
      note: "Original upload",
    },
  ],
};

const imageProfiles: Partial<Record<string, { location: string; created: string; owner: string }>> = {
  i1: { location: "Design Assets / Launch", created: "Feb 2, 2026 4:18 PM", owner: "Design" },
  i2: { location: "Design Assets / Team", created: "Jan 18, 2026 9:40 AM", owner: "People Ops" },
};

const initialImageComments: Partial<Record<string, ImageComment[]>> = {
  i1: [
    { id: "c-101", author: "A. Patel", date: "Feb 12, 2026 3:05 PM", text: "Looks good. Can we brighten the left edge 5%?" },
    { id: "c-102", author: "J. Rivera", date: "Feb 12, 2026 3:22 PM", text: "Updated in v5 and exported the final PNG." },
  ],
  i2: [{ id: "c-201", author: "M. Chen", date: "Jan 28, 2026 11:20 AM", text: "Cropped for banner-safe area." }],
};

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
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [commentsByImage, setCommentsByImage] = useState<Partial<Record<string, ImageComment[]>>>(initialImageComments);
  const [newComment, setNewComment] = useState("");
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

  function openImageViewer(id: string) {
    setSelectedImageId(id);
    setIsImageViewerOpen(true);
  }

  function closeImageViewer() {
    setIsImageViewerOpen(false);
    window.setTimeout(() => setSelectedImageId(null), 180);
  }

  function downloadSelectedImage() {
    if (!selectedImage?.previewSrc) return;
    const link = document.createElement("a");
    link.href = selectedImage.previewSrc;
    link.download = selectedImage.name;
    document.body.append(link);
    link.click();
    link.remove();
  }

  const selectedImage = selectedImageId ? items.find(i => i.id === selectedImageId) : null;
  const selectedImageVersions = selectedImageId ? imageVersionHistory[selectedImageId] ?? [] : [];
  const selectedProfile = selectedImageId ? imageProfiles[selectedImageId] : undefined;
  const selectedImageComments = selectedImageId ? commentsByImage[selectedImageId] ?? [] : [];
  const isDetailMode = Boolean(selectedImage && isImageViewerOpen);

  useEffect(() => {
    setNewComment("");
  }, [selectedImageId]);

  function addComment() {
    const trimmed = newComment.trim();
    if (!selectedImageId || !trimmed) return;

    const entry: ImageComment = {
      id: `c-${Date.now()}`,
      author: "You",
      date: new Date().toLocaleString(),
      text: trimmed,
    };

    setCommentsByImage(previous => ({
      ...previous,
      [selectedImageId]: [...(previous[selectedImageId] ?? []), entry],
    }));
    setNewComment("");
  }

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
        <div className="flex items-center gap-2 text-lg font-semibold">
          <button
            type="button"
            className={`text-left ${isDetailMode ? "text-black hover:text-black/70" : "text-black"}`}
            onClick={() => {
              closeImageViewer();
              setView("simple");
            }}
          >
            Data
          </button>
          {isDetailMode ? (
            <>
              <span className="text-black/30">/</span>
              <span className="text-black/80">{selectedImage?.name}</span>
            </>
          ) : null}
        </div>
        {isDetailMode ? (
          <button
            type="button"
            onClick={downloadSelectedImage}
            disabled={!selectedImage?.previewSrc}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Download image"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
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
        )}
      </div>
      {isDetailMode ? (
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-white/80">
              <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-black/80">
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
                {selectedImage?.name}
              </div>
              <div className="p-4">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-black/[0.01] via-white to-black/[0.03]">
                  {selectedImage?.previewSrc ? (
                    <img src={selectedImage.previewSrc} alt={selectedImage.name} className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-black/50">No preview available</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-black/70">
              {selectedImage?.updatedAt ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                  <Clock4 className="h-3.5 w-3.5" aria-hidden="true" />
                  {selectedImage.updatedAt}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedImage?.owner ?? "Unassigned"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                <HardDrive className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedImage?.size ?? "—"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedImage?.resolution ?? "—"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedImage?.imageType ?? "Image"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                <History className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedProfile?.created ?? "—"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                <Folder className="h-3.5 w-3.5" aria-hidden="true" />
                {selectedProfile?.location ?? "—"}
              </span>
            </div>

            <div className="flex flex-col gap-2 overflow-hidden rounded-2xl bg-white">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-black/50">Versions</div>
                <span className="rounded-full bg-black/5 px-2 py-1 text-[11px] text-black/60">
                  {selectedImageVersions.length} saved
                </span>
              </div>
              <div className="max-h-64 overflow-auto px-2 py-1">
                {selectedImageVersions.length === 0 ? (
                  <div className="px-2 py-3 text-sm text-black/50">No versions captured yet.</div>
                ) : (
                  <ul className="space-y-2">
                    {selectedImageVersions.map((version, index) => (
                      <li
                        key={version.id}
                        className="rounded-xl border border-black/8 px-3 py-2.5 transition hover:bg-black/[0.02]"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-black/85">
                              <span>{version.label}</span>
                              {index === 0 ? (
                                <span className="rounded-full bg-black px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
                                  Latest
                                </span>
                              ) : null}
                            </div>
                            <span className="text-[11px] text-black/50">{version.date}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-black/60">
                            <span className="rounded-full bg-black/5 px-2 py-1">{version.size}</span>
                            <span className="rounded-full bg-black/5 px-2 py-1">{version.resolution}</span>
                            <span className="rounded-full bg-black/5 px-2 py-1">{version.format}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-1">
                              <UserRound className="h-3 w-3" aria-hidden="true" />
                              {version.author}
                            </span>
                          </div>
                          {version.note ? <div className="mt-2 text-[12px] text-black/55">{version.note}</div> : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-h-[560px] flex-col rounded-2xl bg-[#f8fafc] p-3 lg:sticky lg:top-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-black/55">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                Comments
              </div>
              <span className="rounded-full bg-white px-2 py-1 text-[11px] text-black/60">
                {selectedImageComments.length}
              </span>
            </div>

            <div className="flex-1 space-y-2 overflow-auto pr-1">
              {selectedImageComments.length === 0 ? (
                <div className="text-sm text-black/50">No comments yet.</div>
              ) : (
                selectedImageComments.map(comment => (
                  <article
                    key={comment.id}
                    className={`max-w-[92%] rounded-xl px-3 py-2 ${
                      comment.author === "You" ? "ml-auto bg-black text-white" : "bg-white text-black/85"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between gap-2 text-[11px] ${
                        comment.author === "You" ? "text-white/65" : "text-black/45"
                      }`}
                    >
                      <span className="font-medium">{comment.author}</span>
                      <span>{comment.date}</span>
                    </div>
                    <p className="mt-1 text-sm">{comment.text}</p>
                  </article>
                ))
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={event => setNewComment(event.target.value)}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addComment();
                  }
                }}
                placeholder="Write a comment..."
                className="h-9 w-full rounded-lg border border-black/10 bg-white px-3 text-sm text-black/80 outline-none ring-black/15 focus:ring-2"
              />
              <button
                type="button"
                onClick={addComment}
                disabled={!newComment.trim()}
                aria-label="Post comment"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : view === "simple" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedItems.map(item => (
            <article
              key={item.id}
              className={`relative flex min-h-14 items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-left transition-all hover:bg-black/[0.02] ${
                highlightedItemId === item.id ? "animate-black-fade-highlight" : ""
              }`}
              onDoubleClick={() => {
                if (item.kind === "image") {
                  openImageViewer(item.id);
                }
              }}
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

      {!isDetailMode ? (
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
      ) : null}

    </section>
  );
}
