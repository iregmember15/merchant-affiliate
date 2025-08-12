import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LandingPage from './components/LandingPage';
import ReferralTrackingPage from './components/ReferralTrackingPage';
import MerchantDashboard from './components/merchant/MerchantDashboard';
import AffiliateDashboard from './components/affiliate/AffiliateDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode; userType: 'merchant' | 'affiliate' }> = ({ children, userType }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (user.type !== userType) {
    return <Navigate to={user.type === 'merchant' ? '/merchant' : '/affiliate'} replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/tracking" element={<ReferralTrackingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/merchant/*" 
              element={
                <PrivateRoute userType="merchant">
                  <MerchantDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/affiliate/*" 
              element={
                <PrivateRoute userType="affiliate">
                  <AffiliateDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
