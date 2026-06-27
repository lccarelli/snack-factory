export type IconName = "cookie" | "chip" | "byte" | "dispenser" | "prompt";

export function Icon({
  name,
  className = "card-icon",
}: {
  name: IconName;
  className?: string;
}) {
  switch (name) {
    case "cookie":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M 5,2 H 16 L 16,5 H 19 L 19,8 H 22 V 19 C 22,20.6 20.6,22 19,22 H 5 C 3.4,22 2,20.6 2,19 V 5 C 2,3.4 3.4,2 5,2 Z"
          />
          <rect x="6" y="6" width="2" height="2" fill="var(--surface)" />
          <rect x="12" y="12" width="2" height="2" fill="var(--surface)" />
          <rect x="6" y="14" width="2" height="2" fill="var(--surface)" />
        </svg>
      );
    case "chip":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            fill="currentColor"
            d="M 3,6 H 5 V 8 H 7 V 10 H 17 V 8 H 19 V 6 H 21 V 10 H 19 V 12 H 17 V 14 H 7 V 12 H 5 V 10 H 3 Z"
          />
          <path fill="currentColor" opacity="0.5" d="M 7,16 H 17 V 18 H 7 Z" />
        </svg>
      );
    case "byte":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <g fill="currentColor">
            <rect x="3" y="4" width="4" height="4" />
            <rect x="7" y="8" width="4" height="4" />
            <rect x="11" y="12" width="4" height="4" />
            <rect x="15" y="8" width="4" height="4" />
            <rect x="19" y="4" width="4" height="4" />
          </g>
        </svg>
      );
    case "dispenser":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden="true"
        >
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <line x1="4" y1="14" x2="20" y2="14" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <rect x="8" y="9" width="3" height="3" />
          <rect x="13" y="9" width="3" height="3" />
          <rect x="7" y="17" width="10" height="3" fill="currentColor" />
        </svg>
      );
    case "prompt":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden="true"
        >
          <polyline points="4 6 10 12 4 18" />
          <line x1="12" y1="18" x2="20" y2="18" strokeWidth="3" />
        </svg>
      );
  }
}
