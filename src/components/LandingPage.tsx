import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  CogIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckIcon,
  XMarkIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const AnnouncementBar: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcementDismissed');
    if (dismissed === '1') setShow(false);
  }, []);

  const dismiss = () => {
    localStorage.setItem('announcementDismissed', '1');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 flex items-center justify-between gap-3 text-sm">
          <p className="truncate">
            New: Enhanced analytics and faster tracking just launched.
            <a href="#features" className="ml-2 underline decoration-white/60 hover:decoration-white">See what’s new</a>
          </p>
          <button
            aria-label="Dismiss announcement"
            onClick={dismiss}
            className="inline-flex items-center rounded p-1.5 hover:bg-white/10"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);

  const toggle = () => {
    setOpen((v) => !v);
    if (!open) setUnread(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-inset bg-white ring-gray-200 text-gray-700 hover:bg-gray-50"
      >
        <BellIcon className="h-5 w-5" />
        {unread && (
          <span className="absolute top-2.5 right-2.5 inline-flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Latest updates</p>
          </div>
          <ul className="divide-y divide-gray-100">
            <li className="p-3 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">Analytics v2 is live</p>
              <p className="text-xs text-gray-500">Deeper cohort insights and faster refresh.</p>
            </li>
            <li className="p-3 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">Payouts automation</p>
              <p className="text-xs text-gray-500">Schedule and approve in one place.</p>
            </li>
            <li className="p-3 hover:bg-gray-50">
              <p className="text-sm font-medium text-gray-900">New integration: Shopify</p>
              <p className="text-xs text-gray-500">Connect your store in minutes.</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1d4ed8]   shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-sm ring-1 ring-inset ring-white/30" />
            <span className="text-base sm:text-xl font-semibold tracking-tight text-white">
              Affiliate Marketing Platform
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <Link
              to="/auth"
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1d4ed8] shadow-md shadow-blue-600/10 ring-1 ring-white/10  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

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
      <AnnouncementBar />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 mb-5">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Trusted by 2,000+ businesses
          </span>
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
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              Continue as Merchent
            </Link>
            <a
              href="#features"
              className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Contnue as Affiliate
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
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
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md ring-1 ring-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
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
      <section id="compare" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-24">
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