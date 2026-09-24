function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm sm:flex-row">
        <p className="font-display text-lg font-bold">
          Exam<span className="text-marker">Notes</span>
        </p>
        <p className="text-white/60">© {new Date().getFullYear()} ExamNotes AI. Made for students.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="rounded-full border border-white/20 px-4 py-2 font-medium text-white/80 transition hover:bg-white/10">
          Back to top
        </button>
      </div>
    </footer>
  );
}

export default Footer;