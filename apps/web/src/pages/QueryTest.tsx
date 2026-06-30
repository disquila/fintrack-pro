import React, { useCallback } from 'react';

import { useAddTransaction, useDeleteTransaction, useTransactionsWithTotals } from '@fintrack-pro/features/transactions';
import { Button, Card, Container, Typography } from '@fintrack-pro/shared/ui/web';
import { useAppSelector } from '@fintrack-pro/app/store';

export const QueryTest: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { transactions, totalIncome, totalExpense, balance } = useTransactionsWithTotals();
  const addMutation = useAddTransaction();
  const deleteMutation = useDeleteTransaction();

  const handleAddRandomTransaction = useCallback(() => {
    const isIncome = Math.random() > 0.5;
    addMutation.mutate({
      amount: Math.floor(Math.random() * 1000) + 100,
      type: isIncome ? 'income' : 'expense',
      categoryId: isIncome ? '1' : '2',
      description: 'Тестовая транзакция',
      date: new Date().toISOString(),
    });
  }, [addMutation]);

  return (
    <Container>
      <div className='py-8'>
        <Typography variant='h1' className='mb-4'>
          Тест Query
        </Typography>

        <Card className='mb-6'>
          <Typography variant='h3' className='mb-2'>
            Auth State
          </Typography>
          <Typography variant='body'>User: {user ? user.displayName : 'Не авторизован'}</Typography>
        </Card>

        <Card className='mb-6'>
          <Typography variant='h3' className='mb-2'>
            Transactions Stats
          </Typography>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex-1'>
              <Typography variant='body' color='muted' className='mb-1'>
                Доходы
              </Typography>
              <Typography variant='h3' color='primary'>
                +{totalIncome.toLocaleString()} ₽
              </Typography>
            </div>
            <div className='flex-1'>
              <Typography variant='body' color='muted' className='mb-1'>
                Расходы
              </Typography>
              <Typography variant='h3' color='secondary'>
                -{totalExpense.toLocaleString()} ₽
              </Typography>
            </div>
            <div className='flex-1'>
              <Typography variant='body' color='muted' className='mb-1'>
                Баланс
              </Typography>
              <Typography variant='h3' color={balance >= 0 ? 'primary' : 'error'}>
                {balance >= 0 ? '+' : ''}
                {balance.toLocaleString()} ₽
              </Typography>
            </div>
          </div>
        </Card>

        <Button onClick={handleAddRandomTransaction} loading={addMutation.isPending} className='mb-6'>
          Добавить случайную транзакцию
        </Button>

        {transactions.map(transaction => (
          <Card key={transaction.id} className='mb-2'>
            <div className='flex justify-between items-center'>
              <div className='flex-1'>
                <Typography variant='body' weight='medium'>
                  {transaction.description}
                </Typography>
                <Typography variant='caption' color='secondary'>
                  {new Date(transaction.date).toLocaleDateString()}
                </Typography>
              </div>
              <div>
                <Typography variant='body' color={transaction.type === 'income' ? 'primary' : 'error'} weight='bold'>
                  {transaction.type === 'income' ? '+' : '-'}
                  {transaction.amount.toLocaleString()} ₽
                </Typography>
              </div>
              <div>
                <Button
                  size='sm'
                  onClick={deleteMutation.mutate}
                  context={transaction.id}
                  loading={deleteMutation.isPending && deleteMutation.variables === transaction.id}>
                  Удалить
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {transactions.length === 0 && (
          <Card className='py-8 text-center'>
            <Typography color='muted'>{'Нет транзакций. Нажмите "Добавить случайную транзакцию"'}</Typography>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default QueryTest;
