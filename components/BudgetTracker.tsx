
import React, { useState } from 'react';
import { Budget, Category, Transaction } from '../types';
import { CATEGORIES } from '../constants';

interface Props {
  budgets: Budget[];
  transactions: Transaction[];
  onUpdateBudget: (budgets: Budget[]) => void;
}

const BudgetTracker: React.FC<Props> = ({ budgets, transactions, onUpdateBudget }) => {
  const [editing, setEditing] = useState(false);
  const [localBudgets, setLocalBudgets] = useState(budgets);

  const getSpendingForCategory = (cat: Category) => {
    return transactions
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const handleSave = () => {
    onUpdateBudget(localBudgets);
    setEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Budgets</h3>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors"
        >
          {editing ? 'Save Changes' : 'Edit Budgets'}
        </button>
      </div>

      <div className="space-y-6">
        {CATEGORIES.filter(c => c !== Category.Income).map(cat => {
          const budget = localBudgets.find(b => b.category === cat) || { category: cat, limit: 0 };
          const spent = getSpendingForCategory(cat);
          const percent = budget.limit > 0 ? Math.min((spent / budget.limit) * 100, 100) : 0;
          const isOver = budget.limit > 0 && spent > budget.limit;

          return (
            <div key={cat} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{cat}</span>
                <span className="text-gray-500">
                  {editing ? (
                    <div className="flex items-center gap-1">
                      $
                      <input
                        type="number"
                        className="w-20 px-2 py-0.5 border border-gray-200 rounded text-right outline-none"
                        value={budget.limit}
                        onChange={(e) => {
                          const newBudgets = localBudgets.map(b => 
                            b.category === cat ? { ...b, limit: parseFloat(e.target.value) || 0 } : b
                          );
                          if (!newBudgets.find(b => b.category === cat)) {
                            newBudgets.push({ category: cat, limit: parseFloat(e.target.value) || 0 });
                          }
                          setLocalBudgets(newBudgets);
                        }}
                      />
                    </div>
                  ) : (
                    <span className={isOver ? 'text-rose-600 font-bold' : ''}>
                      ${spent.toLocaleString()} / ${budget.limit.toLocaleString()}
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${isOver ? 'bg-rose-500' : 'bg-indigo-500'}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              {isOver && !editing && (
                <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight">Overspending Alert!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
