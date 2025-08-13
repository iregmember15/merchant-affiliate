import React, { useState } from 'react';
import {
  DocumentDuplicateIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
  LinkIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatNumber, formatPercentage } from '../../services/analyticsData';
import { LineChartComponent } from '../charts/ChartComponents';

interface ReferralLink {
  id: string;
  name: string;
  baseUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string;
  utmContent?: string;
  fullUrl: string;
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: string;
  status: 'active' | 'paused' | 'archived';
  dailyStats: Array<{
    date: string;
    clicks: number;
    conversions: number;
    earnings: number;
  }>;
}

const ReferralLinkGenerator: React.FC = () => {
  const [links, setLinks] = useState<ReferralLink[]>([
    {
      id: '1',
      name: 'Summer Sale Campaign',
      baseUrl: 'https://example.com/summer-sale',
      utmSource: 'affiliate',
      utmMedium: 'social',
      utmCampaign: 'summer-sale-2024',
      utmTerm: 'summer',
      utmContent: 'banner',
      fullUrl: 'https://example.com/summer-sale?utm_source=affiliate&utm_medium=social&utm_campaign=summer-sale-2024&utm_term=summer&utm_content=banner',
      clicks: 450,
      conversions: 23,
      earnings: 450.00,
      createdAt: '2024-06-01',
      status: 'active',
      dailyStats: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        clicks: Math.floor(Math.random() * 20) + 5,
        conversions: Math.floor(Math.random() * 3) + 1,
        earnings: Math.floor(Math.random() * 25) + 5
      }))
    },
    {
      id: '2',
      name: 'Back to School',
      baseUrl: 'https://example.com/back-to-school',
      utmSource: 'affiliate',
      utmMedium: 'email',
      utmCampaign: 'back-to-school-2024',
      fullUrl: 'https://example.com/back-to-school?utm_source=affiliate&utm_medium=email&utm_campaign=back-to-school-2024',
      clicks: 320,
      conversions: 18,
      earnings: 320.00,
      createdAt: '2024-08-15',
      status: 'active',
      dailyStats: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        clicks: Math.floor(Math.random() * 15) + 3,
        conversions: Math.floor(Math.random() * 2) + 1,
        earnings: Math.floor(Math.random() * 20) + 3
      }))
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLink, setNewLink] = useState({
    name: '',
    baseUrl: '',
    utmSource: 'affiliate',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: ''
  });

  const generateFullUrl = (link: any) => {
    const params = new URLSearchParams();
    params.append('utm_source', link.utmSource);
    params.append('utm_medium', link.utmMedium);
    params.append('utm_campaign', link.utmCampaign);
    
    if (link.utmTerm) params.append('utm_term', link.utmTerm);
    if (link.utmContent) params.append('utm_content', link.utmContent);
    
    return `${link.baseUrl}?${params.toString()}`;
  };

  const handleCreateLink = () => {
    const fullUrl = generateFullUrl(newLink);
    const link: ReferralLink = {
      id: Date.now().toString(),
      ...newLink,
      fullUrl,
      clicks: 0,
      conversions: 0,
      earnings: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      dailyStats: []
    };
    
    setLinks([...links, link]);
    setNewLink({
      name: '',
      baseUrl: '',
      utmSource: 'affiliate',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: ''
    });
    setShowCreateModal(false);
  };

  const handleToggleStatus = (id: string, newStatus: 'active' | 'paused' | 'archived') => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, status: newStatus } : link
    ));
  };

  // Calculate summary stats
  const totalLinks = links.length;
  const activeLinks = links.filter(link => link.status === 'active').length;
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = links.reduce((sum, link) => sum + link.conversions, 0);
  const totalEarnings = links.reduce((sum, link) => sum + link.earnings, 0);
  const avgConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Referral Link Generator</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Link
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LinkIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Links</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalLinks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <GlobeAltIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Links</dt>
                    <dd className="text-lg font-medium text-gray-900">{activeLinks}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EyeIcon className="h-6 w-6 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Clicks</dt>
                    <dd className="text-lg font-medium text-gray-900">{formatNumber(totalClicks)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                    <dd className="text-lg font-medium text-gray-900">{formatCurrency(totalEarnings)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links Table */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Link Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {link.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Created {link.createdAt}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm text-gray-900 truncate">
                            {link.fullUrl}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {link.clicks} clicks
                        </div>
                        <div className="text-sm text-gray-500">
                          {link.conversions} conversions
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {formatCurrency(link.earnings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          link.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          link.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {link.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(link.fullUrl)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Copy link"
                          >
                            <DocumentDuplicateIcon className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Create New Referral Link
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link Name
                    </label>
                    <input
                      type="text"
                      value={newLink.name}
                      onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Summer Sale Campaign"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base URL
                    </label>
                    <input
                      type="url"
                      value={newLink.baseUrl}
                      onChange={(e) => setNewLink({...newLink, baseUrl: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/product"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UTM Source
                      </label>
                      <input
                        type="text"
                        value={newLink.utmSource}
                        onChange={(e) => setNewLink({...newLink, utmSource: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="affiliate"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UTM Medium
                      </label>
                      <input
                        type="text"
                        value={newLink.utmMedium}
                        onChange={(e) => setNewLink({...newLink, utmMedium: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="social, email, banner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UTM Campaign
                    </label>
                    <input
                      type="text"
                      value={newLink.utmCampaign}
                      onChange={(e) => setNewLink({...newLink, utmCampaign: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="summer-sale-2024"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UTM Term (optional)
                      </label>
                      <input
                        type="text"
                        value={newLink.utmTerm}
                        onChange={(e) => setNewLink({...newLink, utmTerm: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="summer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UTM Content (optional)
                      </label>
                      <input
                        type="text"
                        value={newLink.utmContent}
                        onChange={(e) => setNewLink({...newLink, utmContent: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="banner"
                      />
                    </div>
                  </div>

                  {newLink.baseUrl && (
                    <div className="p-3 bg-gray-50 rounded-md">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Generated URL Preview:
                      </label>
                      <div className="text-sm text-gray-600 break-all">
                        {generateFullUrl(newLink)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateLink}
                    disabled={!newLink.name || !newLink.baseUrl || !newLink.utmMedium || !newLink.utmCampaign}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralLinkGenerator;
