// Analytics Data Service - Provides dummy data for charts and statistics

export interface ChartDataPoint {
  date: string;
  value: number;
  clicks?: number;
  conversions?: number;
  revenue?: number;
  earnings?: number;
}

export interface CampaignData {
  id: string;
  name: string;
  clicks: number;
  conversions: number;
  revenue: number;
  earnings: number;
  conversionRate: number;
  status: 'active' | 'paused' | 'ended';
  startDate: string;
  endDate?: string;
}

export interface AffiliateData {
  id: string;
  name: string;
  email: string;
  totalEarnings: number;
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActivity: string;
}

export interface TransactionData {
  id: string;
  type: 'commission' | 'payout' | 'refund';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  campaign?: string;
  affiliate?: string;
}

// Generate dummy data for the last 30 days
const generateDailyData = (baseValue: number, variance = 0.3): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
    const value = Math.round(baseValue * randomFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      clicks: Math.round(value * (1.5 + Math.random() * 2)),
      conversions: Math.round(value * (0.05 + Math.random() * 0.1)),
      revenue: Math.round(value * (15 + Math.random() * 10)),
      earnings: Math.round(value * (2 + Math.random() * 3))
    });
  }
  
  return data;
};

// Generate dummy data for the last 12 months
const generateMonthlyData = (baseValue: number, variance = 0.4): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    
    const randomFactor = 0.6 + Math.random() * 0.8; // 0.6 to 1.4
    const value = Math.round(baseValue * randomFactor);
    
    data.push({
      date: date.toISOString().split('T')[0].substring(0, 7),
      value,
      clicks: Math.round(value * (1.5 + Math.random() * 2)),
      conversions: Math.round(value * (0.05 + Math.random() * 0.1)),
      revenue: Math.round(value * (15 + Math.random() * 10)),
      earnings: Math.round(value * (2 + Math.random() * 3))
    });
  }
  
  return data;
};

// Affiliate Analytics Data
export const getAffiliateAnalytics = () => {
  return {
    // Daily earnings data for the last 30 days
    dailyEarnings: generateDailyData(80, 0.4),
    
    // Monthly earnings data for the last 12 months
    monthlyEarnings: generateMonthlyData(2400, 0.5),
    
    // Daily clicks data
    dailyClicks: generateDailyData(120, 0.3),
    
    // Daily conversions data
    dailyConversions: generateDailyData(8, 0.5),
    
    // Conversion rate over time
    conversionRate: generateDailyData(7, 0.2).map(point => ({
      ...point,
      value: point.value / 10 // Convert to percentage
    })),
    
    // Top performing campaigns
    topCampaigns: [
      {
        id: '1',
        name: 'Summer Sale 2024',
        clicks: 2450,
        conversions: 156,
        revenue: 15600,
        earnings: 2340,
        conversionRate: 6.37,
        status: 'active' as const,
        startDate: '2024-06-01',
        endDate: '2024-08-31'
      },
      {
        id: '2',
        name: 'Back to School Special',
        clicks: 1890,
        conversions: 98,
        revenue: 9800,
        earnings: 1470,
        conversionRate: 5.19,
        status: 'active' as const,
        startDate: '2024-07-15',
        endDate: '2024-09-15'
      },
      {
        id: '3',
        name: 'Holiday Season',
        clicks: 1670,
        conversions: 89,
        revenue: 8900,
        earnings: 1335,
        conversionRate: 5.33,
        status: 'active' as const,
        startDate: '2024-11-01',
        endDate: '2024-12-31'
      },
      {
        id: '4',
        name: 'Spring Collection',
        clicks: 1340,
        conversions: 67,
        revenue: 6700,
        earnings: 1005,
        conversionRate: 5.00,
        status: 'paused' as const,
        startDate: '2024-03-01',
        endDate: '2024-05-31'
      },
      {
        id: '5',
        name: 'Tech Gadgets',
        clicks: 980,
        conversions: 45,
        revenue: 4500,
        earnings: 675,
        conversionRate: 4.59,
        status: 'ended' as const,
        startDate: '2024-01-01',
        endDate: '2024-02-29'
      }
    ],
    
    // Recent transactions
    recentTransactions: [
      {
        id: '1',
        type: 'commission' as const,
        amount: 45.00,
        description: 'Commission from Summer Sale campaign',
        date: '2024-01-15T10:30:00Z',
        status: 'completed' as const,
        campaign: 'Summer Sale 2024'
      },
      {
        id: '2',
        type: 'payout' as const,
        amount: -320.00,
        description: 'Payout to bank account',
        date: '2024-01-14T14:20:00Z',
        status: 'completed' as const
      },
      {
        id: '3',
        type: 'commission' as const,
        amount: 67.50,
        description: 'Commission from Back to School campaign',
        date: '2024-01-13T09:15:00Z',
        status: 'completed' as const,
        campaign: 'Back to School Special'
      },
      {
        id: '4',
        type: 'commission' as const,
        amount: 23.40,
        description: 'Commission from Holiday Season campaign',
        date: '2024-01-12T16:45:00Z',
        status: 'completed' as const,
        campaign: 'Holiday Season'
      },
      {
        id: '5',
        type: 'commission' as const,
        amount: 34.20,
        description: 'Commission from Tech Gadgets campaign',
        date: '2024-01-11T11:30:00Z',
        status: 'completed' as const,
        campaign: 'Tech Gadgets'
      }
    ],
    
    // Performance by traffic source
    trafficSources: [
      { name: 'Social Media', clicks: 1250, conversions: 89, earnings: 1335 },
      { name: 'Email Marketing', clicks: 890, conversions: 67, earnings: 1005 },
      { name: 'Direct Links', clicks: 670, conversions: 45, earnings: 675 },
      { name: 'Blog Posts', clicks: 450, conversions: 34, earnings: 510 },
      { name: 'YouTube', clicks: 320, conversions: 23, earnings: 345 }
    ],
    
    // Geographic performance
    geographicPerformance: [
      { country: 'United States', clicks: 890, conversions: 67, earnings: 1005 },
      { country: 'Canada', clicks: 450, conversions: 34, earnings: 510 },
      { country: 'United Kingdom', clicks: 320, conversions: 23, earnings: 345 },
      { country: 'Australia', clicks: 280, conversions: 18, earnings: 270 },
      { country: 'Germany', clicks: 210, conversions: 15, earnings: 225 }
    ]
  };
};

// Merchant Analytics Data
export const getMerchantAnalytics = () => {
  return {
    // Daily revenue data for the last 30 days
    dailyRevenue: generateDailyData(1500, 0.4),
    
    // Monthly revenue data for the last 12 months
    monthlyRevenue: generateMonthlyData(45000, 0.5),
    
    // Daily clicks data
    dailyClicks: generateDailyData(800, 0.3),
    
    // Daily conversions data
    dailyConversions: generateDailyData(40, 0.5),
    
    // Conversion rate over time
    conversionRate: generateDailyData(5, 0.2).map(point => ({
      ...point,
      value: point.value / 10 // Convert to percentage
    })),
    
    // Top performing affiliates
    topAffiliates: [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        totalEarnings: 2340,
        totalClicks: 2450,
        totalConversions: 156,
        conversionRate: 6.37,
        status: 'active' as const,
        joinDate: '2024-01-15',
        lastActivity: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        totalEarnings: 1890,
        totalClicks: 2100,
        totalConversions: 126,
        conversionRate: 6.00,
        status: 'active' as const,
        joinDate: '2024-02-01',
        lastActivity: '2024-01-14T16:20:00Z'
      },
      {
        id: '3',
        name: 'Mike Davis',
        email: 'mike.davis@email.com',
        totalEarnings: 1560,
        totalClicks: 1780,
        totalConversions: 98,
        conversionRate: 5.51,
        status: 'active' as const,
        joinDate: '2024-01-20',
        lastActivity: '2024-01-13T09:15:00Z'
      },
      {
        id: '4',
        name: 'Emily Wilson',
        email: 'emily.wilson@email.com',
        totalEarnings: 1230,
        totalClicks: 1450,
        totalConversions: 78,
        conversionRate: 5.38,
        status: 'active' as const,
        joinDate: '2024-02-15',
        lastActivity: '2024-01-12T14:45:00Z'
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@email.com',
        totalEarnings: 980,
        totalClicks: 1200,
        totalConversions: 62,
        conversionRate: 5.17,
        status: 'inactive' as const,
        joinDate: '2024-01-10',
        lastActivity: '2024-01-10T11:30:00Z'
      }
    ],
    
    // Campaign performance
    campaignPerformance: [
      {
        id: '1',
        name: 'Summer Sale 2024',
        clicks: 12450,
        conversions: 756,
        revenue: 75600,
        earnings: 11340,
        conversionRate: 6.07,
        status: 'active' as const,
        startDate: '2024-06-01',
        endDate: '2024-08-31'
      },
      {
        id: '2',
        name: 'Back to School Special',
        clicks: 9890,
        conversions: 498,
        revenue: 49800,
        earnings: 7470,
        conversionRate: 5.04,
        status: 'active' as const,
        startDate: '2024-07-15',
        endDate: '2024-09-15'
      },
      {
        id: '3',
        name: 'Holiday Season',
        clicks: 8670,
        conversions: 389,
        revenue: 38900,
        earnings: 5835,
        conversionRate: 4.49,
        status: 'active' as const,
        startDate: '2024-11-01',
        endDate: '2024-12-31'
      }
    ],
    
    // Recent transactions
    recentTransactions: [
      {
        id: '1',
        type: 'commission' as const,
        amount: 45.00,
        description: 'Commission paid to John Smith',
        date: '2024-01-15T10:30:00Z',
        status: 'completed' as const,
        affiliate: 'John Smith'
      },
      {
        id: '2',
        type: 'payout' as const,
        amount: -320.00,
        description: 'Payout to affiliate bank account',
        date: '2024-01-14T14:20:00Z',
        status: 'completed' as const
      },
      {
        id: '3',
        type: 'commission' as const,
        amount: 67.50,
        description: 'Commission paid to Sarah Johnson',
        date: '2024-01-13T09:15:00Z',
        status: 'completed' as const,
        affiliate: 'Sarah Johnson'
      },
      {
        id: '4',
        type: 'commission' as const,
        amount: 23.40,
        description: 'Commission paid to Mike Davis',
        date: '2024-01-12T16:45:00Z',
        status: 'completed' as const,
        affiliate: 'Mike Davis'
      },
      {
        id: '5',
        type: 'refund' as const,
        amount: -15.00,
        description: 'Refund for returned product',
        date: '2024-01-11T11:30:00Z',
        status: 'completed' as const
      }
    ],
    
    // Traffic sources
    trafficSources: [
      { name: 'Affiliate Links', clicks: 6250, conversions: 389, revenue: 38900 },
      { name: 'Direct Traffic', clicks: 3450, conversions: 234, revenue: 23400 },
      { name: 'Social Media', clicks: 1890, conversions: 98, revenue: 9800 },
      { name: 'Email Marketing', clicks: 670, conversions: 45, revenue: 4500 },
      { name: 'Search Engines', clicks: 450, conversions: 34, revenue: 3400 }
    ],
    
    // Geographic performance
    geographicPerformance: [
      { country: 'United States', clicks: 4890, conversions: 367, revenue: 36700 },
      { country: 'Canada', clicks: 2450, conversions: 134, revenue: 13400 },
      { country: 'United Kingdom', clicks: 1320, conversions: 89, revenue: 8900 },
      { country: 'Australia', clicks: 980, conversions: 67, revenue: 6700 },
      { country: 'Germany', clicks: 710, conversions: 45, revenue: 4500 }
    ]
  };
};

// Utility functions for data processing
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
