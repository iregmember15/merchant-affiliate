import React from 'react';
import {
  CurrencyDollarIcon,
  CursorArrowRaysIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  EyeIcon,
  UsersIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { getAffiliateAnalytics, formatCurrency, formatNumber, formatPercentage, calculateGrowthRate, TransactionData } from '../../services/analyticsData';
import { 
  LineChartComponent, 
  AreaChartComponent, 
  BarChartComponent, 
  PieChartComponent,
  MiniStatCard 
} from '../charts/ChartComponents';

const AffiliateOverview: React.FC = () => {
  const analytics = getAffiliateAnalytics();
  
  // Calculate current totals and growth rates
  const currentEarnings = analytics.dailyEarnings[analytics.dailyEarnings.length - 1].earnings || 0;
  const previousEarnings = analytics.dailyEarnings[analytics.dailyEarnings.length - 8]?.earnings || 0;
  const earningsGrowth = calculateGrowthRate(currentEarnings, previousEarnings);
  
  const currentClicks = analytics.dailyClicks[analytics.dailyClicks.length - 1].clicks || 0;
  const previousClicks = analytics.dailyClicks[analytics.dailyClicks.length - 8]?.clicks || 0;
  const clicksGrowth = calculateGrowthRate(currentClicks, previousClicks);
  
  const currentConversions = analytics.dailyConversions[analytics.dailyConversions.length - 1].conversions || 0;
  const previousConversions = analytics.dailyConversions[analytics.dailyConversions.length - 8]?.conversions || 0;
  const conversionsGrowth = calculateGrowthRate(currentConversions, previousConversions);
  
  const currentConversionRate = analytics.conversionRate[analytics.conversionRate.length - 1].value;
  const previousConversionRate = analytics.conversionRate[analytics.conversionRate.length - 8]?.value || 0;
  const conversionRateGrowth = calculateGrowthRate(currentConversionRate, previousConversionRate);
  
  const stats: Array<{
    name: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ComponentType<any>;
    color: string;
  }> = [
    {
      name: 'Total Earnings',
      value: formatCurrency(analytics.topCampaigns.reduce((sum, campaign) => sum + campaign.earnings, 0)),
      change: `${earningsGrowth >= 0 ? '+' : ''}${earningsGrowth.toFixed(1)}%`,
      changeType: earningsGrowth >= 0 ? 'positive' : 'negative',
      icon: CurrencyDollarIcon,
      color: 'text-green-500'
    },
    {
      name: 'Total Clicks',
      value: formatNumber(analytics.topCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)),
      change: `${clicksGrowth >= 0 ? '+' : ''}${clicksGrowth.toFixed(1)}%`,
      changeType: clicksGrowth >= 0 ? 'positive' : 'negative',
      icon: CursorArrowRaysIcon,
      color: 'text-blue-500'
    },
    {
      name: 'Conversions',
      value: formatNumber(analytics.topCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0)),
      change: `${conversionsGrowth >= 0 ? '+' : ''}${conversionsGrowth.toFixed(1)}%`,
      changeType: conversionsGrowth >= 0 ? 'positive' : 'negative',
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-500'
    },
    {
      name: 'Conversion Rate',
      value: formatPercentage(currentConversionRate),
      change: `${conversionRateGrowth >= 0 ? '+' : ''}${conversionRateGrowth.toFixed(1)}%`,
      changeType: conversionRateGrowth >= 0 ? 'positive' : 'negative',
      icon: ChartBarIcon,
      color: 'text-yellow-500'
    }
  ];

  const recentActivity: TransactionData[] = analytics.recentTransactions;
  const topCampaigns = analytics.topCampaigns;

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        
        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
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

        {/* Charts and Activity */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Earnings Chart */}
          <AreaChartComponent
            data={analytics.dailyEarnings}
            title="Daily Earnings (Last 30 Days)"
            dataKey="earnings"
            color="#10B981"
            formatValue={formatCurrency}
          />

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              activity.type === 'commission' ? 'bg-green-500' :
                              activity.type === 'payout' ? 'bg-blue-500' :
                              activity.type === 'refund' ? 'bg-red-500' :
                              'bg-gray-500'
                            }`}>
                              <EyeIcon className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.description}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap">
                              <span className={`font-medium ${
                                activity.amount > 0 ? 'text-green-600' :
                                activity.amount < 0 ? 'text-red-600' :
                                'text-gray-500'
                              }`}>
                                {activity.amount > 0 ? '+' : ''}{formatCurrency(activity.amount)}
                              </span>
                              <p className="text-gray-500">
                                {new Date(activity.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Traffic Sources */}
          <PieChartComponent
            data={analytics.trafficSources}
            title="Traffic Sources"
            dataKey="earnings"
            nameKey="name"
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
          />
          
          {/* Geographic Performance */}
          <BarChartComponent
            data={analytics.geographicPerformance}
            title="Geographic Performance"
            dataKey="earnings"
            xAxisKey="country"
            color="#8B5CF6"
            formatValue={formatCurrency}
          />
        </div>

        {/* Conversion Rate Chart */}
        <div className="mt-8">
          <LineChartComponent
            data={analytics.conversionRate}
            title="Conversion Rate Trend (Last 30 Days)"
            dataKey="value"
            color="#F59E0B"
            formatValue={formatPercentage}
          />
        </div>

        {/* Top Campaigns */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Top Performing Campaigns
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
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topCampaigns.map((campaign, index) => (
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

export default AffiliateOverview;
