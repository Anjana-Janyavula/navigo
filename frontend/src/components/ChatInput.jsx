import {
  ArrowUp
} from "lucide-react";

import { useState } from "react";

import {
  useLanguage
} from "../context/LanguageContext";

export default function ChatInput({
  onSend,
  disabled
}) {
  const { strings } = useLanguage();

  const [value, setValue] =
    useState("");

  const submit = (event) => {
    event.preventDefault();

    if (
      value.trim() &&
      !disabled
    ) {
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-lg"
    >

      <input
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        disabled={disabled}
        placeholder={strings.placeholder}
        className="flex-1 bg-transparent outline-none px-3 py-3"
      />

      <button
        disabled={
          disabled ||
          !value.trim()
        }
        className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center disabled:opacity-40"
      >
        <ArrowUp size={20} />
      </button>

    </form>
  );
}