export interface ITopCategory {
  name: string;
  amount: number;
}

export interface IPortfolioStats {
  balance: number; // текущий баланс
  monthlyIncome: number; // доходы за месяц
  monthlyExpense: number; // расходы за месяц
  savingsRate: number; // процент сбережений
  topCategories: ITopCategory[]; // топ категории расходов
}

export interface IPortfolioState {
  stats: IPortfolioStats | null;
  isLoading: boolean;
  error: string | null;
}
