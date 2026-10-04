import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../config";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Finalresult from "../components/Finalresult";
import PageTransition from "../components/PageTransition";

function History() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(true);

  useEffect(() => {
    const mynotes = async () => {
      try {
        setNotesLoading(true);
        const res = await axios.get(serverUrl + "/api/notes/getNotes", { withCredentials: true });
        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setNotesLoading(false);
      }
    };
    mynotes();
  }, []);

  const openNotes = async (noteId) => {
    try {
      setLoading(true);
      setSelectedId(noteId);
      const res = await axios.get(serverUrl + `/api/notes/${noteId}`, { withCredentials: true });
      setSelectedNote(res.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="min-h-screen">
      <div className="aurora"><i /><i /><i /></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="rounded-lg bg-ink px-3 py-2 text-white lg:hidden" aria-label="Toggle notes list">☰</button>
            <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-lg bg-ink font-display text-lg font-extrabold text-marker">E</span>
              <span className="font-display text-xl font-bold text-ink">Your <span className="gradient-text">history</span></span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-marker px-4 py-2 text-sm font-bold text-ink sm:block">⚡ {credits} credits</span>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} onClick={() => navigate("/notes")} className="btn-brand rounded-full px-5 py-2.5 text-sm font-semibold">
              New notes
            </motion.button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-[1600px]">
        {/* Mobile overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Notes list */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-[320px] border-r border-ink/10 bg-white shadow-2xl shadow-ink/20 lg:sticky lg:top-16 lg:z-30 lg:block lg:shadow-none"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">Your notes</h2>
                  <p className="text-xs text-slate-500">{topics.length} {topics.length === 1 ? "note" : "notes"} saved</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Close">✕</button>
              </div>

              <div className="h-[calc(100%-73px)] overflow-y-auto px-3 py-4">
                {notesLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="animate-pulse rounded-xl border border-slate-100 p-4">
                        <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />
                        <div className="h-3 w-1/2 rounded bg-slate-200" />
                      </div>
                    ))}
                  </div>
                ) : topics.length > 0 ? (
                  <div className="space-y-2.5">
                    {topics.map((topic, i) => {
                      const active = selectedId === topic._id;
                      return (
                        <motion.button
                          key={topic._id || i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          whileHover={{ x: 4 }}
                          onClick={() => { openNotes(topic._id); setIsSidebarOpen(false); }}
                          className={`relative w-full rounded-xl border py-3.5 pl-5 pr-4 text-left transition-colors ${
                            active ? "border-brand/30 bg-brand-soft" : "border-ink/10 bg-white hover:bg-slate-50"
                          }`}
                        >
                          <span className={`absolute inset-y-2 left-1.5 w-1 rounded-full ${active ? "bg-brand" : "bg-marker"}`} />
                          <p className={`line-clamp-2 text-sm font-semibold ${active ? "text-brand" : "text-ink"}`}>
                            {topic.topic || "Untitled topic"}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {topic.classLevel && <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{topic.classLevel}</span>}
                            {topic.examType && <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{topic.examType}</span>}
                            {topic.subject && <span className="rounded-md bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-mint">{topic.subject}</span>}
                            {topic.revisionMode && <span className="rounded-md bg-marker/50 px-2 py-0.5 text-[10px] font-semibold text-ink">Revision</span>}
                            {topic.includeDiagram && <span className="rounded-md bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand">Diagram</span>}
                            {topic.includeChart && <span className="rounded-md bg-coral/15 px-2 py-0.5 text-[10px] font-semibold text-coral">Chart</span>}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                    <h3 className="font-display text-lg font-bold text-ink">No notes yet</h3>
                    <p className="mb-5 mt-1 text-sm text-slate-500">Your first generated notes will be saved here.</p>
                    <button onClick={() => navigate("/notes")} className="btn-brand rounded-full px-5 py-2.5 text-sm font-semibold">Generate notes</button>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
            {loading ? (
              <div className="flex min-h-[500px] items-center justify-center">
                <div className="text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }} className="mx-auto mb-5 h-11 w-11 rounded-full border-4 border-brand-soft border-t-brand" />
                  <h3 className="font-display font-bold text-ink">Opening your notes…</h3>
                </div>
              </div>
            ) : selectedNote ? (
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto max-w-5xl">
                <button onClick={() => setSelectedNote(null)} className="mb-5 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand-soft">
                  ← Back to history
                </button>
                <Finalresult result={selectedNote} />
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[600px] items-center justify-center">
                <div className="ruled paper-shadow max-w-md -rotate-1 rounded-2xl border border-ink/10 py-8 pl-16 pr-8">
                  <h2 className="font-display text-2xl font-bold leading-8 text-ink">Pick a note to reopen</h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600">
                    Choose one from the list to see its <mark className="rounded bg-marker/60 px-1">notes, questions, diagrams</mark> and quick revision points.
                  </p>
                  <button onClick={() => navigate("/notes")} className="btn-brand mt-4 rounded-full px-6 py-3 text-sm font-semibold">
                    Create new notes
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

export default History;