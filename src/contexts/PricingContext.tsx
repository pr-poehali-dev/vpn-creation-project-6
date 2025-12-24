import React, { createContext, useContext, useState } from 'react';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  popular?: boolean;
  deviceLimit: number;
  speedLimit?: string;
}

interface PricingContextType {
  plans: PricingPlan[];
  currentPlan: PricingPlan;
  changePlan: (planId: string) => void;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Бесплатный',
    price: 0,
    period: 'month',
    deviceLimit: 1,
    speedLimit: '5 Мбит/с',
    features: [
      '1 устройство',
      'Базовые серверы (3 страны)',
      'Скорость до 5 Мбит/с',
      '10 ГБ трафика в месяц',
      'Базовая поддержка',
    ],
  },
  {
    id: 'standard',
    name: 'Стандарт',
    price: 490,
    period: 'month',
    deviceLimit: 5,
    popular: true,
    features: [
      'До 5 устройств',
      'Все серверы (15 стран)',
      'Безлимитная скорость',
      'Безлимитный трафик',
      'Блокировка рекламы',
      'Защита от вредоносных сайтов',
      'Приоритетная поддержка',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    price: 990,
    period: 'month',
    deviceLimit: 10,
    features: [
      'До 10 устройств',
      'Все серверы + эксклюзивные',
      'Максимальная скорость',
      'Безлимитный трафик',
      'Блокировка рекламы и трекеров',
      'Защита от всех угроз',
      'VIP поддержка 24/7',
      'Статический IP адрес',
      'Выделенные серверы',
    ],
  },
  {
    id: 'family',
    name: 'Семейный',
    price: 1490,
    period: 'month',
    deviceLimit: 20,
    features: [
      'До 20 устройств',
      'Все возможности Премиум',
      'Управление семейными аккаунтами',
      'Родительский контроль',
      'Раздельная статистика',
      'Общая подписка',
    ],
  },
];

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within PricingProvider');
  }
  return context;
};

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<PricingPlan>(plans[1]);

  const changePlan = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      setCurrentPlan(plan);
    }
  };

  return (
    <PricingContext.Provider
      value={{
        plans,
        currentPlan,
        changePlan,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
};
