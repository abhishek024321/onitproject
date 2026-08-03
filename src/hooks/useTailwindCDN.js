import { useEffect } from "react";

export function useTailwindCDN() {
  useEffect(() => {
    if (document.getElementById("tailwind-cdn-script")) return;
    const script = document.createElement("script");
    script.id = "tailwind-cdn-script";
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }, []);
}