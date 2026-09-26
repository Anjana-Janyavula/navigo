import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

export default function FacultyForm({
  onSubmit,
  onBack
}) {
  const { strings } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    faculty_id: ""
  });

  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.faculty_id.trim() ||
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
      role: "faculty"
    });
  };

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
            {strings.faculty}
          </h2>

          <form
            onSubmit={submit}
            className="space-y-4"
          >

            {[
              "name",
              "phone",
              "faculty_id"
            ].map((key) => (
              <label
                key={key}
                className="block text-sm font-semibold"
              >

                {strings[key]}

                <input
                  required
                  value={form[key]}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [key]:
                        key === "phone"
                          ? event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10)
                          : event.target.value
                    })
                  }
                  className="mt-2 w-full rounded-xl border p-3"
                />

              </label>
            ))}

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <button className="w-full bg-slate-950 text-white rounded-xl p-3.5 font-bold">
              {strings.continue}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}