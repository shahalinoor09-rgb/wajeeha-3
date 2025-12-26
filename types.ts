
export type TransactionType = 'income' | 'expense';

export enum Category {
  Food = 'Food',
  Transport = 'Transport',
  Bills = 'Bills',
  Shopping = 'Shopping',
  Entertainment = 'Entertainment',
  Health = 'Health',
  Income = 'Income',
  Other = 'Other'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface FinancialInsight {
  tip: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}
