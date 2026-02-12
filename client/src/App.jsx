import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import LabDashboard from './pages/LabDashboard';
import WaterDashboard from './pages/WaterDashboard';
import ElectricityDashboard from './pages/ElectricityDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
                    <Route path="/lab" element={<PrivateRoute role="lab"><LabDashboard /></PrivateRoute>} />
                    <Route path="/water" element={<PrivateRoute role="water"><WaterDashboard /></PrivateRoute>} />
                    <Route path="/electricity" element={<PrivateRoute role="electricity"><ElectricityDashboard /></PrivateRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
