import React from 'react';
import { Download, ChevronLeft, ChevronRight, Search, RotateCw, Database } from 'lucide-react';
import { ENTITIES } from '../constants';
import { motion } from 'motion/react';

const Entities: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Extracted Intelligence</h2>
          <p className="text-on-surface-variant mt-2 font-medium">Monitoring 1,284 entities identified across global communication nodes.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white/40 backdrop-blur-md border border-white/60 glass-edge rounded-xl text-slate-700 font-semibold shadow-sm hover:bg-white/60 hover:-translate-y-1 transition-all active:scale-95">
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/40 glass-edge shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                {['Email ID', 'Phone Number', 'Invoice ID', 'Ticket ID', 'Amount', 'Order ID', 'Status'].map(header => (
                  <th key={header} className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ENTITIES.map((entity) => (
                <tr key={entity.id} className="hover:bg-white/40 transition-colors group">
                  <td className="px-8 py-6 font-mono text-xs text-indigo-600 font-semibold">{entity.emailId}</td>
                  <td className="px-8 py-6 text-sm text-slate-700">{entity.phoneNumber}</td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-900">{entity.invoiceId}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{entity.ticketId}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-900">{entity.amount}</td>
                  <td className="px-8 py-6 font-mono text-xs text-slate-500">{entity.orderId}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                      entity.status === 'Verified' ? 'bg-green-100 text-green-700' :
                      entity.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-error-container text-on-error-container'
                    }`}>
                      {entity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 border-t border-white/20 bg-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium tracking-tight">Showing 1 to 6 of 1,284 entries</span>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/50 text-slate-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/50 text-slate-600 font-medium transition-colors">2</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/50 text-slate-600 font-medium transition-colors">128</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/50 text-slate-400 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-8">
        <div className="p-8 bg-indigo-600/5 rounded-3xl border border-indigo-500/10 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
            <Database className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-indigo-900">Real-time Indexing</h4>
          <p className="text-sm text-indigo-600/70 mt-2">Entities are being mapped across 12 source channels.</p>
        </div>
        <div className="col-span-2 relative overflow-hidden rounded-3xl border border-white/40 glass-edge shadow-lg h-48">
          <img 
            alt="Data Visualization" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBkcE09E7edipyqYIjHRax_GwPty3EfLuPRNwAA34WY2M7hSgk2NPEDkJTEQYJwutYptSkJfNY6cJcXJj7DUUO1zrpse09MF5ZlS6oXtfAakgZ-KSIDFFQczRpeqmmg5R6dwQCNW4-S4WEMofpXKXVHlOovkvg_hfzCBFdNMU2pb83pvvGIK1mq_W4-7Vb3zTss41WuYQ5z3XCaIDj090zP8RY4KYThatW7vfElg5dWbantVe87E5EbaK6oquZHoiAQoZbTzTn42gf"
          />
          <div className="relative z-10 p-8 flex flex-col justify-end h-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Network Health: Optimal</span>
            </div>
            <h4 className="text-xl font-extrabold text-slate-900">Intelligence Node Coverage</h4>
            <p className="text-sm text-slate-600 max-w-md">98.4% of entities correctly classified via LLM-powered neural extraction engines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entities;
