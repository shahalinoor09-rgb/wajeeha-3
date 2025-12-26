
import React from 'react';

interface Props {
  onExport: () => void;
}

const Header: React.FC<Props> = ({ onExport }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
            FinAI
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-indigo-600">Dashboard</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Reports</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Budget</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">Settings</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-indigo-300 transition-colors">
            <img src="https://picsum.photos/40/40?random=1" alt="Profile" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
