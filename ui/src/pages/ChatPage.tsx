import {
  Bell,
  Hash,
  Lock,
  MessageSquareText,
  MoreHorizontal,
  Pin,
  Send,
  Settings2,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

type ChatMessage = {
  id: string;
  author: string;
  body: string;
  at: string;
  own?: boolean;
  pinned?: boolean;
};

type Channel = {
  id: string;
  name: string;
  visibility: "public" | "private";
};

type Person = {
  name: string;
  status: "online" | "busy" | "offline";
};

const initialChannels: Channel[] = [
  { id: "general", name: "general", visibility: "public" },
  { id: "product", name: "product", visibility: "public" },
  { id: "design", name: "design", visibility: "public" },
  { id: "engineering", name: "engineering", visibility: "public" },
  { id: "support", name: "support", visibility: "public" },
  { id: "audit-leads", name: "audit-leads", visibility: "private" },
];

const people: Person[] = [
  { name: "Alex Kim", status: "online" },
  { name: "Rina Lopez", status: "offline" },
  { name: "Nate Brown", status: "busy" },
  { name: "Maya Chen", status: "online" },
  { name: "Ibrahim Noor", status: "offline" },
];

const seedMessages: ChatMessage[] = [
  { id: "m1", author: "Alex Kim", body: "Updated launch checklist is in Drive.", at: "10:14 AM", pinned: true },
  {
    id: "m2",
    author: "Rina Lopez",
    body: "Need one more pass on homepage copy.\n- tighten hero title\n- shorten CTA text",
    at: "10:19 AM",
  },
  { id: "m3", author: "You", body: "I will review and share notes in 30 minutes.", at: "10:21 AM", own: true },
];

function renderMessageBody(body: string, own?: boolean) {
  const lines = body.split("\n");
  const textTone = own ? "text-white" : "text-black";
  const mutedTone = own ? "text-white/80" : "text-black/70";

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const bullet = line.match(/^[-*]\s+(.*)$/);
        const ordered = line.match(/^(\d+)\.\s+(.*)$/);

        if (bullet) {
          return (
            <div key={`${index}-${line}`} className={`flex gap-2 ${mutedTone}`}>
              <span>•</span>
              <span>{bullet[1]}</span>
            </div>
          );
        }

        if (ordered) {
          return (
            <div key={`${index}-${line}`} className={`flex gap-2 ${mutedTone}`}>
              <span>{ordered[1]}.</span>
              <span>{ordered[2]}</span>
            </div>
          );
        }

        if (!line.trim()) {
          return <div key={`${index}-${line}`} className="h-2" />;
        }

        return (
          <p key={`${index}-${line}`} className={textTone}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

export function ChatPage() {
  const [channels] = useState(initialChannels);
  const [activeChannelId, setActiveChannelId] = useState("general");
  const [messages, setMessages] = useState(seedMessages);
  const [draft, setDraft] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "pins" | "threads">("messages");
  const [activeThreadId, setActiveThreadId] = useState<string | null>("m2");
  const [threadReplies, setThreadReplies] = useState<Record<string, ChatMessage[]>>({
    m2: [{ id: "m2-r1", author: "Alex Kim", body: "I can help with CTA options.", at: "10:23 AM" }],
  });

  const activeChannel = channels.find(channel => channel.id === activeChannelId) ?? channels[0];
  const activeThreadParent = activeThreadId ? messages.find(message => message.id === activeThreadId) ?? null : null;
  const pinnedMessages = messages.filter(message => message.pinned);
  const threadedMessages = messages.filter(message => (threadReplies[message.id]?.length ?? 0) > 0);
  const inThreadView = Boolean(activeThreadId);

  function currentTimeLabel() {
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function sendMessage(value: string) {
    if (!value) return;
    if (activeThreadId) {
      const reply: ChatMessage = { id: `${Date.now()}`, author: "You", body: value, at: currentTimeLabel(), own: true };
      setThreadReplies(previous => ({ ...previous, [activeThreadId]: [...(previous[activeThreadId] ?? []), reply] }));
    } else {
      setMessages(previous => [
        ...previous,
        { id: `${Date.now()}`, author: "You", body: value, at: currentTimeLabel(), own: true },
      ]);
    }
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    sendMessage(value);
    setDraft("");
  }

  function togglePinMessage(messageId: string) {
    setMessages(previous =>
      previous.map(message => (message.id === messageId ? { ...message, pinned: !message.pinned } : message)),
    );
  }

  function submitThreadReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeThreadId) return;
    const value = threadDraft.trim();
    if (!value) return;
    const reply: ChatMessage = { id: `${Date.now()}`, author: "You", body: value, at: nowLabel, own: true };
    setThreadReplies(previous => ({ ...previous, [activeThreadId]: [...(previous[activeThreadId] ?? []), reply] }));
    setThreadDraft("");
  }

  function handleDraftKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      const value = draft.trim();
      if (!value) return;
      sendMessage(value);
      setDraft("");
    }
  }

  function statusDotClass(status: Person["status"]) {
    if (status === "online") return "bg-emerald-500";
    if (status === "busy") return "bg-red-500";
    return "bg-slate-400";
  }

  return (
    <section className="h-full rounded-t-[20px] bg-white shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
      <div className="grid h-full min-h-[calc(100vh-64px)] grid-cols-[1fr_260px]">
        <div className="flex min-h-0 flex-col border-r border-black/10">
          <header className="border-b border-black/10 px-5 py-3">
            {inThreadView ? (
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-black/90">Thread</h2>
                <button
                  type="button"
                  onClick={() => setActiveThreadId(null)}
                  className="rounded-md border border-black/15 bg-white px-2 py-1 text-[11px] text-black/65 hover:bg-black/[0.04]"
                >
                  Leave thread
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-black/90">
                    {activeChannel.visibility === "private" ? "🔒" : "#"}
                    {activeChannel.name}
                  </h2>
                  <p className="text-xs text-black/50">Team coordination and delivery updates in this channel.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-0.5 rounded-md border border-black/10 bg-black/[0.02] p-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setActiveTab("messages")}
                      className={`rounded px-2.5 py-1 ${activeTab === "messages" ? "bg-white shadow-sm" : "text-black/60"}`}
                    >
                      Messages
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("pins")}
                      className={`rounded px-2.5 py-1 ${activeTab === "pins" ? "bg-white shadow-sm" : "text-black/60"}`}
                    >
                      Pins
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("threads")}
                      className={`rounded px-2.5 py-1 ${activeTab === "threads" ? "bg-white shadow-sm" : "text-black/60"}`}
                    >
                      Threads
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-black/15 text-black/70 hover:bg-black/[0.04]"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </header>

          <div className="flex min-h-0 flex-1">
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {inThreadView ? (
                activeThreadParent ? (
                  <article className="max-w-[82%] rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm">
                    <div className="mb-1 text-[11px] text-black/45">
                      {activeThreadParent.author} · {activeThreadParent.at}
                    </div>
                    {renderMessageBody(activeThreadParent.body)}
                  </article>
                ) : (
                  <div className="max-w-[82%] rounded-lg border border-dashed border-black/15 px-3 py-2 text-xs text-black/45">
                    Thread message not found.
                  </div>
                )
              ) : (
                (activeTab === "messages"
                  ? messages
                  : activeTab === "pins"
                    ? pinnedMessages
                    : threadedMessages
                ).map(message => (
                  <article
                    key={message.id}
                    className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm ${
                      message.own ? "ml-auto bg-black text-white" : "bg-black/[0.04] text-black"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className={`text-[11px] ${message.own ? "text-white/75" : "text-black/45"}`}>
                        {message.author} · {message.at}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => togglePinMessage(message.id)}
                          className={`inline-flex h-5 w-5 items-center justify-center rounded ${
                            message.own ? "text-white/75 hover:bg-white/15" : "text-black/45 hover:bg-black/10"
                          }`}
                          aria-label={message.pinned ? "Unpin message" : "Pin message"}
                        >
                          <Pin className={`h-3 w-3 ${message.pinned ? "fill-current" : ""}`} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveThreadId(message.id)}
                          className={`inline-flex h-5 w-5 items-center justify-center rounded ${
                            message.own ? "text-white/75 hover:bg-white/15" : "text-black/45 hover:bg-black/10"
                          }`}
                          aria-label="Open thread"
                        >
                          <MessageCircle className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {renderMessageBody(message.body, message.own)}
                    {(threadReplies[message.id]?.length ?? 0) > 0 ? (
                      <div className={`mt-1 text-[10px] ${message.own ? "text-white/65" : "text-black/40"}`}>
                        {threadReplies[message.id].length} replies
                      </div>
                    ) : null}
                  </article>
                ))
              )}
            </div>
          </div>

          <form onSubmit={submitMessage} className="border-t border-black/10 p-4">
            <label className="sr-only" htmlFor="chat-draft">
              Message
            </label>
            <div className="relative">
              <textarea
                id="chat-draft"
                value={draft}
                onChange={event => setDraft(event.target.value)}
                onKeyDown={handleDraftKeyDown}
                placeholder="Write a message"
                rows={3}
                className="w-full resize-none rounded-2xl border border-black/10 px-4 py-2.5 pr-14 text-sm outline-none ring-black/10 focus:ring-2"
              />
              <button
                type="submit"
                className="absolute right-2 bottom-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-black/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-black/45">Use Enter for new line. Use Cmd/Ctrl + Enter to send.</p>
          </form>
        </div>

        <aside className="flex min-h-0 flex-col px-4 py-4">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mb-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/45">Channels</h3>
              <div className="space-y-1">
                {channels.map(channel => (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm ${
                      channel.id === activeChannel.id ? "bg-black/8 text-black" : "text-black/65 hover:bg-black/[0.04]"
                    }`}
                  >
                    {channel.visibility === "private" ? (
                      <Lock className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Hash className="h-4 w-4" aria-hidden="true" />
                    )}
                    {channel.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/45">People</h3>
              <div className="space-y-1">
                {people.map(person => (
                  <button
                    key={person.name}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-black/65 hover:bg-black/[0.04]"
                  >
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{person.name}</span>
                    <span className={`h-2 w-2 rounded-full ${statusDotClass(person.status)}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 border-t border-black/10 pt-3">
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1 rounded-md border border-black/15 px-2 py-1.5 text-[11px] text-black/70 hover:bg-black/[0.04]"
              >
                <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                DMs
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1 rounded-md border border-black/15 px-2 py-1.5 text-[11px] text-black/70 hover:bg-black/[0.04]"
              >
                <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                Alerts
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1 rounded-md border border-black/15 px-2 py-1.5 text-[11px] text-black/70 hover:bg-black/[0.04]"
              >
                <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
                Settings
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
