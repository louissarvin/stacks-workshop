# HODL - Proof-of-HODL Lending Platform 💰

A sophisticated DeFi lending platform where users can create STX loans collateralized by Bitcoin. Features automated liquidation, real-time monitoring, and a modern web interface.

## 🎯 Overview

HODL (Proof-of-HODL) is a decentralized lending platform built on Stacks that allows:
- **Lenders** to create STX loan offers
- **Borrowers** to accept loans by providing Bitcoin collateral
- **Liquidators** to liquidate under-collateralized positions
- **Real-time monitoring** of all loan activities

## 🏗️ Architecture

### Smart Contract (`poh.clar`)
The core lending logic implemented in Clarity:
- Loan creation and management
- Collateral tracking and validation
- Automated liquidation logic
- Price oracle integration

### Frontend (`frontend-hodl/`)
Modern React application with:
- Wallet integration (Leather)
- Real-time loan monitoring
- Interactive dashboard
- Transaction management

## 📁 Project Structure

```
hodl/
├── contracts/
│   └── poh.clar                 # Proof-of-HODL smart contract
├── frontend-hodl/               # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Application pages
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions and contract integration
│   │   ├── types/              # TypeScript type definitions
│   │   └── context/            # React context providers
│   ├── package.json
│   └── vite.config.ts
├── tests/
│   └── poh.test.ts             # Smart contract tests
├── deployments/
│   └── default.testnet-plan.yaml
├── settings/                    # Network configurations
└── Clarinet.toml               # Project configuration
```

## 🔧 Smart Contract Features

### Core Functions

#### Public Functions
- **`create-loan(loan-amount)`**: Create a new loan offer
- **`accept-loan(id, btc-addr, btc-amt)`**: Accept a loan with BTC collateral
- **`liquidate-loan(id)`**: Liquidate under-collateralized loans
- **`set-mock-price(price)`**: Update BTC price (admin only)

#### Read-Only Functions
- **`get-loan(id)`**: Retrieve loan details by ID
- **`get-loan-counter()`**: Get total number of loans
- **`get-btc-price()`**: Get current BTC price

### Loan Lifecycle

1. **Creation**: Lender creates loan with STX amount
2. **Acceptance**: Borrower provides BTC address and collateral amount
3. **Monitoring**: System tracks collateral ratio (must stay > 120%)
4. **Liquidation**: Anyone can liquidate if ratio falls below 120%

### Risk Management

- **Over-collateralization**: Requires 120%+ collateral ratio
- **Real-time monitoring**: Continuous ratio calculations
- **Automatic liquidation**: Protects lenders from bad debt

## 🖥️ Frontend Features

### Pages

#### Dashboard (`/`)
- Loan statistics overview
- Quick action buttons
- Recent loan activities
- System health metrics

#### Create Loan (`/create-loan`)
- Loan amount input with validation
- Real-time STX conversion
- Transaction status feedback
- Blockchain confirmation tracking

#### Accept Loan (`/accept-loan`)
- Available loans listing
- BTC address input
- Collateral amount calculator
- Risk assessment display

#### Liquidate (`/liquidate`)
- Active loans monitoring
- Collateral ratio calculations
- Liquidation opportunity detection
- One-click liquidation execution

#### Admin (`/admin`)
- BTC price management
- System parameter updates
- Administrative controls

#### Loan Status (`/status`)
- Comprehensive loan overview
- Statistical analysis
- Historical data visualization
- Export capabilities

### Technology Stack

#### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing

#### Blockchain Integration
- **@stacks/connect**: Wallet connection
- **@stacks/transactions**: Transaction building
- **@stacks/network**: Network configuration
- **Leather Wallet**: Primary wallet support

#### UI/UX
- **Glass-morphism design**: Modern translucent effects
- **Responsive layout**: Mobile-first approach
- **Real-time updates**: Live data synchronization
- **Loading states**: Comprehensive feedback
- **Error boundaries**: Graceful error handling

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Clarinet CLI
- Leather Wallet browser extension
- STX testnet tokens

### Backend Setup

1. **Navigate to project**:
   ```bash
   cd hodl
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   clarinet test
   ```

4. **Deploy contract**:
   ```bash
   clarinet deployment apply --testnet
   ```

### Frontend Setup

1. **Navigate to frontend**:
   ```bash
   cd frontend-hodl
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:5173`

## 🔐 Security Features

### Smart Contract Security
- **Access controls**: Owner-only administrative functions
- **Input validation**: All parameters thoroughly validated
- **Error handling**: Comprehensive error codes and messages
- **Reentrancy protection**: Safe external calls

### Frontend Security
- **Wallet integration**: Secure transaction signing
- **Input sanitization**: All user inputs validated
- **Type safety**: TypeScript prevents runtime errors
- **Transaction verification**: Confirmation before execution

## 📊 Business Logic

### Collateral Calculation
```
Collateral Ratio = (BTC Amount × BTC Price) / STX Loan Amount × 100
```

### Liquidation Trigger
```
if (Collateral Ratio < 120%) {
    // Loan becomes liquidatable
    // Anyone can call liquidate-loan
}
```

### Loan States
- **Created**: Available for acceptance
- **Accepted**: Active with collateral
- **Liquidated**: Collateral seized

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all tests
clarinet test

# Run specific test
clarinet test --filter test-create-loan
```

### Frontend Testing
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## 📈 Monitoring & Analytics

### Key Metrics
- Total loans created
- Active loan count
- Total volume (STX)
- Average collateral ratio
- Liquidation rate

### Real-time Data
- Live BTC price updates
- Loan status changes
- Transaction confirmations
- Wallet connection status

## 🔧 Configuration

### Network Settings
- **Testnet**: Default development network
- **Contract Address**: `ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD.poh`
- **Frontend URL**: `http://localhost:5173`

### Environment Variables
```bash
# Frontend configuration
VITE_CONTRACT_ADDRESS=ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD
VITE_CONTRACT_NAME=poh
VITE_NETWORK=testnet
```

## 🐛 Troubleshooting

### Common Issues

#### Wallet Connection
- Ensure Leather wallet is installed
- Check network settings (testnet)
- Verify sufficient STX balance

#### Transaction Failures
- Check gas fees
- Verify contract parameters
- Ensure proper wallet signing

#### Frontend Issues
- Clear browser cache
- Check console for errors
- Verify API connections

## 🚀 Deployment

### Testnet Deployment
```bash
# Deploy smart contract
clarinet deployment apply --testnet

# Build frontend
cd frontend-hodl
npm run build

# Deploy to hosting service
npm run deploy
```

### Production Considerations
- Comprehensive testing
- Security audits
- Gas optimization
- Error monitoring

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Submit pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Comprehensive testing

## 📚 Learning Resources

- [Stacks DeFi Guide](https://docs.stacks.co/build-apps/guides/data-storage)
- [Clarity DeFi Patterns](https://book.clarity-lang.org)
- [React Best Practices](https://react.dev)

## 🎓 Educational Value

This project demonstrates:
- **Advanced Clarity programming**
- **DeFi protocol design**
- **Full-stack dApp development**
- **Wallet integration patterns**
- **Risk management systems**
- **Real-time data handling**

## 📄 License

Educational and workshop use. 

---

**Build the Future of Finance!** 🚀

This advanced project showcases production-ready DeFi development on Stacks. Perfect for developers ready to build sophisticated financial applications.
