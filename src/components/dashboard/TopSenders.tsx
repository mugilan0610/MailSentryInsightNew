import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { TOP_SENDERS } from '../../constants';

const TopSenders: React.FC = () => {
  return (
    <div className="col-span-12 glass-card rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-lg font-bold text-on-surface">Top 5 Senders</h4>
          <p className="text-sm text-on-surface-variant">Highest volume accounts this month</p>
        </div>
        <button className="text-outline hover:text-primary transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-6">
        {TOP_SENDERS.map((sender) => (
          <div key={sender.email} className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-on-surface">{sender.email}</span>
              <span className="text-on-surface-variant font-bold">{sender.count} emails</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000" 
                style={{ 
                  width: `${sender.percentage}%`,
                  backgroundColor: sender.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSenders;
