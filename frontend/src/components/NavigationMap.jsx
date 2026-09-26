import {
  useEffect,
  useState
} from "react";

import {
  Navigation,
  Play
} from "lucide-react";

import {
  useLanguage
} from "../context/LanguageContext";

export default function NavigationMap({
  route,
  onArrive
}) {
  const { strings } =
    useLanguage();

  const [progress, setProgress] =
    useState(0);
  const [streetView, setStreetView] =
    useState(false);

  useEffect(() => {
    setProgress(0);

    if (!route) return;

    const id = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(id);
          return 100;
        }

        return current + 2;
      });
    }, 70);

    return () =>
      clearInterval(id);
  }, [route]);

  const points =
    route?.map_points || [];

  const polyline = points
    .map(
      (point) =>
        `${point.x},${point.y}`
    )
    .join(" ");

  const active =
    points.length
      ? points[
          Math.min(
            points.length - 1,
            Math.floor(
              (progress / 100) *
                (points.length - 1)
            )
          )
        ]
      : null;

  const startPoint = points[0];
  const endPoint = points[points.length - 1];

  return (
    <div className="bg-white rounded-3xl border overflow-hidden shadow-soft">

      <div className="p-4 flex justify-between items-center gap-3">

        <div>
          <div className="text-xs text-slate-500">
            {strings.route}
          </div>

          <b>
            {route?.destination_name}
          </b>
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-1">
            RAMACHANDRA COLLEGE OF ENGINEERING • ELURU
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setStreetView(false)
            }
            className={`px-2.5 py-1.5 text-xs rounded-full border ${
              !streetView
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            Map
          </button>

          <button
            onClick={() =>
              setStreetView(true)
            }
            className={`px-2.5 py-1.5 text-xs rounded-full border ${
              streetView
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            Street View
          </button>

          <div className="flex items-center gap-2 text-sm text-brand">
            <Play size={15} />
            {progress}%
          </div>
        </div>

      </div>

      <div className="relative aspect-[16/10] bg-slate-50">
        {!streetView ? (
          <>
            <svg
              viewBox="0 0 200 170"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <rect width="200" height="170" fill="#edf5ff" />

              <g fill="none" stroke="#b8cfe0" strokeWidth="1.6">
                <path d="M 10 38 H 190 M 10 86 H 190 M 10 134 H 190 M 50 8 V 162 M 100 8 V 162 M 150 8 V 162" />
                <path d="M 0 86 C 40 78, 62 54, 96 64 S 152 78, 200 86" stroke="#9bbad4" strokeWidth="2.5" />
              </g>

              <g fill="#dfeaf5" stroke="#8fb1d8" strokeWidth="1.6">
                <rect x="18" y="20" width="30" height="28" rx="3" />
                <rect x="66" y="20" width="36" height="26" rx="3" />
                <rect x="112" y="20" width="34" height="26" rx="3" />
                <rect x="156" y="20" width="24" height="22" rx="3" />
                <rect x="18" y="98" width="32" height="24" rx="3" />
                <rect x="65" y="96" width="38" height="28" rx="3" />
                <rect x="114" y="98" width="32" height="24" rx="3" />
                <rect x="155" y="98" width="26" height="24" rx="3" />
              </g>

              <g fill="#56718d" fontSize="7" fontWeight="700" fontFamily="Arial, sans-serif">
                <text x="25" y="36">Gate</text>
                <text x="73" y="36">Lib</text>
                <text x="118" y="36">Lab</text>
                <text x="159" y="36">Aud</text>
                <text x="22" y="114">Store</text>
                <text x="72" y="113">Hostel</text>
                <text x="118" y="114">Canteen</text>
                <text x="159" y="114">Garden</text>
              </g>

              <polyline
                points={polyline}
                fill="none"
                stroke="#5B5BF7"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity=".18"
              />

              <polyline
                points={polyline}
                fill="none"
                stroke="#5B5BF7"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="10 6"
              />

              {startPoint && (
                <g>
                  <circle cx={startPoint.x} cy={startPoint.y} r="6" fill="#0f172a" />
                  <circle cx={startPoint.x} cy={startPoint.y} r="10" fill="rgba(15,23,42,0.12)" />
                </g>
              )}

              {endPoint && (
                <g>
                  <circle cx={endPoint.x} cy={endPoint.y} r="7" fill="#fff" stroke="#5B5BF7" strokeWidth="2" />
                </g>
              )}

              {active && (
                <g>
                  <circle
                    cx={active.x}
                    cy={active.y}
                    r="15"
                    fill="#fff"
                  />

                  <circle
                    cx={active.x}
                    cy={active.y}
                    r="10"
                    fill="#111827"
                    className="route-pulse"
                  />

                  <Navigation
                    x={active.x - 8}
                    y={active.y - 8}
                    size={16}
                    color="white"
                  />
                </g>
              )}
            </svg>
          </>
        ) : (
          <div className="street-view-panel absolute inset-0">
            <div className="street-view-sky" />
            <div className="street-view-building left-building" />
            <div className="street-view-building right-building" />
            <div className="street-view-road" />
            <div className="street-view-lane" />
            <div className="street-view-sign">RCE College</div>

            <svg
              viewBox="0 0 800 360"
              className="absolute inset-0 w-full h-full"
            >
              <polyline
                points={polyline || "100,260 300,240 520,250 700,220"}
                fill="none"
                stroke="#f97316"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
              />

              {active && (
                <g>
                  <circle
                    cx={active.x}
                    cy={active.y}
                    r="18"
                    fill="#f8fafc"
                    opacity="0.9"
                  />
                  <circle
                    cx={active.x}
                    cy={active.y}
                    r="10"
                    fill="#0f172a"
                  />
                </g>
              )}
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">

        <div className="text-sm font-bold mb-2">
          {strings.steps}
        </div>

        <ol className="space-y-2 text-sm text-slate-600">

          {route.steps.map(
            (step, index) => (
              <li
                key={index}
                className="flex gap-2"
              >

                <span className="w-6 h-6 rounded-full bg-indigo-50 text-brand text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </span>

                {step}

              </li>
            )
          )}

        </ol>

        <button
          onClick={onArrive}
          className="mt-4 w-full rounded-xl bg-slate-950 text-white py-3 font-bold"
        >
          Reached
        </button>

      </div>

    </div>
  );
}