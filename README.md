# Affiliate Marketing Platform

A modern, full-featured affiliate marketing platform built with React, TypeScript, and Tailwind CSS. This application provides separate dashboards for merchants and affiliates with comprehensive functionality for managing affiliate programs.

## Features

### Merchant Dashboard
- **Overview**: Real-time stats including clicks, conversions, revenue, and payouts
- **Campaign Management**: Create, edit, and manage marketing campaigns
- **Marketing Assets**: Upload and manage banners, promo codes, and documents
- **Affiliate Management**: Approve, reject, suspend, and manage affiliates
- **Payout Processing**: Support for Stripe, PayPal, and Wise payment methods
- **Transaction History**: Complete transaction and payout history
- **Customize Signup Page**: Brand and customize affiliate signup pages

### Affiliate Dashboard
- **Overview**: Earnings, clicks, conversions, and performance metrics
- **Referral Link Generator**: Create UTM-tracked referral links with builder
- **Marketing Assets**: Download banners, promo codes, and marketing materials
- **Promo Code Stats**: View usage statistics and performance
- **Payout Method Management**: Configure payment methods (Stripe, PayPal, Wise)
- **Payout History**: Track all payout transactions and status

### Authentication
- Separate login/signup for merchants and affiliates
- Modern authentication flow with role-based routing
- Secure session management

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **UI Components**: Headless UI and Heroicons
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd affiliate-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── AuthPage.tsx                 # Login/Signup page
│   ├── merchant/                    # Merchant dashboard components
│   │   ├── MerchantDashboard.tsx
│   │   ├── MerchantSidebar.tsx
│   │   ├── MerchantOverview.tsx
│   │   ├── CampaignManagement.tsx
│   │   ├── MarketingAssets.tsx
│   │   ├── AffiliateManagement.tsx
│   │   ├── PayoutProcessing.tsx
│   │   ├── TransactionHistory.tsx
│   │   └── CustomizeSignupPage.tsx
│   └── affiliate/                   # Affiliate dashboard components
│       ├── AffiliateDashboard.tsx
│       ├── AffiliateSidebar.tsx
│       ├── AffiliateOverview.tsx
│       ├── ReferralLinkGenerator.tsx
│       ├── MarketingAssets.tsx
│       ├── PromoCodeStats.tsx
│       ├── PayoutMethodManagement.tsx
│       └── PayoutHistory.tsx
├── contexts/
│   └── AuthContext.tsx              # Authentication context
├── App.tsx                          # Main app component
├── index.tsx                        # App entry point
└── index.css                        # Global styles with Tailwind
```

## Usage

### For Merchants
1. Sign up or log in as a merchant
2. Access the merchant dashboard
3. Create campaigns and set commission rates
4. Upload marketing assets
5. Manage affiliate applications
6. Process payouts and view transaction history

### For Affiliates
1. Sign up or log in as an affiliate
2. Access the affiliate dashboard
3. Generate referral links with UTM tracking
4. Download marketing assets
5. Track performance and earnings
6. Manage payout methods and view payout history

## Customization

The application is built with Tailwind CSS, making it easy to customize:
- Colors can be modified in `tailwind.config.js`
- Components are modular and reusable
- Styling follows a consistent design system

## Future Enhancements

- Backend API integration
- Real-time notifications
- Advanced analytics and reporting
- Email marketing integration
- Mobile app development
- Multi-language support
- Advanced commission structures
- API for third-party integrations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
