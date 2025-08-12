import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MerchantSidebar from './MerchantSidebar';
import MerchantOverview from './MerchantOverview';
import AnalyticsPage from './AnalyticsPage';
import CampaignManagement from './CampaignManagement';
import BannersPage from './BannersPage';
import PromoCodesPage from './PromoCodesPage';
import AffiliateManagement from './AffiliateManagement';
import PayoutProcessing from './PayoutProcessing';
import TransactionHistory from './TransactionHistory';
import CustomizeSignupPage from './CustomizeSignupPage';
import SettingsPage from './SettingsPage';

const MerchantDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <MerchantSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top spacing to account for hamburger menu */}
        <div className="md:hidden h-16"></div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="min-h-full">
            <Routes>
              <Route path="/" element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<MerchantOverview />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="campaigns" element={<CampaignManagement />} />
              <Route path="banners" element={<BannersPage />} />
              <Route path="promo-codes" element={<PromoCodesPage />} />
              <Route path="affiliates" element={<AffiliateManagement />} />
              <Route path="payouts" element={<PayoutProcessing />} />
              <Route path="transactions" element={<TransactionHistory />} />
              <Route path="signup-page" element={<CustomizeSignupPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MerchantDashboard;
