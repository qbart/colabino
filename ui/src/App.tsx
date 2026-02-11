import "./index.css";
import {
  Activity,
  Bell,
  Boxes,
  CheckCircle2,
  FileAudio2,
  FileCog,
  FileSpreadsheet,
  FileText,
  Folder,
  Grid2x2,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Orbit,
  Lock,
  Search as SearchIcon,
  Settings,
  Share2,
  Star,
  Upload,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  HashRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import logo from "./logo.png";

type SidebarItem = {
  label: string;
  path: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
};

type DriveFile = {
  id: string;
  name: string;
  typeLabel: string;
  category: "folder" | "project" | "media" | "document" | "spreadsheet" | "proposal" | "board";
  mediaKind?: "image" | "audio" | "3d";
  updatedAt: string;
  collaborators: number;
  permission: "owner" | "editor" | "viewer" | "restricted";
  path: string;
  sessionBased: boolean;
  activeNow?: number;
  metrics?: {
    completion?: number;
    burndown?: "on-track" | "at-risk";
  };
};

const sidebarItems: SidebarItem[] = [
  { label: "Apps", path: "/apps", Icon: Grid2x2 },
  { label: "My Drive", path: "/drive", Icon: Folder },
  { label: "Search", path: "/search", Icon: SearchIcon },
  { label: "Upload", path: "/upload", Icon: Upload },
  { label: "Shared", path: "/shared", Icon: Share2 },
  { label: "Starred", path: "/starred", Icon: Star },
  { label: "Settings", path: "/settings", Icon: Settings },
];

const driveFiles: DriveFile[] = [
  {
    id: "d-1",
    name: "Product Workspace",
    typeLabel: "Folder",
    category: "folder",
    updatedAt: "Just now",
    collaborators: 9,
    permission: "owner",
    path: "My Drive",
    sessionBased: true,
    activeNow: 3,
  },
  {
    id: "f-1",
    name: "Q2 Product Launch",
    typeLabel: "Project",
    category: "project",
    updatedAt: "2m ago",
    collaborators: 8,
    permission: "editor",
    path: "My Drive / Product Workspace",
    sessionBased: true,
    activeNow: 3,
    metrics: { completion: 64, burndown: "on-track" },
  },
  {
    id: "f-2",
    name: "Homepage Hero Render",
    typeLabel: "Image Asset",
    category: "media",
    updatedAt: "15m ago",
    mediaKind: "image",
    collaborators: 5,
    permission: "editor",
    path: "My Drive / Product Workspace",
    sessionBased: true,
    activeNow: 2,
  },
  {
    id: "f-7",
    name: "Voiceover Draft 02",
    typeLabel: "Audio Asset",
    category: "media",
    updatedAt: "34m ago",
    mediaKind: "audio",
    collaborators: 3,
    permission: "editor",
    path: "My Drive / Product Workspace",
    sessionBased: false,
  },
  {
    id: "f-8",
    name: "Device Mockup v5",
    typeLabel: "3D Asset",
    category: "media",
    updatedAt: "48m ago",
    mediaKind: "3d",
    collaborators: 4,
    permission: "viewer",
    path: "My Drive / Product Workspace",
    sessionBased: true,
    activeNow: 1,
  },
  {
    id: "f-3",
    name: "Vendor Uploads",
    typeLabel: "Documents / Uploads",
    category: "document",
    updatedAt: "1h ago",
    collaborators: 4,
    permission: "viewer",
    path: "My Drive / Operations",
    sessionBased: false,
  },
  {
    id: "d-2",
    name: "Finance",
    typeLabel: "Folder",
    category: "folder",
    updatedAt: "2h ago",
    collaborators: 4,
    permission: "restricted",
    path: "My Drive",
    sessionBased: false,
  },
  {
    id: "f-4",
    name: "Growth Model 2026",
    typeLabel: "Semantic Sheet",
    category: "spreadsheet",
    updatedAt: "3h ago",
    collaborators: 6,
    permission: "owner",
    path: "My Drive / Finance",
    sessionBased: true,
    activeNow: 1,
  },
  {
    id: "f-5",
    name: "Client Estimation v3",
    typeLabel: "Estimation Proposal",
    category: "proposal",
    updatedAt: "Today",
    collaborators: 3,
    permission: "editor",
    path: "My Drive / Proposals",
    sessionBased: false,
  },
  {
    id: "f-6",
    name: "Architecture Discovery Board",
    typeLabel: "Collaborative Board",
    category: "board",
    updatedAt: "Just now",
    collaborators: 7,
    permission: "editor",
    path: "My Drive / Product Workspace",
    sessionBased: true,
    activeNow: 4,
  },
];

function fileCategoryIcon(file: DriveFile) {
  const common = "h-4 w-4";
  switch (file.category) {
    case "folder":
      return <Folder className={common} aria-hidden="true" />;
    case "project":
      return <FileCog className={common} aria-hidden="true" />;
    case "media":
      if (file.mediaKind === "image") {
        return (
          <span className="relative block h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-indigo-100 via-sky-100 to-amber-100">
            <ImageIcon className="absolute bottom-1 right-1 h-3.5 w-3.5 text-black/55" aria-hidden="true" />
          </span>
        );
      }
      if (file.mediaKind === "audio") return <FileAudio2 className={common} aria-hidden="true" />;
      return <Boxes className={common} aria-hidden="true" />;
    case "document":
      return <FileText className={common} aria-hidden="true" />;
    case "spreadsheet":
      return <FileSpreadsheet className={common} aria-hidden="true" />;
    case "proposal":
      return <CheckCircle2 className={common} aria-hidden="true" />;
    case "board":
      return <Orbit className={common} aria-hidden="true" />;
    default:
      return <FileText className={common} aria-hidden="true" />;
  }
}

function permissionBadge(permission: DriveFile["permission"]) {
  if (permission === "owner") return <span className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-700">Owner</span>;
  if (permission === "editor") return <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">Editor</span>;
  if (permission === "viewer") return <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">Viewer</span>;
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-amber-700">
      <Lock className="h-3 w-3" aria-hidden="true" />
      Restricted
    </span>
  );
}

function ViewContent({ title, description }: { title: string; description: string }) {
  return (
    <section className="h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm text-black/60">{description}</p>
    </section>
  );
}

function AppsView() {
  return <ViewContent title="Apps" description="This is the apps overview page." />;
}

function DriveView() {
  const sortedDriveFiles = [...driveFiles].sort((a, b) => {
    if (a.category === "folder" && b.category !== "folder") return -1;
    if (a.category !== "folder" && b.category === "folder") return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">My Drive</h2>
          <p className="mt-1 text-sm text-black/60">Project files, semantic docs, media assets, and collaborative workspaces.</p>
        </div>
        <button className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white">New File</button>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/8">
        <div className="grid grid-cols-[2.1fr_1fr_0.8fr_0.8fr_0.9fr_1.2fr] bg-black/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-black/50">
          <span>File</span>
          <span>Type</span>
          <span>Active</span>
          <span>People</span>
          <span>Access</span>
          <span>Project Signals</span>
        </div>
        <div>
          {sortedDriveFiles.map(file => (
            <article
              key={file.id}
              className="grid grid-cols-[2.1fr_1fr_0.8fr_0.8fr_0.9fr_1.2fr] items-center border-t border-black/[0.06] px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg text-black/70 ${
                    file.category === "media" && file.mediaKind === "image" ? "bg-transparent" : "bg-black/[0.04]"
                  }`}
                >
                  {fileCategoryIcon(file)}
                </span>
                <div>
                  <div className="font-medium text-black/90">{file.name}</div>
                  <div className="text-xs text-black/45">
                    {file.path} • Updated {file.updatedAt}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-black/65">
                <span className="rounded-md bg-black/[0.04] px-2 py-1">{file.typeLabel}</span>
              </div>

              <div className="text-xs">
                {file.sessionBased ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                    <Activity className="h-3 w-3" aria-hidden="true" />
                    Live
                  </span>
                ) : (
                  <span className="text-black/35">Idle</span>
                )}
              </div>

              <div className="text-xs text-black/60">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  {file.collaborators}
                  {file.activeNow ? (
                    <span className="ml-1 rounded-full bg-sky-50 px-1.5 py-0.5 text-[10px] text-sky-700">
                      {file.activeNow} now
                    </span>
                  ) : null}
                </span>
              </div>

              <div className="text-xs text-black/60">{permissionBadge(file.permission)}</div>

              <div className="text-xs text-black/60">
                {file.category === "folder" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-black/[0.04] px-2 py-1">Container</span>
                ) : file.category === "project" ? (
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-black/[0.04] px-2 py-1">{file.metrics?.completion ?? 0}% done</span>
                    <span
                      className={`rounded-md px-2 py-1 ${
                        file.metrics?.burndown === "on-track"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {file.metrics?.burndown === "on-track" ? "Burndown on track" : "Burndown at risk"}
                    </span>
                  </div>
                ) : file.category === "proposal" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-indigo-700">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Review comments
                  </span>
                ) : file.category === "board" ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2 py-1 text-violet-700">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    Multi-cursor board
                  </span>
                ) : (
                  <span className="text-black/35">-</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchView() {
  return <ViewContent title="Search" description="Search results and filters will appear here." />;
}

function UploadView() {
  return <ViewContent title="Upload" description="Track and manage current uploads." />;
}

function SharedView() {
  return <ViewContent title="Shared" description="Items shared with your team are listed here." />;
}

function StarredView() {
  return <ViewContent title="Starred" description="Quick access to starred files and folders." />;
}

function SettingsView() {
  return <ViewContent title="Settings" description="Workspace preferences and configuration." />;
}

function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-[#1a1a1a]">
      <div className="grid min-h-screen grid-cols-[64px_1fr]">
        <aside className="flex min-h-screen flex-col">
          <div className="flex h-16 items-center justify-center">
            <img src={logo} alt="Colabino" className="h-8 w-8" />
          </div>
          <div className="flex flex-1 flex-col items-center gap-3 py-4">
            <nav className="flex flex-col gap-3" aria-label="Primary">
              {sidebarItems.map(({ label, path, Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <NavLink
                    key={label}
                    to={path}
                    className={`grid h-10 w-10 place-items-center rounded-xl transition ${
                      isActive ? "bg-black/10 text-black" : "text-black/50 hover:bg-black/5 hover:text-black/70"
                    }`}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </NavLink>
                );
              })}
            </nav>
            <div className="mt-auto grid h-9 w-9 place-items-center rounded-full bg-black/5">
              <Users className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="grid h-16 grid-cols-[1fr_minmax(240px,520px)_1fr] items-center pr-4">
            <div className="text-base font-bold">Colabino</div>
            <div className="mx-auto w-full max-w-[620px]">
              <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-black/40">
                  <SearchIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  type="search"
                  placeholder="Search workspace"
                  className="h-8 w-full rounded-full border border-black/10 bg-white pl-9 pr-3 text-sm placeholder:text-[11px] placeholder:text-black/35 outline-none ring-black/10 focus:ring-2"
                />
              </label>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                className="relative grid h-8 w-8 place-items-center text-black/60 hover:text-black"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
                <span className="absolute -top-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-sky-500 text-[9px] font-semibold text-white">
                  3
                </span>
              </button>
              <details className="relative">
                <summary className="list-none">
                  <button
                    type="button"
                    className="grid h-8 w-8 place-items-center rounded-full text-black/60 hover:text-black"
                    aria-label="Account"
                  >
                    <img src={logo} alt="User" className="h-7 w-7 rounded-full" />
                  </button>
                </summary>
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-black/10 bg-white p-2 text-sm shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
                  <button className="w-full rounded-md px-3 py-2 text-left hover:bg-black/5">Profile</button>
                  <button className="w-full rounded-md px-3 py-2 text-left hover:bg-black/5">Settings</button>
                  <button className="w-full rounded-md px-3 py-2 text-left hover:bg-black/5">Sign out</button>
                </div>
              </details>
            </div>
          </header>

          <main className="flex-1 pr-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/apps" replace />} />
          <Route path="/apps" element={<AppsView />} />
          <Route path="/drive" element={<DriveView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/upload" element={<UploadView />} />
          <Route path="/shared" element={<SharedView />} />
          <Route path="/starred" element={<StarredView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
