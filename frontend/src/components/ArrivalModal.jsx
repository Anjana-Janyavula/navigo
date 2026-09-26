import {
  useLanguage
} from "../context/LanguageContext";

export default function ArrivalModal({
  destination,
  onDone
}) {
  const { strings } =
    useLanguage();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-5">

      <div className="bg-white rounded-[32px] p-8 max-w-md w-full text-center shadow-soft pop">

        <div className="text-5xl mb-4">
          🎉
        </div>

        <h2 className="text-3xl font-black mb-2">
          {strings.reached}
        </h2>

        <p className="text-slate-500 mb-6">
          {destination}
        </p>

        <div className="flex justify-center gap-2 mb-7">

          {[1, 2, 3, 4, 5].map(
            (item) => (
              <span
                key={item}
                className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                style={{
                  animationDelay:
                    `${item * 80}ms`
                }}
              />
            )
          )}

        </div>

        <button
          onClick={onDone}
          className="w-full rounded-xl bg-slate-950 text-white py-3 font-bold"
        >
          {strings.done}
        </button>

      </div>
    </div>
  );
}