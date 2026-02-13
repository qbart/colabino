import {
  Activity,
  AudioLines,
  Cylinder,
  CheckCircle2,
  FolderKanban,
  FileSpreadsheet,
  FileText,
  Folder,
  Grid3X3,
  Image as ImageIcon,
  Orbit,
  Play,
} from "lucide-react";
import { useState } from "react";
import logo from "../logo.png";

type ItemKind = "folder" | "project" | "image" | "audio" | "3d" | "document" | "sheet" | "proposal" | "board";
type DriveItem = {
  name: string;
  kind: ItemKind;
  previewSrc?: string;
  fileCount?: number;
  imageType?: "PNG" | "JPG" | "WEBP";
  resolution?: string;
  audioType?: "WAV" | "FLAC" | "MP3";
  duration?: string;
  modelType?: "GLTF" | "USDZ" | "OBJ";
  tris?: string;
};

const items = [
  { name: "Product Docs", kind: "folder", fileCount: 24 },
  { name: "Q2 Product Launch", kind: "project" },
  { name: "Design Assets", kind: "folder", fileCount: 57 },
  { name: "Homepage Hero Render", kind: "image", previewSrc: logo, imageType: "PNG", resolution: "600x200" },
  { name: "Product Team Photo", kind: "image", imageType: "JPG", resolution: "3024x2016" },
  { name: "Voiceover Draft 02", kind: "audio", audioType: "WAV", duration: "3.4s" },
  { name: "Narration Take Final", kind: "audio", audioType: "FLAC", duration: "2:32m" },
  { name: "Device Mockup v5", kind: "3d", modelType: "GLTF", tris: "1.4M tris" },
  { name: "Finance", kind: "folder", fileCount: 13 },
  { name: "Growth Model 2026", kind: "sheet" },
  { name: "Operations", kind: "folder", fileCount: 31 },
  { name: "Client Estimation v3", kind: "proposal" },
  { name: "Architecture Discovery Board", kind: "board" },
  { name: "Legal", kind: "folder", fileCount: 8 },
  { name: "Q2 Planning Notes.docx", kind: "document" },
  { name: "Homepage Copy v4.txt", kind: "document" },
  { name: "Vendor List.csv", kind: "document" },
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
  if (kind === "project") return <FolderKanban className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "image") return <ImageIcon className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "audio") return <AudioLines className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "3d") return <Cylinder className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "sheet") return <FileSpreadsheet className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "proposal") return <CheckCircle2 className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  if (kind === "board") return <Orbit className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
  return <FileText className="h-5 w-5 shrink-0 text-black/70" aria-hidden="true" />;
}

function leadingVisual(item: DriveItem) {
  if (item.kind === "image" && item.previewSrc) {
    return <img src={item.previewSrc} alt="" className="h-7 w-7 shrink-0 rounded object-cover" aria-hidden="true" />;
  }
  return kindIcon(item.kind);
}

export function DrivePage6() {
  const [view, setView] = useState<"simple" | "signals">("simple");
  const sortedItems = [...items].sort((a, b) => {
    if (a.kind === "folder" && b.kind !== "folder") return -1;
    if (a.kind !== "folder" && b.kind === "folder") return 1;
    return 0;
  });

  return (
    <section className="h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">My Drive v6</h2>
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
      <p className="mb-4 text-sm text-black/55">[{view === "simple" ? "Simple" : "Signals"} view]</p>

      {view === "simple" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedItems.map(item => (
            <article
              key={item.name}
              className="flex min-h-14 items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-left hover:bg-black/[0.02]"
            >
              <div className="flex min-w-0 items-center gap-2">
                {leadingVisual(item)}
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium text-black/85">{item.name}</div>
                  <div className="text-[10px] text-black/50">{secondaryLabel(item)}</div>
                </div>
              </div>
              {item.kind === "audio" ? (
                <button
                  type="button"
                  aria-label={`Play ${item.name}`}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/15 text-black/70 hover:bg-black/[0.03]"
                >
                  <Play className="h-3 w-3" aria-hidden="true" />
                </button>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="grid min-h-52 place-items-center rounded-xl border border-dashed border-black/15 bg-black/[0.02] p-6 text-sm text-black/45">
          Signals view coming soon.
        </div>
      )}
    </section>
  );
}
