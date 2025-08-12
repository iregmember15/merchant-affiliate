import React, { useState } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CursorArrowRaysIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { getMerchantAnalytics, formatCurrency, formatNumber, formatPercentage } from '../../services/analyticsData';
import { 
  LineChartComponent, 
  AreaChartComponent, 
  BarChartComponent, 
  PieChartComponent,
  MiniStatCard 
} from '../charts/ChartComponents';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const analytics = getMerchantAnalytics();

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Calculate summary stats
  const totalRevenue = analytics.campaignPerformance.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const totalClicks = analytics.campaignPerformance.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalConversions = analytics.campaignPerformance.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const totalPayouts = analytics.topAffiliates.reduce((sum, affiliate) => sum + affiliate.totalEarnings, 0);
  const avgConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const summaryStats = [
    {
      name: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: CurrencyDollarIcon,
      color: 'text-green-500',
      change: '+15.3%',
      changeType: 'positive' as const
    },
    {
      name: 'Total Clicks',
      value: formatNumber(totalClicks),
      icon: CursorArrowRaysIcon,
      color: 'text-blue-500',
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      name: 'Total Conversions',
      value: formatNumber(totalConversions),
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-500',
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      name: 'Total Payouts',
      value: formatCurrency(totalPayouts),
      icon: UserGroupIcon,
      color: 'text-red-500',
      change: '+5.7%',
      changeType: 'positive' as const
    }
  ];

  // Campaign performance by month (simulated)
  const monthlyCampaignPerformance = [
    { month: 'Jan', revenue: 45000, clicks: 8500, conversions: 420, payouts: 6750 },
    { month: 'Feb', revenue: 52000, clicks: 9200, conversions: 480, payouts: 7800 },
    { month: 'Mar', revenue: 48000, clicks: 8800, conversions: 440, payouts: 7200 },
    { month: 'Apr', revenue: 55000, clicks: 9800, conversions: 520, payouts: 8250 },
    { month: 'May', revenue: 62000, clicks: 11000, conversions: 580, payouts: 9300 },
    { month: 'Jun', revenue: 68000, clicks: 12000, conversions: 640, payouts: 10200 }
  ];

  // Affiliate performance by tier
  const affiliateTiers = [
    { tier: 'Gold', count: 5, totalEarnings: 8500, avgConversionRate: 7.2 },
    { tier: 'Silver', count: 12, totalEarnings: 5200, avgConversionRate: 5.8 },
    { tier: 'Bronze', count: 25, totalEarnings: 2800, avgConversionRate: 4.3 }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Comprehensive insights into your affiliate program performance
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {summaryStats.map((stat) => (
            <MiniStatCard
              key={stat.name}
              title={stat.name}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
          {/* Revenue Trend */}
          <AreaChartComponent
            data={analytics.dailyRevenue}
            title="Revenue Trend"
            dataKey="revenue"
            color="#10B981"
            formatValue={formatCurrency}
            height={350}
          />
          
          {/* Conversion Rate Trend */}
          <LineChartComponent
            data={analytics.conversionRate}
            title="Conversion Rate Trend"
            dataKey="value"
            color="#F59E0B"
            formatValue={formatPercentage}
            height={350}
          />
        </div>

        {/* Monthly Performance */}
        <div className="mb-8">
          <BarChartComponent
            data={monthlyCampaignPerformance}
            title="Monthly Performance (Last 6 Months)"
            dataKey="revenue"
            xAxisKey="month"
            color="#3B82F6"
            formatValue={formatCurrency}
            height={400}
          />
        </div>

        {/* Traffic Sources and Geographic Performance */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
          <PieChartComponent
            data={analytics.trafficSources}
            title="Traffic Sources"
            dataKey="revenue"
            nameKey="name"
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
            height={350}
          />
          
          <BarChartComponent
            data={analytics.geographicPerformance}
            title="Geographic Performance"
            dataKey="revenue"
            xAxisKey="country"
            color="#8B5CF6"
            formatValue={formatCurrency}
            height={350}
          />
        </div>

        {/* Affiliate Tiers Performance */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Affiliate Performance by Tier
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Affiliates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Earnings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Conversion Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Earnings per Affiliate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {affiliateTiers.map((tier, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              tier.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                              tier.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {tier.tier}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {tier.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(tier.totalEarnings)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPercentage(tier.avgConversionRate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(tier.totalEarnings / tier.count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign vs Affiliate Performance */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
          <BarChartComponent
            data={analytics.campaignPerformance}
            title="Campaign Performance"
            dataKey="revenue"
            xAxisKey="name"
            color="#10B981"
            formatValue={formatCurrency}
            height={350}
          />
          
          <BarChartComponent
            data={analytics.topAffiliates}
            title="Top Affiliates by Earnings"
            dataKey="totalEarnings"
            xAxisKey="name"
            color="#8B5CF6"
            formatValue={formatCurrency}
            height={350}
          />
        </div>

        {/* Detailed Affiliates Table */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Detailed Affiliate Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Affiliate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.topAffiliates.map((affiliate, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {affiliate.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {affiliate.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(affiliate.totalClicks)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(affiliate.totalConversions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPercentage(affiliate.conversionRate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatCurrency(affiliate.totalEarnings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          affiliate.status === 'active' ? 'bg-green-100 text-green-800' :
                          affiliate.status === 'inactive' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {affiliate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(affiliate.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Campaign Performance Details
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payouts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Profit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.campaignPerformance.map((campaign, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(campaign.clicks)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(campaign.conversions)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPercentage(campaign.conversionRate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatCurrency(campaign.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        {formatCurrency(campaign.earnings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {formatCurrency(campaign.revenue - campaign.earnings)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
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

export default AnalyticsPage;
