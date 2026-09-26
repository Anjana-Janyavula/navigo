import {
  Map,
  X
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import {
  useLanguage
} from "../context/LanguageContext";

import {
  getTimetable
} from "../services/api";

import Timetable from "./Timetable";

export default function NavigationPanel({
  open,
  onClose
}) {
  const { strings } =
    useLanguage();

  const [tab, setTab] =
    useState("map");

  const [data, setData] =
    useState([]);

  useEffect(() => {
    if (
      open &&
      tab === "timetable"
    ) {
      getTimetable()
        .then((response) =>
          setData(response.items || [])
        )
        .catch(() => {});
    }
  }, [open, tab]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/30 backdrop-blur-sm flex justify-end">

      <div className="w-full max-w-xl bg-white h-full p-5 overflow-auto pop">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-black">
            Navigo
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100"
          >
            <X size={19} />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-5">

          <button
            onClick={() => setTab("map")}
            className={`p-3 rounded-lg font-bold ${
              tab === "map"
                ? "bg-white shadow-sm"
                : ""
            }`}
          >
            {strings.map}
          </button>

          <button
            onClick={() =>
              setTab("timetable")
            }
            className={`p-3 rounded-lg font-bold ${
              tab === "timetable"
                ? "bg-white shadow-sm"
                : ""
            }`}
          >
            {strings.timetable}
          </button>

        </div>

        {tab === "map" ? (
          <div className="rounded-2xl overflow-hidden border">
            <div className="relative h-[360px] overflow-hidden bg-slate-100">
              <svg viewBox="0 0 220 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <rect width="220" height="180" fill="#edf5ff" />
                <g fill="none" stroke="#b8cfe0" strokeWidth="1.6">
                  <path d="M 10 38 H 210 M 10 90 H 210 M 10 142 H 210 M 55 8 V 170 M 110 8 V 170 M 165 8 V 170" />
                  <path d="M 0 90 C 40 80, 68 62, 96 70 S 150 78, 220 90" stroke="#9bbad4" strokeWidth="2.5" />
                </g>
                <g fill="#dfeaf5" stroke="#8fb1d8" strokeWidth="1.6">
                  <rect x="18" y="25" width="30" height="24" rx="3" />
                  <rect x="66" y="22" width="34" height="26" rx="3" />
                  <rect x="112" y="22" width="34" height="26" rx="3" />
                  <rect x="156" y="22" width="26" height="22" rx="3" />
                  <rect x="18" y="100" width="32" height="22" rx="3" />
                  <rect x="64" y="98" width="38" height="28" rx="3" />
                  <rect x="114" y="100" width="32" height="22" rx="3" />
                  <rect x="156" y="100" width="26" height="22" rx="3" />
                </g>
                <g fill="#56718d" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif">
                  <text x="25" y="40">Gate</text>
                  <text x="72" y="38">Lib</text>
                  <text x="117" y="38">Lab</text>
                  <text x="159" y="38">Aud</text>
                  <text x="22" y="115">Store</text>
                  <text x="70" y="116">Hostel</text>
                  <text x="118" y="116">Canteen</text>
                  <text x="159" y="116">Garden</text>
                </g>
                <path d="M 40 90 L 75 86 L 110 96 L 160 92" fill="none" stroke="#5B5BF7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 6" />
                <circle cx="40" cy="90" r="5" fill="#0f172a" />
                <circle cx="160" cy="92" r="6" fill="#fff" stroke="#5B5BF7" strokeWidth="2" />
              </svg>
            </div>

            <div className="p-4 text-sm text-slate-500 flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <Map size={16} />
                Blueprint map for RCE campus navigation.
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Eluru
              </span>
            </div>

          </div>
        ) : (
          <Timetable items={data} />
        )}

      </div>
    </div>
  );
}