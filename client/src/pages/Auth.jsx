import { signInWithPopup } from "firebase/auth";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import axios from "axios"
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Auth() {

  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try{
      const response = await signInWithPopup(auth, provider)
      const User = response.user
      const name = User.displayName
      const email = User.email

      const result= await axios.post(serverUrl +"/api/auth/signup", {name,email},{
        withCredentials:true
      })
      dispatch(setUserData(result.data))
    }catch (err){
      console.log(err)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900">

      {/* Background Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl" />
        <div className="absolute right-[-120px] top-20 h-[450px] w-[450px] rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-6 py-7"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ExamNotes AI
              </span>
            </h1>

            <p className="mt-0.5 text-xs text-slate-500">
              AI-powered Exam Notes Generator
            </p>
          </div>

          <div className="hidden rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-md sm:block">
            ✨ Study smarter with AI
          </div>

        </div>
      </motion.header>

      {/* Main */}
      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-110px)] max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">

        {/* LEFT SIDE */}
        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            AI-powered learning platform
          </motion.div>

          {/* Heading */}
          <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

            Turn your syllabus into

            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text pb-2 text-transparent">
              exam-ready notes.
            </span>

          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Upload your study material and let AI transform it into
            structured notes, important questions, diagrams and
            downloadable PDFs.
          </p>

          {/* Google Button */}
          <motion.button
          onClick={handleGoogleAuth}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 12px 30px rgba(79, 70, 229, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex w-full max-w-md items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 font-semibold text-slate-800 shadow-lg shadow-slate-200/60 transition-all hover:border-indigo-200"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </motion.button>

          {/* Credits */}
          <div className="mt-5 flex max-w-md items-center gap-2 text-sm text-slate-500">
            <span className="text-base">🎁</span>

            <span>
              Start with{" "}
              <span className="font-semibold text-slate-800">
                50 free credits
              </span>
              {" "}— upgrade anytime.
            </span>
          </div>

          {/* Mini stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            <Stat number="50+" label="Free Credits" />
            <Stat number="AI" label="Powered" />
            <Stat number="PDF" label="Export" />
          </div>

        </motion.section>

        {/* RIGHT SIDE */}
        <motion.section
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >

          {/* Main Glass Card */}
          <div className="relative rounded-3xl border border-white/70 bg-white/65 p-6 shadow-2xl shadow-indigo-200/30 backdrop-blur-xl">

            {/* Card Header */}
            <div className="mb-6 flex items-center justify-between">
              
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Everything you need
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  From material to exam preparation
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg text-white shadow-lg shadow-indigo-200">
                ✨
              </div>

            </div>

            {/* Features */}
            <div className="space-y-3">

              <Feature
                icon="🎁"
                title="50 Free Credits"
                des="Start generating notes without paying."
              />

              <Feature
                icon="🧠"
                title="Smart AI Notes"
                des="Turn complex material into simple explanations."
              />

              <Feature
                icon="📊"
                title="Graphs & Diagrams"
                des="Visualize difficult concepts instantly."
              />

              <Feature
                icon="📝"
                title="AI Questions"
                des="Generate MCQs and exam-focused questions."
              />

              <Feature
                icon="📄"
                title="Downloadable PDFs"
                des="Save your notes for offline revision."
              />

            </div>

            {/* Bottom Gradient */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-lg shadow-indigo-200">
              <div className="flex items-center justify-between">
                
                <div>
                  <p className="text-sm font-semibold">
                    Ready to study smarter?
                  </p>

                  <p className="mt-1 text-xs text-indigo-100">
                    Your notes are just one click away.
                  </p>
                </div>

                <span className="text-2xl">🚀</span>

              </div>
            </div>

          </div>

          {/* Floating Card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-5 -top-6 hidden rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                ✓
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-800">
                  AI Ready
                </p>

                <p className="text-[11px] text-slate-500">
                  Generate notes instantly
                </p>
              </div>
            </div>
          </motion.div>

        </motion.section>

      </main>
    </div>
  );
}

/* Feature Component */
function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ x: 5, scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm transition-all hover:border-indigo-100 hover:bg-white hover:shadow-md"
    >

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-xl ring-1 ring-indigo-100 transition-transform group-hover:scale-105">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-0.5 text-xs leading-5 text-slate-500">
          {des}
        </p>
      </div>

    </motion.div>
  );
}

/* Stats Component */
function Stat({ number, label }) {
  return (
    <div>
      <p className="text-xl font-bold text-slate-900">
        {number}
      </p>

      <p className="mt-0.5 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default Auth;
