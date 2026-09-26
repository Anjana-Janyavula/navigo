import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function VisitorForm({
  onSubmit,
  onBack
}) {
  const { strings } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !/^[0-9]{10}$/.test(form.phone)
    ) {
      setError(
        !/^[0-9]{10}$/.test(form.phone)
          ? strings.invalidPhone
          : strings.required
      );

      return;
    }

    onSubmit({
      ...form,
      role: "visitor"
    });
  };

  return (
    <Shell
      title={strings.visitor}
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
            setForm({
              ...form,
              name: value
            })
          }
        />

        <Field
          label={strings.phone}
          value={form.phone}
          onChange={(value) =>
            setForm({
              ...form,
              phone: value
                .replace(/\D/g, "")
                .slice(0, 10)
            })
          }
        />

        {error && (
          <p className="text-red-600 text-sm">
            {error}
          </p>
        )}

        <button className="w-full bg-slate-950 text-white rounded-xl p-3.5 font-bold">
          {strings.continue}
        </button>

      </form>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange
}) {
  return (
    <label className="block text-sm font-semibold">

      {label}

      <input
        required
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border p-3"
      />

    </label>
  );
}

function Shell({
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

        <div className="bg-white rounded-3xl p-7 shadow-soft">

          <h2 className="text-3xl font-black mb-6">
            {title}
          </h2>

          {children}

        </div>

      </div>
    </div>
  );
}