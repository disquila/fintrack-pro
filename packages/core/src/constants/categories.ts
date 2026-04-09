export const CATEGORIES = {
  income: [
    'Salary', // зарплата
    'Freelance', // фриланс
    'Investment', // инвестиции
    'Gift', // подарок
    'Other', // другое
  ] as const,
  expense: [
    'Food', // еда
    'Transport', // транспорт
    'Entertainment', // развлечения
    'Shopping', // покупки
    'Bills', // коммунальные
    'Health', // здоровье
    'Other', // другое
  ] as const,
} as const;

export type TIncomeCategory = (typeof CATEGORIES.income)[number];
// "Salary" | "Freelance" | "Investment" | "Gift" | "Other"

export type TExpenseCategory = (typeof CATEGORIES.expense)[number];
// "Food" | "Transport" | "Entertainment" | "Shopping" | "Bills" | "Health" | "Other"

export type TCategory = TIncomeCategory | TExpenseCategory;
