import { useState } from "react";
import { Calendar } from "lucide-react";
import { T } from "../constants/theme";

export function CustomDateRangeExtra({ onApply, close }) {
  const [show, setShow] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  if (!show) {
    return (
      <button
        type="button"
        onClick={() => setShow(true)}
        className="w-full flex items-center gap-2 text-left px-4 py-3 text-[17px] font-bold hover:bg-gray-50 transition-colors"
        style={{ color: T.teal }}
      >
        <Calendar size={17} />
        Custom Range
      </button>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-3 w-[26rem]">
      <div className="flex gap-4">
        <label className="flex-1 min-w-0 text-[16px] text-gray-700 font-semibold">
          From
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2.5 text-[15px] outline-none"
            style={{ borderColor: T.border, color: T.text }}
          />
        </label>
        <label className="flex-1 min-w-0 text-[16px] text-gray-700 font-semibold">
          To
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2.5 text-[15px] outline-none"
            style={{ borderColor: T.border, color: T.text }}
          />
        </label>
      </div>
      <div className="flex gap-3 mt-1">
        <button
          type="button"
          onClick={() => setShow(false)}
          className="flex-1 rounded-md border px-3 py-2.5 text-[16px] font-bold hover:bg-gray-50"
          style={{ borderColor: T.border, color: T.text }}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!start || !end}
          onClick={() => {
            onApply(`${start} \u2192 ${end}`);
            setShow(false);
            close();
          }}
          className="flex-1 rounded-md px-3 py-2.5 text-[16px] font-bold text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
          style={{ background: T.teal }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}