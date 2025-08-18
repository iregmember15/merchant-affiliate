import React, { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type Status = "Active" | "Pending" | "Declined" | "Draft";
type CommissionMode = "Fixed" | "Percentage";
type CommissionKey = "perClick" | "perSale";

interface CommissionEntry {
  enabled: boolean;
  approvalType: "Manual" | "Automatic";
  type: CommissionMode;
  commission: number; // store as plain number; interpret based on type
}

interface CommissionSettings {
  perClick: CommissionEntry;
  perSale: CommissionEntry;
}

interface CampaignData {
  id: number;
  name: string;
  description: string;
  status: Status;
  cookieLifetime: number;
  commission: CommissionSettings;
}

const defaultCommission: CommissionSettings = {
  perClick: { enabled: false, approvalType: "Manual", type: "Fixed", commission: 0 },
  perSale: { enabled: false, approvalType: "Manual", type: "Percentage", commission: 0 },
};

const initialCampaigns: CampaignData[] = [
  {
    id: 1,
    name: "Summer Sale 2024",
    description: "Get 20% off on all summer products",
    status: "Active",
    cookieLifetime: 30,
    commission: {
      perClick: { enabled: true, approvalType: "Automatic", type: "Fixed", commission: 0.5 },
      perSale: { enabled: true, approvalType: "Manual", type: "Percentage", commission: 10 },
    },
  },
  {
    id: 2,
    name: "Back to School",
    description: "Special offers on school supplies",
    status: "Active",
    cookieLifetime: 45,
    commission: {
      perClick: { enabled: false, approvalType: "Manual", type: "Fixed", commission: 0 },
      perSale: { enabled: true, approvalType: "Automatic", type: "Percentage", commission: 12 },
    },
  },
  {
    id: 3,
    name: "Holiday Special",
    description: "Festive season discounts",
    status: "Draft",
    cookieLifetime: 60,
    commission: {
      perClick: { enabled: true, approvalType: "Manual", type: "Fixed", commission: 0.25 },
      perSale: { enabled: false, approvalType: "Manual", type: "Percentage", commission: 0 },
    },
  },
];

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(initialCampaigns);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<CampaignData | null>(null);

  const openCreate = () => {
    setCurrentCampaign({
      id: Date.now(),
      name: "",
      description: "",
      status: "Draft",
      cookieLifetime: 30,
      commission: JSON.parse(JSON.stringify(defaultCommission)),
    });
    setIsFormOpen(true);
  };

  const openEdit = (c: CampaignData) => {
    // clone to avoid live mutations while editing
    setCurrentCampaign(JSON.parse(JSON.stringify(c)));
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentCampaign(null);
  };

  const saveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCampaign) return;

    setCampaigns((prev) => {
      const exists = prev.some((c) => c.id === currentCampaign.id);
      if (exists) {
        return prev.map((c) => (c.id === currentCampaign.id ? currentCampaign : c));
      }
      return [...prev, currentCampaign];
    });

    closeForm();
  };

  // helpers to update nested commission fields
  const updateCommission = (
    key: CommissionKey,
    patch: Partial<CommissionEntry>
  ) => {
    setCurrentCampaign((prev) =>
      prev
        ? {
            ...prev,
            commission: {
              ...prev.commission,
              [key]: {
                ...prev.commission[key],
                ...patch,
              },
            },
          }
        : prev
    );
  };

  const renderCommissionRow = (label: string, key: CommissionKey) => {
    if (!currentCampaign) return null;
    const entry = currentCampaign.commission[key];

    const onToggleEnabled = (enabled: boolean) => updateCommission(key, { enabled });

    const onTypeChange = (type: CommissionMode) => {
      // when switching type, keep value but clamp if percentage
      const value =
        type === "Percentage"
          ? Math.max(0, Math.min(100, entry.commission))
          : Math.max(0, entry.commission);
      updateCommission(key, { type, commission: value });
    };

    const onApprovalChange = (approvalType: "Manual" | "Automatic") =>
      updateCommission(key, { approvalType });

    const onCommissionChange = (raw: string) => {
      const num = Number(raw);
      if (isNaN(num)) return;
      if (entry.type === "Percentage") {
        updateCommission(key, { commission: Math.max(0, Math.min(100, num)) });
      } else {
        updateCommission(key, { commission: Math.max(0, num) });
      }
    };

    return (
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">{label}</div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={entry.enabled}
              onChange={(e) => onToggleEnabled(e.target.checked)}
              className="h-4 w-4"
            />
            {entry.enabled ? "Enabled" : "Disabled"}
          </label>
        </div>

        {entry.enabled && (
          <div className="mt-4 space-y-3">
            {/* Type selector */}
            <div>
              <div className="text-sm font-medium mb-1">Commission Type</div>
              <div className="flex gap-3">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${key}-type`}
                    checked={entry.type === "Fixed"}
                    onChange={() => onTypeChange("Fixed")}
                  />
                  Fixed (currency)
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${key}-type`}
                    checked={entry.type === "Percentage"}
                    onChange={() => onTypeChange("Percentage")}
                  />
                  Percentage (%)
                </label>
              </div>
            </div>

            {/* Commission input with $ or % adornment */}
            <div>
              <div className="text-sm font-medium mb-1">Commission {entry.type === "Percentage" ? "(%)" : "(Amount)"}</div>
              <div className="relative">
                {entry.type === "Fixed" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                )}
                <input
                  type="number"
                  min={0}
                  max={entry.type === "Percentage" ? 100 : undefined}
                  step={entry.type === "Percentage" ? 1 : 0.01}
                  value={entry.commission}
                  onChange={(e) => onCommissionChange(e.target.value)}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    entry.type === "Fixed" ? "pl-8" : "pr-10"
                  }`}
                  placeholder={entry.type === "Percentage" ? "10" : "0.50"}
                />
                {entry.type === "Percentage" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                )}
              </div>
              {entry.type === "Percentage" && (
                <p className="text-xs text-gray-500 mt-1">0–100%</p>
              )}
            </div>

            {/* Approval type */}
            <div>
              <div className="text-sm font-medium mb-1">Approval Type</div>
              <select
                value={entry.approvalType}
                onChange={(e) => onApprovalChange(e.target.value as "Manual" | "Automatic")}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  const statusBadgeClass = (status: Status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Declined":
        return "bg-red-100 text-red-700";
      case "Draft":
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Campaign Management</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
        >
          <Plus size={18} />
          Create New Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-sm uppercase">
                <th className="px-6 py-3">Campaign</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Cookie Lifetime</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {campaigns.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <div className="text-sm text-gray-500">{c.description}</div>
                    {/* Optional quick glance at commission */}
                    <div className="mt-1 text-xs text-gray-500">
                      {c.commission.perClick.enabled && (
                        <span className="mr-3">
                          Per Click:{" "}
                          {c.commission.perClick.type === "Fixed" ? `$${c.commission.perClick.commission}` : `${c.commission.perClick.commission}%`}
                        </span>
                      )}
                      {c.commission.perSale.enabled && (
                        <span>
                          Per Sale:{" "}
                          {c.commission.perSale.type === "Fixed" ? `$${c.commission.perSale.commission}` : `${c.commission.perSale.commission}%`}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadgeClass(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{c.cookieLifetime} days</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEdit(c)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td className="px-6 py-8 text-center text-gray-500" colSpan={4}>
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create/Edit Form */}
      {isFormOpen && currentCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {campaigns.some((c) => c.id === currentCampaign.id) ? "Edit Campaign" : "Create New Campaign"}
            </h2>

            <form onSubmit={saveCampaign} className="space-y-6">
              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
                  <input
                    type="text"
                    value={currentCampaign.name}
                    onChange={(e) => setCurrentCampaign({ ...currentCampaign, name: e.target.value })}
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    value={currentCampaign.description}
                    onChange={(e) => setCurrentCampaign({ ...currentCampaign, description: e.target.value })}
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={currentCampaign.status}
                    onChange={(e) =>
                      setCurrentCampaign({ ...currentCampaign, status: e.target.value as Status })
                    }
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cookie Lifetime (days)</label>
                  <input
                    type="number"
                    min={1}
                    value={currentCampaign.cookieLifetime}
                    onChange={(e) =>
                      setCurrentCampaign({ ...currentCampaign, cookieLifetime: Math.max(1, Number(e.target.value) || 1) })
                    }
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Commission Settings */}
              <div className="space-y-4">
                <div className="text-lg font-semibold text-gray-900">Commission Settings</div>
                {renderCommissionRow("Per Click", "perClick")}
                {renderCommissionRow("Per Sale", "perSale")}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;
