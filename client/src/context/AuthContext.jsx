import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

// Set the base URL for the backend API
axios.defaults.baseURL = 'https://complain-monitor-3myj.vercel.app';

export const AuthContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) {
            axios.defaults.headers.common['x-auth-token'] = localStorage.token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            console.error("Load User Error:", err.response?.status);
            localStorage.removeItem('token'); // Clear token on error
            delete axios.defaults.headers.common['x-auth-token'];
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const login = async (email, password) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth/login', body, config);

            // Set token here
            localStorage.setItem('token', res.data.token);

            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });

            loadUser(); // Verify token immediately
        } catch (err) {
            console.error(err.response?.data?.errors);
            alert(err.response?.data?.errors[0]?.msg || 'Login Failed');
            localStorage.removeItem('token');
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
