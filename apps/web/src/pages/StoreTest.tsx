import React, { useCallback } from 'react';
import { useAddTransaction, useAppSelector, useDeleteTransaction, useTransactionsWithTotals } from '@fintrack-pro/store';
import { WButton, WCard, WCol, WContainer, WRow, WTypography } from '@fintrack-pro/ui-kit';

export const StoreTest: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  const { transactions, totalIncome, totalExpense, balance, isLoading, error } = useTransactionsWithTotals();

  const addMutation = useAddTransaction();
  const deleteMutation = useDeleteTransaction();

  const handleAddRandomTransaction = useCallback(() => {
    const isIncome = Math.random() > 0.5;
    addMutation.mutate({
      amount: Math.floor(Math.random() * 1000) + 100,
      type: isIncome ? 'income' : 'expense',
      categoryId: isIncome ? 'salary' : 'food',
      description: 'Тестовая транзакция',
      date: new Date().toISOString(),
    });
  }, [addMutation]);

  if (error) {
    return (
      <WContainer>
        <div className='py-8'>
          <WTypography color='error'>Ошибка: {error.message}</WTypography>
        </div>
      </WContainer>
    );
  }

  return (
    <WContainer>
      <div className='py-8'>
        <WTypography variant='h1' className='mb-4'>
          Тест Store (TanStack Query)
        </WTypography>

        <WCard className='mb-6'>
          <WTypography variant='h3' className='mb-2'>
            Auth State
          </WTypography>
          <WTypography variant='body'>User: {user ? user.name : 'Не авторизован'}</WTypography>
        </WCard>

        <WCard className='mb-6'>
          <WTypography variant='h3' className='mb-2'>
            Transactions Stats
          </WTypography>
          <WRow gap='md'>
            <WCol span={4}>
              <WTypography variant='body' color='muted' className='mb-1'>
                Доходы
              </WTypography>
              <WTypography variant='h3' color='primary'>
                +{totalIncome.toLocaleString()} ₽
              </WTypography>
            </WCol>
            <WCol span={4}>
              <WTypography variant='body' color='muted' className='mb-1'>
                Расходы
              </WTypography>
              <WTypography variant='h3' color='secondary'>
                -{totalExpense.toLocaleString()} ₽
              </WTypography>
            </WCol>
            <WCol span={4}>
              <WTypography variant='body' color='muted' className='mb-1'>
                Баланс
              </WTypography>
              <WTypography variant='h3' color={balance >= 0 ? 'primary' : 'error'}>
                {balance >= 0 ? '+' : ''}
                {balance.toLocaleString()} ₽
              </WTypography>
            </WCol>
          </WRow>
        </WCard>

        <WRow justify='center' gap='md' className='mb-6'>
          <WCol>
            <WButton onClick={handleAddRandomTransaction} loading={addMutation.isPending}>
              Добавить случайную транзакцию
            </WButton>
          </WCol>
        </WRow>

        {isLoading && (
          <WTypography variant='body' className='text-center py-8'>
            Загрузка...
          </WTypography>
        )}

        <div className='space-y-2 max-h-96 overflow-y-auto'>
          {transactions?.map(transaction => {
            return (
              <WCard key={transaction.id} padding='sm'>
                <WRow justify='between' align='center' wrap>
                  <WCol>
                    <WTypography variant='body' weight='medium'>
                      {transaction.description}
                    </WTypography>
                    <WTypography variant='caption' color='secondary'>
                      {new Date(transaction.date).toLocaleDateString()}
                    </WTypography>
                  </WCol>

                  <WCol>
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'} {transaction.amount.toLocaleString()} ₽
                    </span>
                  </WCol>

                  <WCol>
                    <WButton
                      size='sm'
                      onClick={deleteMutation.mutate}
                      context={transaction.id}
                      loading={deleteMutation.isPending && deleteMutation.variables === transaction.id}>
                      Удалить
                    </WButton>
                  </WCol>
                </WRow>
              </WCard>
            );
          })}
        </div>

        {transactions?.length === 0 && !isLoading && (
          <WTypography variant='body' className='text-center py-8'>
            {"Нет транзакций. Нажмите 'Добавить случайную транзакцию'"}
          </WTypography>
        )}
      </div>
    </WContainer>
  );
};
