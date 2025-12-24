import { useVPN } from '@/contexts/VPNContext';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

export default function Stats() {
  const { isConnected, uploadSpeed, downloadSpeed, dataSent, dataReceived, connectionTime } = useVPN();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatData = (gb: number) => {
    if (gb < 1) return `${(gb * 1024).toFixed(0)} МБ`;
    return `${gb.toFixed(2)} ГБ`;
  };

  const stats = [
    {
      icon: 'Upload',
      label: 'Скорость отправки',
      value: isConnected ? `${uploadSpeed.toFixed(2)} Мбит/с` : '0.00 Мбит/с',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: 'Download',
      label: 'Скорость загрузки',
      value: isConnected ? `${downloadSpeed.toFixed(2)} Мбит/с` : '0.00 Мбит/с',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: 'ArrowUp',
      label: 'Отправлено данных',
      value: formatData(dataSent),
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: 'ArrowDown',
      label: 'Получено данных',
      value: formatData(dataReceived),
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: 'Clock',
      label: 'Время соединения',
      value: formatTime(connectionTime),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: 'Database',
      label: 'Общий трафик',
      value: formatData(dataSent + dataReceived),
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-glow-cyan">Статистика соединения</h1>
          <p className="text-muted-foreground">
            {isConnected ? 'Мониторинг активного VPN-соединения в реальном времени' : 'Подключитесь для просмотра статистики'}
          </p>
        </div>

        {!isConnected && (
          <Card className="p-8 text-center border-border">
            <Icon name="BarChart3" className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Нет активного соединения</h3>
            <p className="text-muted-foreground">Подключитесь к VPN для просмотра статистики</p>
          </Card>
        )}

        {isConnected && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="gradient-border p-6 hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon name={stat.icon} className={stat.color} size={24} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="TrendingUp" className="text-primary" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Производительность сети</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Отправка</span>
                      <span className="text-primary font-semibold">{uploadSpeed.toFixed(1)} Мбит/с</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/50 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min((uploadSpeed / 15) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Загрузка</span>
                      <span className="text-secondary font-semibold">{downloadSpeed.toFixed(1)} Мбит/с</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-secondary to-secondary/50 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min((downloadSpeed / 70) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon name="Shield" className="text-secondary" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Безопасность</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-green-500" size={20} />
                      <span className="text-sm text-foreground">Шифрование AES-256</span>
                    </div>
                    <span className="text-xs text-green-500 font-semibold">Активно</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-green-500" size={20} />
                      <span className="text-sm text-foreground">Kill Switch</span>
                    </div>
                    <span className="text-xs text-green-500 font-semibold">Включен</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle2" className="text-green-500" size={20} />
                      <span className="text-sm text-foreground">DNS Leak Protection</span>
                    </div>
                    <span className="text-xs text-green-500 font-semibold">Защищен</span>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
