import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Pricing() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const currentCredits = userData?.credits ?? 0;

  const plans = [
    { name: "Free", price: "₹0", period: "forever", credits: "50 credits", popular: false, button: "Current Plan",
      description: "Try it on your next topic.",
      features: ["5 note generations", "Quick revision mode", "Basic diagrams", "PDF download"] },
    { name: "Pro", price: "₹199", period: "/ month", credits: "100 credits", popular: true, button: "Upgrade to Pro",
      description: "For students who revise every week.",
      features: ["10 note generations", "Detailed study notes", "Diagrams and charts", "PDF download", "Priority generation"] },
    { name: "Premium", price: "₹399", period: "/ month", credits: "250 credits", popular: false, button: "Get Premium",
      description: "For heavy exam-season use.",
      features: ["25 note generations", "Unlimited note history", "Diagrams and charts", "PDF download", "Premium support"] },
  ];

  return (
    <div className="min-h-screen">
      <div className="aurora"><i /><i /><i /></div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-lg bg-ink font-display text-lg font-extrabold text-marker">E</span>
          <span className="font-display text-lg font-bold text-ink">ExamNotes</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-marker px-4 py-2 text-sm font-bold text-ink">⚡ {currentCredits} credits</span>
          <button onClick={() => navigate("/notes")} className="btn-brand rounded-full px-5 py-2.5 text-sm font-semibold">Create notes</button>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-12 pt-10 text-center">
        <h1 className="text-4xl font-extrabold text-ink sm:text-6xl">
          Pay for the notes <span className="marker">you actually make.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-slate-600">Every note costs 10 credits. Pick the pack that matches your exam schedule.</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.45 }}
            whileHover={{ y: -8 }}
            className={`relative flex flex-col rounded-3xl p-7 ${plan.popular ? "bg-ink text-white paper-shadow" : "border border-ink/10 bg-white"}`}
          >
            {plan.popular && <span className="absolute right-5 top-5 rotate-3 rounded-md bg-marker px-2.5 py-1 text-xs font-bold text-ink">Most popular</span>}
            <h2 className="font-display text-xl font-bold">{plan.name}</h2>
            <p className={`mt-1 min-h-[44px] text-sm ${plan.popular ? "text-white/70" : "text-slate-500"}`}>{plan.description}</p>
            <p className="mt-4 flex items-end gap-1">
              <span className="font-display text-5xl font-extrabold">{plan.price}</span>
              <span className={`mb-1.5 text-sm ${plan.popular ? "text-white/60" : "text-slate-500"}`}>{plan.period}</span>
            </p>
            <p className={`mt-4 rounded-xl px-4 py-2.5 text-sm font-bold ${plan.popular ? "bg-white/10" : "bg-brand-soft text-brand"}`}>{plan.credits} included</p>
            <button
              onClick={() => { if (plan.name === "Free") navigate("/notes"); }}
              className={`mt-5 w-full rounded-full py-3 text-sm font-semibold transition ${plan.popular ? "bg-marker text-ink hover:brightness-95" : "border border-ink/15 text-ink hover:bg-brand-soft"}`}
            >
              {plan.button}
            </button>
            <ul className="mt-6 space-y-2.5 border-t border-current/10 pt-5 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2.5"><span className="text-mint">✓</span><span className={plan.popular ? "text-white/80" : "text-slate-600"}>{f}</span></li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

export default Pricing;