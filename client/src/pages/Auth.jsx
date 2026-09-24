import { signInWithPopup } from "firebase/auth";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverUrl } from "../config";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

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
    <div className="min-h-screen">
      <div className="aurora"><i /><i /><i /></div>
      <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-6 py-12 lg:grid-cols-2">
        <motion.section initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8 flex items-center gap-2.5">
            <span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-lg bg-ink font-display text-xl font-extrabold text-marker">E</span>
            <span className="font-display text-xl font-bold text-ink">ExamNotes</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.03] text-ink sm:text-6xl">
            Your syllabus, <span className="marker">exam-ready.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Type any topic and let AI turn it into structured notes, important questions, diagrams and downloadable PDFs.
          </p>

          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="mt-9 flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 font-semibold text-white shadow-xl shadow-ink/25"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white"><FcGoogle className="text-xl" /></span>
            Continue with Google
          </motion.button>
          <p className="mt-4 text-sm text-slate-500">
            New here? You get <span className="rounded bg-marker/60 px-1 font-semibold text-ink">50 free credits</span>. Upgrade anytime.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: -30, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 1.5 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
          className="ruled paper-shadow hidden rounded-2xl border border-ink/10 py-7 pl-16 pr-7 lg:block"
        >
          <p className="font-display text-2xl font-bold leading-8 text-ink">What you get</p>
          <ul className="mt-4 text-[15px] leading-8 text-slate-700">
            <li>- Notes <mark className="rounded bg-marker/60 px-1">tuned to your class</mark> and exam</li>
            <li>- Topics ranked by how likely they appear</li>
            <li>- Short and long practice questions</li>
            <li>- Flowcharts and charts where they help</li>
            <li>- One-tap PDF for offline revision</li>
          </ul>
        </motion.section>
      </main>
    </div>
  );
}

export default Auth;