"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const MESSAGES: Record<string, string> = {
  es: "snack servido — encontraste el menú secreto",
  en: "snack served — you found the secret menu",
};

export function SnackToast() {
  const locale = useLocale();
  const [shown, setShown] = useState(false);
  const posRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      posRef.current =
        key === SEQUENCE[posRef.current]
          ? posRef.current + 1
          : key === SEQUENCE[0]
            ? 1
            : 0;
      if (posRef.current === SEQUENCE.length) {
        posRef.current = 0;
        setShown(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setShown(false), 3200);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`snack-toast${shown ? " show" : ""}`} role="status" aria-live="polite">
      <span className="snack-toast-mark" aria-hidden="true">
        🍪
      </span>
      <span>{MESSAGES[locale] ?? MESSAGES.en}</span>
    </div>
  );
}
