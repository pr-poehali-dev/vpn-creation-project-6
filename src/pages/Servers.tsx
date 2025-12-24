import { useState } from 'react';
import { useVPN } from '@/contexts/VPNContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Server {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  load: number;
  ping: number;
}

const servers: Server[] = [
  { id: '1', name: 'RU-Moscow-01', country: 'Россия', city: 'Москва', flag: '🇷🇺', load: 45, ping: 12 },
  { id: '2', name: 'RU-SPB-01', country: 'Россия', city: 'Санкт-Петербург', flag: '🇷🇺', load: 38, ping: 15 },
  { id: '3', name: 'US-NY-01', country: 'США', city: 'Нью-Йорк', flag: '🇺🇸', load: 62, ping: 145 },
  { id: '4', name: 'US-LA-01', country: 'США', city: 'Лос-Анджелес', flag: '🇺🇸', load: 55, ping: 178 },
  { id: '5', name: 'DE-BER-01', country: 'Германия', city: 'Берлин', flag: '🇩🇪', load: 41, ping: 45 },
  { id: '6', name: 'UK-LON-01', country: 'Великобритания', city: 'Лондон', flag: '🇬🇧', load: 58, ping: 52 },
  { id: '7', name: 'JP-TOK-01', country: 'Япония', city: 'Токио', flag: '🇯🇵', load: 33, ping: 198 },
  { id: '8', name: 'SG-SIN-01', country: 'Сингапур', city: 'Сингапур', flag: '🇸🇬', load: 47, ping: 215 },
  { id: '9', name: 'FR-PAR-01', country: 'Франция', city: 'Париж', flag: '🇫🇷', load: 52, ping: 48 },
  { id: '10', name: 'NL-AMS-01', country: 'Нидерланды', city: 'Амстердам', flag: '🇳🇱', load: 44, ping: 42 },
];

export default function Servers() {
  const { selectedServer, selectServer } = useVPN();
  const [search, setSearch] = useState('');

  const filteredServers = servers.filter(
    (server) =>
      server.country.toLowerCase().includes(search.toLowerCase()) ||
      server.city.toLowerCase().includes(search.toLowerCase())
  );

  const getLoadColor = (load: number) => {
    if (load < 40) return 'text-green-500';
    if (load < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return 'text-green-500';
    if (ping < 100) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-glow-cyan">Серверы VPN</h1>
          <p className="text-muted-foreground">Выберите оптимальный сервер для подключения</p>
        </div>

        <div className="relative">
          <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Поиск по стране или городу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 bg-card border-border text-foreground"
          />
        </div>

        <div className="grid gap-3">
          {filteredServers.map((server) => {
            const isSelected = selectedServer?.id === server.id;
            return (
              <div
                key={server.id}
                className={`bg-card border rounded-lg p-4 transition-all hover:scale-[1.02] cursor-pointer ${
                  isSelected ? 'border-primary glow-cyan' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => selectServer(server)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl">{server.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{server.city}</h3>
                        {isSelected && (
                          <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary border border-primary/30 rounded-full">
                            Выбрано
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{server.country}</p>
                      <p className="text-xs text-muted-foreground mt-1">{server.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Activity" size={16} className="text-muted-foreground" />
                        <span className={`text-lg font-bold ${getLoadColor(server.load)}`}>{server.load}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Нагрузка</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Gauge" size={16} className="text-muted-foreground" />
                        <span className={`text-lg font-bold ${getPingColor(server.ping)}`}>{server.ping} мс</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Пинг</p>
                    </div>

                    <Button
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      className={isSelected ? 'bg-gradient-to-r from-primary to-secondary text-background' : ''}
                    >
                      {isSelected ? 'Выбрано' : 'Выбрать'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
