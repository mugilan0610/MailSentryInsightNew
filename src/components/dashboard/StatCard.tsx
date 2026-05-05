import React from 'react';
import * as Icons from 'lucide-react';
import { StatData } from '../../types';

interface StatCardProps {
  stat: StatData;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = (Icons as any)[stat.icon];
  
  const typeStyles = {
    primary: 'bg-primary-fixed text-primary',
    secondary: 'bg-secondary-fixed text-secondary',
    tertiary: 'bg-tertiary-fixed text-tertiary',
    error: 'bg-error-container text-error',
  };

  const badgeStyles = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
    error: 'bg-error/10 text-error',
  };

  return (
    <div className="glass-card anti-gravity-hover p-6 rounded-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${typeStyles[stat.type]}`}>
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeStyles[stat.type]}`}>
          {stat.change}
        </span>
      </div>
      <p className="text-sm font-semibold text-on-surface-variant mb-1">{stat.label}</p>
      <h3 className="text-2xl font-bold text-on-surface">{stat.value}</h3>
      <div className="text-[10px] text-on-surface-variant/60 font-medium mt-3 flex items-center gap-1">
        <Icons.Clock className="w-3 h-3" /> Updated just now
      </div>
    </div>
  );
};

export default StatCard;
