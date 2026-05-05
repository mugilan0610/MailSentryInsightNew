import React from 'react';
import { 
  LayoutDashboard, 
  Mail, 
  Network, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Shield
} from 'lucide-react';
import { ViewType } from '../../types';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: ViewType.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewType.EMAILS, label: 'Emails', icon: Mail },
    { id: ViewType.ENTITIES, label: 'Entities', icon: Network },
    { id: ViewType.ANALYTICS, label: 'Analytics', icon: BarChart3 },
  ];

  const secondaryItems = [
    { id: ViewType.SETTINGS, label: 'Settings', icon: Settings },
    { id: ViewType.SUPPORT, label: 'Support', icon: HelpCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] glass-sidebar flex flex-col p-6 z-50">
      <div className="flex flex-col gap-1 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tighter text-slate-900">MailSentry Insight™</h1>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-11">Intelligence Dashboard</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out ${
              activeView === item.id 
                ? 'bg-white/20 text-indigo-600 font-semibold shadow-sm' 
                : 'text-slate-500 hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-2">
        {secondaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out ${
              activeView === item.id 
                ? 'bg-white/20 text-indigo-600 font-semibold shadow-sm' 
                : 'text-slate-500 hover:bg-white/10 hover:translate-x-1'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
