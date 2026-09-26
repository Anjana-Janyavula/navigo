export default function MessageBubble({
  message
}) {
  return (
    <div
      className={`flex ${
        message.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          message.role === "user"
            ? "bg-slate-950 text-white rounded-br-md"
            : "bg-white border border-slate-200 rounded-bl-md shadow-sm"
        }`}
      >
        {message.content}
      </div>

    </div>
  );
}