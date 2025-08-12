import React, { useState } from 'react';
import {
  PhotoIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface Asset {
  id: string;
  name: string;
  type: 'banner' | 'promo-code' | 'document';
  url: string;
  size: string;
  uploadDate: string;
  downloads: number;
  description: string;
}

const MarketingAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: '1',
      name: 'Summer Sale Banner 728x90',
      type: 'banner',
      url: '/assets/banner1.png',
      size: '45 KB',
      uploadDate: '2024-06-01',
      downloads: 156,
      description: 'High-quality banner for summer sale campaign'
    },
    {
      id: '2',
      name: 'SUMMER20 Promo Code',
      type: 'promo-code',
      url: '/assets/promo1.txt',
      size: '1 KB',
      uploadDate: '2024-06-01',
      downloads: 89,
      description: '20% off promo code for summer products'
    },
    {
      id: '3',
      name: 'Product Catalog PDF',
      type: 'document',
      url: '/assets/catalog.pdf',
      size: '2.3 MB',
      uploadDate: '2024-05-28',
      downloads: 234,
      description: 'Complete product catalog with pricing'
    },
    {
      id: '4',
      name: 'Holiday Banner 300x250',
      type: 'banner',
      url: '/assets/banner2.png',
      size: '32 KB',
      uploadDate: '2024-05-25',
      downloads: 98,
      description: 'Holiday season promotional banner'
    }
  ]);

  const [filterType, setFilterType] = useState<string>('all');

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'banner':
        return <PhotoIcon className="h-8 w-8 text-blue-500" />;
      case 'promo-code':
        return <TagIcon className="h-8 w-8 text-green-500" />;
      case 'document':
        return <DocumentTextIcon className="h-8 w-8 text-purple-500" />;
      default:
        return <DocumentTextIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'banner':
        return 'bg-blue-100 text-blue-800';
      case 'promo-code':
        return 'bg-green-100 text-green-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssets = assets.filter(asset => 
    filterType === 'all' || asset.type === filterType
  );

  const handleDownload = (asset: Asset) => {
    // Simulate download
    console.log(`Downloading ${asset.name}`);
    // In a real app, this would trigger an actual download
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Marketing Assets</h1>
        
        {/* Filter */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Types</option>
              <option value="banner">Banners</option>
              <option value="promo-code">Promo Codes</option>
              <option value="document">Documents</option>
            </select>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {getAssetIcon(asset.type)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {asset.size} • {asset.uploadDate}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(asset.type)}`}>
                    {asset.type}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  {asset.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {asset.downloads} downloads
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDownload(asset)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="mt-8 text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No marketing assets match your current filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingAssets;
