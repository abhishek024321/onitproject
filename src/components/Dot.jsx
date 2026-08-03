import { T } from "../constants/theme";

export function Dot({ color, label, value }) {
  return (
    <div className="flex items-center gap-1.5 text-[17px] whitespace-nowrap">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: color }}
      />
      <span className="text-gray-700 truncate">{label}</span>
      {value !== undefined && (
        <span className="font-bold" style={{ color: T.text }}>
          {value}
        </span>
      )}
    </div>
  );
}