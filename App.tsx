
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AIInsights from './components/AIInsights';
import BudgetTracker from './components/BudgetTracker';
import { Transaction, Budget, Category } from './types';
import { INITIAL_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finai_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('finai_budgets');
    return saved ? JSON.parse(saved) : [
      { category: Category.Food, limit: 500 },
      { category: Category.Transport, limit: 200 },
      { category: Category.Bills, limit: 1000 },
      { category: Category.Shopping, limit: 300 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('finai_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finai_budgets', JSON.stringify(budgets));
  }, [budgets]);

  const addTransaction = (t: Transaction) => {
    setTransactions([t, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = transactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `finai_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onExport={exportCSV} />
      
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8 max-w-7xl">
        {/* Top Section: AI Insights (Hero Area) */}
        <AIInsights transactions={transactions} budgets={budgets} />

        {/* Middle Section: Dashboard & Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Data Entry & Budgets */}
          <div className="lg:col-span-4 space-y-8">
            <TransactionForm onAdd={addTransaction} />
            <BudgetTracker 
              budgets={budgets} 
              transactions={transactions} 
              onUpdateBudget={setBudgets} 
            />
          </div>

          {/* Right Column: Visualization & List */}
          <div className="lg:col-span-8 space-y-8">
            <Dashboard transactions={transactions} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FinAI Expense Tracker. Secure, Private, and Intelligent.
        </div>
      </footer>
    </div>
  );
};

export default App;
