import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  ChevronsUpDown,
  Flag,
  Trash2,
  Brain,
  Phone,
  Hash,
  DollarSign,
  RotateCw
} from 'lucide-react';
import { EMAIL_LOGS } from '../constants';
import { EmailLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const Emails: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('#MS-8944');

  const categories = ['All Communications', 'Sales Lead', 'Support', 'Invoice', 'HR', 'Internal', 'Spam'];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Live Communication Stream</h2>
          <p className="text-outline mt-1 font-medium">Deep-packet inspection and metadata analysis for all incoming mail.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-on-surface-variant font-semibold shadow-sm border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-on-surface-variant font-semibold shadow-sm border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm flex flex-wrap items-center gap-6 glass-edge">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Category</label>
          <select className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2 text-sm font-medium focus:ring-primary focus:border-primary min-w-[200px] outline-none">
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Date Range</label>
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2 text-sm font-medium">
            <RefreshCw className="text-outline w-4 h-4 mr-2" />
            <span>Oct 12, 2023 - Oct 19, 2023</span>
          </div>
        </div>
        <div className="ml-auto">
          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/50 glass-edge">
        <div className="px-6 py-2 bg-primary/10 border-b border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="text-primary w-4 h-4" />
            <p className="text-xs font-bold text-primary tracking-wide">NEW MESSAGE DETECTED</p>
          </div>
          <p className="text-[10px] text-primary/60 font-medium">Just now</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                {['Email ID', 'Sender', 'Subject', 'Category', 'Date'].map((header) => (
                  <th key={header} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-outline border-b border-outline-variant/20">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                      {header} <ChevronsUpDown className="w-3 h-3" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {EMAIL_LOGS.map((email) => (
                <React.Fragment key={email.id}>
                  <tr 
                    onClick={() => setExpandedId(expandedId === email.id ? null : email.id)}
                    className={`hover:bg-primary/5 transition-colors cursor-pointer group ${expandedId === email.id ? 'bg-indigo-50/40' : ''}`}
                  >
                    <td className="px-6 py-5 text-sm font-mono text-outline">{email.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {email.senderInitials}
                        </div>
                        <span className="text-sm font-semibold text-on-surface">{email.sender}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-on-surface-variant font-medium">{email.subject}</td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-primary-fixed text-on-primary-fixed-variant">
                        {email.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-outline text-right font-medium">{email.date}</td>
                  </tr>
                  
                  <AnimatePresence>
                    {expandedId === email.id && email.body && (
                      <tr>
                        <td colSpan={5} className="p-0 border-b border-primary/20">
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-8 border-l-4 border-primary overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h3 className="text-lg font-bold text-on-surface">{email.subject}</h3>
                                <p className="text-sm text-outline">From: <span className="text-primary font-medium">{email.senderEmail}</span></p>
                              </div>
                              <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white shadow-sm border border-outline-variant/30 text-primary hover:bg-primary hover:text-white transition-all">
                                  <Flag className="w-5 h-5" />
                                </button>
                                <button className="p-2 rounded-lg bg-white shadow-sm border border-outline-variant/30 text-error hover:bg-error hover:text-white transition-all">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-12 gap-8">
                              <div className="col-span-7 space-y-4">
                                <div className="bg-white/80 p-6 rounded-2xl border border-white/50 shadow-sm glass-edge">
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Full Email Body</p>
                                  <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                                    {email.body}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 space-y-4">
                                <div className="bg-gradient-to-br from-white to-surface-container-low p-6 rounded-2xl border border-white/50 shadow-sm glass-edge">
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-4 flex items-center gap-2">
                                    <Brain className="w-3 h-3" />
                                    Extracted Entities
                                  </p>
                                  <div className="space-y-3">
                                    {[
                                      { label: 'Phone Number', value: '+1 (555) 012-3456', icon: Phone, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
                                      { label: 'ID Number', value: '99-8877665', icon: Hash, color: 'bg-secondary-fixed text-on-secondary-fixed' },
                                      { label: 'Currency', value: '$14,500.00', icon: DollarSign, color: 'bg-primary-fixed text-on-primary-fixed' },
                                    ].map((ent) => (
                                      <div key={ent.label} className="flex items-center justify-between p-3 rounded-xl bg-white border border-outline-variant/20 shadow-sm">
                                        <div className="flex items-center gap-3">
                                          <div className={`p-2 rounded-lg ${ent.color}`}>
                                            <ent.icon className="w-4 h-4" />
                                          </div>
                                          <span className="text-xs font-bold text-on-surface">{ent.label}</span>
                                        </div>
                                        <span className="text-sm font-mono text-primary font-bold">{ent.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-surface-container-low/30 flex items-center justify-between border-t border-outline-variant/20">
          <p className="text-xs font-medium text-outline">Showing <span className="text-on-surface font-bold">1-4</span> of <span className="text-on-surface font-bold">1,240</span> communication logs</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-white transition-colors border border-outline-variant/10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-white transition-colors text-xs font-bold">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-white transition-colors border border-outline-variant/10">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emails;
