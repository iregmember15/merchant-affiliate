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
  const [newMethod, setNewMethod] = useState({
    type: "paypal" as "stripe" | "paypal" | "wise",
    name: "",
    account: "",
    expiryDate: "",
  });

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
        return "bg-blue-100 text-blue-800";
      case "paypal":
        return "bg-blue-100 text-blue-800";
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
    setPayoutMethods(
      payoutMethods.map((method) =>
        method.id === showPayoutModal.id
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
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Credits
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${totalCredits.toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BanknotesIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Payouts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${totalPending.toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Methods
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {payoutMethods.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
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

                {/* Credit and Payout Information */}
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Credit Balance:</span>
                      <div className="font-semibold text-green-600">
                        ${method.creditBalance.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Pending Payout:</span>
                      <div className="font-semibold text-blue-600">
                        ${method.pendingPayout.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {method.creditBalance > 0 && (
                    <button
                      onClick={() => setShowPayoutModal(method)}
                      className="mt-3 w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Request Payout
                    </button>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(
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
                              ? "text-yellow-600"
                              : "text-gray-600"
                          }`}
                        >
                          {new Date(method.expiryDate).toLocaleDateString()}
                        </span>
                        {isMethodExpired(method.expiryDate) && (
                          <ExclamationTriangleIcon className="h-3 w-3 ml-1 text-red-500" />
                        )}
                        {isMethodExpiringSoon(method.expiryDate) && (
                          <ExclamationTriangleIcon className="h-3 w-3 ml-1 text-yellow-500" />
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
                    <span className="text-xs text-gray-500">
                      {method.lastUsed}
                    </span>
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

        {/* Payout Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Request Payout
                </h3>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    {getMethodIcon(showPayoutModal.type)}
                    <span className="ml-2 font-medium">
                      {showPayoutModal.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Available Balance:{" "}
                    <span className="font-semibold text-green-600">
                      ${showPayoutModal.creditBalance.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payout Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={showPayoutModal.creditBalance}
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowPayoutModal(null);
                      setPayoutAmount("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayout}
                    disabled={
                      !payoutAmount ||
                      parseFloat(payoutAmount) <= 0 ||
                      parseFloat(payoutAmount) > showPayoutModal.creditBalance
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Request Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(showAddModal || editingMethod) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingMethod ? "Edit Payout Method" : "Add Payout Method"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Method Type
                    </label>
                    <select
                      value={
                        editingMethod ? editingMethod.type : newMethod.type
                      }
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({
                            ...editingMethod,
                            type: e.target.value as any,
                          });
                        } else {
                          setNewMethod({
                            ...newMethod,
                            type: e.target.value as any,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                      value={
                        editingMethod ? editingMethod.name : newMethod.name
                      }
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({
                            ...editingMethod,
                            name: e.target.value,
                          });
                        } else {
                          setNewMethod({ ...newMethod, name: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., My PayPal Account"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Details
                    </label>
                    <input
                      type="text"
                      value={
                        editingMethod
                          ? editingMethod.account
                          : newMethod.account
                      }
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({
                            ...editingMethod,
                            account: e.target.value,
                          });
                        } else {
                          setNewMethod({
                            ...newMethod,
                            account: e.target.value,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email, account number, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={
                        editingMethod
                          ? editingMethod.expiryDate || ""
                          : newMethod.expiryDate
                      }
                      onChange={(e) => {
                        if (editingMethod) {
                          setEditingMethod({
                            ...editingMethod,
                            expiryDate: e.target.value,
                          });
                        } else {
                          setNewMethod({
                            ...newMethod,
                            expiryDate: e.target.value,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                        handleEditMethod();
                      } else {
                        handleAddMethod();
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {editingMethod ? "Update" : "Add Method"}
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
