import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { id: 'tbank', name: 'Т-Банк', icon: 'Landmark', cashback: '5%' },
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard' },
    { id: 'qiwi', name: 'QIWI', icon: 'Wallet' },
    { id: 'yoomoney', name: 'ЮMoney', icon: 'Coins' },
    { id: 'sbp', name: 'СБП', icon: 'Smartphone' },
    { id: 'btc', name: 'Bitcoin (BTC)', icon: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum (ETH)', icon: 'Hexagon' },
    { id: 'usdt', name: 'Tether (USDT)', icon: 'DollarSign' },
  ];

  const quickAmounts = [100, 300, 500, 1000, 2000, 5000];

  const faqs = [
    {
      question: 'Как быстро зачисляются средства?',
      answer: 'Средства зачисляются мгновенно после подтверждения платежа. В редких случаях зачисление может занять до 5 минут.'
    },
    {
      question: 'Какая минимальная сумма пополнения?',
      answer: 'Минимальная сумма пополнения составляет 50 рублей для всех способов оплаты.'
    },
    {
      question: 'Есть ли комиссия?',
      answer: 'Комиссия отсутствует при пополнении от 500 рублей. Для сумм меньше 500 рублей комиссия составляет 3%.'
    },
    {
      question: 'Что делать, если деньги не пришли?',
      answer: 'Обратитесь в службу поддержки через раздел "Поддержка" с номером транзакции. Мы решим проблему в течение 15 минут.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment:', { phoneNumber, amount, method: selectedMethod });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Smartphone" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Grand Mobile
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Главная</a>
            <a href="#topup" className="text-foreground hover:text-primary transition-colors">Пополнение</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
            <a href="#support" className="text-foreground hover:text-primary transition-colors">Поддержка</a>
          </div>
        </div>
      </nav>

      <section id="home" className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Пополнение счёта
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              за 30 секунд
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Быстрое и безопасное пополнение мобильного счёта. Без комиссий, без ожидания.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm">
              <Icon name="Zap" className="text-primary" size={20} />
              <span className="font-medium">Моментально</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm">
              <Icon name="Shield" className="text-primary" size={20} />
              <span className="font-medium">Безопасно</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm">
              <Icon name="Percent" className="text-primary" size={20} />
              <span className="font-medium">Без комиссий</span>
            </div>
          </div>
        </div>
      </section>

      <section id="topup" className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto shadow-xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-3xl">Пополнить счёт</CardTitle>
            <CardDescription>Введите данные для пополнения</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Сумма пополнения</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {quickAmounts.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant="outline"
                      onClick={() => setAmount(value.toString())}
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {value} ₽
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Способ оплаты</Label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.slice(0, 5).map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all relative ${
                        selectedMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon name={method.icon as any} size={24} className={selectedMethod === method.id ? 'text-primary' : 'text-muted-foreground'} />
                      <span className="font-medium">{method.name}</span>
                      {method.cashback && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {method.cashback}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Label className="text-secondary flex items-center gap-2">
                    <Icon name="Bitcoin" size={16} className="text-secondary" />
                    Криптовалюты
                  </Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {paymentMethods.slice(5).map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          selectedMethod === method.id
                            ? 'border-secondary bg-secondary/5'
                            : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        <Icon name={method.icon as any} size={24} className={selectedMethod === method.id ? 'text-secondary' : 'text-muted-foreground'} />
                        <span className="font-medium text-sm">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedMethod === 'tbank' && amount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <Icon name="Gift" size={20} />
                    <span className="font-semibold">Кэшбэк 5%</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    Вы получите +{(parseFloat(amount) * 0.05).toFixed(0)} ₽ кэшбэка при пополнении
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={!phoneNumber || !amount || !selectedMethod}
              >
                Пополнить счёт
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section id="faq" className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border-0 shadow-sm">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="support" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Поддержка</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" className="text-primary" size={32} />
                </div>
                <CardTitle>Онлайн-чат</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Ответим на вопросы в течение 2 минут</p>
                <Button variant="outline" className="w-full">Открыть чат</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" className="text-secondary" size={32} />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">support@grandmobile.ru</p>
                <Button variant="outline" className="w-full">Написать письмо</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" className="text-accent" size={32} />
                </div>
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">8-800-555-35-35</p>
                <Button variant="outline" className="w-full">Позвонить</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 Grand Mobile. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;