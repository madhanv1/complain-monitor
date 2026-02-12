import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.leftSection}>
                    <div style={styles.logoContainer}>
                        <svg style={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h2 style={styles.title}>{title}</h2>
                    </div>
                    {user && (
                        <div style={styles.userBadge}>
                            <div style={styles.avatar}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div style={styles.userInfo}>
                                <span style={styles.userName}>{user.name}</span>
                                <span style={styles.userRole}>{user.role?.toUpperCase()}</span>
                            </div>
                        </div>
                    )}
                </div>

                <button onClick={onLogout} style={styles.logoutBtn} className="btn-secondary">
                    <svg style={styles.logoutIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)'
    },
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
    },
    logoIcon: {
        width: '32px',
        height: '32px',
        color: '#667eea'
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.5px'
    },
    userBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.5rem 1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        color: 'white',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.125rem'
    },
    userName: {
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#f1f5f9'
    },
    userRole: {
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#94a3b8',
        letterSpacing: '0.5px'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1.5rem',
        fontSize: '0.95rem'
    },
    logoutIcon: {
        width: '18px',
        height: '18px'
    }
};

export default Navbar;
