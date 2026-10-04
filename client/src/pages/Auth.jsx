import { signInWithPopup } from "firebase/auth";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverUrl } from "../config";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import PageTransition from "../components/PageTransition";

const list = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const li = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function Auth() {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const User = response.user;
      const idToken = await User.getIdToken();

      const result = await axios.post(serverUrl + "/api/auth/signup", { idToken }, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageTransition className="min-h-screen">
      <div className="aurora"><i /><i /><i /></div>
      <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-6 py-12 lg:grid-cols-2">
        <motion.section initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="mb-8 flex items-center gap-2.5"
          >
            <span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-lg bg-ink font-display text-xl font-extrabold text-marker">E</span>
            <span className="font-display text-xl font-bold text-ink">ExamNotes</span>
          </motion.div>

          <h1 className="text-5xl font-extrabold leading-[1.03] text-ink sm:text-6xl">
            Your syllabus, <span className="gradient-text">exam-ready.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Type any topic and let AI turn it into structured notes, important questions, diagrams and downloadable PDFs.
          </p>

          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(22,24,58,0.35)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-9 flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-semibold text-white shadow-xl shadow-ink/25"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white"><FcGoogle className="text-xl" /></span>
            Continue with Google
          </motion.button>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-sm text-slate-500">
            New here? You get <span className="rounded bg-marker/60 px-1 font-semibold text-ink">50 free credits</span>. Upgrade anytime.
          </motion.p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: -30, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 1.5 }}
          whileHover={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
          className="ruled paper-shadow hidden rounded-2xl border border-ink/10 py-7 pl-16 pr-7 transition-transform lg:block"
        >
          <p className="font-display text-2xl font-bold leading-8 text-ink">What you get</p>
          <motion.ul variants={list} initial="initial" animate="animate" className="mt-4 text-[15px] leading-8 text-slate-700">
            <motion.li variants={li}>- Notes <mark className="rounded bg-marker/60 px-1">tuned to your class</mark> and exam</motion.li>
            <motion.li variants={li}>- Topics ranked by how likely they appear</motion.li>
            <motion.li variants={li}>- Short and long practice questions</motion.li>
            <motion.li variants={li}>- Flowcharts and charts where they help</motion.li>
            <motion.li variants={li}>- One-tap PDF for offline revision</motion.li>
          </motion.ul>
        </motion.section>
      </main>
    </PageTransition>
  );
}

export default Auth;