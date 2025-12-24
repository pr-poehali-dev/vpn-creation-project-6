import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState('auto');
  const [adBlock, setAdBlock] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [protocol, setProtocol] = useState('wireguard');

  const servers = [
    { id: 'auto', name: 'Авто (Быстрейший)', country: 'Auto', flag: '🌐', ping: 12, load: 45 },
    { id: 'us-ny', name: 'США - Нью-Йорк', country: 'USA', flag: '🇺🇸', ping: 85, load: 67 },
    { id: 'de-fr', name: 'Германия - Франкфурт', country: 'Germany', flag: '🇩🇪', ping: 42, load: 34 },
    { id: 'uk-ln', name: 'Великобритания - Лондон', country: 'UK', flag: '🇬🇧', ping: 55, load: 52 },
    { id: 'jp-tk', name: 'Япония - Токио', country: 'Japan', flag: '🇯🇵', ping: 120, load: 28 },
    { id: 'nl-am', name: 'Нидерланды - Амстердам', country: 'Netherlands', flag: '🇳🇱', ping: 38, load: 41 },
    { id: 'sg-sg', name: 'Сингапур', country: 'Singapore', flag: '🇸🇬', ping: 145, load: 55 },
    { id: 'fr-pr', name: 'Франция - Париж', country: 'France', flag: '🇫🇷', ping: 48, load: 38 },
  ];

  const currentServer = servers.find(s => s.id === selectedServer) || servers[0];
  const stats = {
    uploadSpeed: isConnected ? 12.4 : 0,
    downloadSpeed: isConnected ? 45.8 : 0,
    dataUsed: 2.4,
    sessionTime: '00:15:32'
  };

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-cyan">
              <Icon name="Shield" className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-glow-cyan">CyberVPN</h1>
              <p className="text-sm text-muted-foreground">Защита нового поколения</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icon name="Settings" className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="gradient-border animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Статус соединения</span>
                  <Badge 
                    variant={isConnected ? "default" : "secondary"} 
                    className={isConnected ? "glow-cyan" : ""}
                  >
                    {isConnected ? (
                      <><Icon name="Wifi" className="w-3 h-3 mr-1" /> Подключено</>
                    ) : (
                      <><Icon name="WifiOff" className="w-3 h-3 mr-1" /> Отключено</>
                    )}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {isConnected 
                    ? `Сервер: ${currentServer.name} • IP: 185.246.xxx.xxx`
                    : 'Нажмите кнопку для подключения к VPN'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative">
                    <button
                      onClick={handleConnect}
                      className={`
                        w-48 h-48 rounded-full flex items-center justify-center
                        transition-all duration-300 transform hover:scale-105
                        ${isConnected 
                          ? 'bg-gradient-to-br from-primary to-secondary glow-cyan animate-pulse-glow' 
                          : 'bg-gradient-to-br from-muted to-card border-2 border-primary/30'}
                      `}
                    >
                      <div className="text-center">
                        <Icon 
                          name={isConnected ? "ShieldCheck" : "Shield"} 
                          className="w-16 h-16 mx-auto mb-2"
                        />
                        <div className="text-lg font-bold">
                          {isConnected ? 'Защищено' : 'Подключиться'}
                        </div>
                      </div>
                    </button>
                    {isConnected && (
                      <div className="absolute -inset-4 border-2 border-primary/20 rounded-full animate-spin-slow" />
                    )}
                  </div>
                </div>

                {isConnected && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                    <div className="text-center p-4 rounded-lg bg-card/50">
                      <Icon name="ArrowUp" className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold text-primary">{stats.uploadSpeed}</div>
                      <div className="text-xs text-muted-foreground">Мбит/с ↑</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50">
                      <Icon name="ArrowDown" className="w-5 h-5 mx-auto mb-2 text-secondary" />
                      <div className="text-2xl font-bold text-secondary">{stats.downloadSpeed}</div>
                      <div className="text-xs text-muted-foreground">Мбит/с ↓</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50">
                      <Icon name="HardDrive" className="w-5 h-5 mx-auto mb-2 text-accent" />
                      <div className="text-2xl font-bold text-accent">{stats.dataUsed}</div>
                      <div className="text-xs text-muted-foreground">ГБ</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-card/50">
                      <Icon name="Clock" className="w-5 h-5 mx-auto mb-2 text-primary" />
                      <div className="text-xl font-bold">{stats.sessionTime}</div>
                      <div className="text-xs text-muted-foreground">Время</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Server" className="w-5 h-5 text-primary" />
                  Серверы
                </CardTitle>
                <CardDescription>Выберите сервер для подключения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {servers.map((server) => (
                    <button
                      key={server.id}
                      onClick={() => setSelectedServer(server.id)}
                      className={`
                        w-full p-4 rounded-lg flex items-center justify-between
                        transition-all duration-200 hover:bg-muted/50
                        ${selectedServer === server.id 
                          ? 'bg-primary/10 border-2 border-primary' 
                          : 'bg-card border border-border'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{server.flag}</div>
                        <div className="text-left">
                          <div className="font-semibold">{server.name}</div>
                          <div className="text-sm text-muted-foreground">{server.country}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-mono text-primary">{server.ping}ms</div>
                          <div className="flex items-center gap-2">
                            <Progress value={server.load} className="w-16 h-1" />
                            <span className="text-xs text-muted-foreground">{server.load}%</span>
                          </div>
                        </div>
                        {selectedServer === server.id && (
                          <Icon name="Check" className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sliders" className="w-5 h-5 text-primary" />
                  Настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Блокировка рекламы</Label>
                      <p className="text-xs text-muted-foreground">Защита от вредоносных сайтов</p>
                    </div>
                    <Switch checked={adBlock} onCheckedChange={setAdBlock} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Автоподключение</Label>
                      <p className="text-xs text-muted-foreground">При запуске приложения</p>
                    </div>
                    <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Протокол</Label>
                  <Select value={protocol} onValueChange={setProtocol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wireguard">
                        <div className="flex items-center gap-2">
                          <Icon name="Zap" className="w-4 h-4 text-primary" />
                          WireGuard (Рекомендуется)
                        </div>
                      </SelectItem>
                      <SelectItem value="openvpn">
                        <div className="flex items-center gap-2">
                          <Icon name="Shield" className="w-4 h-4" />
                          OpenVPN
                        </div>
                      </SelectItem>
                      <SelectItem value="ikev2">
                        <div className="flex items-center gap-2">
                          <Icon name="Lock" className="w-4 h-4" />
                          IKEv2
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">DNS сервер</Label>
                  <Select defaultValue="cloudflare">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloudflare">Cloudflare (1.1.1.1)</SelectItem>
                      <SelectItem value="google">Google (8.8.8.8)</SelectItem>
                      <SelectItem value="quad9">Quad9 (9.9.9.9)</SelectItem>
                      <SelectItem value="auto">Авто</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" className="w-5 h-5 text-primary" />
                  Подписка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center glow-cyan">
                    <Icon name="Crown" className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Premium</div>
                    <div className="text-sm text-muted-foreground">Активна до 25.12.2026</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Трафик</span>
                    <span className="font-mono">Безлимит</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Устройства</span>
                    <span className="font-mono">5 / 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Скорость</span>
                    <span className="font-mono text-primary">10 Гбит/с</span>
                  </div>
                </div>

                <Button className="w-full glow-cyan" variant="default">
                  <Icon name="Sparkles" className="w-4 h-4 mr-2" />
                  Управление подпиской
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-border bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Icon name="ShieldCheck" className="w-4 h-4 text-primary" />
                  Защита активна
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Check" className="w-3 h-3 text-primary" />
                    Зашифрованное соединение AES-256
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Check" className="w-3 h-3 text-primary" />
                    Kill Switch активен
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Check" className="w-3 h-3 text-primary" />
                    Защита от утечки DNS
                  </div>
                  {adBlock && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Check" className="w-3 h-3 text-primary" />
                      Блокировка рекламы и трекеров
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
