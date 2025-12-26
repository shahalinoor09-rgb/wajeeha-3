
import React from 'react';
import { Category } from './types';

export const CATEGORIES = Object.values(Category);

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.Food]: '#F59E0B',
  [Category.Transport]: '#3B82F6',
  [Category.Bills]: '#EF4444',
  [Category.Shopping]: '#EC4899',
  [Category.Entertainment]: '#8B5CF6',
  [Category.Health]: '#10B981',
  [Category.Income]: '#10B981',
  [Category.Other]: '#6B7280',
};

export const INITIAL_TRANSACTIONS = [
  { id: '1', type: 'income' as const, amount: 5000, category: Category.Income, description: 'Monthly Salary', date: '2023-10-01' },
  { id: '2', type: 'expense' as const, amount: 50, category: Category.Food, description: 'Lunch', date: '2023-10-02' },
  { id: '3', type: 'expense' as const, amount: 200, category: Category.Bills, description: 'Electricity Bill', date: '2023-10-05' },
];
