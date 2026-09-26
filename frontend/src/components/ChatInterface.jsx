import {
  useState
} from "react";

import {
  Accessibility,
  AlertTriangle,
  Flame,
  HeartPulse,
  MapPinned,
  Menu,
  Phone,
  Shield,
  Sparkles,
  UserCircle2
} from "lucide-react";

import {
  useLanguage
} from "../context/LanguageContext";

import {
  useUser
} from "../context/UserContext";

import {
  sendChat
} from "../services/api";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import RouteCard from "./RouteCard";
import NavigationMap from "./NavigationMap";
import NavigationPanel from "./NavigationPanel";
import ArrivalModal from "./ArrivalModal";

const preferenceOptions = [
  {
    key: "normal",
    label: "🚶 Normal",
    info: "Standard walking route"
  },
  {
    key: "wheelchair",
    label: "♿ Wheelchair accessible",
    info: "Ramp-friendly route"
  },
  {
    key: "easy",
    label: "👵 Easy walking",
    info: "Low effort route"
  },
  {
    key: "covered",
    label: "🌧️ Covered route",
    info: "Sheltered path"
  },
  {
    key: "lit",
    label: "🌙 Well-lit route",
    info: "Bright and visible path"
  }
];

const emergencyOptions = [
  {
    key: "medical",
    label: "🏥 Medical Help",
    icon: HeartPulse,
    reply: "The nearest medical facility is 180m away. Navigate to Medical Room.",
    route: {
      destination_name: "Medical Room",
      distance_m: 180,
      walking_minutes: 2,
      steps: [
        "Walk from Main Gate toward Admin Block.",
        "Follow the marked emergency path to the Medical Room.",
        "Use the accessible corridor for the final approach."
      ],
      map_points: [
        { x: 8, y: 20 },
        { x: 24, y: 28 },
        { x: 42, y: 38 },
        { x: 68, y: 58 },
        { x: 90, y: 70 }
      ]
    }
  },
  {
    key: "fire",
    label: "🔥 Fire Emergency",
    icon: Flame,
    reply: "Move to the nearest assembly point and alert campus safety staff immediately.",
    route: {
      destination_name: "Fire Assembly Point",
      distance_m: 150,
      walking_minutes: 2,
      steps: [
        "Exit the current area calmly.",
        "Walk toward the marked fire assembly point.",
        "Stay away from stairs and keep to the clear emergency route."
      ],
      map_points: [
        { x: 8, y: 20 },
        { x: 30, y: 28 },
        { x: 62, y: 48 },
        { x: 88, y: 70 }
      ]
    }
  },
  {
    key: "security",
    label: "🛡️ Security",
    icon: Shield,
    reply: "Campus security is 110m away. A staff escort is being guided to your location.",
    route: {
      destination_name: "Security Desk",
      distance_m: 110,
      walking_minutes: 2,
      steps: [
        "Walk toward the nearest marked security route.",
        "Follow the main path toward the Security Desk.",
        "Stay visible and keep to the open corridor."
      ],
      map_points: [
        { x: 8, y: 20 },
        { x: 20, y: 34 },
        { x: 34, y: 48 },
        { x: 60, y: 62 }
      ]
    }
  },
  {
    key: "help",
    label: "📞 Contact Campus Help",
    icon: Phone,
    reply: "Campus help has been contacted. Share your location and await assistance.",
    route: null
  },
  {
    key: "location",
    label: "📍 Share My Location",
    icon: MapPinned,
    reply: "Your location has been shared with campus safety. They know you are near the current landmark.",
    route: null
  },
  {
    key: "lost",
    label: "🧭 I’m lost",
    icon: AlertTriangle,
    reply: "Are you near the Main Gate, Hostel, Canteen, or Academic Block? I can guide you from there.",
    route: null
  }
];

function applyPreference(route, prefKey) {
  if (!route) return null;

  const baseSteps = route.steps || [
    "Walk toward the destination.",
    "Follow the highlighted path."
  ];

  if (prefKey === "normal") {
    return {
      ...route,
      steps: baseSteps,
      preference_label: "Normal"
    };
  }

  if (prefKey === "wheelchair") {
    return {
      ...route,
      preference_label: "Wheelchair accessible",
      steps: [
        ...baseSteps.slice(0, 1),
        "Use the accessible ramp and keep to the barrier-free path.",
        "Avoiding stairs."
      ]
    };
  }

  if (prefKey === "easy") {
    return {
      ...route,
      preference_label: "Easy walking",
      steps: [
        ...baseSteps.slice(0, 1),
        "Choose the shortest gentle route with the fewest slopes and turns.",
        "Take the smoother walking path for comfort."
      ]
    };
  }

  if (prefKey === "covered") {
    return {
      ...route,
      preference_label: "Covered route",
      steps: [
        ...baseSteps.slice(0, 1),
        "Follow the sheltered corridor and covered walkway to stay protected from rain.",
        "Continue along the covered path to the destination."
      ]
    };
  }

  return {
    ...route,
    preference_label: "Well-lit route",
    steps: [
      ...baseSteps.slice(0, 1),
      "Take the brighter corridor with the best visibility and clear campus lighting.",
      "The route is selected to keep the path well-lit."
    ]
  };
}

function buildPreferenceReply(reply, route, prefKey) {
  const name = route?.destination_name || "destination";

  if (prefKey === "wheelchair") {
    return `Accessible route found.\n\nMain Gate → ${name}\n\nUse the ramp and avoid stairs.`;
  }

  if (prefKey === "easy") {
    return `Easy walking route found.\n\nMain Gate → ${name}\n\nThis route keeps the walk smoother and more comfortable.`;
  }

  if (prefKey === "covered") {
    return `Covered route found.\n\nMain Gate → ${name}\n\nThis route follows the sheltered path for protection from rain.`;
  }

  if (prefKey === "lit") {
    return `Well-lit route found.\n\nMain Gate → ${name}\n\nThis route stays on the brighter and safer path.`;
  }

  return reply || "Route ready.";
}

function buildEmergencyReply(kind) {
  const match = emergencyOptions.find((item) => item.key === kind);
  return match?.reply || "Campus help is ready to assist.";
}

function buildEmergencyRoute(kind) {
  const match = emergencyOptions.find((item) => item.key === kind);
  if (!match || !match.route) return null;

  return {
    ...match.route,
    map_points: match.route.map_points,
    preference_label: "Emergency route"
  };
}

export default function ChatInterface() {
  const {
    strings,
    language
  } = useLanguage();

  const { user } =
    useUser();

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        content: strings.askAgain
      }
    ]);

  const [loading, setLoading] =
    useState(false);

  const [route, setRoute] =
    useState(null);

  const [mapMode, setMapMode] =
    useState(false);

  const [panel, setPanel] =
    useState(false);

  const [arrived, setArrived] =
    useState(false);

  const [preferencesOpen, setPreferencesOpen] =
    useState(false);

  const [routePreference, setRoutePreference] =
    useState("normal");

  const [emergencyOpen, setEmergencyOpen] =
    useState(false);

  const handleEmergencySelection = (kind) => {
    const reply = buildEmergencyReply(kind);
    const emergencyRoute = buildEmergencyRoute(kind);

    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        content: reply
      }
    ]);

    if (emergencyRoute) {
      setRoute(emergencyRoute);
      setMapMode(false);
    }

    setEmergencyOpen(false);
  };

  const send = async (text) => {
    const normalized = text.toLowerCase();

    if (
      normalized.includes("i feel sick") ||
      normalized.includes("medical") ||
      normalized.includes("fire") ||
      normalized.includes("security") ||
      normalized.includes("lost")
    ) {
      const kind =
        normalized.includes("sick") || normalized.includes("medical")
          ? "medical"
          : normalized.includes("fire")
            ? "fire"
            : normalized.includes("security")
              ? "security"
              : "lost";

      setMessages((messages) => [
        ...messages,
        {
          role: "user",
          content: text
        }
      ]);

      handleEmergencySelection(kind);
      return;
    }

    setMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: text
      }
    ]);

    setLoading(true);

    try {
      const messageText =
        routePreference !== "normal"
          ? `${text} (preferred route: ${preferenceOptions.find((item) => item.key === routePreference)?.label || "Normal"})`
          : text;

      const response =
        await sendChat({
          message: messageText,
          language,
          user_id: user.id,
          user_context: user
        });

      const nextRoute = response.route
        ? applyPreference(response.route, routePreference)
        : null;

      const finalReply = nextRoute
        ? buildPreferenceReply(
            response.reply ||
              strings.noDestination,
            nextRoute,
            routePreference
          )
        : response.reply ||
          strings.noDestination;

      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: finalReply
        }
      ]);

      if (nextRoute) {
        setRoute(nextRoute);
        setMapMode(false);
      }

    } catch {
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: strings.apiError
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mist">

      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">

        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white flex items-center justify-center">
              <Sparkles size={20} />
            </div>

            <div>
              <div className="font-black">
                Navigo
              </div>

              <div className="text-[11px] text-slate-400">
                Campus AI
              </div>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => setEmergencyOpen(true)}
              className="px-3 py-2 text-xs font-bold rounded-xl border border-red-200 bg-red-50 text-red-700"
            >
              🚨 Emergency
            </button>

            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <UserCircle2 size={17} />
              {user?.name}
            </div>

            <button
              onClick={() => setPanel(true)}
              className="p-2.5 rounded-xl bg-slate-100"
            >
              <Menu size={20} />
            </button>

          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">

          <section className="bg-white rounded-[28px] border shadow-sm min-h-[calc(100vh-110px)] flex flex-col">

            <div className="p-6 border-b">

              <div className="flex items-center justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-black">
                    {strings.help}
                  </h1>

                  <p className="text-slate-500 mt-1">
                    {user?.role} ·{" "}
                    {user?.branch ||
                      "Campus visitor"}
                  </p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setPreferencesOpen((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                  >
                    <Accessibility size={16} />
                    ⚙️ Route Preferences
                  </button>

                  {preferencesOpen && (
                    <div className="absolute right-0 top-12 z-20 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                      {preferenceOptions.map((pref) => (
                        <button
                          key={pref.key}
                          onClick={() => {
                            setRoutePreference(pref.key);
                            setPreferencesOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                            routePreference === pref.key
                              ? "bg-indigo-50 text-indigo-700"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{pref.label}</span>
                          <span className="text-[10px] text-slate-400">{pref.info}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="flex-1 p-5 space-y-3 overflow-y-auto max-h-[55vh] no-scrollbar">

              {messages.map(
                (message, index) => (
                  <MessageBubble
                    key={index}
                    message={message}
                  />
                )
              )}

              {loading && (
                <div className="text-sm text-slate-400">
                  {strings.thinking}
                </div>
              )}

            </div>

            <div className="p-4 border-t">

              <ChatInput
                onSend={send}
                disabled={loading}
              />

              <div className="mt-2 text-xs text-slate-400 text-center">
                {strings.demoNotice}
              </div>

            </div>

          </section>

          <section>

            {mapMode && route ? (
              <NavigationMap
                route={route}
                onArrive={() =>
                  setArrived(true)
                }
              />
            ) : route ? (
              <RouteCard
                route={route}
                onContinue={() =>
                  setMapMode(true)
                }
              />
            ) : (
              <div className="h-full min-h-[400px] rounded-[28px] bg-slate-950 text-white p-8 relative overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(91,91,247,.35),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(33,212,253,.18),transparent_30%)]" />

                <div className="relative">

                  <div className="text-sm text-cyan-300 font-bold mb-3">
                    NAVIGO MAP
                  </div>

                  <h2 className="text-4xl font-black mb-4">
                    Ask naturally.
                    <br />
                    <span className="text-slate-400">
                      Navigate confidently.
                    </span>
                  </h2>

                  <p className="text-slate-400 max-w-md">
                    Try “Take me to the library”, “Find an accessible route to the auditorium”, or “I feel sick.”
                  </p>

                </div>

              </div>
            )}

          </section>

        </div>

      </main>

      <NavigationPanel
        open={panel}
        onClose={() =>
          setPanel(false)
        }
      />

      {emergencyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-xl rounded-[28px] border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-red-300">
                  Campus Emergency
                </div>
                <h3 className="mt-2 text-2xl font-black">
                  What do you need?
                </h3>
              </div>
              <button
                onClick={() => setEmergencyOpen(false)}
                className="rounded-full border border-slate-600 px-3 py-1 text-sm text-slate-300"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {emergencyOptions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleEmergencySelection(item.key)}
                    className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/80 p-3 text-left transition hover:border-red-400 hover:bg-slate-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-300">
                      <Icon size={18} />
                    </div>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {arrived && (
        <ArrivalModal
          destination={
            route?.destination_name
          }
          onDone={() => {
            setArrived(false);
            setRoute(null);
            setMapMode(false);
          }}
        />
      )}

    </div>
  );
}