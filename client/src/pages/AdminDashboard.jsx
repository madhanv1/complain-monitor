import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    const [view, setView] = useState('dashboard');
    const [data, setData] = useState({ lab: [], water: [], electricity: [] });
    const [users, setUsers] = useState([]);
    const [rules, setRules] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'lab', department: '' });

    const fetchData = async () => {
        try {
            const d = await axios.get('http://localhost:5000/api/data/all');
            setData(d.data);
        } catch (e) { console.error(e); }
    };

    const fetchUsers = async () => {
        try { const res = await axios.get('http://localhost:5000/api/users'); setUsers(res.data); } catch (e) { console.error(e); }
    };

    const fetchRules = async () => {
        try { const res = await axios.get('http://localhost:5000/api/rules'); setRules(res.data); } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchData();
        fetchUsers();
        fetchRules();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', newUser);
            alert('✅ User Created Successfully!');
            fetchUsers();
            setNewUser({ name: '', email: '', password: '', role: 'lab', department: '' });
        } catch (err) { alert('❌ Error creating user'); }
    };

    const handleUpdateRule = async (cat, type, threshold, period) => {
        try {
            await axios.post('http://localhost:5000/api/rules', { category: cat, type, threshold, period });
            alert('✅ Rule Updated Successfully!');
            fetchRules();
        } catch (err) { alert('❌ Error updating rule'); }
    };

    const labViolations = data.lab.filter(x => x.status === 'Violation').length;
    const waterViolations = data.water.filter(x => x.status === 'Violation').length;
    const electricityViolations = data.electricity.filter(x => x.status === 'Violation').length;
    const totalViolations = labViolations + waterViolations + electricityViolations;

    return (
        <div style={styles.wrapper}>
            <Navbar title="Admin Control Panel" />

            <div style={styles.container} className="animate-fadeIn">
                {/* Tab Navigation */}
                <div style={styles.tabNav}>
                    <button onClick={() => setView('dashboard')} style={view === 'dashboard' ? styles.tabActive : styles.tab} className={view === 'dashboard' ? 'btn-primary' : 'btn-secondary'}>
                        <svg style={styles.tabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Overview
                    </button>
                    <button onClick={() => setView('users')} style={view === 'users' ? styles.tabActive : styles.tab} className={view === 'users' ? 'btn-primary' : 'btn-secondary'}>
                        <svg style={styles.tabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Manage Users
                    </button>
                    <button onClick={() => setView('rules')} style={view === 'rules' ? styles.tabActive : styles.tab} className={view === 'rules' ? 'btn-primary' : 'btn-secondary'}>
                        <svg style={styles.tabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Manage Rules
                    </button>
                </div>

                {/* Overview Tab */}
                {view === 'dashboard' && (
                    <div style={styles.content}>
                        {/* Stats Grid */}
                        <div style={styles.statsGrid}>
                            <div style={styles.statCard} className="glass-card hover-lift">
                                <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '32px', height: '32px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <div style={styles.statContent}>
                                    <div style={styles.statLabel}>Lab Violations</div>
                                    <div style={styles.statValue}>{labViolations}</div>
                                    <div style={styles.statTrend}>
                                        <span style={styles.trendBadge}>{data.lab.length} total reports</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.statCard} className="glass-card hover-lift">
                                <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '32px', height: '32px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <div style={styles.statContent}>
                                    <div style={styles.statLabel}>Water Violations</div>
                                    <div style={styles.statValue}>{waterViolations}</div>
                                    <div style={styles.statTrend}>
                                        <span style={styles.trendBadge}>{data.water.length} total reports</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.statCard} className="glass-card hover-lift">
                                <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '32px', height: '32px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div style={styles.statContent}>
                                    <div style={styles.statLabel}>Electricity Violations</div>
                                    <div style={styles.statValue}>{electricityViolations}</div>
                                    <div style={styles.statTrend}>
                                        <span style={styles.trendBadge}>{data.electricity.length} total reports</span>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.statCard} className="glass-card hover-lift">
                                <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '32px', height: '32px' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div style={styles.statContent}>
                                    <div style={styles.statLabel}>Total Violations</div>
                                    <div style={styles.statValue}>{totalViolations}</div>
                                    <div style={styles.statTrend}>
                                        <span style={styles.trendBadge}>Requires attention</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div style={styles.activityCard} className="glass-card">
                            <div style={styles.cardHeader}>
                                <h3 style={styles.cardTitle}>
                                    <svg style={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Recent Activity Feed
                                </h3>
                                <p style={styles.cardSubtitle}>Latest submissions across all departments</p>
                            </div>

                            <div style={styles.activityFeed}>
                                {[...data.lab.map(i => ({ ...i, type: 'Lab', icon: '🧪' })),
                                ...data.water.map(i => ({ ...i, type: 'Water', icon: '💧' })),
                                ...data.electricity.map(i => ({ ...i, type: 'Electricity', icon: '⚡' }))]
                                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                    .slice(0, 15)
                                    .map((item, idx) => (
                                        <div key={idx} style={styles.activityItem} className="animate-slideIn">
                                            <div style={styles.activityIcon}>{item.icon}</div>
                                            <div style={styles.activityContent}>
                                                <div style={styles.activityTitle}>
                                                    <strong>{item.type}</strong> report submitted
                                                </div>
                                                <div style={styles.activityMeta}>
                                                    by {item.user?.name || 'Unknown'} • {new Date(item.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                            <span style={item.status === 'Violation' ? styles.badgeDanger : styles.badgeSuccess}>
                                                {item.status === 'Violation' ? '⚠️ Violation' : '✓ Compliant'}
                                            </span>
                                        </div>
                                    ))
                                }
                                {(data.lab.length + data.water.length + data.electricity.length) === 0 && (
                                    <div style={styles.emptyState}>
                                        <svg style={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p>No activity yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {view === 'users' && (
                    <div style={styles.content}>
                        <div style={styles.formCard} className="glass-card">
                            <div style={styles.cardHeader}>
                                <h3 style={styles.cardTitle}>
                                    <svg style={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Add New Staff Member
                                </h3>
                                <p style={styles.cardSubtitle}>Create new user accounts for staff members</p>
                            </div>

                            <form onSubmit={handleCreateUser} style={styles.userForm}>
                                <div style={styles.formGrid}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Full Name</label>
                                        <input placeholder="John Doe" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Email Address</label>
                                        <input type="email" placeholder="john@example.com" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Password</label>
                                        <input type="password" placeholder="••••••••" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} required style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Role</label>
                                        <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} style={styles.input}>
                                            <option value="lab">Lab Staff</option>
                                            <option value="water">Water Staff</option>
                                            <option value="electricity">Electricity Staff</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Department</label>
                                        <input placeholder="e.g., Chemistry" value={newUser.department} onChange={e => setNewUser({ ...newUser, department: e.target.value })} style={styles.input} />
                                    </div>
                                </div>
                                <button type="submit" style={styles.createBtn} className="btn-primary">
                                    <svg style={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create User
                                </button>
                            </form>
                        </div>

                        <div style={styles.tableCard} className="glass-card">
                            <div style={styles.cardHeader}>
                                <h3 style={styles.cardTitle}>
                                    <svg style={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Registered Users ({users.length})
                                </h3>
                            </div>

                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr style={styles.tableHeader}>
                                            <th style={styles.th}>Name</th>
                                            <th style={styles.th}>Email</th>
                                            <th style={styles.th}>Role</th>
                                            <th style={styles.th}>Department</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u, index) => (
                                            <tr key={u._id} style={{ ...styles.tableRow, animationDelay: `${index * 0.05}s` }} className="animate-slideIn">
                                                <td style={styles.td}>{u.name}</td>
                                                <td style={styles.td}>{u.email}</td>
                                                <td style={styles.td}>
                                                    <span style={styles.roleBadge}>{u.role}</span>
                                                </td>
                                                <td style={styles.td}>{u.department || '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rules Tab */}
                {view === 'rules' && (
                    <div style={styles.content}>
                        <div style={styles.rulesCard} className="glass-card">
                            <div style={styles.cardHeader}>
                                <h3 style={styles.cardTitle}>
                                    <svg style={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    Compliance Rules Configuration
                                </h3>
                                <p style={styles.cardSubtitle}>Define safety thresholds for environmental monitoring. Violations trigger automatic email alerts.</p>
                            </div>

                            <div style={styles.rulesGrid}>
                                {['lab', 'water', 'electricity'].map(cat => {
                                    const dailyRule = rules.find(r => r.category === cat && r.period === 'daily') || { threshold: 0, period: 'daily' };
                                    const monthlyRule = rules.find(r => r.category === cat && r.period === 'monthly') || { threshold: 0, period: 'monthly' };

                                    const icons = {
                                        lab: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
                                        water: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />,
                                        electricity: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    };

                                    const units = { lab: 'kg', water: 'L', electricity: 'kWh' };

                                    return (
                                        <div key={cat} style={styles.ruleCard} className="glass-card hover-lift">
                                            <div style={styles.ruleHeader}>
                                                <div style={styles.ruleIcon}>
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                                                        {icons[cat]}
                                                    </svg>
                                                </div>
                                                <h4 style={styles.ruleTitle}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                                            </div>

                                            <div style={styles.ruleThresholds}>
                                                <div style={styles.thresholdItem}>
                                                    <div style={styles.thresholdLabel}>Daily Limit</div>
                                                    <div style={styles.thresholdValue}>{dailyRule.threshold} {units[cat]}</div>
                                                    <button onClick={() => {
                                                        const newT = prompt(`Enter new daily threshold for ${cat}:`, dailyRule.threshold);
                                                        if (newT) handleUpdateRule(cat, `${cat}_daily`, newT, 'daily');
                                                    }} style={styles.updateBtn} className="btn-secondary">
                                                        Update
                                                    </button>
                                                </div>

                                                <div style={styles.thresholdItem}>
                                                    <div style={styles.thresholdLabel}>Monthly Limit</div>
                                                    <div style={styles.thresholdValue}>{monthlyRule.threshold} {units[cat]}</div>
                                                    <button onClick={() => {
                                                        const newT = prompt(`Enter new monthly threshold for ${cat}:`, monthlyRule.threshold);
                                                        if (newT) handleUpdateRule(cat, `${cat}_monthly`, newT, 'monthly');
                                                    }} style={styles.updateBtn} className="btn-secondary">
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
    container: { maxWidth: '1400px', margin: '0 auto', padding: '2rem' },
    tabNav: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    tab: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: '600' },
    tabActive: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: '600' },
    tabIcon: { width: '20px', height: '20px' },
    content: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    statCard: { padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' },
    statIcon: { width: '70px', height: '70px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)', flexShrink: 0 },
    statContent: { flex: 1 },
    statLabel: { fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.5rem' },
    statValue: { fontSize: '2.25rem', fontWeight: '800', color: '#f1f5f9', marginBottom: '0.5rem' },
    statTrend: { display: 'flex', gap: '0.5rem' },
    trendBadge: { fontSize: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', color: '#cbd5e1', fontWeight: '500' },
    activityCard: { padding: '2rem' },
    cardHeader: { marginBottom: '1.5rem' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    titleIcon: { width: '24px', height: '24px', color: '#667eea' },
    cardSubtitle: { fontSize: '0.875rem', color: '#94a3b8', margin: 0 },
    activityFeed: { display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' },
    activityItem: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' },
    activityIcon: { fontSize: '1.5rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' },
    activityContent: { flex: 1 },
    activityTitle: { fontSize: '0.95rem', color: '#f1f5f9', marginBottom: '0.25rem' },
    activityMeta: { fontSize: '0.8125rem', color: '#94a3b8' },
    formCard: { padding: '2rem' },
    userForm: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1' },
    input: { width: '100%', padding: '0.75rem 1rem', fontSize: '1rem' },
    createBtn: { alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem' },
    btnIcon: { width: '20px', height: '20px' },
    tableCard: { padding: '2rem' },
    tableWrapper: { overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
    th: { padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' },
    tableRow: { borderBottom: '1px solid rgba(255, 255, 255, 0.05)' },
    td: { padding: '1rem', fontSize: '0.95rem', color: '#cbd5e1' },
    roleBadge: { display: 'inline-block', padding: '0.375rem 0.75rem', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: '600', background: 'rgba(102, 126, 234, 0.15)', color: '#667eea', border: '1px solid rgba(102, 126, 234, 0.3)', textTransform: 'capitalize' },
    badgeSuccess: { display: 'inline-block', padding: '0.375rem 0.75rem', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: '600', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' },
    badgeDanger: { display: 'inline-block', padding: '0.375rem 0.75rem', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: '600', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' },
    rulesCard: { padding: '2rem' },
    rulesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    ruleCard: { padding: '1.5rem' },
    ruleHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' },
    ruleIcon: { width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' },
    ruleTitle: { fontSize: '1.125rem', fontWeight: '700', color: '#f1f5f9', margin: 0, textTransform: 'capitalize' },
    ruleThresholds: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    thresholdItem: { padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' },
    thresholdLabel: { fontSize: '0.8125rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: '500' },
    thresholdValue: { fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.75rem' },
    updateBtn: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    emptyState: { padding: '3rem', textAlign: 'center', color: '#64748b' },
    emptyIcon: { width: '48px', height: '48px', margin: '0 auto 1rem', color: '#475569' }
};

export default AdminDashboard;
