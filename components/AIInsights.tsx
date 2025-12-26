
import React, { useState } from 'react';
import { getFinancialInsights } from '../services/geminiService';
import { Transaction, Budget, FinancialInsight } from '../types';

interface Props {
  transactions: Transaction[];
  budgets: Budget[];
}

const AIInsights: React.FC<Props> = ({ transactions, budgets }) => {
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await getFinancialInsights(transactions, budgets);
    setInsights(data);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">AI Financial Insights</h2>
            <p className="text-indigo-200 text-sm mt-1">Smarter financial decisions powered by Gemini AI</p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`px-6 py-2 rounded-xl font-semibold transition-all shadow-lg ${
              loading 
                ? 'bg-indigo-700 text-indigo-300 cursor-not-allowed' 
                : 'bg-white text-indigo-900 hover:bg-indigo-50 active:scale-95'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : 'Generate Insights'}
          </button>
        </div>

        {insights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-indigo-800/50 backdrop-blur-sm p-6 rounded-xl border border-indigo-700">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 ${
                  insight.severity === 'high' ? 'bg-rose-500' : 
                  insight.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}>
                  <span className="text-xs font-bold uppercase">{insight.severity[0]}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{insight.tip}</h4>
                <p className="text-indigo-100 text-sm leading-relaxed">{insight.description}</p>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-12 text-indigo-300">
            Click the button above to analyze your spending habits and get personalized tips.
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
