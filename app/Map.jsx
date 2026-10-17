import { HUB, LAND, COMMUNITIES } from './map-data';

// The Northwest Territories with Yellowknife as the hub. Spokes draw outward in distance order on load
// (CSS only, honours prefers-reduced-motion); each community dot names itself on hover.
export default function Map({ className = '' }) {
  return (
    <svg className={`nwt ${className}`} viewBox="0 0 560 600" role="img" aria-label="Map of the Northwest Territories with spokes from Yellowknife to each community">
      <path className="nwt-land" d={LAND} />
      <g className="nwt-spokes">
        {COMMUNITIES.map((c) => (
          <line key={c.name} className="nwt-spoke" pathLength="1" x1={HUB.x} y1={HUB.y} x2={c.x} y2={c.y} style={{ animationDelay: `${c.delay}s` }} />
        ))}
      </g>
      <g className="nwt-nodes">
        {COMMUNITIES.map((c) => (
          <circle key={c.name} className="nwt-node" cx={c.x} cy={c.y} r="3" style={{ animationDelay: `${c.delay + 0.9}s` }}>
            <title>{c.name}</title>
          </circle>
        ))}
      </g>
      <circle className="nwt-pulse" cx={HUB.x} cy={HUB.y} r="6" />
      <circle className="nwt-hub" cx={HUB.x} cy={HUB.y} r="6"><title>{HUB.name}</title></circle>
    </svg>
  );
}
