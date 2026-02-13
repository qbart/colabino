import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  Filter,
  Plus,
  SquareKanban,
  SlidersHorizontal,
} from "lucide-react";

type Section = "In Review" | "In Progress" | "Todo" | "Done";
type Priority = "URGENT" | "HIGH" | "MEDIUM" | "LOW";
type TagTone = "amber" | "sky" | "emerald" | "rose" | "violet";

type Issue = {
  id: string;
  title: string;
  section: Section;
  priority: Priority;
  createdAt: string;
  project: string;
  assignee: string;
  tags: { label: string; tone: TagTone }[];
};

const sections: Section[] = ["In Review", "In Progress", "Todo", "Done"];

const issues: Issue[] = [
  {
    id: "COL-207",
    title: "Finalize interaction tokens for command menu",
    section: "In Review",
    priority: "HIGH",
    createdAt: "Feb 09, 2026",
    project: "Olympus",
    assignee: "AK",
    tags: [
      { label: "Design", tone: "violet" },
      { label: "UI", tone: "sky" },
    ],
  },
  {
    id: "COL-203",
    title: "Optimize row virtualization in issue table",
    section: "In Review",
    priority: "URGENT",
    createdAt: "Feb 08, 2026",
    project: "Olympus",
    assignee: "MP",
    tags: [
      { label: "Perf", tone: "rose" },
      { label: "Core", tone: "emerald" },
    ],
  },
  {
    id: "COL-215",
    title: "Thread unread state sync for team channels",
    section: "In Progress",
    priority: "HIGH",
    createdAt: "Feb 11, 2026",
    project: "Olympus",
    assignee: "RL",
    tags: [
      { label: "Chat", tone: "sky" },
      { label: "Sync", tone: "amber" },
    ],
  },
  {
    id: "COL-219",
    title: "Add keyboard shortcut for quick-create",
    section: "In Progress",
    priority: "MEDIUM",
    createdAt: "Feb 12, 2026",
    project: "Olympus",
    assignee: "DT",
    tags: [{ label: "DX", tone: "emerald" }],
  },
  {
    id: "COL-228",
    title: "Project milestone filter in activity feed",
    section: "Todo",
    priority: "MEDIUM",
    createdAt: "Feb 13, 2026",
    project: "Olympus",
    assignee: "NV",
    tags: [
      { label: "Product", tone: "violet" },
      { label: "Metrics", tone: "sky" },
    ],
  },
  {
    id: "COL-231",
    title: "Issue import pipeline from CSV",
    section: "Todo",
    priority: "LOW",
    createdAt: "Feb 13, 2026",
    project: "Olympus",
    assignee: "YM",
    tags: [{ label: "Data", tone: "amber" }],
  },
  {
    id: "COL-198",
    title: "Ship workspace sidebar icon refresh",
    section: "Done",
    priority: "LOW",
    createdAt: "Feb 07, 2026",
    project: "Olympus",
    assignee: "TC",
    tags: [{ label: "UI", tone: "sky" }],
  },
];

function priorityIcon(priority: Priority) {
  if (priority === "URGENT") return <BatteryWarning className="h-4 w-4 text-red-600" aria-hidden="true" />;
  if (priority === "HIGH") return <BatteryFull className="h-4 w-4 text-zinc-500" aria-hidden="true" />;
  if (priority === "MEDIUM") return <BatteryMedium className="h-4 w-4 text-zinc-500" aria-hidden="true" />;
  return <BatteryLow className="h-4 w-4 text-zinc-500" aria-hidden="true" />;
}

function tagDotTone(tone: TagTone) {
  if (tone === "amber") return "bg-amber-500";
  if (tone === "sky") return "bg-sky-500";
  if (tone === "emerald") return "bg-emerald-500";
  if (tone === "rose") return "bg-rose-500";
  return "bg-violet-500";
}

function sectionIcon(section: Section) {
  if (section === "In Review") return <CircleDot className="h-4 w-4 text-emerald-600" aria-hidden="true" />;
  if (section === "In Progress") return <CircleDashed className="h-4 w-4 text-amber-600" aria-hidden="true" />;
  if (section === "Done") return <CircleCheck className="h-4 w-4 text-sky-600" aria-hidden="true" />;
  return <Circle className="h-4 w-4 text-zinc-500" aria-hidden="true" />;
}

function issueStatusIcon(section: Section) {
  if (section === "In Review") return <CircleDot className="h-4 w-4 text-emerald-600" aria-hidden="true" />;
  if (section === "In Progress") return <CircleDashed className="h-4 w-4 text-amber-600" aria-hidden="true" />;
  if (section === "Done") return <CircleCheck className="h-4 w-4 text-sky-600" aria-hidden="true" />;
  return <Circle className="h-4 w-4 text-zinc-500" aria-hidden="true" />;
}

export function ProjectPage() {
  return (
    <section className="h-full rounded-t-[20px] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-3 text-zinc-800 md:p-4">
      <header className="bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-3 py-2.5">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-amber-700">Colabino</span>
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-zinc-700">All issues</span>
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-zinc-700">Active</span>
            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-zinc-500">Backlog</span>
          </div>
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 border border-zinc-200 bg-zinc-50 px-2.5 text-xs text-zinc-700 hover:bg-zinc-100"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Display
          </button>
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <button
            type="button"
            className="inline-flex h-8 items-center gap-1.5 px-2 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            Filter
          </button>
        </div>
      </header>

      <div className="mt-3 overflow-hidden bg-white">
        {sections.map(section => {
          const sectionIssues = issues.filter(issue => issue.section === section);

          return (
            <section key={section}>
              <header className="flex items-center justify-between border-b border-zinc-200 bg-[linear-gradient(90deg,rgba(241,245,249,0.95)_0%,rgba(248,250,252,0.95)_100%)] px-3 py-2">
                <div className="flex items-center gap-2">
                  {sectionIcon(section)}
                  <h3 className="text-sm font-medium text-zinc-800">{section}</h3>
                  <span className="text-sm text-zinc-500">{sectionIssues.length}</span>
                </div>
                <button
                  type="button"
                  aria-label={`Add issue to ${section}`}
                  className="inline-flex h-6 w-6 items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </header>

              <div>
                {sectionIssues.map(issue => (
                  <article
                    key={issue.id}
                    className="grid grid-cols-[34px_84px_24px_minmax(220px,1fr)_auto] items-center gap-2 border-b border-zinc-100 px-3 py-2.5 transition hover:bg-zinc-50"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center text-zinc-500">
                      {priorityIcon(issue.priority)}
                    </span>

                    <span className="w-[80px] text-xs font-medium text-zinc-500">{issue.id}</span>

                    <span className="grid h-5 w-5 place-items-center">{issueStatusIcon(issue.section)}</span>

                    <p className="truncate text-sm text-zinc-900">{issue.title}</p>

                    <div className="flex items-center gap-2.5 justify-self-end text-xs text-zinc-500">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {issue.tags.map(tag => (
                          <span
                            key={`${issue.id}-${tag.label}`}
                            className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${tagDotTone(tag.tone)}`} />
                            <span className="text-zinc-700">{tag.label}</span>
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-zinc-700">
                        <SquareKanban className="mr-1 h-3 w-3 text-zinc-500" aria-hidden="true" />
                        {issue.project}
                      </span>

                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 bg-white text-[10px] font-semibold text-zinc-700">
                        {issue.assignee}
                      </span>

                      <span className="whitespace-nowrap text-zinc-500">{issue.createdAt}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
