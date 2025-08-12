import React from 'react';
import { 
  LinkIcon, 
  UserIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const ReferralTrackingPage: React.FC = () => {
  const trackingSteps = [
    {
      icon: LinkIcon,
      title: 'Generate Referral Link',
      description: 'Affiliates create unique tracking links for products or campaigns',
      image: '/placeholder-step1.png'
    },
    {
      icon: UserIcon,
      title: 'Customer Clicks Link',
      description: 'When customers click the affiliate link, a tracking cookie is set',
      image: '/placeholder-step2.png'
    },
    {
      icon: ShoppingCartIcon,
      title: 'Purchase Made',
      description: 'Customer completes a purchase within the cookie duration period',
      image: '/placeholder-step3.png'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Commission Tracked',
      description: 'System automatically tracks and calculates commission for the affiliate',
      image: '/placeholder-step4.png'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Updated',
      description: 'Real-time analytics and reporting are updated for both parties',
      image: '/placeholder-step5.png'
    },
    {
      icon: CogIcon,
      title: 'Automated Payout',
      description: 'Commissions are processed and paid out according to schedule',
      image: '/placeholder-step6.png'
    }
  ];

  const features = [
    {
      title: 'Real-time Tracking',
      description: 'Track clicks, conversions, and sales in real-time with our advanced tracking system.'
    },
    {
      title: 'Fraud Protection',
      description: 'Advanced fraud detection algorithms protect against invalid clicks and conversions.'
    },
    {
      title: 'Cookie Management',
      description: 'Flexible cookie duration settings from 1 day to 365 days based on your needs.'
    },
    {
      title: 'Multi-channel Tracking',
      description: 'Track referrals across web, mobile, and social media platforms seamlessly.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How Referral
            <span className="text-blue-600"> Tracking</span>
            Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our advanced tracking system ensures accurate attribution and fair commission distribution. 
            Learn how we track referrals from click to payout.
          </p>
        </div>
      </section>

      {/* Tracking Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Complete Tracking Process
            </h2>
            <p className="text-xl text-gray-600">
              From link generation to commission payout - see how it all works
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trackingSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <step.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Step {index + 1}: {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {step.description}
                </p>
                <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs">Diagram</span>
                    </div>
                    <p className="text-xs">Tracking Process Visualization</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Tracking Features
            </h2>
            <p className="text-xl text-gray-600">
              Built with the latest technology to ensure accuracy and reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Diagram */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Architecture
            </h2>
            <p className="text-xl text-gray-600">
              How our tracking system works behind the scenes
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="bg-blue-100 p-6 rounded-lg mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AFF</span>
                  </div>
                  <p className="text-sm font-semibold">Affiliate</p>
                </div>
                <p className="text-sm text-gray-600">Creates tracking links</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-6 rounded-lg mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SYS</span>
                  </div>
                  <p className="text-sm font-semibold">Tracking System</p>
                </div>
                <p className="text-sm text-gray-600">Processes clicks & conversions</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-6 rounded-lg mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MER</span>
                  </div>
                  <p className="text-sm font-semibold">Merchant</p>
                </div>
                <p className="text-sm text-gray-600">Receives sales & pays commissions</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs">Flow</span>
                    </div>
                    <p className="text-xs">Data Flow Diagram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of merchants and affiliates already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Sign Up as Merchant
            </a>
            <a
              href="/auth"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              Sign Up as Affiliate
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferralTrackingPage;
