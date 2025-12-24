import { useState } from 'react';
import { useVPN } from '@/contexts/VPNContext';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Settings() {
  const { adBlockEnabled, malwareProtectionEnabled, toggleAdBlock, toggleMalwareProtection } = useVPN();
  const [protocol, setProtocol] = useState('wireguard');
  const [dns, setDns] = useState('cloudflare');
  const [autoConnect, setAutoConnect] = useState(false);
  const [killSwitch, setKillSwitch] = useState(true);
  const [splitTunneling, setSplitTunneling] = useState(false);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-glow-cyan">Настройки</h1>
          <p className="text-muted-foreground">Настройте параметры VPN под свои нужды</p>
        </div>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="ShieldCheck" className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Безопасность и защита</h3>
              <p className="text-sm text-muted-foreground">Защита от рекламы и вредоносного контента</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <Icon name="ShieldAlert" className="text-destructive mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Блокировка рекламы</p>
                  <p className="text-sm text-muted-foreground">Блокирует рекламу и трекеры на уровне DNS</p>
                </div>
              </div>
              <Switch checked={adBlockEnabled} onCheckedChange={toggleAdBlock} />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <Icon name="Bug" className="text-red-500 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Защита от вредоносных сайтов</p>
                  <p className="text-sm text-muted-foreground">Блокирует фишинг и вредоносные домены</p>
                </div>
              </div>
              <Switch checked={malwareProtectionEnabled} onCheckedChange={toggleMalwareProtection} />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <Icon name="Power" className="text-yellow-500 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Kill Switch</p>
                  <p className="text-sm text-muted-foreground">Блокирует интернет при разрыве VPN</p>
                </div>
              </div>
              <Switch checked={killSwitch} onCheckedChange={setKillSwitch} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="Settings2" className="text-secondary" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Параметры подключения</h3>
              <p className="text-sm text-muted-foreground">Настройки протокола и автоподключения</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Network" size={16} />
                  Протокол VPN
                </span>
                <p className="text-xs text-muted-foreground mt-1">Выберите протокол для подключения</p>
              </label>
              <Select value={protocol} onValueChange={setProtocol}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wireguard">WireGuard (рекомендуется)</SelectItem>
                  <SelectItem value="openvpn">OpenVPN TCP</SelectItem>
                  <SelectItem value="openvpn-udp">OpenVPN UDP</SelectItem>
                  <SelectItem value="ikev2">IKEv2/IPSec</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <label className="block mb-3">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Icon name="Dns" size={16} />
                  DNS сервер
                </span>
                <p className="text-xs text-muted-foreground mt-1">Выберите DNS провайдера</p>
              </label>
              <Select value={dns} onValueChange={setDns}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloudflare">Cloudflare (1.1.1.1)</SelectItem>
                  <SelectItem value="google">Google Public DNS (8.8.8.8)</SelectItem>
                  <SelectItem value="quad9">Quad9 (9.9.9.9)</SelectItem>
                  <SelectItem value="custom">Собственный DNS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <Icon name="Zap" className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Автоподключение</p>
                  <p className="text-sm text-muted-foreground">Подключаться автоматически при запуске</p>
                </div>
              </div>
              <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <Icon name="Split" className="text-accent mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">Split Tunneling</p>
                  <p className="text-sm text-muted-foreground">Выборочная маршрутизация приложений</p>
                </div>
              </div>
              <Switch checked={splitTunneling} onCheckedChange={setSplitTunneling} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="Info" className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Дополнительно</h3>
              <p className="text-sm text-muted-foreground">Очистка кэша и диагностика</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="Trash2" size={20} />
              Очистить кэш приложения
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="Bug" size={20} />
              Отправить отчет о проблеме
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="RefreshCw" size={20} />
              Сбросить настройки по умолчанию
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
