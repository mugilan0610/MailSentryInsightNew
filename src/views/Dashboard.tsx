import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import EmailsPerDayChart from '../components/dashboard/EmailsPerDayChart';
import CategoryDistributionChart from '../components/dashboard/CategoryDistributionChart';
import TopSenders from '../components/dashboard/TopSenders';
import { STATS } from '../constants';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface flex items-center">
          Intelligence Overview
          <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
            <span className="relative flex h-2 w-2 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            LIVE
          </span>
        </h2>
        <p className="text-on-surface-variant font-medium">Real-time mail analysis and security posture for your organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <EmailsPerDayChart />
        <CategoryDistributionChart />
        <TopSenders />
      </div>

      <button className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 glass-edge">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Dashboard;
