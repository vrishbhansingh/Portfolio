// Fixed page backdrop: two soft glows and a fine noise grain.
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[20%] left-[10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
      <div className="absolute top-[30%] -right-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,var(--glow-b),transparent)]" />
      <svg className="absolute inset-0 size-full opacity-[0.035] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
