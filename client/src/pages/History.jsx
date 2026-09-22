import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Finalresult from "../components/Finalresult";

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

        const res = await axios.get(
          serverUrl + "/api/notes/getNotes",
          {
            withCredentials: true,
          }
        );

        console.log(res.data);

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

      const res = await axios.get(
        serverUrl + `/api/notes/${noteId}`,
        {
          withCredentials: true,
        }
      );

      setSelectedNote(res.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-md transition hover:bg-indigo-700 lg:hidden"
            >
              ☰
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                Notes History
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                View your previously generated notes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            {/* Credits */}
            <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 sm:flex">
              <span className="text-sm font-medium text-indigo-600">
                Credits
              </span>

              <span className="font-bold text-indigo-800">
                {credits}
              </span>
            </div>

            <button
              onClick={() => navigate("/notes")}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
            >
              + New Notes
            </button>

          </div>
        </div>
      </header>


      {/* ================= MAIN ================= */}
      <div className="relative mx-auto flex max-w-[1600px]">


        {/* ================= MOBILE OVERLAY ================= */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>


        {/* ================= SIDEBAR ================= */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25 }}
              className="
                fixed left-0 top-16 z-50
                h-[calc(100vh-4rem)]
                w-[320px]
                border-r border-slate-200
                bg-white
                shadow-xl
                lg:sticky
                lg:top-16
                lg:z-30
                lg:block
                lg:h-[calc(100vh-4rem)]
                lg:shadow-none
              "
            >

              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                <div>
                  <h2 className="font-bold text-slate-800">
                    Your Notes
                  </h2>

                  <p className="text-xs text-slate-500">
                    {topics.length}{" "}
                    {topics.length === 1 ? "note" : "notes"} generated
                  </p>
                </div>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                  ✕
                </button>

              </div>


              {/* Notes List */}
              <div className="h-[calc(100%-73px)] overflow-y-auto px-3 py-4">

                {notesLoading ? (

                  <div className="space-y-3">

                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="animate-pulse rounded-xl border border-slate-100 p-4"
                      >
                        <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />

                        <div className="mb-2 h-3 w-1/2 rounded bg-slate-200" />

                        <div className="h-3 w-2/3 rounded bg-slate-200" />
                      </div>
                    ))}

                  </div>

                ) : topics.length > 0 ? (

                  <div className="space-y-2">

                    {topics.map((topic, i) => (

                      <motion.button
                        key={topic._id || i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => {
                          openNotes(topic._id);
                          setIsSidebarOpen(false);
                        }}
                        className={`
                          group w-full rounded-xl border p-4 text-left
                          transition-all duration-200
                          ${
                            selectedId === topic._id
                              ? "border-indigo-200 bg-indigo-50 shadow-sm"
                              : "border-slate-100 bg-white hover:border-indigo-100 hover:bg-slate-50 hover:shadow-sm"
                          }
                        `}
                      >

                        {/* Topic */}
                        <div className="mb-3 flex items-start gap-3">

                          <div
                            className={`
                              flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                              ${
                                selectedId === topic._id
                                  ? "bg-indigo-600 text-white"
                                  : "bg-indigo-50 text-indigo-600"
                              }
                            `}
                          >
                            📚
                          </div>

                          <div className="min-w-0 flex-1">

                            <p
                              className={`
                                line-clamp-2 text-sm font-semibold
                                ${
                                  selectedId === topic._id
                                    ? "text-indigo-700"
                                    : "text-slate-800"
                                }
                              `}
                            >
                              {topic.topic || "Untitled Topic"}
                            </p>

                          </div>

                        </div>


                        {/* Metadata */}
                        <div className="flex flex-wrap gap-1.5">

                          {topic.classLevel && (
                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600">
                              Class {topic.classLevel}
                            </span>
                          )}

                          {topic.examType && (
                            <span className="rounded-md bg-purple-50 px-2 py-1 text-[10px] font-medium text-purple-600">
                              {topic.examType}
                            </span>
                          )}

                          {topic.subject && (
                            <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                              {topic.subject}
                            </span>
                          )}

                        </div>


                        {/* Features */}
                        <div className="mt-2 flex flex-wrap gap-2">

                          {topic.revisionMode && (
                            <span className="text-[10px] font-medium text-slate-500">
                              ⚡ Revision
                            </span>
                          )}

                          {topic.includeDiagrams && (
                            <span className="text-[10px] font-medium text-slate-500">
                              ◈ Diagrams
                            </span>
                          )}

                          {topic.includeCharts && (
                            <span className="text-[10px] font-medium text-slate-500">
                              ▥ Charts
                            </span>
                          )}

                        </div>

                      </motion.button>

                    ))}

                  </div>

                ) : (

                  /* Empty State */
                  <div className="flex h-full flex-col items-center justify-center px-5 text-center">

                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                      📚
                    </div>

                    <h3 className="mb-1 font-semibold text-slate-800">
                      No notes yet
                    </h3>

                    <p className="mb-5 text-sm text-slate-500">
                      Generate your first AI-powered study notes.
                    </p>

                    <button
                      onClick={() => navigate("/notes")}
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Generate Notes
                    </button>

                  </div>

                )}

              </div>

            </motion.aside>
          )}
        </AnimatePresence>


        {/* ================= CONTENT ================= */}
        <main className="min-w-0 flex-1">

          <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">

            {loading ? (

              /* Loading */
              <div className="flex min-h-[500px] items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                  <h3 className="font-semibold text-slate-800">
                    Loading your notes...
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Please wait a moment
                  </p>

                </div>

              </div>

            ) : selectedNote ? (

              /* Selected Note */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-5xl"
              >

                <div className="mb-5 flex items-center justify-between">

                  <button
                    onClick={() => setSelectedNote(null)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
                  >
                    ← Back to History
                  </button>

                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <Finalresult result={selectedNote} />

                </div>

              </motion.div>

            ) : (

              /* Default State */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[600px] items-center justify-center"
              >

                <div className="max-w-md text-center">

                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 text-5xl shadow-sm">
                    📖
                  </div>

                  <h2 className="mb-3 text-2xl font-bold text-slate-800">
                    Select a Topic
                  </h2>

                  <p className="mb-6 text-sm leading-6 text-slate-500">
                    Choose a note from your history to view your
                    generated study material, diagrams, charts and
                    quick revision notes.
                  </p>

                  <button
                    onClick={() => navigate("/notes")}
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                  >
                    Create New Notes
                  </button>

                </div>

              </motion.div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default History;