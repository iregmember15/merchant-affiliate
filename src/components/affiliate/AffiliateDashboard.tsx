import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AffiliateSidebar from './AffiliateSidebar';
import AffiliateOverview from './AffiliateOverview';
import AnalyticsPage from './AnalyticsPage';
import CampaignsPage from './CampaignsPage';
import ReferralLinkGenerator from './ReferralLinkGenerator';
import MarketingAssets from './MarketingAssets';
import PromoCodeStats from './PromoCodeStats';
import PayoutMethodManagement from './PayoutMethodManagement';
import PayoutHistory from './PayoutHistory';
import ProfileSettings from './ProfileSettings';

const AffiliateDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AffiliateSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top spacing to account for hamburger menu */}
        <div className="md:hidden h-16"></div>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="min-h-full">
            <Routes>
              <Route path="/" element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AffiliateOverview />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="referral-links" element={<ReferralLinkGenerator />} />
              <Route path="assets" element={<MarketingAssets />} />
              <Route path="promo-codes" element={<PromoCodeStats />} />
              <Route path="payout-methods" element={<PayoutMethodManagement />} />
              <Route path="payout-history" element={<PayoutHistory />} />
              <Route path="profile-settings" element={<ProfileSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
