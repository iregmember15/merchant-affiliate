import React, { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Payout {
  id: string;
  affiliateName: string;
  amount: string;
  method: 'stripe' | 'paypal' | 'wise';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  date: string;
  reference: string;
}

const PayoutProcessing: React.FC = () => {
  const [payouts, setPayouts] = useState<Payout[]>([
    {
      id: '1',
      affiliateName: 'John Doe',
      amount: '$450.00',
      method: 'stripe',
      status: 'completed',
      date: '2024-06-01',
      reference: 'STR-2024-001'
    },
    {
      id: '2',
      affiliateName: 'Jane Smith',
      amount: '$320.00',
      method: 'paypal',
      status: 'processing',
      date: '2024-06-02',
      reference: 'PP-2024-002'
    },
    {
      id: '3',
      affiliateName: 'Mike Johnson',
      amount: '$180.00',
      method: 'wise',
      status: 'pending',
      date: '2024-06-03',
      reference: 'WISE-2024-003'
    }
  ]);

  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'paypal' | 'wise'>('stripe');

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe':
        return <CreditCardIcon className="h-5 w-5" />;
      case 'paypal':
        return <BanknotesIcon className="h-5 w-5" />;
      case 'wise':
        return <GlobeAltIcon className="h-5 w-5" />;
      default:
        return <CreditCardIcon className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'processing':
        return <ClockIcon className="h-4 w-4" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'failed':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Payout Processing</h1>

        {/* Payment Methods Setup */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <CreditCardIcon className="h-8 w-8 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Stripe</h3>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Process payouts via Stripe Connect
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Configure
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <BanknotesIcon className="h-8 w-8 text-blue-400" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">PayPal</h3>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Send payments via PayPal
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Configure
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <GlobeAltIcon className="h-8 w-8 text-green-500" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Wise</h3>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              International transfers via Wise
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Configure
            </button>
          </div>
        </div>

        {/* Payouts Table */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Payouts</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Process New Payout
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payouts.map((payout) => (
                    <tr key={payout.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payout.affiliateName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payout.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getMethodIcon(payout.method)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">
                            {payout.method}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                          {getStatusIcon(payout.status)}
                          <span className="ml-1">{payout.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payout.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payout.reference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutProcessing;
