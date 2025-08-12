import React, { useState } from 'react';
import {
  PlusIcon,
  PhotoIcon,
  DocumentTextIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface Asset {
  id: string;
  name: string;
  type: 'banner' | 'promo-code' | 'document';
  url: string;
  size: string;
  uploadDate: string;
  downloads: number;
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
      downloads: 156
    },
    {
      id: '2',
      name: 'SUMMER20 Promo Code',
      type: 'promo-code',
      url: '/assets/promo1.txt',
      size: '1 KB',
      uploadDate: '2024-06-01',
      downloads: 89
    },
    {
      id: '3',
      name: 'Product Catalog PDF',
      type: 'document',
      url: '/assets/catalog.pdf',
      size: '2.3 MB',
      uploadDate: '2024-05-28',
      downloads: 234
    },
    {
      id: '4',
      name: 'Holiday Banner 300x250',
      type: 'banner',
      url: '/assets/banner2.png',
      size: '32 KB',
      uploadDate: '2024-05-25',
      downloads: 98
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'banner' | 'promo-code' | 'document'>('banner');

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'banner':
        return <PhotoIcon className="h-8 w-8 text-blue-500" />;
      case 'promo-code':
        return <DocumentTextIcon className="h-8 w-8 text-green-500" />;
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

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Marketing Assets</h1>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Upload Asset
          </button>
        </div>

        {/* Assets Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((asset) => (
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

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {asset.downloads} downloads
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Upload Marketing Asset
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Type
                    </label>
                    <select
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="banner">Banner Image</option>
                      <option value="promo-code">Promo Code</option>
                      <option value="document">Document</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter asset name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>

                  {uploadType === 'promo-code' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Promo Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Upload
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

export default MarketingAssets;
