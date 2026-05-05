import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  BarChart3, 
  ShieldCheck, 
  Database, 
  Sun, 
  Moon, 
  RefreshCcw, 
  Lock,
  User,
  Search,
  ArrowUpRight,
  AlertCircle,
  PieChart as PieChartIcon,
  Settings as SettingsIcon,
  CheckCircle2,
  TrendingUp,
  History,
  FileText,
  Key,
  Clock,
  Download,
  Phone,
  UserCircle,
  Activity,
  Cpu,
  Globe,
  Server
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

const ThemeToggle = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) => (
  <button 
    onClick={() => setDarkMode(!darkMode)}
    className={`p-2 rounded-xl transition-all duration-300 ${darkMode ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}
  >
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  const [email, setEmail] = useState('mugilanm810@gmail.com');
  const [password, setPassword] = useState('wznb lrob srmd osbm');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const result = await response.json();
      if (result.status === 'error') {
        setError(result.message);
      } else {
        refreshDashboard();
      }
    } catch (err) {
      setError("Engine Error: Authentication failed or IMAP settings required.");
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = async () => {
    try {
      const statsResponse = await fetch('http://localhost:8000/api/stats');
      setStats(await statsResponse.json());
      const logsResponse = await fetch('http://localhost:8000/api/logs');
      setData(await logsResponse.json());
    } catch (e) {}
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const pieData = stats?.category_distribution ? 
    Object.entries(stats.category_distribution).map(([name, value]) => ({ name, value })) : [];

  const handleExport = (type: 'emails' | 'entities') => {
    window.open(`http://localhost:8000/api/download/${type}`, '_blank');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Intelligence Scans', value: stats?.total_emails || 0, icon: Mail, color: 'indigo' },
                { label: 'Sales Leads', value: stats?.category_distribution?.['Sales Lead'] || 0, icon: ArrowUpRight, color: 'emerald' },
                { label: 'Invoice Assets', value: stats?.category_distribution?.['Invoice'] || 0, icon: AlertCircle, color: 'amber' },
                { label: 'Support Tickets', value: stats?.category_distribution?.['Support'] || 0, icon: ShieldCheck, color: 'rose' },
              ].map((kpi, i) => (
                <div key={i} className={`p-6 rounded-3xl border transition-all hover:shadow-xl ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className={`w-10 h-10 rounded-xl bg-${kpi.color}-500/10 text-${kpi.color}-500 flex items-center justify-center mb-4`}>
                    <kpi.icon size={20} />
                  </div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">{kpi.label}</h3>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-lg font-bold mb-8">Classification Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-lg font-bold mb-8">Live Intelligence Feed</h3>
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {data?.emails?.map((email: any, i: number) => (
                    <div key={i} className={`p-4 rounded-2xl flex items-center justify-between transition-all ${darkMode ? 'bg-slate-900/30' : 'bg-slate-50'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">{email.sender[0].toUpperCase()}</div>
                        <div>
                          <h4 className="text-sm font-semibold truncate w-48">{email.subject}</h4>
                          <p className="text-xs text-slate-500">{email.category} • Vol: {email.sender_count}</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-500">{email.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Analytics':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="text-indigo-500" size={24} />
                  <h3 className="text-xl font-bold">Temporal Velocity Analysis</h3>
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Inbound Intelligence (Date & Time)</span>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.emails?.map((e: any) => ({ label: `${e.display_date} ${e.display_time}`, volume: e.sender_count || 1 })).reverse()}>
                    <defs>
                      <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="volume" stroke="#6366f1" fillOpacity={1} fill="url(#colorVol)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-8">Top 5 Intelligence Sources (Senders)</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.top_senders || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b', fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: darkMode ? '#94a3b8' : '#64748b' }} />
                      <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px' }} />
                      <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-8">Classification Logic Breakdown</h3>
                <div className="space-y-6">
                  {pieData.map((d, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>{d.name} Intelligence</span>
                        <div className="flex gap-4 items-center">
                          <span className="text-slate-500 text-xs font-bold">{d.value} Emails</span>
                          <span className="text-indigo-500 font-bold">{((d.value / (stats?.total_emails || 1)) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-800/50 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${(d.value / (stats?.total_emails || 1)) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Logs':
        return (
          <div className={`rounded-3xl border animate-in fade-in duration-500 overflow-hidden ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-8 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Processed Intelligence Logs</h3>
                <p className="text-xs text-slate-500 mt-1">Unified view of emails and extracted metadata.</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleExport('emails')} className="bg-indigo-600/10 text-indigo-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
                  <Download size={14} /> Emails CSV
                </button>
                <button onClick={() => handleExport('entities')} className="bg-indigo-600/10 text-indigo-500 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
                  <Download size={14} /> Entities CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className={`border-b ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Date / Time</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider text-center">Entities</th>
                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {data?.emails?.map((email: any, i: number) => (
                    <tr key={i} className={`group transition-all ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}>
                      <td className="px-6 py-4">
                        <div className="text-xs font-bold tracking-tight">{email.display_date}</div>
                        <div className="text-[10px] text-indigo-400 font-black">{email.display_time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold truncate w-40">{email.sender}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Sender Volume: {email.sender_count}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{email.subject}</td>
                      <td className="px-6 py-4 text-center">
                        {email.phone_number ? (
                          <div className="flex items-center justify-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg text-[10px] font-bold">
                            <Phone size={10} /> {email.phone_number}
                          </div>
                        ) : (
                          <span className="text-slate-700 text-[10px] font-bold">RAW DATA ONLY</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-500/10 text-indigo-500">{email.category}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Configuration':
        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-500">
                  <Key size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Engine Connection Settings</h3>
                  <p className="text-slate-500 text-sm">Securely configure your Gmail IMAP and App Password.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Gmail Address</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-800 focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'}`} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">App Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${darkMode ? 'bg-slate-900 border-slate-800 focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-500'}`} />
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <h4 className="text-xs font-black uppercase text-indigo-500 tracking-widest">Engine Technical Status</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'IMAP Protocol', value: 'v4rev1 (Secure)', icon: Globe },
                      { label: 'Encryption', value: 'SSL/TLS v1.3', icon: ShieldCheck },
                      { label: 'Engine Core', value: 'Py-Intelligence 2.0', icon: Cpu },
                      { label: 'Server Port', value: '8000 (Active)', icon: Server },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <item.icon size={12} /> {item.label}
                        </div>
                        <div className="text-xs font-black uppercase">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                    <Activity size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase text-emerald-500">System Pulse: Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div className="max-w-md mx-auto space-y-8 animate-in zoom-in duration-500">
            <div className={`p-10 rounded-[3rem] border flex flex-col items-center text-center ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="w-32 h-32 rounded-full bg-indigo-600 p-1 mb-6">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                  <UserCircle size={80} className="text-indigo-500" />
                </div>
              </div>
              <h3 className="text-3xl font-black tracking-tight">Mugilan M</h3>
              <p className="text-indigo-500 font-bold text-sm uppercase tracking-[0.3em] mt-1 mb-8">Lead Intelligence Engineer</p>
              
              <div className="w-full grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="text-xs text-slate-500 font-bold mb-1">Status</div>
                  <div className="text-emerald-500 font-black text-sm uppercase flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </div>
                </div>
                <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="text-xs text-slate-500 font-bold mb-1">Access</div>
                  <div className="font-black text-sm uppercase">Admin</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <aside className={`fixed left-0 top-0 h-full w-64 border-r transition-colors duration-500 z-50 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <h1 className="font-bold text-xl tracking-tight">MailSentry <span className="text-indigo-500">Insight™</span></h1>
            </div>
            <nav className="space-y-2">
              {[
                { id: 'Dashboard', icon: BarChart3 },
                { id: 'Analytics', icon: TrendingUp },
                { id: 'Configuration', icon: SettingsIcon },
                { id: 'Logs', icon: History },
              ].map((item) => (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <item.icon size={18} />
                  {item.id}
                </button>
              ))}
            </nav>
          </div>
          
          <button onClick={() => setActiveTab('Profile')} className={`p-4 rounded-3xl flex items-center gap-3 transition-all ${activeTab === 'Profile' ? 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/20' : darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}>
            <UserCircle size={24} />
            <div className="text-left">
              <div className="text-xs font-black uppercase">Mugilan M</div>
              <div className="text-[10px] opacity-50 font-bold">Admin Profile</div>
            </div>
          </button>
        </div>
      </aside>

      <main className="pl-64">
        <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-500 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'}`}>
          <div className="px-8 h-20 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{activeTab} View</h2>
            <div className="flex items-center gap-4">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              <button onClick={fetchData} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-medium transition-all active:scale-95 disabled:opacity-50">
                <RefreshCcw className={loading ? "animate-spin" : ""} size={18} />
                {loading ? "Processing..." : "Run Intelligence Sync"}
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center gap-3 animate-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {renderContent()}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
