import { useEffect } from "react";
import { X } from "lucide-react";
import { T } from "../constants/theme";

export function ExpandedCardModal({ card, onClose }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!card) return null;
  const Icon = card.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 30, 0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden"
        style={{ borderColor: T.border }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b shrink-0"
          style={{ borderColor: T.border }}
        >
          <div
            className="flex items-center gap-2 text-[16px] font-bold"
            style={{ color: T.text }}
          >
            {Icon && <Icon size={16} style={{ color: T.teal }} />}
            {card.title}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded p-1 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 min-h-0 flex flex-col" style={{ minHeight: 480 }}>
          {card.content}
        </div>
      </div>
    </div>
  );
}