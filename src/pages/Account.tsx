import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePricing } from '@/contexts/PricingContext';
import { Link } from 'react-router-dom';

export default function Account() {
  const { currentPlan } = usePricing();
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-glow-cyan">Аккаунт</h1>
          <p className="text-muted-foreground">Управление профилем и подпиской</p>
        </div>

        <Card className="p-6 border-border">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 border-2 border-primary glow-cyan">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-background text-2xl font-bold">
                АП
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">Александр Петров</h2>
                <span className="px-3 py-1 text-xs bg-gradient-to-r from-primary to-secondary text-background rounded-full font-semibold">
                  {currentPlan.name}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">alexander.petrov@email.com</p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Icon name="Edit" className="mr-2" size={16} />
                  Редактировать профиль
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Key" className="mr-2" size={16} />
                  Сменить пароль
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="CreditCard" className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Подписка</h3>
              <p className="text-sm text-muted-foreground">Управление вашей подпиской</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-2xl font-bold text-foreground mb-1">{currentPlan.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.price === 0 ? 'Бесплатный план' : 'Активна до 25 января 2026'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{currentPlan.price} ₽</p>
                <p className="text-sm text-muted-foreground">в месяц</p>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentPlan.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <Icon name="CheckCircle2" className="text-green-500" size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/pricing">
              <Button className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                <Icon name="Zap" className="mr-2" size={16} />
                {currentPlan.price === 0 ? 'Обновить план' : 'Изменить план'}
              </Button>
            </Link>
            <Button variant="outline">
              <Icon name="Gift" className="mr-2" size={16} />
              Подарить подписку
            </Button>
            <Button variant="outline">
              <Icon name="FileText" className="mr-2" size={16} />
              История платежей
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="Smartphone" className="text-secondary" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Устройства</h3>
              <p className="text-sm text-muted-foreground">3 из 10 устройств используется</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Monitor" className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Windows Desktop</p>
                  <p className="text-sm text-muted-foreground">Активно сейчас</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-500 border border-green-500/30 rounded-full">
                Онлайн
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon name="Smartphone" className="text-secondary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">iPhone 15 Pro</p>
                  <p className="text-sm text-muted-foreground">2 часа назад</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="Trash2" size={16} />
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="Laptop" className="text-accent" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">MacBook Pro</p>
                  <p className="text-sm text-muted-foreground">1 день назад</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            <Icon name="Plus" className="mr-2" size={16} />
            Добавить устройство
          </Button>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="BarChart3" className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Статистика аккаунта</h3>
              <p className="text-sm text-muted-foreground">За последние 30 дней</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Icon name="Clock" className="mx-auto mb-2 text-primary" size={24} />
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-sm text-muted-foreground">Часов подключения</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Icon name="Database" className="mx-auto mb-2 text-secondary" size={24} />
              <p className="text-2xl font-bold text-foreground">245 ГБ</p>
              <p className="text-sm text-muted-foreground">Трафика использовано</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Icon name="Globe" className="mx-auto mb-2 text-accent" size={24} />
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Стран посещено</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}