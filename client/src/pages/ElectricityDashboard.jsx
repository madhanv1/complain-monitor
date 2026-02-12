import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ElectricityDashboard = () => {
    const [history, setHistory] = useState([]);
    const [lastRefresh, setLastRefresh] = useState(Date.now());
    const [formData, setFormData] = useState({
        reading: '',
        consumption: '',
        billingPeriod: '',
        date: new Date().toISOString().split('T')[0]
    });

    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/data/electricity-history');
            setHistory(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchHistory(); }, [lastRefresh]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/data/electricity', formData);
            alert('✅ Data Submitted Successfully!');
            setLastRefresh(Date.now());
            setFormData({ ...formData, reading: '', consumption: '', billingPeriod: '' });
        } catch (err) { alert('❌ ' + (err.response?.data?.msg || 'Error submitting data')); }
    };

    const totalSubmissions = history.length;
    const recentViolations = history.filter(item => item.status === 'Violation').length;
    const currentConsumption = parseFloat(formData.consumption || 0);

    return (
        <div style={styles.wrapper}>
            <Navbar title="Electricity Usage Management" />

            <div style={styles.container} className="animate-fadeIn">
                {/* Stats Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard} className="glass-card hover-lift">
                        <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statLabel}>Total Submissions</div>
                            <div style={styles.statValue}>{totalSubmissions}</div>
                        </div>
                    </div>

                    <div style={styles.statCard} className="glass-card hover-lift">
                        <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statLabel}>Violations</div>
                            <div style={styles.statValue}>{recentViolations}</div>
                        </div>
                    </div>

                    <div style={styles.statCard} className="glass-card hover-lift">
                        <div style={{ ...styles.statIcon, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statLabel}>Current Reading</div>
                            <div style={styles.statValue}>{currentConsumption} kWh</div>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div style={styles.mainGrid}>
                    {/* Submit Form */}
                    <div style={styles.formCard} className="glass-card">
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                <svg style={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Submit Electricity Usage
                            </h3>
                            <p style={styles.cardSubtitle}>Record daily electricity consumption data</p>
                        </div>

                        <form onSubmit={onSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <svg style={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Date
                                </label>
                                <input type="date" name="date" value={formData.date} onChange={onChange} style={styles.input} required />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <svg style={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Meter Reading
                                </label>
                                <input type="number" name="reading" value={formData.reading} onChange={onChange} style={styles.input} placeholder="0" step="0.01" required />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <svg style={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Consumption (kWh)
                                </label>
                                <input type="number" name="consumption" value={formData.consumption} onChange={onChange} style={styles.input} placeholder="0.00" step="0.01" required />
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    <svg style={styles.labelIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Billing Period
                                </label>
                                <input type="text" name="billingPeriod" value={formData.billingPeriod} onChange={onChange} style={styles.input} placeholder="e.g., Jan 2024" required />
                            </div>

                            <button type="submit" style={styles.submitBtn} className="btn-primary">
                                <svg style={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Submit Data
                            </button>
                        </form>
                    </div>

                    {/* History Table */}
                    <div style={styles.historyCard} className="glass-card">
                        <div style={styles.cardHeader}>
                            <h3 style={styles.cardTitle}>
                                <svg style={styles.titleIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Submission History
                            </h3>
                            <p style={styles.cardSubtitle}>Recent electricity usage submissions</p>
                        </div>

                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr style={styles.tableHeader}>
                                        <th style={styles.th}>Date</th>
                                        <th style={styles.th}>Consumption</th>
                                        <th style={styles.th}>Billing Period</th>
                                        <th style={styles.th}>Status</th>
                                        <th style={styles.th}>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, index) => (
                                        <tr key={item._id} style={{ ...styles.tableRow, animationDelay: `${index * 0.05}s` }} className="animate-slideIn">
                                            <td style={styles.td}>{new Date(item.date).toLocaleDateString()}</td>
                                            <td style={styles.td}>
                                                <span style={styles.consumptionValue}>{item.consumption} kWh</span>
                                            </td>
                                            <td style={styles.td}>{item.billingPeriod}</td>
                                            <td style={styles.td}>
                                                <span style={item.status === 'Violation' ? styles.badgeDanger : styles.badgeSuccess}>
                                                    {item.status === 'Violation' ? '⚠️ Violation' : '✓ Compliant'}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <span style={styles.message}>{item.violationMessage || '—'}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {history.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={styles.emptyState}>
                                                <svg style={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                </svg>
                                                <p>No submissions yet</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    wrapper: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
    container: { maxWidth: '1400px', margin: '0 auto', padding: '2rem' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
    statCard: { padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' },
    statIcon: { width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)' },
    statContent: { flex: 1 },
    statLabel: { fontSize: '0.875rem', color: '#94a3b8', fontWeight: '500', marginBottom: '0.25rem' },
    statValue: { fontSize: '1.875rem', fontWeight: '700', color: '#f1f5f9' },
    mainGrid: { display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem' },
    formCard: { padding: '2rem', height: 'fit-content' },
    historyCard: { padding: '2rem' },
    cardHeader: { marginBottom: '1.5rem' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '700', color: '#f1f5f9', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    titleIcon: { width: '24px', height: '24px', color: '#667eea' },
    cardSubtitle: { fontSize: '0.875rem', color: '#94a3b8', margin: 0 },
    form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    labelIcon: { width: '16px', height: '16px', color: '#667eea' },
    input: { width: '100%', padding: '0.75rem 1rem', fontSize: '1rem' },
    submitBtn: { marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem' },
    btnIcon: { width: '20px', height: '20px' },
    tableWrapper: { overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
    th: { padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' },
    tableRow: { borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s ease' },
    td: { padding: '1rem', fontSize: '0.95rem', color: '#cbd5e1' },
    consumptionValue: { fontWeight: '600', color: '#f1f5f9' },
    badgeSuccess: { display: 'inline-block', padding: '0.375rem 0.75rem', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: '600', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' },
    badgeDanger: { display: 'inline-block', padding: '0.375rem 0.75rem', borderRadius: '20px', fontSize: '0.8125rem', fontWeight: '600', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' },
    message: { fontSize: '0.875rem', color: '#94a3b8' },
    emptyState: { padding: '3rem', textAlign: 'center', color: '#64748b' },
    emptyIcon: { width: '48px', height: '48px', margin: '0 auto 1rem', color: '#475569' }
};

export default ElectricityDashboard;
