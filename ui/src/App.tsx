import "./index.css";
import {
  Bell,
  Folder,
  Grid2x2,
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

const sidebarItems: SidebarItem[] = [
  { label: "Apps", path: "/apps", Icon: Grid2x2 },
  { label: "My Drive", path: "/drive", Icon: Folder },
  { label: "Search", path: "/search", Icon: SearchIcon },
  { label: "Upload", path: "/upload", Icon: Upload },
  { label: "Shared", path: "/shared", Icon: Share2 },
  { label: "Starred", path: "/starred", Icon: Star },
  { label: "Settings", path: "/settings", Icon: Settings },
];

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
  return <ViewContent title="My Drive" description="Manage files and folders in your drive." />;
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
