import {
  Clock3,
  Footprints,
  MapPinned
} from "lucide-react";

import {
  useLanguage
} from "../context/LanguageContext";

export default function RouteCard({
  route,
  onContinue
}) {
  const { strings } = useLanguage();

  if (!route) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm pop">

      <div className="flex items-center gap-3 mb-4">

        <div className="w-11 h-11 rounded-xl bg-indigo-50 text-brand flex items-center justify-center">
          <MapPinned size={21} />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            {strings.route}
          </p>

          <h3 className="font-extrabold">
            {route.destination_name}
          </h3>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">

        <div className="rounded-2xl bg-slate-50 p-3">

          <div className="text-slate-500 text-xs flex gap-1">
            <Footprints size={14} />
            {strings.distance}
          </div>

          <b>
            {route.distance_m} m
          </b>

        </div>

        <div className="rounded-2xl bg-slate-50 p-3">

          <div className="text-slate-500 text-xs flex gap-1">
            <Clock3 size={14} />
            {strings.estimatedTime}
          </div>

          <b>
            {route.walking_minutes} min
          </b>

        </div>

      </div>

      <button
        onClick={onContinue}
        className="w-full rounded-xl bg-brand text-white py-3 font-bold"
      >
        {strings.continueRoute}
      </button>

    </div>
  );
}