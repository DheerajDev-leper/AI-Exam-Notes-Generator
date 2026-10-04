import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../config";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;
  const [showCredit, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="sticky top-3 z-50 mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-ink/10 bg-white/80 px-3 py-2 shadow-lg shadow-ink/5 backdrop-blur-xl"
    >
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/")} className="flex items-center gap-2.5 pl-1">
        <motion.span
          whileHover={{ rotate: 0 }}
          className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-lg bg-ink font-display text-lg font-extrabold text-marker transition-transform"
        >
          E
        </motion.span>
        <span className="hidden font-display text-lg font-bold text-ink sm:block">ExamNotes</span>
      </motion.button>

      <div className="flex items-center gap-2">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowCredits(!showCredit); setShowProfile(false); }}
            className="flex items-center gap-2 rounded-full bg-marker px-4 py-2 text-sm font-bold text-ink shadow-sm shadow-marker/40"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}>⚡</motion.span>
            {credits}
            <motion.span animate={{ rotate: showCredit ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-xs text-white">+</motion.span>
          </motion.button>
          <AnimatePresence>
            {showCredit && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute right-0 mt-3 w-72 rounded-2xl border border-ink/10 bg-white p-4 shadow-2xl shadow-ink/15"
              >
                <p className="font-display text-2xl font-bold text-ink">{credits} credits</p>
                <p className="mt-1 text-sm text-slate-500">Each note uses 10 credits.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setShowCredits(false); navigate("/pricing"); }}
                  className="btn-brand mt-4 w-full rounded-xl py-2.5 text-sm font-semibold"
                >
                  Buy more credits
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { setShowProfile(!showProfile); setShowCredits(false); }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-coral font-display font-bold text-white ring-2 ring-white"
          >
            {userData?.name?.slice(0, 1).toUpperCase() || "U"}
          </motion.button>
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-2xl shadow-ink/15"
              >
                <div className="ruled px-4 py-3">
                  <p className="font-semibold text-ink">{userData?.name || "User"}</p>
                  <p className="truncate text-xs text-slate-500">{userData?.email || "No email"}</p>
                </div>
                <div className="p-2">
                  <MenuItem text="New notes" onClick={() => { setShowProfile(false); navigate("/notes"); }} />
                  <MenuItem text="History" onClick={() => { setShowProfile(false); navigate("/history"); }} />
                  <div className="my-1 h-px bg-slate-100" />
                  <MenuItem text="Sign out" red onClick={handleSignout} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

function MenuItem({ onClick, text, red = false }) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${red ? "text-coral hover:bg-coral/10" : "text-slate-700 hover:bg-brand-soft hover:text-brand"}`}
    >
      {text}
    </motion.button>
  );
}

export default Navbar;