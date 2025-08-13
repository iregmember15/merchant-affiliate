import React, { useState } from 'react';
import { 
  MegaphoneIcon, 
  CurrencyDollarIcon,
  ClockIcon,
  ChartBarIcon,
  LinkIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  name: string;
  merchant: string;
  description: string;
  commissionType: 'percentage' | 'fixed';
  commissionValue: number;
  cookieDuration: number;
  status: 'active' | 'paused' | 'ended';
  totalClicks: number;
  totalConversions: number;
  totalEarnings: number;
  category: string;
  startDate: string;
  endDate?: string;
}

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Collection Sale',
      merchant: 'Fashion Store',
      description: 'Get 20% commission on all summer fashion items. Limited time offer!',
      commissionType: 'percentage',
      commissionValue: 20,
      cookieDuration: 30,
      status: 'active',
      totalClicks: 1250,
      totalConversions: 45,
      totalEarnings: 450.00,
      category: 'Fashion',
      startDate: '2024-05-01',
      endDate: '2024-08-31'
    },
    {
      id: '2',
      name: 'Tech Gadgets Promotion',
      merchant: 'TechCorp',
      description: 'Earn $15 per sale on premium tech gadgets and accessories.',
      commissionType: 'fixed',
      commissionValue: 15,
      cookieDuration: 60,
      status: 'active',
      totalClicks: 890,
      totalConversions: 32,
      totalEarnings: 480.00,
      category: 'Technology',
      startDate: '2024-01-15'
    },
    {
      id: '3',
      name: 'Home & Garden Essentials',
      merchant: 'HomeDecor',
      description: '15% commission on home improvement and garden products.',
      commissionType: 'percentage',
      commissionValue: 15,
      cookieDuration: 45,
      status: 'active',
      totalClicks: 650,
      totalConversions: 28,
      totalEarnings: 210.00,
      category: 'Home & Garden',
      startDate: '2024-03-01'
    },
    {
      id: '4',
      name: 'Fitness Equipment Sale',
      merchant: 'FitLife',
      description: 'Earn $25 per sale on premium fitness equipment and supplements.',
      commissionType: 'fixed',
      commissionValue: 25,
      cookieDuration: 90,
      status: 'paused',
      totalClicks: 420,
      totalConversions: 12,
      totalEarnings: 300.00,
      category: 'Health & Fitness',
      startDate: '2024-02-01',
      endDate: '2024-04-30'
    },
    {
      id: '5',
      name: 'Beauty Products Launch',
      merchant: 'BeautyCo',
      description: '25% commission on new beauty product line launch.',
      commissionType: 'percentage',
      commissionValue: 25,
      cookieDuration: 30,
      status: 'active',
      totalClicks: 1100,
      totalConversions: 55,
      totalEarnings: 825.00,
      category: 'Beauty',
      startDate: '2024-04-15'
    },
    {
      id: '6',
      name: 'Holiday Gift Guide',
      merchant: 'GiftStore',
      description: 'Special holiday promotion with $20 fixed commission per sale.',
      commissionType: 'fixed',
      commissionValue: 20,
      cookieDuration: 45,
      status: 'ended',
      totalClicks: 750,
      totalConversions: 25,
      totalEarnings: 500.00,
      category: 'Gifts',
      startDate: '2023-11-01',
      endDate: '2023-12-31'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(campaigns.map(c => c.category)))];
  const statuses = ['all', 'active', 'paused', 'ended'];

  const filteredCampaigns = campaigns.filter(campaign => {
    const categoryMatch = selectedCategory === 'all' || campaign.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || campaign.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const copyToClipboard = (campaignId: string) => {
    const link = `https://example.com/ref/${campaignId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(campaignId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'ended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Fashion': 'bg-pink-100 text-pink-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Home & Garden': 'bg-blue-100 text-blue-800',
      'Health & Fitness': 'bg-purple-100 text-purple-800',
      'Beauty': 'bg-rose-100 text-rose-800',
      'Gifts': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getConversionRate = (clicks: number, conversions: number) => {
    if (clicks === 0) return 0;
    return ((conversions / clicks) * 100).toFixed(2);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <MegaphoneIcon className="h-6 w-6 mr-2" />
          Available Campaigns
        </h1>
        <p className="text-gray-600">Browse and join campaigns to start earning commissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MegaphoneIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">
                ${campaigns.reduce((sum, c) => sum + c.totalEarnings, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.reduce((sum, c) => sum + c.totalConversions, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Cookie Duration</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(campaigns.reduce((sum, c) => sum + c.cookieDuration, 0) / campaigns.length)} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Campaign Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                  <p className="text-sm text-gray-600">{campaign.merchant}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(campaign.category)}`}>
                  {campaign.category}
                </span>
              </div>
            </div>

            {/* Commission Info */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {campaign.commissionType === 'percentage' ? `${campaign.commissionValue}%` : `$${campaign.commissionValue}`}
                  </div>
                  <div className="text-xs text-gray-600">Commission</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{campaign.cookieDuration}</div>
                  <div className="text-xs text-gray-600">Cookie Days</div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Clicks:</span>
                  <span className="font-medium">{campaign.totalClicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conversions:</span>
                  <span className="font-medium">{campaign.totalConversions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-medium">{getConversionRate(campaign.totalClicks, campaign.totalConversions)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Earnings:</span>
                  <span className="font-medium text-blue-600">${campaign.totalEarnings.toFixed(2)}</span>
                </div>
              </div>

              {/* Campaign Dates */}
              <div className="text-xs text-gray-500 mb-4">
                <div>Started: {formatDate(campaign.startDate)}</div>
                {campaign.endDate && <div>Ends: {formatDate(campaign.endDate)}</div>}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(campaign.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {copiedLink === campaign.id ? (
                    <ClipboardDocumentIcon className="h-4 w-4 text-blue-500 mr-2" />
                  ) : (
                    <LinkIcon className="h-4 w-4 mr-2" />
                  )}
                  {copiedLink === campaign.id ? 'Copied!' : 'Get Link'}
                </button>
                <button
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <MegaphoneIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more campaigns.</p>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;
