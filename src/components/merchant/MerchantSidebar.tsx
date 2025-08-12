import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import * as HeroIcons from '@heroicons/react/24/outline';

const MerchantSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navigation = [
    { name: 'Overview', href: 'overview', icon: HeroIcons.ChartBarIcon },
    { name: 'Analytics', href: 'analytics', icon: HeroIcons.ChartBarIcon },
    { name: 'Campaigns', href: 'campaigns', icon: HeroIcons.MegaphoneIcon },
    { name: 'Banners', href: 'banners', icon: HeroIcons.PhotoIcon },
    { name: 'Promo Codes', href: 'promo-codes', icon: HeroIcons.TagIcon },
    { name: 'Affiliates', href: 'affiliates', icon: HeroIcons.UserGroupIcon },
    { name: 'Payout Processing', href: 'payouts', icon: HeroIcons.CreditCardIcon },
    { name: 'Transaction History', href: 'transactions', icon: HeroIcons.DocumentTextIcon },
    { name: 'Customize Signup', href: 'signup-page', icon: HeroIcons.CogIcon },
    { name: 'Settings', href: 'settings', icon: HeroIcons.CogIcon },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col w-64">
      <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-blue-600">
          <div className="flex items-center">
            <HeroIcons.BuildingStorefrontIcon className="h-8 w-8 text-white" />
            <h1 className="ml-2 text-xl font-semibold text-white">Merchant Portal</h1>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <HeroIcons.XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-white space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <HeroIcons.ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <HeroIcons.Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <SidebarContent />
      </div>
    </>
  );
};

export default MerchantSidebar;
