import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { serverLocations, ServerLocation } from '@/data/serverLocations';
import { useVPN } from '@/contexts/VPNContext';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  onServerSelect?: (server: ServerLocation) => void;
}

export const WorldMap = ({ onServerSelect }: WorldMapProps) => {
  const { selectedServer, selectServer } = useVPN();

  const handleMarkerClick = (server: ServerLocation) => {
    selectServer(server);
    if (onServerSelect) {
      onServerSelect(server);
    }
  };

  const getMarkerColor = (server: ServerLocation) => {
    if (selectedServer?.id === server.id) return '#00f0ff';
    if (server.load < 40) return '#10b981';
    if (server.load < 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="w-full h-full bg-card rounded-lg border border-border overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 147,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: 'hsl(var(--accent))', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {serverLocations.map((server) => {
          const isSelected = selectedServer?.id === server.id;
          return (
            <Marker
              key={server.id}
              coordinates={server.coordinates}
              onClick={() => handleMarkerClick(server)}
              style={{ cursor: 'pointer' }}
            >
              <g>
                <circle
                  r={isSelected ? 12 : 8}
                  fill={getMarkerColor(server)}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                  className="transition-all duration-300 hover:scale-125"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.8))'
                      : 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.5))',
                  }}
                />
                {isSelected && (
                  <>
                    <circle
                      r={18}
                      fill="none"
                      stroke={getMarkerColor(server)}
                      strokeWidth={2}
                      opacity={0.5}
                      className="animate-ping"
                    />
                    <text
                      textAnchor="middle"
                      y={-20}
                      className="text-xs font-semibold"
                      fill="hsl(var(--foreground))"
                      style={{
                        fontSize: '8px',
                        pointerEvents: 'none',
                      }}
                    >
                      {server.city}
                    </text>
                  </>
                )}
              </g>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};
