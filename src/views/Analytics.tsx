import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, User, Lightbulb, Sparkles, RotateCw } from 'lucide-react';

const ratioData = [
  { name: 'Leads', value: 58, color: '#4648d4' },
  { name: 'Support', value: 24, color: '#006591' },
  { name: 'Invoice', value: 18, color: '#904900' },
];

const trendData = [
  { name: 'JAN', security: 60, volume: 40 },
  { name: 'FEB', security: 75, volume: 65 },
  { name: 'MAR', security: 50, volume: 55 },
  { name: 'APR', security: 90, volume: 85 },
  { name: 'MAY', security: 65, volume: 70 },
  { name: 'JUN', security: 95, volume: 95 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            Analytics Intelligence
            <div className="inline-flex items-center gap-2 bg-error/10 text-error px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-error/20 animate-pulse">
              <span className="w-2 h-2 bg-error rounded-full"></span>
              Live Stream
            </div>
          </h2>
          <p className="text-slate-500 mt-1">Cross-sectional analysis of organizational mail flow and entity sentiment.</p>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5">
            <RotateCw className="w-3.5 h-3.5" />
            Data Freshness: Real-time
          </p>
        </div>
        <div className="flex gap-2">
          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-tighter">Live Stream</span>
          <span className="bg-surface-container text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-outline-variant uppercase tracking-tighter">Last 30 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 glass-card rounded-3xl p-8 hover:translate-y-[-4px] transition-all duration-300">
          <div className="flex items-center gap-1.5 text-[10px] text-primary font-bold uppercase tracking-widest mb-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
            Live Feed Active
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-6">Lead vs Support vs Invoice Ratio</h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ratioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900">2.4k</span>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Volume</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {ratioData.map(item => (
              <div key={item.name} className="text-center">
                <p className="text-xs text-slate-500 font-medium">{item.name}</p>
                <p className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 glass-card rounded-3xl p-8 hover:translate-y-[-4px] transition-all duration-300">
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              Monthly Email Trends
              <span className="ml-3 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/20 uppercase tracking-tighter">Live</span>
            </h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12.4% vs LY</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <XAxis dataKey="name" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                  }}
                />
                <Bar dataKey="security" fill="#4648d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="volume" fill="#e1e0ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-xs text-slate-500 font-medium">Inbound Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-100"></div>
              <span className="text-xs text-slate-500 font-medium">Standard Volume</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 glass-card rounded-3xl p-8 relative overflow-hidden group hover:translate-y-[-4px] transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-10 scale-150">
            <Lightbulb className="w-24 h-24 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Key Insights
          </h3>
          <ul className="space-y-6">
            {[
              { label: 'Top performing category', value: 'Sales Leads', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Peak email day', value: 'Tuesday', icon: Calendar, color: 'bg-secondary-container/10 text-secondary' },
              { label: 'Most active sender', value: 'billing@provider.com', icon: User, color: 'bg-tertiary-container/10 text-tertiary' },
            ].map(insight => (
              <li key={insight.label} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${insight.color}`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{insight.label}</p>
                  <p className="text-slate-800 font-bold">{insight.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-8 glass-card rounded-3xl p-1 bg-white/20">
          <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative min-h-[300px]">
            <img 
              alt="Global Reach" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9GjL3Xr1667aphREJp7DdkUEXuPGSeIy_wP84TWus_7xkLD70he_HwTSUhtCT4x8e8HcNrTaMgXySC4g8bt2x571eEpH28FoL4k9dS-APfIxXGWEMvXWZZxaE_xCK6PwlABs9JaKp5aDLXVwnscHjvebX0-Ot1fnXncqcVOLVckTkuTWaMLrc6SUBoYMraFCYRm6PCAagkWCI3b-hTokl3kam85OL-m6EvsVD-Rs1yoASLTxKvbU-m9U1DOh775ZxvGwW1qrwONGe"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-8">
              <h4 className="text-xl font-bold text-slate-900">Global Reach Analysis</h4>
              <p className="text-sm text-slate-600 font-medium">Real-time geographic distribution of entity interaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
