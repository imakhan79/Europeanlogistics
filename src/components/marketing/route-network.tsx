import { CITY_COORDS, ROUTE_NETWORK_EDGES, project } from "@/lib/map/projection";

const TRAVELING_EDGES = [0, 4, 9, 13, 17];

export function RouteNetwork({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "6% 6%",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="node-glow" r="70%">
            <stop offset="0%" stopColor="rgb(96 165 250)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(96 165 250)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {ROUTE_NETWORK_EDGES.map(([a, b], i) => {
          const pa = project(CITY_COORDS[a]);
          const pb = project(CITY_COORDS[b]);
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke="rgba(96,165,250,0.35)"
              strokeWidth={0.15}
              vectorEffect="non-scaling-stroke"
              className={i % 3 === 0 ? "route-dash" : undefined}
            />
          );
        })}

        {Object.entries(CITY_COORDS).map(([name, coords]) => {
          const { x, y } = project(coords);
          return (
            <g key={name}>
              <circle cx={x} cy={y} r={2.2} fill="url(#node-glow)" />
              <circle cx={x} cy={y} r={0.35} fill="rgb(191 219 254)" vectorEffect="non-scaling-stroke" />
            </g>
          );
        })}

        {TRAVELING_EDGES.map((edgeIndex, i) => {
          const [a, b] = ROUTE_NETWORK_EDGES[edgeIndex];
          const pa = project(CITY_COORDS[a]);
          const pb = project(CITY_COORDS[b]);
          return (
            <circle
              key={`travel-${a}-${b}`}
              r={0.5}
              fill="rgb(251 191 36)"
              className="route-travel"
              style={{
                offsetPath: `path("M ${pa.x} ${pa.y} L ${pb.x} ${pb.y}")`,
                animationDelay: `${i * 1.4}s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
