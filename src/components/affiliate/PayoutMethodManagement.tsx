import React, { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  GlobeAltIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface PayoutMethod {
  id: string;
  type: 'stripe' | 'paypal' | 'wise';
  name: string;
  account: string;
  isDefault: boolean;
  isVerified: boolean;
  lastUsed: string;
}

const PayoutMethodManagement: React.FC = () => {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: '1',
      type: 'paypal',
      name: 'PayPal Account',
      account: 'john.doe@example.com',
      isDefault: true,
      isVerified: true,
      lastUsed: '2024-06-01'
    },
    {
      id: '2',
      type: 'stripe',
      name: 'Stripe Connect',
      account: 'acct_1234567890',
      isDefault: false,
      isVerified: true,
      lastUsed: '2024-05-15'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PayoutMethod | null>(null);
  const [newMethod, setNewMethod] = useState({
    type: 'paypal' as 'stripe' | 'paypal' | 'wise',
    name: '',
    account: ''
  });

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'stripe':
        return <CreditCardIcon className="h-6 w-6 text-blue-500" />;
      case 'paypal':
        return <BanknotesIcon className="h-6 w-6 text-blue-400" />;
      case 'wise':
        return <GlobeAltIcon className="h-6 w-6 text-green-500" />;
      default:
        return <CreditCardIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getMethodColor = (type: string) => {
    switch (type) {
      case 'stripe':
        return 'bg-blue-100 text-blue-800';
      case 'paypal':
        return 'bg-blue-100 text-blue-800';
      case 'wise':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMethod = () => {
    const method: PayoutMethod = {
      id: Date.now().toString(),
      ...newMethod,
      isDefault: payoutMethods.length === 0,
      isVerified: false,
      lastUsed: 'Never'
    };
    
    setPayoutMethods([...payoutMethods, method]);
    setNewMethod({
      type: 'paypal',
      name: '',
      account: ''
    });
    setShowAddModal(false);
  };

  const handleSetDefault = (id: string) => {
    setPayoutMethods(payoutMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleDeleteMethod = (id: string) => {
    setPayoutMethods(payoutMethods.filter(method => method.id !== id));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Payout Methods</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Payout Method
          </button>
        </div>

        {/* Payout Methods Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {payoutMethods.map((method) => (
            <div key={method.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getMethodIcon(method.type)}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {method.account}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingMethod(method)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMethod(method.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(method.type)}`}>
                      {method.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`inline-flex items-center text-xs font-semibold ${
                      method.isVerified ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {method.isVerified ? (
                        <>
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Verified
                        </>
                      ) : (
                        'Pending Verification'
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Default:</span>
                    <span className={`text-xs font-semibold ${
                      method.isDefault ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {method.isDefault ? 'Yes' : 'No'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Used:</span>
                    <span className="text-xs text-gray-500">
                      {method.lastUsed}
                    </span>
                  </div>
                </div>

                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="mt-4 w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                  >
                    Set as Default
                  </button>
                )}

                {method.isDefault && (
                  <div className="mt-4 w-full bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm font-medium text-center">
                    Default Method
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingMethod) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingMethod ? 'Edit Payout Method' : 'Add Payout Method'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Method Type
                    </label>
                    <select
                      value={editingMethod ? editingMethod.type : newMethod.type}
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({...editingMethod, type: e.target.value as any});
                        } else {
                          setNewMethod({...newMethod, type: e.target.value as any});
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                      <option value="wise">Wise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={editingMethod ? editingMethod.name : newMethod.name}
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({...editingMethod, name: e.target.value});
                        } else {
                          setNewMethod({...newMethod, name: e.target.value});
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., My PayPal Account"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Details
                    </label>
                    <input
                      type="text"
                      value={editingMethod ? editingMethod.account : newMethod.account}
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({...editingMethod, account: e.target.value});
                        } else {
                          setNewMethod({...newMethod, account: e.target.value});
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Email, account number, etc."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingMethod(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (editingMethod) {
                        // Handle edit
                        setEditingMethod(null);
                      } else {
                        handleAddMethod();
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    {editingMethod ? 'Update' : 'Add Method'}
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

export default PayoutMethodManagement;
