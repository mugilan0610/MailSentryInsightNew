import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Day 1', value: 60 },
  { name: 'Day 2', value: 45 },
  { name: 'Day 3', value: 80 },
  { name: 'Day 4', value: 65 },
  { name: 'Day 5', value: 90 },
  { name: 'Day 6', value: 75 },
  { name: 'Day 7', value: 85 },
];

const EmailsPerDayChart: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-8 h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-lg font-bold text-on-surface">Live Stream: Emails Per Day</h4>
          <p className="text-sm text-on-surface-variant">Volume trends over the last 30 days</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-semibold bg-white border border-outline-variant rounded-full">Weekly</button>
          <button className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full">Monthly</button>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4648d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4648d4" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="url(#barGradient)" />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmailsPerDayChart;
