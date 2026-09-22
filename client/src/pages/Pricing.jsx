import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Pricing() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  const currentCredits = userData?.credits ?? 0;

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "Forever",
      description: "Get started with AI-powered exam preparation.",
      credits: "10 Credits",
      popular: false,
      features: [
        "10 AI note generations",
        "Basic study notes",
        "Quick Revision mode",
        "Basic diagrams",
        "PDF download",
      ],
      button: "Current Plan",
    },
    {
      name: "Pro",
      price: "₹199",
      period: "/ month",
      description: "For students who generate notes regularly.",
      credits: "100 Credits",
      popular: true,
      features: [
        "100 AI note generations",
        "Detailed study notes",
        "Quick Revision mode",
        "AI-generated diagrams",
        "AI-generated charts",
        "PDF download",
        "Priority generation",
      ],
      button: "Upgrade to Pro",
    },
    {
      name: "Premium",
      price: "₹399",
      period: "/ month",
      description: "For serious exam preparation and heavy usage.",
      credits: "250 Credits",
      popular: false,
      features: [
        "250 AI note generations",
        "Unlimited note history",
        "Detailed study notes",
        "Quick Revision mode",
        "AI-generated diagrams",
        "AI-generated charts",
        "PDF download",
        "Priority AI generation",
        "Premium support",
      ],
      button: "Get Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg shadow-md">
              ✨
            </div>

            <span className="text-lg font-bold text-slate-800">
              ExamNotes<span className="text-indigo-600">AI</span>
            </span>
          </button>


          {/* Right */}
          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 sm:flex">
              <span className="text-sm text-indigo-600">
                Credits
              </span>

              <span className="font-bold text-indigo-800">
                {currentCredits}
              </span>
            </div>

            <button
              onClick={() => navigate("/notes")}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700"
            >
              Create Notes
            </button>

          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}
      <section className="px-4 pb-12 pt-16 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >

          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
            ✨ Simple & Flexible Pricing
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Choose the plan that
            <span className="block text-indigo-600">
              fits your preparation
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Generate AI-powered study notes, diagrams, charts and
            quick revision material whenever you need them.
          </p>

        </motion.div>

      </section>


      {/* ================= CURRENT CREDITS ================= */}
      <div className="px-4 sm:px-6 lg:px-8">

        <div className="mx-auto mb-10 flex max-w-4xl items-center justify-center">

          <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                ⚡
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Your current balance
                </p>

                <p className="font-bold text-slate-800">
                  {currentCredits} Credits
                </p>
              </div>

            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              Active
            </span>

          </div>

        </div>

      </div>


      {/* ================= PRICING CARDS ================= */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">

          {plans.map((plan, index) => (

            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
              className={`
                relative flex flex-col overflow-hidden rounded-3xl
                border bg-white
                ${
                  plan.popular
                    ? "border-indigo-500 shadow-xl shadow-indigo-100"
                    : "border-slate-200 shadow-sm"
                }
              `}
            >

              {/* Popular */}
              {plan.popular && (
                <div className="absolute right-5 top-5">

                  <span className="rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                    MOST POPULAR
                  </span>

                </div>
              )}


              {/* Card Content */}
              <div className="p-7">

                <div className="mb-5">

                  <h2 className="text-xl font-bold text-slate-800">
                    {plan.name}
                  </h2>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    {plan.description}
                  </p>

                </div>


                {/* Price */}
                <div className="mb-6 flex items-end gap-1">

                  <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {plan.price}
                  </span>

                  <span className="mb-1 text-sm text-slate-500">
                    {plan.period}
                  </span>

                </div>


                {/* Credits */}
                <div
                  className={`
                    mb-6 rounded-xl px-4 py-3
                    ${
                      plan.popular
                        ? "bg-indigo-50 text-indigo-700"
                        : "bg-slate-50 text-slate-700"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">

                    <span className="text-sm font-medium">
                      Included
                    </span>

                    <span className="font-bold">
                      {plan.credits}
                    </span>

                  </div>
                </div>


                {/* Button */}
                <button
                  onClick={() => {
                    if (plan.name === "Free") {
                      navigate("/notes");
                    }
                  }}
                  className={`
                    w-full rounded-xl px-4 py-3
                    text-sm font-semibold
                    transition-all
                    ${
                      plan.popular
                        ? "bg-indigo-600 text-white shadow-md hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    }
                  `}
                >
                  {plan.button}
                </button>

              </div>


              {/* Features */}
              <div className="border-t border-slate-100 px-7 py-6">

                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  What's included
                </p>

                <ul className="space-y-3">

                  {plan.features.map((feature) => (

                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >

                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-600">
                        ✓
                      </span>

                      <span>
                        {feature}
                      </span>

                    </li>

                  ))}

                </ul>

              </div>

            </motion.div>

          ))}

        </div>

      </section>


      {/* ================= CREDIT EXPLANATION ================= */}
      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <div className="mb-10 text-center">

            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              How Credits Work
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Simple and transparent usage
            </p>

          </div>


          <div className="grid gap-5 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                📝
              </div>

              <h3 className="font-bold text-slate-800">
                Generate Notes
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use credits to generate AI-powered notes for any topic.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl">
                ⚡
              </div>

              <h3 className="font-bold text-slate-800">
                Quick Revision
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create concise revision material for last-minute preparation.
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                📊
              </div>

              <h3 className="font-bold text-slate-800">
                Visual Learning
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Generate diagrams and charts to make difficult concepts easier.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-12 text-center shadow-xl sm:px-12"
        >

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to study smarter?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Generate personalized notes and prepare for your exams
            with the help of AI.
          </p>

          <button
            onClick={() => navigate("/notes")}
            className="mt-7 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start Generating Notes →
          </button>

        </motion.div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white py-8">

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ExamNotes AI. Study smarter, not harder.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Pricing;
