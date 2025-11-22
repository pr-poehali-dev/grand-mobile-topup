import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: string;
  cashback: number;
  status: 'completed' | 'pending' | 'failed';
}

const Cabinet = () => {
  const [region, setRegion] = useState<'russia' | 'kazakhstan'>('russia');
  const [transactions] = useState<Transaction[]>([
    { id: '1', date: '2025-11-20 14:30', amount: 1000, method: 'Т-Банк', cashback: 50, status: 'completed' },
    { id: '2', date: '2025-11-18 10:15', amount: 500, method: 'Т-Банк', cashback: 25, status: 'completed' },
    { id: '3', date: '2025-11-15 16:45', amount: 2000, method: 'Банковская карта', cashback: 0, status: 'completed' },
    { id: '4', date: '2025-11-12 09:20', amount: 300, method: 'Т-Банк', cashback: 15, status: 'completed' },
  ]);

  const balance = 3800;
  const totalCashback = transactions.reduce((sum, t) => sum + t.cashback, 0);
  const monthCashback = transactions
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.cashback, 0);
  
  const currency = region === 'russia' ? '₽' : '₸';
  const currencyRate = region === 'kazakhstan' ? 5 : 1;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'CheckCircle2';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <Icon name="Wallet" size={32} className="text-primary" />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PayMobile
              </span>
            </Link>
            <Button variant="outline" asChild>
              <Link to="/">
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                На главную
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Личный кабинет</h1>
          
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setRegion('russia')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                region === 'russia' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">🇷🇺</span>
              <span className="font-medium">Россия</span>
            </button>
            <button
              onClick={() => setRegion('kazakhstan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                region === 'kazakhstan' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">🇰🇿</span>
              <span className="font-medium">Казахстан</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Icon name="Wallet" size={24} />
                Баланс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{Math.round(balance * currencyRate)} {currency}</p>
              <p className="text-primary-foreground/80 mt-2">Доступно для вывода</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Icon name="Gift" size={24} />
                Кэшбэк за месяц
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{Math.round(monthCashback * currencyRate)} {currency}</p>
              <p className="text-white/80 mt-2">Получено в ноябре</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Icon name="TrendingUp" size={24} />
                Всего кэшбэка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{Math.round(totalCashback * currencyRate)} {currency}</p>
              <p className="text-secondary-foreground/80 mt-2">За всё время</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={24} />
              История пополнений
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Icon
                      name={getStatusIcon(transaction.status)}
                      size={24}
                      className={getStatusColor(transaction.status)}
                    />
                    <div>
                      <p className="font-semibold">{transaction.method}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">+{Math.round(transaction.amount * currencyRate)} {currency}</p>
                    {transaction.cashback > 0 && (
                      <p className="text-sm text-green-600 font-semibold">
                        Кэшбэк: +{Math.round(transaction.cashback * currencyRate)} {currency}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Как получить больше кэшбэка?</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Пополняйте счёт через Т-Банк и получайте 5% кэшбэка от каждой операции!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cabinet;