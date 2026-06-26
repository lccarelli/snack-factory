export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
      <mask id="brand-bite">
        <rect width="64" height="64" rx="16" fill="#fff" />
        <path d="M64 0 L40 0 L40 8 L48 8 L48 16 L56 16 L56 24 L64 24 Z" fill="#000" />
      </mask>
      <rect width="64" height="64" rx="16" fill="currentColor" mask="url(#brand-bite)" />
      <g className="brand-chips">
        <rect x="14" y="36" width="8" height="8" rx="2" />
        <rect x="30" y="44" width="8" height="8" rx="2" />
        <rect x="20" y="22" width="8" height="8" rx="2" />
      </g>
    </svg>
  );
}
