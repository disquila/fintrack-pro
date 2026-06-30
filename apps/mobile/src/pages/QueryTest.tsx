import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import { useAddTransaction, useDeleteTransaction, useTransactionsWithTotals } from '@fintrack-pro/features/transactions';
import { Button, Card, Col, Container, Row, Typography } from '@fintrack-pro/shared/ui/mobile';
import { useAppSelector } from '@fintrack-pro/app/store';

export const QueryTest: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const { transactions, totalIncome, totalExpense, balance, isLoading, error } = useTransactionsWithTotals();
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

  if (error) {
    return (
      <Container safeArea>
        <Typography color='error'>Ошибка: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container safeArea>
      <ScrollView className='flex-1 py-8'>
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
          <Row gap='md' className='flex-wrap'>
            <Col className='flex-1'>
              <Typography variant='body' color='muted' className='mb-1'>
                Доходы
              </Typography>
              <Typography variant='h3' color='primary'>
                +{totalIncome.toLocaleString()} ₽
              </Typography>
            </Col>
            <Col className='flex-1'>
              <Typography variant='body' color='muted' className='mb-1'>
                Расходы
              </Typography>
              <Typography variant='h3' color='secondary'>
                -{totalExpense.toLocaleString()} ₽
              </Typography>
            </Col>
            <Col className='flex-1'>
              <Typography variant='body' color='muted' className='mb-1'>
                Баланс
              </Typography>
              <Typography variant='h3' color={balance >= 0 ? 'primary' : 'error'}>
                {balance >= 0 ? '+' : ''}
                {balance.toLocaleString()} ₽
              </Typography>
            </Col>
          </Row>
        </Card>

        <Button onClick={handleAddRandomTransaction} loading={addMutation.isPending} className='mb-6'>
          Добавить случайную транзакцию
        </Button>

        {isLoading ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
            {transactions?.map(transaction => (
              <Card key={transaction.id} className='mb-2'>
                <Row justify='between' align='center' wrap>
                  <Col className='flex-1'>
                    <Typography variant='body' weight='medium'>
                      {transaction.description}
                    </Typography>
                    <Typography variant='caption' color='secondary'>
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </Col>
                  <Col>
                    <Typography variant='body' color={transaction.type === 'income' ? 'primary' : 'error'} weight='bold'>
                      {transaction.type === 'income' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} ₽
                    </Typography>
                  </Col>
                  <Col>
                    <Button
                      size='sm'
                      onClick={deleteMutation.mutate}
                      context={transaction.id}
                      loading={deleteMutation.isPending && deleteMutation.variables === transaction.id}>
                      Удалить
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </>
        )}

        {transactions?.length === 0 && !isLoading && (
          <Card className='py-8 items-center'>
            <Typography color='muted' className='text-center'>
              {'Нет транзакций. Нажмите "Добавить случайную транзакцию"'}
            </Typography>
          </Card>
        )}
      </ScrollView>
    </Container>
  );
};

export default QueryTest;
