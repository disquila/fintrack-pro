import React, { useCallback, useEffect } from 'react';

import { addTransaction, fetchTransactions, useAppDispatch, useAppSelector } from '@fintrack/store';
import { WButton, WCard, WCol, WContainer, WRow, WTypography } from '@fintrack/ui-kit';

const StoreTest: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: transactions, isLoading, totalIncome, totalExpense } = useAppSelector(state => state.transactions);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleFetchTransactions = useCallback(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleAddRandomTransaction = useCallback(() => {
    dispatch(
      addTransaction({
        amount: Math.floor(Math.random() * 1000) + 100,
        type: Math.random() > 0.5 ? 'income' : 'expense',
        categoryId: '1',
        description: 'Тестовая транзакция',
        date: new Date().toISOString(),
      }),
    );
  }, [dispatch]);

  return (
    <WContainer>
      <div className='py-8'>
        <WTypography variant='h1' className='mb-4'>
          Redux Store Test
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
            <WCol className='w-1/2'>
              <WTypography variant='body'>Доходы: {totalIncome} ₽</WTypography>
            </WCol>
            <WCol className='w-1/2'>
              <WTypography variant='body'>Расходы: {totalExpense} ₽</WTypography>
            </WCol>
          </WRow>
        </WCard>

        <WRow justify='center' gap='md' className='mb-6' wrap>
          <WCol className='w-full md:w-auto'>
            <WButton variant='primary' fullWidth onClick={handleFetchTransactions}>
              Загрузить транзакции
            </WButton>
          </WCol>
          <WCol className='w-full md:w-auto'>
            <WButton variant='outline' fullWidth onClick={handleAddRandomTransaction}>
              Добавить случайную
            </WButton>
          </WCol>
        </WRow>

        {isLoading && <WTypography variant='body'>Загрузка...</WTypography>}

        <div className='space-y-2 max-h-96 overflow-y-auto'>
          {transactions.map(t => (
            <WCard key={t.id} padding='sm'>
              <WRow justify='between' align='center'>
                <WCol>
                  <WTypography variant='body' weight='medium'>
                    {t.description}
                  </WTypography>
                  <WTypography variant='caption' color='secondary'>
                    {new Date(t.date).toLocaleDateString()}
                  </WTypography>
                </WCol>
                <WCol>
                  <span className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {t.type === 'income' ? '+' : '-'} {t.amount} ₽
                  </span>
                </WCol>
              </WRow>
            </WCard>
          ))}
        </div>

        {transactions.length === 0 && !isLoading && (
          <WTypography variant='body' color='secondary' className='text-center py-8'>
            {"Нет транзакций. Нажмите 'Загрузить' или 'Добавить случайную'"}
          </WTypography>
        )}
      </div>
    </WContainer>
  );
};

export default StoreTest;
