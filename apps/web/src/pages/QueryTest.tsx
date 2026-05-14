import { useCallback } from 'react';
import { useAddTransaction, useDeleteTransaction, useTransactionsWithTotals } from '@fintrack-pro/store';
import { WButton, WCard, WContainer, WTypography } from '@fintrack-pro/ui-kit';

export const QueryTest = () => {
  const { transactions, totalIncome, totalExpense, balance, isLoading, error } = useTransactionsWithTotals();

  const addMutation = useAddTransaction();
  const deleteMutation = useDeleteTransaction();

  const handleAddTestTransaction = useCallback(() => {
    const isIncome = Math.random() > 0.5;
    addMutation.mutate({
      amount: Math.floor(Math.random() * 1000) + 100,
      type: isIncome ? 'income' : 'expense',
      categoryId: isIncome ? 'salary' : 'food',
      description: 'Тестовая транзакция',
      date: new Date().toISOString(),
    });
  }, [addMutation]);

  if (isLoading) return <WTypography>Загрузка...</WTypography>;
  if (error) return <WTypography>Ошибка: {error.message}</WTypography>;

  return (
    <WContainer maxWidth='lg' className='py-8'>
      <WTypography variant='h2' className='mb-6'>
        Тест TanStack Query
      </WTypography>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
        <WCard padding='md'>
          <WTypography variant='body' color='muted' className='mb-1'>
            Доходы
          </WTypography>
          <WTypography variant='h3' color='primary'>
            +{totalIncome.toLocaleString()} ₽
          </WTypography>
        </WCard>

        <WCard padding='md'>
          <WTypography variant='body' color='muted' className='mb-1'>
            Расходы
          </WTypography>
          <WTypography variant='h3' color='secondary'>
            -{totalExpense.toLocaleString()} ₽
          </WTypography>
        </WCard>

        <WCard padding='md'>
          <WTypography variant='body' color='muted' className='mb-1'>
            Баланс
          </WTypography>
          <WTypography variant='h3' color={balance >= 0 ? 'primary' : 'error'}>
            {balance >= 0 ? '+' : ''}
            {balance.toLocaleString()} ₽
          </WTypography>
        </WCard>
      </div>

      <WButton onClick={handleAddTestTransaction} loading={addMutation.isPending} className='mb-6'>
        Добавить тестовую транзакцию
      </WButton>

      <div className='space-y-2'>
        {transactions?.map(transaction => {
          return (
            <WCard key={transaction.id} padding='md'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div>
                  <WTypography>{transaction.description || transaction.categoryId}</WTypography>
                  <WTypography variant='caption' color='muted'>
                    {new Date(transaction.date).toLocaleDateString()}
                  </WTypography>
                </div>

                <div>
                  <WTypography color={transaction.type === 'income' ? 'primary' : 'secondary'} className='font-semibold'>
                    {transaction.type === 'income' ? '+' : '-'}
                    {transaction.amount.toLocaleString()} ₽
                  </WTypography>
                </div>

                <div>
                  <WButton
                    size='sm'
                    onClick={deleteMutation.mutate}
                    context={transaction.id}
                    loading={deleteMutation.isPending && deleteMutation.variables === transaction.id}>
                    Удалить
                  </WButton>
                </div>
              </div>
            </WCard>
          );
        })}
      </div>

      {transactions?.length === 0 && (
        <WCard padding='lg' className='text-center'>
          <WTypography color='muted'>{"Нет транзакций. Нажмите кнопку 'Добавить', чтобы создать первую."}</WTypography>
        </WCard>
      )}
    </WContainer>
  );
};
