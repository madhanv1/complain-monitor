import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'lab') navigate('/lab');
            else if (user.role === 'water') navigate('/water');
            else if (user.role === 'electricity') navigate('/electricity');
        }
    }, [isAuthenticated, user, navigate]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div style={styles.container}>
            {/* Animated Background */}
            <div style={styles.bgAnimation}></div>

            {/* Floating Particles */}
            <div style={styles.particles}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        ...styles.particle,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>

            {/* Main Content */}
            <div style={styles.content}>
                {/* Logo & Title */}
                <div style={styles.header}>
                    <div style={styles.iconContainer}>
                        <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h1 style={styles.title}>Environmental Compliance</h1>
                    <p style={styles.subtitle}>Academic Monitoring System</p>
                </div>

                {/* Login Form */}
                <form onSubmit={onSubmit} style={styles.form} className="animate-fadeIn">
                    <h2 style={styles.formTitle}>Welcome Back</h2>
                    <p style={styles.formSubtitle}>Sign in to your account to continue</p>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                name="email"
                                value={email}
                                onChange={onChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" style={styles.submitBtn} className="btn-primary">
                        <span>Sign In</span>
                        <svg style={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    <div style={styles.divider}>
                        <span style={styles.dividerText}>Secure Login</span>
                    </div>

                    <div style={styles.features}>
                        <div style={styles.feature}>
                            <svg style={styles.featureIcon} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span style={styles.featureText}>Encrypted</span>
                        </div>
                        <div style={styles.feature}>
                            <svg style={styles.featureIcon} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span style={styles.featureText}>Verified</span>
                        </div>
                        <div style={styles.feature}>
                            <svg style={styles.featureIcon} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span style={styles.featureText}>Secure</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden',
        padding: '2rem'
    },
    bgAnimation: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
        animation: 'pulse 8s ease-in-out infinite'
    },
    particles: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
    },
    particle: {
        position: 'absolute',
        width: '4px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        animation: 'float 10s infinite ease-in-out'
    },
    content: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '480px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    iconContainer: {
        display: 'inline-flex',
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    icon: {
        width: '48px',
        height: '48px',
        color: 'white'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: 'white',
        marginBottom: '0.5rem',
        textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        letterSpacing: '-0.5px'
    },
    subtitle: {
        fontSize: '1.1rem',
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500'
    },
    form: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
    },
    formTitle: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: 'white',
        marginBottom: '0.5rem',
        textAlign: 'center'
    },
    formSubtitle: {
        fontSize: '0.95rem',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: '2rem'
    },
    inputGroup: {
        marginBottom: '1.5rem'
    },
    label: {
        display: 'block',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'white',
        marginBottom: '0.5rem'
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        width: '20px',
        height: '20px',
        color: 'rgba(255, 255, 255, 0.6)',
        pointerEvents: 'none'
    },
    input: {
        width: '100%',
        padding: '0.875rem 1rem 0.875rem 3rem',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none'
    },
    submitBtn: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        fontWeight: '600'
    },
    btnIcon: {
        width: '20px',
        height: '20px'
    },
    divider: {
        position: 'relative',
        textAlign: 'center',
        margin: '2rem 0 1.5rem',
        '::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.2)'
        }
    },
    dividerText: {
        position: 'relative',
        display: 'inline-block',
        padding: '0 1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500'
    },
    features: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '1rem'
    },
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
    },
    featureIcon: {
        width: '24px',
        height: '24px',
        color: 'rgba(255, 255, 255, 0.8)'
    },
    featureText: {
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500'
    }
};

// Add floating animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

export default Login;
