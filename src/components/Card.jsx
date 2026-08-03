import { Maximize2 } from "lucide-react";
import { T } from "../constants/theme";

export function Card({ title, icon: Icon, expandable, children, className = "", onExpand, expandedContent, centerTitle = false, titleFontSize }) {
  return (
    <div
      className={`bg-white rounded-xl border-[1.5px] shadow-[0_1px_4px_rgba(18,121,125,0.1)] p-4 flex flex-col h-full ${className}`}
      style={{ borderColor: T.cardBorder }}
    >
      {title && (
        <div
          className={
            centerTitle
              ? "grid grid-cols-[1fr_auto_1fr] items-center mb-4 shrink-0"
              : "flex items-center justify-between mb-4 shrink-0"
          }
        >
          {centerTitle && <span />}
          <div
            className={`flex items-center gap-2 font-bold ${
              centerTitle ? "justify-center text-center text-[17px]" : "text-[17px]"
            }`}
            style={{ color: T.text, ...(titleFontSize ? { fontSize: titleFontSize } : {}) }}
          >
            {Icon && <Icon size={14} style={{ color: T.teal }} />}
            {title}
          </div>
          {expandable ? (
            <button
              type="button"
              aria-label={`Expand ${title}`}
              onClick={() =>
                onExpand &&
                onExpand({ title, icon: Icon, content: expandedContent || children })
              }
              className={`text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded p-0.5 -m-0.5 transition-colors cursor-pointer ${
                centerTitle ? "justify-self-end" : ""
              }`}
            >
              <Maximize2 size={12} />
            </button>
          ) : (
            centerTitle && <span />
          )}
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
}