import React from 'react';
import { Search, Zap, Moon } from 'lucide-react';

const TopNavbar: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 h-[70px] border-b border-white/20 bg-white/5 backdrop-blur-xl shadow-sm flex items-center justify-between px-8 ml-[250px] w-[calc(100%-250px)] z-40">
      <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-full w-96 border border-outline-variant/30">
        <Search className="text-outline w-5 h-5" />
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-outline/60 outline-none" 
          placeholder="Search intelligence data..." 
          type="text"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-white px-5 py-2 rounded-full text-sm font-semibold scale-105 active:scale-95 transition-transform shadow-lg shadow-primary/20">
          <Zap className="w-4 h-4" />
          Run Analysis
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-outline-variant/30">
          <button className="p-2 text-slate-500 hover:opacity-80 transition-opacity">
            <Moon className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed ring-2 ring-white/50">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7g80O2iUOyT-nWwj5X_RuQ7ae1tAoc01TqOdWXkQa1dKdSxsf0HjnF0tfwZxW33latZ-BfEHo523uLkJttUJlH8hZ_l_Ub4DaJ5H83ErTfxdrVfZ8rxBntDjS2jqotVMjXWz5xrQ3jqqn-8YNV1YBUIkkl60DelzBDY0RQin0Nt-ykAQXbiTAVk2MbF1G4Cr5R9kc8kMJsipG8xKbTcDxSZlLGvCmbhTW2fuqhYrSbvXQaIMIiNhsfWUcB4Q1TcnSNZD8mOqL3IZc"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
