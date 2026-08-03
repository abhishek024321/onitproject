import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { T } from "../constants/theme";

export function Select({ icon: Icon, name, label, value, options, onChange, extra }) {
  const [open, setOpen] = useState(false);
  const [justPicked, setJustPicked] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pick = (opt) => {
    setJustPicked(opt);
    onChange(name, opt);
    setTimeout(() => {
      setOpen(false);
      setJustPicked(null);
    }, 220);
  };

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-3 rounded-full border text-[19px] cursor-pointer transition-shadow duration-200 whitespace-nowrap ${
          open ? "shadow-md" : ""
        }`}
        style={{
          borderColor: open ? T.teal : "transparent",
          background: T.tealTint,
          paddingLeft: 40,
          paddingRight: 36,
          paddingTop: 22,
          paddingBottom: 22,
          minWidth: 220,
        }}
      >
        {Icon && <Icon size={26} strokeWidth={2.25} style={{ color: T.teal }} className="shrink-0" />}
        {label && (
          <span className="text-gray-700 shrink-0 whitespace-nowrap">
            {label}:
          </span>
        )}
        <span className="font-bold whitespace-nowrap" style={{ color: T.text }}>
          {value}
        </span>
        <ChevronDown
          size={22}
          className={`text-gray-600 shrink-0 transition-transform duration-200 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 top-full mt-1.5 min-w-full bg-white rounded-lg border shadow-lg z-20 overflow-hidden origin-top transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 -translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 -translate-y-2 pointer-events-none"
        }`}
        style={{ borderColor: T.border, transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {options.map((opt, i) => {
          const selected = opt === value;
          const picked = justPicked === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => pick(opt)}
              className="w-full flex items-center justify-between gap-3 text-left px-4 py-3 text-[17px] font-bold whitespace-nowrap transition-all duration-150"
              style={{
                color: selected || picked ? T.teal : T.text,
                background: picked ? `${T.teal}15` : "transparent",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(-4px)",
                transitionDelay: open ? `${i * 30}ms` : "0ms",
              }}
              onMouseEnter={(e) => {
                if (!picked) e.currentTarget.style.background = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                if (!picked) e.currentTarget.style.background = "transparent";
              }}
            >
              {opt}
              <Check
                size={18}
                className={`shrink-0 transition-all duration-200 ${
                  selected || picked ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ color: T.teal }}
              />
            </button>
          );
        })}
        {extra && (
          <div
            className="border-t transition-all duration-200"
            style={{
              borderColor: T.border,
              opacity: open ? 1 : 0,
              transitionDelay: open ? `${options.length * 30}ms` : "0ms",
            }}
          >
            {typeof extra === "function" ? extra(() => setOpen(false)) : extra}
          </div>
        )}
      </div>
    </div>
  );
}