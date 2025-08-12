import React, { useState } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CursorArrowRaysIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { getAffiliateAnalytics, formatCurrency, formatNumber, formatPercentage } from '../../services/analyticsData';
import { 
  LineChartComponent, 
  AreaChartComponent, 
  BarChartComponent, 
  PieChartComponent,
  MiniStatCard 
} from '../charts/ChartComponents';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const analytics = getAffiliateAnalytics();

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Calculate summary stats
  const totalEarnings = analytics.topCampaigns.reduce((sum, campaign) => sum + campaign.earnings, 0);
  const totalClicks = analytics.topCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalConversions = analytics.topCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const avgConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  const summaryStats = [
    {
      name: 'Total Earnings',
      value: formatCurrency(totalEarnings),
      icon: CurrencyDollarIcon,
      color: 'text-green-500',
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      name: 'Total Clicks',
      value: formatNumber(totalClicks),
      icon: CursorArrowRaysIcon,
      color: 'text-blue-500',
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      name: 'Total Conversions',
      value: formatNumber(totalConversions),
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-500',
      change: '+15.3%',
      changeType: 'positive' as const
    },
    {
      name: 'Avg Conversion Rate',
      value: formatPercentage(avgConversionRate),
      icon: ChartBarIcon,
      color: 'text-yellow-500',
      change: '+2.1%',
      changeType: 'positive' as const
    }
  ];

  // Device performance data
  const devicePerformance = [
    { device: 'Desktop', clicks: 1250, conversions: 89, earnings: 1335, conversionRate: 7.12 },
    { device: 'Mobile', clicks: 890, conversions: 67, earnings: 1005, conversionRate: 7.53 },
    { device: 'Tablet', clicks: 320, conversions: 23, earnings: 345, conversionRate: 7.19 }
  ];

  // Hourly performance data (simulated)
  const hourlyPerformance = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    clicks: Math.floor(Math.random() * 50) + 10,
    conversions: Math.floor(Math.random() * 5) + 1,
    earnings: Math.floor(Math.random() * 100) + 20
  }));

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Detailed insights into your affiliate performance and earnings
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
          {/* Earnings Trend */}
          <AreaChartComponent
            data={analytics.dailyEarnings}
            title="Earnings Trend"
            dataKey="earnings"
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

        {/* Performance by Campaign */}
        <div className="mb-8">
          <BarChartComponent
            data={analytics.topCampaigns}
            title="Performance by Campaign"
            dataKey="earnings"
            xAxisKey="name"
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
            dataKey="earnings"
            nameKey="name"
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
            height={350}
          />
          
          <BarChartComponent
            data={analytics.geographicPerformance}
            title="Geographic Performance"
            dataKey="earnings"
            xAxisKey="country"
            color="#8B5CF6"
            formatValue={formatCurrency}
            height={350}
          />
        </div>

        {/* Device Performance */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Performance by Device
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Device
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {devicePerformance.map((device, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {device.device === 'Desktop' && <ComputerDesktopIcon className="h-5 w-5 text-gray-400 mr-2" />}
                            {device.device === 'Mobile' && <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" />}
                            {device.device === 'Tablet' && <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-2" />}
                            <div className="text-sm font-medium text-gray-900">
                              {device.device}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatNumber(device.clicks)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatNumber(device.conversions)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPercentage(device.conversionRate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(device.earnings)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Performance */}
        <div className="mb-8">
          <BarChartComponent
            data={hourlyPerformance}
            title="Hourly Performance (24 Hours)"
            dataKey="earnings"
            xAxisKey="hour"
            color="#EF4444"
            formatValue={formatCurrency}
            height={350}
          />
        </div>

        {/* Detailed Campaign Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Detailed Campaign Performance
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
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.topCampaigns.map((campaign, index) => (
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(campaign.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatCurrency(campaign.earnings)}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(campaign.startDate).toLocaleDateString()} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'}
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
