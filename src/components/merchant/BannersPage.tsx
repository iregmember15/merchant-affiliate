import React, { useState } from 'react';
import { 
  PhotoIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface Banner {
  id: string;
  name: string;
  size: string;
  type: 'banner' | 'logo' | 'social';
  status: 'active' | 'inactive';
  preview: string;
  url: string;
  clicks: number;
  conversions: number;
  createdAt: string;
}

const BannersPage: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      name: 'Main Product Banner',
      size: '728x90',
      type: 'banner',
      status: 'active',
      preview: '/placeholder-banner-1.png',
      url: 'https://example.com/banner1.png',
      clicks: 1250,
      conversions: 45,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sidebar Banner',
      size: '300x250',
      type: 'banner',
      status: 'active',
      preview: '/placeholder-banner-2.png',
      url: 'https://example.com/banner2.png',
      clicks: 890,
      conversions: 32,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Company Logo',
      size: '200x200',
      type: 'logo',
      status: 'active',
      preview: '/placeholder-logo.png',
      url: 'https://example.com/logo.png',
      clicks: 0,
      conversions: 0,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      name: 'Social Media Banner',
      size: '1200x630',
      type: 'social',
      status: 'inactive',
      preview: '/placeholder-social.png',
      url: 'https://example.com/social.png',
      clicks: 450,
      conversions: 18,
      createdAt: '2024-02-01'
    },
    {
      id: '5',
      name: 'Mobile Banner',
      size: '320x50',
      type: 'banner',
      status: 'active',
      preview: '/placeholder-mobile.png',
      url: 'https://example.com/mobile.png',
      clicks: 2100,
      conversions: 67,
      createdAt: '2024-01-25'
    },
    {
      id: '6',
      name: 'Skyscraper Banner',
      size: '160x600',
      type: 'banner',
      status: 'active',
      preview: '/placeholder-skyscraper.png',
      url: 'https://example.com/skyscraper.png',
      clicks: 750,
      conversions: 28,
      createdAt: '2024-02-05'
    }
  ]);

  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'banner':
        return 'bg-blue-100 text-blue-800';
      case 'logo':
        return 'bg-purple-100 text-purple-800';
      case 'social':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <PhotoIcon className="h-6 w-6 mr-2" />
            Marketing Banners
          </h1>
          <p className="text-gray-600">Manage your marketing assets and promotional banners</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Upload Banner
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PhotoIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Banners</p>
              <p className="text-2xl font-bold text-gray-900">{banners.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <PhotoIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Banners</p>
              <p className="text-2xl font-bold text-gray-900">
                {banners.filter(banner => banner.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <PhotoIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {banners.reduce((sum, banner) => sum + banner.clicks, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PhotoIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Conversion</p>
              <p className="text-2xl font-bold text-gray-900">
  {(
    (banners.reduce(
      (sum, banner) =>
        sum + parseFloat(String(getConversionRate(banner.clicks, banner.conversions))),
      0
    ) / banners.length || 0
  ).toFixed(1))}
  %
</p>

            </div>
          </div>
        </div>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Banner Preview */}
            <div className="relative">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-xs">{banner.size}</p>
                  <p className="text-xs">{banner.name}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(banner.status)}`}>
                  {banner.status}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(banner.type)}`}>
                  {banner.type}
                </span>
              </div>
            </div>

            {/* Banner Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{banner.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-medium">{banner.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Clicks:</span>
                  <span className="font-medium">{banner.clicks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversions:</span>
                  <span className="font-medium">{banner.conversions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span className="font-medium">{getConversionRate(banner.clicks, banner.conversions)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium">{formatDate(banner.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => copyToClipboard(banner.url)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Copy URL"
                >
                  {copiedUrl === banner.url ? (
                    <ClipboardDocumentIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ClipboardDocumentIcon className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedBanner(banner)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="View details"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Download"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Edit"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  title="Delete"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Details Modal */}
      {selectedBanner && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Banner Details</h3>
                <button
                  onClick={() => setSelectedBanner(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedBanner.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <p className="text-sm text-gray-900">{selectedBanner.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="text-sm text-gray-900">{selectedBanner.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL</label>
                  <p className="text-sm text-gray-900 break-all">{selectedBanner.url}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Clicks</label>
                    <p className="text-sm text-gray-900">{selectedBanner.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Conversions</label>
                    <p className="text-sm text-gray-900">{selectedBanner.conversions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Upload New Banner</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  This feature would allow uploading new banner images with various settings.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannersPage;
