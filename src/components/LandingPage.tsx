import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CogIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Track performance with detailed insights and real-time reporting'
    },
    {
      icon: UserGroupIcon,
      title: 'Affiliate Management',
      description: 'Manage your affiliate network with ease and efficiency'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Automated Payouts',
      description: 'Seamless commission tracking and automated payment processing'
    },
    {
      icon: CogIcon,
      title: 'Custom Campaigns',
      description: 'Create and customize campaigns to match your brand'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Tracking',
      description: 'Fraud-proof tracking system with advanced security measures'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Easy Integration',
      description: 'Quick setup with simple API integration and plugins'
    }
  ];

  const competitors = [
    {
      name: 'OSI Affiliate',
      features: {
        'Real-time Tracking': false,
        'Automated Payouts': false,
        'Advanced Analytics': true,
        'Mobile App': false,
        'API Integration': true,
        'Fraud Protection': false
      }
    },
    {
      name: 'Post Affiliate Pro',
      features: {
        'Real-time Tracking': true,
        'Automated Payouts': true,
        'Advanced Analytics': true,
        'Mobile App': false,
        'API Integration': true,
        'Fraud Protection': true
      }
    },
    {
      name: 'Rewardful',
      features: {
        'Real-time Tracking': true,
        'Automated Payouts': true,
        'Advanced Analytics': false,
        'Mobile App': true,
        'API Integration': false,
        'Fraud Protection': false
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The Ultimate
            <span className="text-blue-600"> Affiliate Marketing</span>
            Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Boost your business with powerful affiliate marketing tools. Track, manage, and grow your affiliate network with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Sign Up as Merchant
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Sign Up as Affiliate
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to help merchants and affiliates grow together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              See how we stack up against the competition
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                  {competitors.map((competitor) => (
                    <th key={competitor.name} className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                      {competitor.name}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-sm font-medium text-blue-600">
                    Our Platform
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(competitors[0].features).map((feature) => (
                  <tr key={feature} className="border-b border-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-900">{feature}</td>
                    {competitors.map((competitor) => (
                      <td key={competitor.name} className="px-6 py-4 text-center">
                        {competitor.features[feature as keyof typeof competitor.features] ? (
                          <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Affiliate Marketing Platform</h3>
              <p className="text-gray-400 mb-4">
                The ultimate solution for merchants and affiliates to grow their business together.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Affiliate Marketing Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
