import { useState } from 'react';
import { useVPN } from '@/contexts/VPNContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WorldMap } from '@/components/WorldMap';
import { serverLocations } from '@/data/serverLocations';

export default function Servers() {
  const { selectedServer, selectServer } = useVPN();
  const [search, setSearch] = useState('');

  const filteredServers = serverLocations.filter(
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
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-glow-cyan">Серверы VPN</h1>
          <p className="text-muted-foreground">Выберите оптимальный сервер для подключения</p>
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="map">
              <Icon name="Globe" className="mr-2" size={16} />
              Карта
            </TabsTrigger>
            <TabsTrigger value="list">
              <Icon name="List" className="mr-2" size={16} />
              Список
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <div className="h-[500px]">
              <WorldMap />
            </div>

            {selectedServer && (
              <div className="bg-card border border-primary glow-cyan rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedServer.flag}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{selectedServer.city}</h3>
                      <p className="text-sm text-muted-foreground">{selectedServer.country}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedServer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Activity" size={16} className="text-muted-foreground" />
                        <span className={`text-lg font-bold ${getLoadColor(selectedServer.load)}`}>
                          {selectedServer.load}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Нагрузка</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Gauge" size={16} className="text-muted-foreground" />
                        <span className={`text-lg font-bold ${getPingColor(selectedServer.ping)}`}>
                          {selectedServer.ping} мс
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Пинг</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
