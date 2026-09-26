import {
  ArrowRight,
  MapPinned,
  Sparkles
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function WelcomeScreen({
  onStart
}) {
  const { strings } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">

      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-25" />

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative min-h-screen max-w-6xl mx-auto px-6 py-10 flex flex-col justify-between">

        <div className="flex items-center gap-3 font-bold">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
            <MapPinned size={22} />
          </div>

          Navigo
        </div>

        <div className="max-w-4xl py-16">

          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-200 mb-6">
            <Sparkles size={15} />
            RCE Eluru campus navigation assistant
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[.98] mb-6">
            Ramachandra College of Engineering
          </h1>

          <p className="text-2xl font-semibold text-cyan-200 mb-3">
            Eluru, Andhra Pradesh
          </p>

          <p className="text-xl text-slate-300 max-w-2xl mb-10">
            Find classrooms, labs, libraries, blocks, and route guidance with an AI-powered campus experience built for students, visitors, and faculty.
          </p>

          <div className="mb-10 grid gap-4 sm:grid-cols-3 max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">24/7</div>
              <div className="text-sm text-slate-300">Campus help</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">AI</div>
              <div className="text-sm text-slate-300">Route guidance</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">RCE</div>
              <div className="text-sm text-slate-300">Eluru campus</div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 bg-white text-slate-950 px-7 py-4 rounded-2xl font-extrabold hover:gap-5 transition-all"
          >
            {strings.getStarted}
            <ArrowRight size={20} />
          </button>

        </div>

        <div className="text-sm text-slate-300">
          Campus demo map with RCE branding for a student-friendly experience.
        </div>

      </div>
    </div>
  );
}