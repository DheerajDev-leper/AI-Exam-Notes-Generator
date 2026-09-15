import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import {serverUrl} from "../App"
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const credits = userData?.credits ?? 0;

  const [showCredit, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSignout = async () => {
    try {
      await axios.get(serverUrl+ "/api/auth/logout", {withCredentials:true})
      dispatch(setUserData(null))
      navigate ("/auth")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-bold text-white shadow-md shadow-indigo-200">
            E
          </div>

          <div className="hidden sm:block">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
              ExamNotes AI
            </h1>

            <p className="text-[10px] text-slate-500">
              Study smarter with AI
            </p>
          </div>
        </motion.div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Credits */}
          <div className="relative">

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowCredits(!showCredit);
                setShowProfile(false);
              }}
              className="flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              <span className="text-base">⚡</span>

              <span>{credits}</span>

              <motion.span
                animate={{ rotate: showCredit ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white"
              >
                +
              </motion.span>
            </motion.button>

            {/* Credit Dropdown */}
            <AnimatePresence>
              {showCredit && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-xl">
                      ⚡
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {credits} Credits
                      </h4>

                      <p className="text-xs text-slate-500">
                        Use credits to generate notes
                      </p>
                    </div>
                  </div>

                  <div className="my-4 h-px bg-slate-100" />

                  <button
                    onClick={() => {setShowCredits(false); navigate("/pricing")}}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:scale-[1.01]"
                  >
                    Buy More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowCredits(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-200 ring-2 ring-white"
            >
              {userData?.name?.slice(0, 1).toUpperCase() || "U"}
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
                >
                  {/* User Info */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                    <p className="font-semibold text-slate-900">
                      {userData?.name || "User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {userData?.email || "No email"}
                    </p>
                  </div>

                  <div className="p-2">

                    <MenuItem
                      text="📚 History"
                      onClick={() => {setShowProfile(false); navigate("/history")}}
                    />

                    <div className="my-1 h-px bg-slate-100" />

                    <MenuItem
                      text="Sign out"
                      red
                      onClick={
                        handleSignout
                      }
                    />

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}

function MenuItem({ onClick, text, red = false }) {
  return (
    <motion.button
      whileHover={{ x: 3 }}
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
        red
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
      }`}
    >
      {text}
    </motion.button>
  );
}

export default Navbar;