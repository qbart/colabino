import "./index.css";
import type { CSSProperties } from "react";
import {
  Bell,
  Folder,
  Grid2x2,
  Search,
  Settings,
  Share2,
  Star,
  Upload,
  Users,
} from "lucide-react";
import logo from "./logo.png";

export function App() {
  const iconColor: CSSProperties = { "--iconPrimary": "currentColor" } as CSSProperties;
  const sidebarItems = [
    { label: "Apps", Icon: Grid2x2, isActive: true },
    { label: "My Drive", Icon: Folder },
    { label: "Search", Icon: Search },
    { label: "Upload", Icon: Upload },
    { label: "Shared", Icon: Share2 },
    { label: "Starred", Icon: Star },
    { label: "Settings", Icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f2f3f5] text-[#1a1a1a]">
      <div className="grid min-h-screen grid-cols-[64px_1fr]">
        <aside className="flex min-h-screen flex-col bg-[#f2f3f5]">
          <div className="flex h-16 items-center justify-center">
            <img src={logo} alt="Colabino" className="h-8 w-8" />
          </div>
          <div className="flex flex-1 flex-col items-center gap-3 py-4">
            <nav className="flex flex-col gap-3" aria-label="Primary">
              {sidebarItems.map(({ label, Icon, isActive }) => (
                <button
                  key={label}
                  className={`grid h-10 w-10 place-items-center rounded-xl transition ${
                    isActive ? "bg-black/10 text-black" : "text-black/50 hover:bg-black/5 hover:text-black/70"
                  }`}
                  style={iconColor}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </button>
              ))}
            </nav>
            <div className="mt-auto grid h-9 w-9 place-items-center rounded-full bg-black/5" style={iconColor}>
              <Users className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="grid h-16 grid-cols-[1fr_minmax(240px,520px)_1fr] items-center bg-[#f2f3f5] pr-4">
            <div className="text-base font-bold">Colabino</div>
            <div className="mx-auto w-full max-w-[620px]">
              <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-black/40">
                  <Search className="h-4 w-4" aria-hidden="true" />
                </span>
                <input
                  type="search"
                  placeholder="Search Colabino"
                  className="h-8 w-full rounded-full border border-black/10 bg-white pl-9 pr-3 text-sm placeholder:text-[11px] placeholder:text-black/35 outline-none ring-black/10 focus:ring-2"
                />
              </label>
            </div>
              <div className="flex items-center justify-end gap-2" style={iconColor}>
                <button className="grid h-8 w-8 place-items-center text-black/60 hover:text-black" aria-label="Notifications">
                  <Bell className="h-5 w-5" aria-hidden="true" />
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
            <section className="h-full rounded-t-[20px] bg-white p-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
              <div className="text-lg font-semibold">Main Section</div>
              <p className="mt-2 text-sm text-black/60">
                Replace this with the primary content. The slight right margin and rounded corners mirror the Spectrum
                layout feel.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
