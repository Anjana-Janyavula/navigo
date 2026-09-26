import {
  ArrowLeft,
  GraduationCap,
  Users,
  UserRound
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function RoleSelector({
  onSelect,
  onBack
}) {
  const { strings } = useLanguage();

  const roles = [
    [
      "student",
      strings.student,
      GraduationCap,
      "Start with a student profile"
    ],
    [
      "visitor",
      strings.visitor,
      UserRound,
      "Find places around campus"
    ],
    [
      "faculty",
      strings.faculty,
      Users,
      "Navigate teaching spaces"
    ]
  ];

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center p-6">

      <div className="max-w-5xl w-full">

        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          {strings.back}
        </button>

        <h2 className="text-4xl font-black mb-2">
          {strings.chooseRole}
        </h2>

        <p className="text-slate-500 mb-8">
          Your role helps Navigo personalize campus answers.
        </p>

        <div className="grid md:grid-cols-3 gap-5">

          {roles.map(
            ([
              id,
              label,
              Icon,
              description
            ]) => (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className="text-left bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-soft hover:-translate-y-1 transition group"
              >

                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-brand flex items-center justify-center mb-8 group-hover:scale-110 transition">
                  <Icon />
                </div>

                <div className="text-2xl font-extrabold mb-2">
                  {label}
                </div>

                <div className="text-slate-500">
                  {description}
                </div>

              </button>
            )
          )}

        </div>
      </div>
    </div>
  );
}