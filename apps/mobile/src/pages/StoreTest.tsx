import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useAddTransaction, useDeleteTransaction, useTransactionsWithTotals } from '@fintrack-pro/store';
import { MButton, MCard, MCol, MContainer, MRow, MTypography } from '@fintrack-pro/ui-kit';
import { useAppSelector } from '../store';

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
      <MContainer safeArea>
        <MTypography color='error'>Ошибка: {error.message}</MTypography>
      </MContainer>
    );
  }

  return (
    <MContainer safeArea>
      <ScrollView className='flex-1 py-8'>
        <MTypography variant='h1' className='mb-4'>
          Тест Store
        </MTypography>

        <MCard className='mb-6'>
          <MTypography variant='h3' className='mb-2'>
            Auth State
          </MTypography>
          <MTypography variant='body'>User: {user ? user.name : 'Не авторизован'}</MTypography>
        </MCard>

        <MCard className='mb-6'>
          <MTypography variant='h3' className='mb-2'>
            Transactions Stats
          </MTypography>
          <MRow gap='md' className='flex-wrap'>
            <MCol className='flex-1'>
              <MTypography variant='body' color='muted' className='mb-1'>
                Доходы
              </MTypography>
              <MTypography variant='h3' color='primary'>
                +{totalIncome.toLocaleString()} ₽
              </MTypography>
            </MCol>
            <MCol className='flex-1'>
              <MTypography variant='body' color='muted' className='mb-1'>
                Расходы
              </MTypography>
              <MTypography variant='h3' color='secondary'>
                -{totalExpense.toLocaleString()} ₽
              </MTypography>
            </MCol>
            <MCol className='flex-1'>
              <MTypography variant='body' color='muted' className='mb-1'>
                Баланс
              </MTypography>
              <MTypography variant='h3' color={balance >= 0 ? 'primary' : 'error'}>
                {balance >= 0 ? '+' : ''}
                {balance.toLocaleString()} ₽
              </MTypography>
            </MCol>
          </MRow>
        </MCard>

        <MButton onClick={handleAddRandomTransaction} loading={addMutation.isPending} className='mb-6'>
          Добавить случайную транзакцию
        </MButton>

        {isLoading ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
            {transactions?.map(transaction => (
              <MCard key={transaction.id} className='mb-2'>
                <MRow justify='between' align='center' wrap>
                  <MCol className='flex-1'>
                    <MTypography variant='body' weight='medium'>
                      {transaction.description}
                    </MTypography>
                    <MTypography variant='caption' color='secondary'>
                      {new Date(transaction.date).toLocaleDateString()}
                    </MTypography>
                  </MCol>
                  <MCol>
                    <MTypography variant='body' color={transaction.type === 'income' ? 'primary' : 'error'} weight='bold'>
                      {transaction.type === 'income' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} ₽
                    </MTypography>
                  </MCol>
                  <MCol>
                    <MButton
                      size='sm'
                      onClick={deleteMutation.mutate}
                      context={transaction.id}
                      loading={deleteMutation.isPending && deleteMutation.variables === transaction.id}>
                      Удалить
                    </MButton>
                  </MCol>
                </MRow>
              </MCard>
            ))}
          </>
        )}

        {transactions?.length === 0 && !isLoading && (
          <MCard className='py-8 items-center'>
            <MTypography color='muted' className='text-center'>
              {"Нет транзакций. Нажмите 'Добавить случайную транзакцию'"}
            </MTypography>
          </MCard>
        )}
      </ScrollView>
    </MContainer>
  );
};

export default StoreTest;
