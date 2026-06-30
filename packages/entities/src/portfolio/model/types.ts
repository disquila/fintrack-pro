export interface TopCategory {
  name: string;
  amount: number;
}

export interface PortfolioStats {
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savingsRate: number;
  topCategories: TopCategory[];
}
