import {
  Globe2,
  Sparkles
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector({
  onSelect
}) {
  const { strings } = useLanguage();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,#dfe1ff,transparent_35%),radial-gradient(circle_at_80%_80%,#d9f8ff,transparent_35%),#f5f7fb] flex items-center justify-center p-6">

      <div className="glass shadow-soft rounded-[32px] max-w-xl w-full p-8 md:p-12 text-center pop">

        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg">
          <Globe2 className="text-brand" size={30} />
        </div>

        <div className="flex justify-center items-center gap-2 text-sm font-semibold text-brand mb-3">
          <Sparkles size={16} />
          AI CAMPUS NAVIGATION
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
          {strings.welcome}
        </h1>

        <p className="text-slate-500 text-lg mb-8">
          {strings.chooseLanguage}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">

          <button
            onClick={() => onSelect("en")}
            className="rounded-2xl p-5 bg-slate-900 text-white font-bold hover:-translate-y-1 transition"
          >
            {strings.english}
          </button>

          <button
            onClick={() => onSelect("te")}
            className="rounded-2xl p-5 bg-white border border-slate-200 font-bold hover:-translate-y-1 transition"
          >
            {strings.telugu}
          </button>

        </div>
      </div>
    </div>
  );
}