import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function StudentForm({
  mode,
  onSubmit,
  onBack
}) {
  const { strings } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    branch: "CSE",
    roll_number: "",
    year: "1"
  });

  const [error, setError] = useState("");

  const set = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !/^\d{10}$/.test(form.phone) ||
      !form.branch ||
      (
        mode === "regular" &&
        (!form.roll_number || !form.year)
      )
    ) {
      setError(
        !/^\d{10}$/.test(form.phone)
          ? strings.invalidPhone
          : strings.required
      );

      return;
    }

    onSubmit({
      ...form,
      role: "student",
      student_type: mode
    });
  };

  return (
    <FormShell
      title={
        mode === "fresher"
          ? strings.fresher
          : strings.regularStudent
      }
      onBack={onBack}
    >
      <form
        onSubmit={submit}
        className="space-y-4"
      >

        <Field
          label={strings.name}
          value={form.name}
          onChange={(value) =>
            set("name", value)
          }
        />

        <Field
          label={strings.phone}
          value={form.phone}
          inputMode="numeric"
          onChange={(value) =>
            set(
              "phone",
              value.replace(/\D/g, "").slice(0, 10)
            )
          }
        />

        <label className="block text-sm font-semibold">

          {strings.branch}

          <select
            value={form.branch}
            onChange={(event) =>
              set("branch", event.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3 bg-white"
          >
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>

        </label>

        {mode === "regular" && (
          <>
            <Field
              label={strings.rollNumber}
              value={form.roll_number}
              onChange={(value) =>
                set("roll_number", value)
              }
            />

            <label className="block text-sm font-semibold">

              {strings.year}

              <select
                value={form.year}
                onChange={(event) =>
                  set("year", event.target.value)
                }
                className="mt-2 w-full rounded-xl border p-3 bg-white"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>

            </label>
          </>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button className="w-full bg-slate-950 text-white rounded-xl p-3.5 font-bold">
          {strings.continue}
        </button>

      </form>
    </FormShell>
  );
}

function Field({
  label,
  value,
  onChange,
  inputMode
}) {
  return (
    <label className="block text-sm font-semibold">

      {label}

      <input
        required
        value={value}
        inputMode={inputMode}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-200"
      />

    </label>
  );
}

function FormShell({
  title,
  onBack,
  children
}) {
  const { strings } = useLanguage();

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center p-6">

      <div className="w-full max-w-lg">

        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-2 text-slate-500"
        >
          <ArrowLeft size={18} />
          {strings.back}
        </button>

        <div className="bg-white rounded-3xl p-7 shadow-soft border border-slate-100">

          <h2 className="text-3xl font-black mb-6">
            {title}
          </h2>

          {children}

        </div>

      </div>
    </div>
  );
}