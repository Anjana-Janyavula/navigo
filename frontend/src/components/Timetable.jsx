import {
  useLanguage
} from "../context/LanguageContext";

export default function Timetable({
  items = []
}) {
  const { strings } =
    useLanguage();

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead>
          <tr className="text-left border-b">

            <th className="p-3">
              {strings.day}
            </th>

            <th className="p-3">
              {strings.period}
            </th>

            <th className="p-3">
              {strings.subject}
            </th>

            <th className="p-3">
              {strings.room}
            </th>

          </tr>
        </thead>

        <tbody>

          {items.map(
            (item, index) => (
              <tr
                key={index}
                className="border-b last:border-0"
              >

                <td className="p-3 font-bold">
                  {item.day}
                </td>

                <td className="p-3">
                  {item.period}
                </td>

                <td className="p-3">
                  {item.subject}
                </td>

                <td className="p-3">
                  {item.room}
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}