import React, { useState } from "react";
import {
  CreditCardIcon,
  BanknotesIcon,
  GlobeAltIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface PayoutMethod {
  id: string;
  type: "stripe" | "paypal" | "wise";
  name: string;
  account: string;
  isDefault: boolean;
  isVerified: boolean;
  lastUsed: string;
  creditBalance: number;
  pendingPayout: number;
  expiryDate?: string;
}

const PayoutMethodManagement: React.FC = () => {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: "1",
      type: "paypal",
      name: "PayPal Account",
      account: "john.doe@example.com",
      isDefault: true,
      isVerified: true,
      lastUsed: "2024-06-01",
      creditBalance: 1250.75,
      pendingPayout: 350.0,
      expiryDate: "2026-12-31",
    },
    {
      id: "2",
      type: "stripe",
      name: "Stripe Connect",
      account: "acct_1234567890",
      isDefault: false,
      isVerified: true,
      lastUsed: "2024-05-15",
      creditBalance: 892.3,
      pendingPayout: 150.5,
      expiryDate: "2025-09-15",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PayoutMethod | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState<PayoutMethod | null>(
    null
  );
  const [payoutAmount, setPayoutAmount] = useState("");
  const [currency, setCurrency] = useState("$");

  const [newMethod, setNewMethod] = useState({
    type: "paypal" as "stripe" | "paypal" | "wise",
    name: "",
    account: "",
    expiryDate: "",
  });

  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(false);
  const [minPayoutThreshold, setMinPayoutThreshold] = useState(50);

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "stripe":
        return <CreditCardIcon className="h-6 w-6 text-blue-500" />;
      case "paypal":
        return <BanknotesIcon className="h-6 w-6 text-blue-400" />;
      case "wise":
        return <GlobeAltIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <CreditCardIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const getMethodColor = (type: string) => {
    switch (type) {
      case "stripe":
      case "paypal":
      case "wise":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isMethodExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isMethodExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const handleAddMethod = () => {
    const method: PayoutMethod = {
      id: Date.now().toString(),
      ...newMethod,
      isDefault: payoutMethods.length === 0,
      isVerified: false,
      lastUsed: "Never",
      creditBalance: 0,
      pendingPayout: 0,
    };

    setPayoutMethods([...payoutMethods, method]);
    setNewMethod({
      type: "paypal",
      name: "",
      account: "",
      expiryDate: "",
    });
    setShowAddModal(false);
  };

  const handleEditMethod = () => {
    if (!editingMethod) return;

    setPayoutMethods(
      payoutMethods.map((method) =>
        method.id === editingMethod.id ? editingMethod : method
      )
    );
    setEditingMethod(null);
  };

  const handleSetDefault = (id: string) => {
    setPayoutMethods(
      payoutMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteMethod = (id: string) => {
    setPayoutMethods(payoutMethods.filter((method) => method.id !== id));
  };

  const handlePayout = () => {
    if (!showPayoutModal || !payoutAmount) return;

    const amount = parseFloat(payoutAmount);
    const methodId = showPayoutModal.id;

    setPayoutMethods(
      payoutMethods.map((method) =>
        method.id === methodId
          ? {
              ...method,
              creditBalance: method.creditBalance - amount,
              pendingPayout: method.pendingPayout + amount,
              lastUsed: new Date().toISOString().split("T")[0],
            }
          : method
      )
    );

    setShowPayoutModal(null);
    setPayoutAmount("");
  };

  const handleManualPayout = (method: PayoutMethod) => {
    const amount = method.creditBalance;
    if (!amount) return;

    setPayoutMethods(
      payoutMethods.map((m) =>
        m.id === method.id
          ? {
              ...m,
              creditBalance: 0,
              pendingPayout: m.pendingPayout + amount,
              lastUsed: new Date().toISOString().split("T")[0],
            }
          : m
      )
    );
  };

  const totalCredits = payoutMethods.reduce(
    (sum, method) => sum + method.creditBalance,
    0
  );
  const totalPending = payoutMethods.reduce(
    (sum, method) => sum + method.pendingPayout,
    0
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Payout Methods
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Payout Method
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5 flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
              <div className="ml-5">
                <p className="text-sm text-gray-500">Total Credits</p>
                <p className="text-lg font-medium text-gray-900">
                  {currency}
                  {totalCredits.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5 flex items-center">
              <BanknotesIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-5">
                <p className="text-sm text-gray-500">Pending Payouts</p>
                <p className="text-lg font-medium text-gray-900">
                  {currency}
                  {totalPending.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5 flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-5">
                <p className="text-sm text-gray-500">Active Methods</p>
                <p className="text-lg font-medium text-gray-900">
                  {payoutMethods.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto Payout Settings */}
        <div className="mt-6 bg-white shadow rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autoPayoutEnabled}
                onChange={(e) => setAutoPayoutEnabled(e.target.checked)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Enable Auto Payout
              </span>
            </label>
            {autoPayoutEnabled && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Min Threshold:</span>
                <input
                  type="number"
                  value={minPayoutThreshold}
                  onChange={(e) =>
                    setMinPayoutThreshold(parseFloat(e.target.value))
                  }
                  className="border rounded-md px-2 py-1 text-sm w-20"
                />
              </div>
            )}
          </div>
        </div>

        {/* Payout Methods Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {payoutMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getMethodIcon(method.type)}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-500">{method.account}</p>
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

                {/* Credit and Payout Info */}
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Credit Balance:</span>
                      <div className="font-semibold text-green-600">
                        {currency}
                        {method.creditBalance.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Pending Payout:</span>
                      <div className="font-semibold text-blue-600">
                        {currency}
                        {method.pendingPayout.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  {method.creditBalance > 0 && (
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => setShowPayoutModal(method)}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                      >
                        Request Payout
                      </button>
                      <button
                        onClick={() => handleManualPayout(method)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                      >
                        Manual Payout
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold ${getMethodColor(
                        method.type
                      )}`}
                    >
                      {method.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <span
                      className={`inline-flex items-center text-xs font-semibold ${
                        method.isVerified ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {method.isVerified ? (
                        <>
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Verified
                        </>
                      ) : (
                        "Pending Verification"
                      )}
                    </span>
                  </div>

                  {method.expiryDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Expires:</span>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span
                          className={`text-xs font-semibold ${
                            isMethodExpired(method.expiryDate)
                              ? "text-red-600"
                              : isMethodExpiringSoon(method.expiryDate)
                              ? "text-gray-600"
                              : "text-gray-600"
                          }`}
                        >
                          {new Date(method.expiryDate).toLocaleDateString()}
                        </span>
                        {isMethodExpired(method.expiryDate) && (
                          <ExclamationTriangleIcon className="h-3 w-3 ml-1 text-red-500" />
                        )}
                        {isMethodExpiringSoon(method.expiryDate) && (
                          <ExclamationTriangleIcon className="h-3 w-3 ml-1 text-red-600" />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Default:</span>
                    <span
                      className={`text-xs font-semibold ${
                        method.isDefault ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {method.isDefault ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Used:</span>
                    <span className="text-xs text-gray-500">{method.lastUsed}</span>
                  </div>
                </div>

                {!method.isDefault && !isMethodExpired(method.expiryDate) && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="mt-4 w-full bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                  >
                    Set as Default
                  </button>
                )}

                {method.isDefault && (
                  <div className="mt-4 w-full bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium text-center">
                    Default Method
                  </div>
                )}

                {isMethodExpired(method.expiryDate) && (
                  <div className="mt-4 w-full bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm font-medium text-center">
                    Expired - Update Required
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Request Payout Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Request Payout - {showPayoutModal.name}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ({currency})
                </label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  min={0}
                  max={showPayoutModal.creditBalance}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowPayoutModal(null)}
                  className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayout}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Payout Method Modal */}
        {(showAddModal || editingMethod) && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingMethod ? "Edit" : "Add"} Payout Method
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    value={editingMethod?.type || newMethod.type}
                    onChange={(e) =>
                      editingMethod
                        ? setEditingMethod({ ...editingMethod, type: e.target.value as any })
                        : setNewMethod({ ...newMethod, type: e.target.value as any })
                    }
                    className="mt-1 w-full border rounded-md px-3 py-2"
                  >
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                    <option value="wise">Wise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingMethod?.name || newMethod.name}
                    onChange={(e) =>
                      editingMethod
                        ? setEditingMethod({ ...editingMethod, name: e.target.value })
                        : setNewMethod({ ...newMethod, name: e.target.value })
                    }
                    className="mt-1 w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account
                  </label>
                  <input
                    type="text"
                    value={editingMethod?.account || newMethod.account}
                    onChange={(e) =>
                      editingMethod
                        ? setEditingMethod({ ...editingMethod, account: e.target.value })
                        : setNewMethod({ ...newMethod, account: e.target.value })
                    }
                    className="mt-1 w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={editingMethod?.expiryDate || newMethod.expiryDate}
                    onChange={(e) =>
                      editingMethod
                        ? setEditingMethod({ ...editingMethod, expiryDate: e.target.value })
                        : setNewMethod({ ...newMethod, expiryDate: e.target.value })
                    }
                    className="mt-1 w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMethod(null);
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editingMethod ? handleEditMethod : handleAddMethod}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  {editingMethod ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutMethodManagement;
