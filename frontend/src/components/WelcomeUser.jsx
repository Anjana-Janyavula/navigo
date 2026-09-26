import { useEffect } from "react";
import { Sparkles } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function WelcomeUser({
  name,
  onDone
}) {
  const { strings } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(
      onDone,
      1600
    );

    return () =>
      clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

      <div className="text-center pop">

        <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center">
          <Sparkles
            className="text-cyan-300"
            size={34}
          />
        </div>

        <p className="text-slate-400 mb-2">
          {strings.welcomeUser}
        </p>

        <h1 className="text-4xl md:text-6xl font-black">
          Welcome to Navigo, {name}!
        </h1>

      </div>
    </div>
  );
}