import { usePricing } from '@/contexts/PricingContext';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Pricing() {
  const { plans, currentPlan, changePlan } = usePricing();

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-glow-cyan">Тарифы BlazeSquadsss</h1>
          <p className="text-muted-foreground text-lg">Выберите подходящий план для вашей защиты</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan.id === plan.id;
            return (
              <Card
                key={plan.id}
                className={`p-6 border-border relative transition-all hover:scale-105 ${
                  plan.popular ? 'border-primary glow-cyan' : ''
                } ${isCurrentPlan ? 'bg-primary/5' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-background text-sm font-semibold rounded-full">
                    Популярный
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">₽</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">в месяц</p>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Icon name="CheckCircle2" className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90'
                      : isCurrentPlan
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : ''
                  }`}
                  variant={!plan.popular && !isCurrentPlan ? 'outline' : 'default'}
                  onClick={() => changePlan(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? (
                    <>
                      <Icon name="CheckCircle2" className="mr-2" size={16} />
                      Текущий план
                    </>
                  ) : (
                    <>
                      <Icon name="Zap" className="mr-2" size={16} />
                      Выбрать план
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 border-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Военное шифрование</h3>
              <p className="text-sm text-muted-foreground">AES-256 защита ваших данных</p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" className="text-secondary" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Максимальная скорость</h3>
              <p className="text-sm text-muted-foreground">Без ограничений пропускной способности</p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="Globe" className="text-accent" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Серверы по всему миру</h3>
              <p className="text-sm text-muted-foreground">15+ стран для вашего выбора</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-border bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Не уверены, какой план выбрать?</h3>
              <p className="text-muted-foreground">Попробуйте бесплатную версию и обновитесь в любое время</p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
              <Icon name="Play" className="mr-2" size={20} />
              Начать бесплатно
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
