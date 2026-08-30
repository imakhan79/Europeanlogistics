import { CITY_COORDS, ROUTE_NETWORK_EDGES, project } from "@/lib/map/projection";

const PULSE_NODES = ["Berlin", "Rotterdam", "Milan", "Paris", "Warsaw"];

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
      </svg>

      {Object.entries(CITY_COORDS).map(([name, coords]) => {
        const { x, y } = project(coords);
        const pulse = PULSE_NODES.includes(name);
        return (
          <span
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {pulse && (
              <span className="route-node-pulse absolute inset-0 -m-1.5 rounded-full bg-blue-400/50" />
            )}
            <span
              className={`relative block rounded-full bg-blue-200 ${pulse ? "h-1.5 w-1.5" : "h-1 w-1 bg-blue-300/70"}`}
            />
          </span>
        );
      })}
    </div>
  );
}
