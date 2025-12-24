import { useVPN } from '@/contexts/VPNContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { isConnected, isConnecting, selectedServer, toggleConnection, uploadSpeed, downloadSpeed, connectionTime } = useVPN();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div
              className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
                isConnected
                  ? 'bg-gradient-to-br from-primary to-secondary glow-cyan animate-pulse-glow'
                  : isConnecting
                  ? 'bg-gradient-to-br from-accent to-secondary glow-purple animate-spin-slow'
                  : 'bg-card border-2 border-border'
              }`}
            >
              <Icon
                name={isConnected ? 'ShieldCheck' : isConnecting ? 'Loader2' : 'Shield'}
                size={80}
                className={`transition-all ${
                  isConnected ? 'text-background' : isConnecting ? 'text-foreground animate-pulse' : 'text-muted-foreground'
                }`}
              />
            </div>
            {isConnected && (
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center glow-cyan">
                <Icon name="CheckCircle2" size={32} className="text-background" />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-2">
              {isConnected ? (
                <span className="text-glow-cyan text-primary">Защищено</span>
              ) : isConnecting ? (
                <span className="text-accent">Подключение...</span>
              ) : (
                <span className="text-muted-foreground">Не защищено</span>
              )}
            </h2>
            <p className="text-muted-foreground">
              {isConnected && selectedServer
                ? `Подключено к ${selectedServer.city}, ${selectedServer.country}`
                : isConnecting
                ? 'Установка защищенного соединения'
                : 'Нажмите кнопку для подключения'}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={toggleConnection}
            disabled={isConnecting}
            className={`px-12 py-6 text-lg font-semibold rounded-full transition-all ${
              isConnected
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-background glow-cyan'
            }`}
          >
            <Icon name={isConnected ? 'Power' : 'Zap'} className="mr-2" size={24} />
            {isConnected ? 'Отключить' : isConnecting ? 'Подключение...' : 'Подключить'}
          </Button>
        </div>

        {isConnected && (
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="gradient-border p-6 text-center">
              <Icon name="Upload" className="mx-auto mb-2 text-primary" size={24} />
              <p className="text-2xl font-bold text-foreground">
                {uploadSpeed.toFixed(1)} <span className="text-sm text-muted-foreground">Мбит/с</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Отправка</p>
            </div>

            <div className="gradient-border p-6 text-center">
              <Icon name="Download" className="mx-auto mb-2 text-primary" size={24} />
              <p className="text-2xl font-bold text-foreground">
                {downloadSpeed.toFixed(1)} <span className="text-sm text-muted-foreground">Мбит/с</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Загрузка</p>
            </div>

            <div className="gradient-border p-6 text-center">
              <Icon name="Clock" className="mx-auto mb-2 text-primary" size={24} />
              <p className="text-2xl font-bold text-foreground">{formatTime(connectionTime)}</p>
              <p className="text-xs text-muted-foreground mt-1">Время</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="ShieldCheck" className="text-primary" size={24} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Защита от рекламы</p>
              <p className="text-xs text-muted-foreground">Блокировка трекеров</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="ShieldAlert" className="text-secondary" size={24} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Защита от угроз</p>
              <p className="text-xs text-muted-foreground">Блокировка вредоносных сайтов</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}