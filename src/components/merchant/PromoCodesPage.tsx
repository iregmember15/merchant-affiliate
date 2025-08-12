import React, { useState } from 'react';
import { 
  TagIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxUses: number;
  currentUses: number;
  expiryDate: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
}

const PromoCodesPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: '1',
      code: 'SAVE20',
      type: 'percentage',
      value: 20,
      minOrder: 50,
      maxUses: 100,
      currentUses: 45,
      expiryDate: '2024-12-31',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      code: 'FREESHIP',
      type: 'fixed',
      value: 10,
      minOrder: 25,
      maxUses: 200,
      currentUses: 78,
      expiryDate: '2024-06-30',
      status: 'active',
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      code: 'WELCOME50',
      type: 'percentage',
      value: 50,
      minOrder: 100,
      maxUses: 50,
      currentUses: 50,
      expiryDate: '2024-03-15',
      status: 'inactive',
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      code: 'SUMMER25',
      type: 'percentage',
      value: 25,
      minOrder: 75,
      maxUses: 150,
      currentUses: 120,
      expiryDate: '2024-05-01',
      status: 'expired',
      createdAt: '2024-01-20'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getUsagePercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <TagIcon className="h-6 w-6 mr-2" />
            Promo Codes
          </h1>
          <p className="text-gray-600">Manage your promotional codes and discounts</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New Code
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TagIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Codes</p>
              <p className="text-2xl font-bold text-gray-900">{promoCodes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TagIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Codes</p>
              <p className="text-2xl font-bold text-gray-900">
                {promoCodes.filter(code => code.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TagIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Uses</p>
              <p className="text-2xl font-bold text-gray-900">
                {promoCodes.reduce((sum, code) => sum + code.currentUses, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TagIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Usage</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(promoCodes.reduce((sum, code) => sum + getUsagePercentage(code.currentUses, code.maxUses), 0) / promoCodes.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Promo Codes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
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
              {promoCodes.map((code) => (
                <tr key={code.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 font-mono">
                        {code.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(code.code)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title="Copy code"
                      >
                        {copiedCode === code.code ? (
                          <ClipboardDocumentIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <ClipboardDocumentIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {code.type === 'percentage' ? `${code.value}% off` : `$${code.value} off`}
                      </div>
                      <div className="text-sm text-gray-500">
                        Min order: ${code.minOrder}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {code.currentUses} / {code.maxUses}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${getUsagePercentage(code.currentUses, code.maxUses)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getUsagePercentage(code.currentUses, code.maxUses)}% used
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(code.expiryDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(code.status)}`}>
                      {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCode(code)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="View details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
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

      {/* Create/Edit Modal would go here */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Create New Promo Code</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  This feature would allow creating new promo codes with various settings.
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

export default PromoCodesPage;
