import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const menuItems = [
  { path: '/', icon: 'Shield', label: 'Главная' },
  { path: '/servers', icon: 'Server', label: 'Серверы' },
  { path: '/stats', icon: 'Activity', label: 'Статистика' },
  { path: '/settings', icon: 'Settings', label: 'Настройки' },
  { path: '/pricing', icon: 'CreditCard', label: 'Тарифы' },
  { path: '/account', icon: 'User', label: 'Аккаунт' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-cyan">
            <Icon name="Shield" className="text-background" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-glow-cyan">BlazeSquadsss</h1>
            <p className="text-xs text-muted-foreground">Ultimate VPN</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/30 glow-cyan'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Zap" className="text-primary" size={16} />
            <span className="text-sm font-semibold text-foreground">Премиум подписка</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Активна до 25.01.2026</p>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};