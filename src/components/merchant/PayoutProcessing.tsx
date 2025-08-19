import React, { useState, useMemo } from "react";
import {
  CreditCardIcon,
  BanknotesIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  CalendarIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Payout {
  id: string;
  affiliateName: string;
  affiliateEmail: string;
  amount: number;
  method: "stripe" | "paypal" | "wise" | "bank_transfer";
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  date: string;
  reference: string;
  commission: number;
  processingFee: number;
  currency: string;
  country: string;
  notes?: string;
  retryCount?: number;
}

interface PayoutMethod {
  type: "stripe" | "paypal" | "wise" | "bank_transfer";
  name: string;
  isConfigured: boolean;
  processingFee: number;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  supportedCountries: string[];
}

const PayoutProcessing: React.FC = () => {
  const [payouts, setPayouts] = useState<Payout[]>([
    {
      id: "1",
      affiliateName: "John Doe",
      affiliateEmail: "john.doe@example.com",
      amount: 450.0,
      method: "stripe",
      status: "completed",
      date: "2024-06-01",
      reference: "STR-2024-001",
      commission: 45.0,
      processingFee: 13.5,
      currency: "USD",
      country: "US",
    },
    {
      id: "2",
      affiliateName: "Jane Smith",
      affiliateEmail: "jane.smith@example.com",
      amount: 320.0,
      method: "paypal",
      status: "processing",
      date: "2024-06-02",
      reference: "PP-2024-002",
      commission: 32.0,
      processingFee: 9.6,
      currency: "USD",
      country: "CA",
    },
    {
      id: "3",
      affiliateName: "Mike Johnson",
      affiliateEmail: "mike.j@example.com",
      amount: 180.0,
      method: "wise",
      status: "pending",
      date: "2024-06-03",
      reference: "WISE-2024-003",
      commission: 18.0,
      processingFee: 7.2,
      currency: "EUR",
      country: "DE",
    },
    {
      id: "4",
      affiliateName: "Sarah Wilson",
      affiliateEmail: "sarah.w@example.com",
      amount: 75.0,
      method: "paypal",
      status: "failed",
      date: "2024-06-04",
      reference: "PP-2024-004",
      commission: 7.5,
      processingFee: 2.25,
      currency: "USD",
      country: "UK",
      retryCount: 2,
    },
  ]);

  const [payoutMethods] = useState<PayoutMethod[]>([
    {
      type: "stripe",
      name: "Stripe Connect",
      isConfigured: true,
      processingFee: 2.9,
      minAmount: 1,
      maxAmount: 10000,
      processingTime: "1-2 business days",
      supportedCountries: ["US", "CA", "UK", "AU", "DE", "FR"],
    },
    {
      type: "paypal",
      name: "PayPal",
      isConfigured: true,
      processingFee: 3.0,
      minAmount: 1,
      maxAmount: 5000,
      processingTime: "Instant",
      supportedCountries: ["US", "CA", "UK", "AU", "DE", "FR", "ES", "IT"],
    },
    {
      type: "wise",
      name: "Wise (formerly TransferWise)",
      isConfigured: false,
      processingFee: 4.0,
      minAmount: 10,
      maxAmount: 50000,
      processingTime: "1-4 business days",
      supportedCountries: [
        "US",
        "CA",
        "UK",
        "AU",
        "DE",
        "FR",
        "ES",
        "IT",
        "NL",
        "SE",
      ],
    },
    {
      type: "bank_transfer",
      name: "Direct Bank Transfer",
      isConfigured: false,
      processingFee: 1.5,
      minAmount: 50,
      maxAmount: 100000,
      processingTime: "3-5 business days",
      supportedCountries: ["US", "CA", "UK", "AU"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [showBulkPayout, setShowBulkPayout] = useState(false);
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const [showNewPayout, setShowNewPayout] = useState(false);
  const [newPayout, setNewPayout] = useState({
    affiliateName: "",
    affiliateEmail: "",
    amount: "",
    method: "stripe" as "stripe" | "paypal" | "wise" | "bank_transfer",
    currency: "USD",
    country: "US",
    notes: "",
  });

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "stripe":
        return <CreditCardIcon className="h-5 w-5" />;
      case "paypal":
        return <BanknotesIcon className="h-5 w-5" />;
      case "wise":
        return <GlobeAltIcon className="h-5 w-5" />;
      case "bank_transfer":
        return <CreditCardIcon className="h-5 w-5" />;
      default:
        return <CreditCardIcon className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "processing":
        return <ClockIcon className="h-4 w-4" />;
      case "pending":
        return <ClockIcon className="h-4 w-4" />;
      case "failed":
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case "cancelled":
        return <XMarkIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const filteredPayouts = useMemo(() => {
    return payouts.filter((payout) => {
      const matchesSearch =
        payout.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payout.affiliateEmail
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payout.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || payout.status === statusFilter;
      const matchesMethod =
        methodFilter === "all" || payout.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payouts, searchTerm, statusFilter, methodFilter]);

  const payoutStats = useMemo(() => {
    const total = payouts.reduce((sum, p) => sum + p.amount, 0);
    const completed = payouts
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    const pending = payouts
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);
    const processing = payouts
      .filter((p) => p.status === "processing")
      .reduce((sum, p) => sum + p.amount, 0);
    const failed = payouts
      .filter((p) => p.status === "failed")
      .reduce((sum, p) => sum + p.amount, 0);
    const totalFees = payouts.reduce((sum, p) => sum + p.processingFee, 0);

    return { total, completed, pending, processing, failed, totalFees };
  }, [payouts]);

  const handleCreatePayout = () => {
    const selectedMethod = payoutMethods.find((m) => m.type === newPayout.method);
    const processingFee =
      (parseFloat(newPayout.amount) * (selectedMethod?.processingFee || 3)) /
      100;

    const payout: Payout = {
      id: Date.now().toString(),
      affiliateName: newPayout.affiliateName,
      affiliateEmail: newPayout.affiliateEmail,
      amount: parseFloat(newPayout.amount),
      method: newPayout.method,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      reference: `${newPayout.method.toUpperCase()}-${Date.now()}`,
      commission: parseFloat(newPayout.amount) * 0.1,
      processingFee: processingFee,
      currency: newPayout.currency,
      country: newPayout.country,
      notes: newPayout.notes,
    };

    setPayouts([payout, ...payouts]);
    setNewPayout({
      affiliateName: "",
      affiliateEmail: "",
      amount: "",
      method: "stripe",
      currency: "USD",
      country: "US",
      notes: "",
    });
    setShowNewPayout(false);
  };

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setPayouts(
      payouts.map((payout) =>
        payout.id === id ? { ...payout, status: newStatus as any } : payout
      )
    );
  };

  const handleBulkProcess = () => {
    setPayouts(
      payouts.map((payout) =>
        selectedPayouts.includes(payout.id) && payout.status === "pending"
          ? { ...payout, status: "processing" }
          : payout
      )
    );
    setSelectedPayouts([]);
    setShowBulkPayout(false);
  };

  const handleSelectPayout = (id: string) => {
    setSelectedPayouts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Merchant Payout Processing
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowNewPayout(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              New Payout
            </button>
            <button
              onClick={() => setShowBulkPayout(true)}
              disabled={selectedPayouts.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              Bulk Process ({selectedPayouts.length})
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Payouts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${payoutStats.total.toFixed(2)}
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
                      Completed
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${payoutStats.completed.toFixed(2)}
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
                  <ClockIcon className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${payoutStats.pending.toFixed(2)}
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
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Failed
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${payoutStats.failed.toFixed(2)}
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
                  <ChartBarIcon className="h-8 w-8 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Fees
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${payoutStats.totalFees.toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Setup */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {payoutMethods.map((method) => (
            <div key={method.type} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getMethodIcon(method.type)}
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {method.name}
                  </h3>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    method.isConfigured ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Fee:</span>
                  <span className="font-medium">{method.processingFee}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Min/Max:</span>
                  <span className="font-medium">
                    ${method.minAmount}-${method.maxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{method.processingTime}</span>
                </div>
              </div>
              <button
                className={`mt-4 w-full px-4 py-2 rounded-md text-sm font-medium ${
                  method.isConfigured
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {method.isConfigured ? "Reconfigure" : "Setup"}
              </button>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search affiliates, emails, references..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Methods</option>
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="wise">Wise</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>

            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Payouts Table */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Payouts ({filteredPayouts.length})
              </h3>
              {selectedPayouts.length > 0 && (
                <div className="text-sm text-gray-600">
                  {selectedPayouts.length} selected
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedPayouts.length === filteredPayouts.length &&
                          filteredPayouts.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPayouts(filteredPayouts.map((p) => p.id));
                          } else {
                            setSelectedPayouts([]);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
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
                      Fee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className={
                        selectedPayouts.includes(payout.id) ? "bg-blue-50" : ""
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPayouts.includes(payout.id)}
                          onChange={() => handleSelectPayout(payout.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payout.affiliateName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payout.affiliateEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${payout.amount.toFixed(2)} {payout.currency}
                        </div>
                        <div className="text-xs text-gray-500">{payout.country}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getMethodIcon(payout.method)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">
                            {payout.method.replace("_", " ")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              payout.status
                            )}`}
                          >
                            {getStatusIcon(payout.status)}
                            <span className="ml-1 capitalize">{payout.status}</span>
                          </span>
                          {payout.retryCount && payout.retryCount > 0 && (
                            <span className="ml-2 text-xs text-gray-500">
                              ({payout.retryCount} retries)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${payout.processingFee.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payout.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {payout.status === "pending" && (
                            <button
                              onClick={() => handleStatusUpdate(payout.id, "processing")}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Process
                            </button>
                          )}
                          {payout.status === "failed" && (
                            <button
                              onClick={() => handleStatusUpdate(payout.id, "pending")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Retry
                            </button>
                          )}
                          {(payout.status === "pending" || payout.status === "processing") && (
                            <button
                              onClick={() => handleStatusUpdate(payout.id, "cancelled")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* New Payout Modal (centered popup) */}
        {showNewPayout && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowNewPayout(false)}
          >
            <div
              className="relative bg-white rounded-lg shadow-lg w-full max-w-[720px] mx-4 max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Payout</h3>
                  <button
                    onClick={() => setShowNewPayout(false)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate Name</label>
                      <input
                        type="text"
                        value={newPayout.affiliateName}
                        onChange={(e) =>
                          setNewPayout({
                            ...newPayout,
                            affiliateName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={newPayout.affiliateEmail}
                        onChange={(e) =>
                          setNewPayout({
                            ...newPayout,
                            affiliateEmail: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={newPayout.amount}
                          onChange={(e) =>
                            setNewPayout({
                              ...newPayout,
                              amount: e.target.value,
                            })
                          }
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={newPayout.currency}
                        onChange={(e) =>
                          setNewPayout({
                            ...newPayout,
                            currency: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <select
                        value={newPayout.country}
                        onChange={(e) =>
                          setNewPayout({
                            ...newPayout,
                            country: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="ES">Spain</option>
                        <option value="IT">Italy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      value={newPayout.method}
                      onChange={(e) =>
                        setNewPayout({
                          ...newPayout,
                          method: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="stripe">Stripe</option>
                      <option value="paypal">PayPal</option>
                      <option value="wise">Wise</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                    <textarea
                      value={newPayout.notes}
                      onChange={(e) => setNewPayout({ ...newPayout, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Additional notes or instructions..."
                    />
                  </div>

                  {newPayout.amount && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Payout Amount:</span>
                          <span className="font-medium">${parseFloat(newPayout.amount || "0").toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            Processing Fee (
                            {
                              payoutMethods.find((m) => m.type === newPayout.method)
                                ?.processingFee
                            }
                            %):
                          </span>
                          <span className="font-medium text-red-600">
                            -$
                            {(
                              (parseFloat(newPayout.amount || "0") *
                                (payoutMethods.find((m) => m.type === newPayout.method)
                                  ?.processingFee || 3)) /
                              100
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="font-medium">Net Amount:</span>
                          <span className="font-medium text-green-600">
                            $
                            {(
                              parseFloat(newPayout.amount || "0") -
                              (parseFloat(newPayout.amount || "0") *
                                (payoutMethods.find((m) => m.type === newPayout.method)
                                  ?.processingFee || 3)) /
                                100
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowNewPayout(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePayout}
                    disabled={
                      !newPayout.affiliateName ||
                      !newPayout.affiliateEmail ||
                      !newPayout.amount
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Create Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Payout Modal (centered popup) */}
        {showBulkPayout && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={() => setShowBulkPayout(false)}
          >
            <div
              className="relative top-0 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Process Payouts</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
  You&apos;ve selected {selectedPayouts.length} payouts for processing:
</p>

                  <div className="max-h-40 overflow-y-auto bg-gray-50 rounded-lg p-3">
                    {payouts
                      .filter((p) => selectedPayouts.includes(p.id))
                      .map((payout) => (
                        <div key={payout.id} className="flex justify-between items-center py-1">
                          <span className="text-sm">{payout.affiliateName}</span>
                          <span className="text-sm font-medium">${payout.amount.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>
                        $
                        {payouts
                          .filter((p) => selectedPayouts.includes(p.id))
                          .reduce((sum, p) => sum + p.amount, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowBulkPayout(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkProcess}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Process Selected
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

export default PayoutProcessing;
