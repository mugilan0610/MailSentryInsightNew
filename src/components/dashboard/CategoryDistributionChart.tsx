import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const data = [
  { name: 'Sales', value: 45, color: '#4648d4' },
  { name: 'Support', value: 25, color: '#006591' },
  { name: 'Invoice', value: 20, color: '#904900' },
  { name: 'HR', value: 10, color: '#ba1a1a' },
];

const CategoryDistributionChart: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-8 h-[400px] flex flex-col">
      <h4 className="text-lg font-bold text-on-surface mb-6">Category Distribution</h4>
      <div className="relative flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold">84%</span>
          <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Efficiency</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-semibold text-on-surface-variant">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
