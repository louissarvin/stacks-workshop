# Stacks Workshop 🚀

A comprehensive collection of Stacks blockchain projects showcasing smart contract development, testing, and frontend integration.

## 📁 Project Structure

This repository contains three distinct Stacks projects, each demonstrating different aspects of blockchain development:

```
stacks/
├── hello-stacks/          # Basic Hello World contract (Learning)
├── hodl/                  # Proof-of-HODL Lending Platform (Advanced)
├── tic-tac-toe-game/      # Multiplayer Gaming with Betting (Intermediate)
└── README.md              # This file
```

---

## 🌟 Projects Overview

### 1. Hello Stacks 👋
**Learning Project** - Introduction to Clarity smart contracts

- **Contract**: `helloworld.clar`
- **Purpose**: Basic greeting contract with owner functions
- **Features**:
  - Simple data storage and retrieval
  - Owner-only functions
  - Basic error handling
  - Public and read-only functions

**Key Learning Points**: Contract constants, data variables, access control

---

### 2. HODL - Proof-of-HODL Lending Platform 💰
**Advanced Project** - Complete DeFi lending application

- **Contract**: `poh.clar` (Proof-of-HODL)
- **Frontend**: React + TypeScript + Vite
- **Purpose**: BTC-collateralized STX lending platform

#### Features:
- **🏦 Loan Creation**: Lenders create STX loan offers
- **🤝 Loan Acceptance**: Borrowers provide BTC collateral
- **⚡ Liquidation**: Automated liquidation when collateral ratio < 120%
- **📊 Price Oracle**: Mock BTC price management
- **💼 Wallet Integration**: Leather wallet support
- **📈 Dashboard**: Real-time loan monitoring

#### Technology Stack:
- **Smart Contract**: Clarity
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Blockchain**: @stacks/connect, @stacks/transactions
- **Network**: Stacks Testnet

#### Frontend Features:
- Modern glass-morphism UI design
- Responsive dashboard with loan statistics
- Real-time transaction tracking
- Multi-page navigation (Dashboard, Create, Accept, Liquidate, Admin, Status)
- Comprehensive error handling and user feedback

---

### 3. Tic-Tac-Toe Game 🎮
**Intermediate Project** - Multiplayer gaming with financial incentives

- **Contract**: `tic-tac-toe.clar`
- **Frontend**: Next.js 15 + TypeScript
- **Purpose**: Multiplayer Tic-Tac-Toe with STX betting

#### Features:
- **🎯 Game Creation**: Create games with minimum bet amounts
- **👥 Multiplayer**: Player vs Player matches
- **💰 Betting System**: STX wagering on game outcomes
- **🏆 Winner Takes All**: Automatic prize distribution
- **🎲 Fair Play**: Blockchain-enforced game rules

#### Technology Stack:
- **Smart Contract**: Clarity
- **Frontend**: Next.js 15, TypeScript
- **Styling**: Tailwind CSS
- **Network**: Stacks Testnet

---

## 🛠️ Development Environment

### Prerequisites
- **Node.js**: v18+ 
- **Clarinet**: Stacks smart contract development toolkit
- **Git**: Version control

### Common Dependencies
Each project includes:
- **Clarinet.toml**: Project configuration
- **Clarity contracts**: Smart contract logic
- **Vitest**: Testing framework
- **TypeScript**: Type safety
- **Frontend integration**: React/Next.js with Stacks libraries

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/louissarvin/stacks-workshop.git
cd stacks-workshop
```

### 2. Choose a Project
Navigate to any project directory:

```bash
# Basic learning
cd hello-stacks

# Advanced DeFi platform
cd hodl

# Gaming project
cd tic-tac-toe-game
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Tests
```bash
clarinet test
```

### 5. Deploy to Testnet
```bash
clarinet deployment apply --testnet
```

### 6. Start Frontend (hodl/tic-tac-toe only)
```bash
# For HODL project
cd hodl/frontend-hodl
npm run dev

# For Tic-Tac-Toe project
cd tic-tac-toe-game/frontend
npm run dev
```

---

## 📚 Learning Path

### Beginner → **hello-stacks**
- Learn Clarity syntax
- Understand basic contract structure
- Practice deployment and testing

### Intermediate → **tic-tac-toe-game**
- Complex game logic
- Multi-player interactions
- Financial incentives integration

### Advanced → **hodl**
- Complete DeFi application
- Advanced financial logic
- Full-stack integration
- Production-ready UI/UX

---

## 🌐 Network Configuration

All projects are configured for:
- **Development**: Local Clarinet environment
- **Testing**: Stacks Testnet
- **Smart Contracts**: Deployed and verified on testnet

### Contract Addresses (Testnet)
- **HODL**: `ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD.poh`
- **Tic-Tac-Toe**: `ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD.tic-tac-toe`
- **Hello World**: `ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD.helloworld`

---

## 🔧 Development Tools

### Testing
- **Unit Tests**: Vitest for contract testing
- **Integration Tests**: Frontend-contract interaction testing
- **Manual Testing**: Browser-based testing with testnet

### Deployment
- **Clarinet**: Local development and testing
- **Testnet Deployment**: Automated deployment scripts
- **Frontend Hosting**: Local development servers

---

## 📖 Key Concepts Demonstrated

### Smart Contract Development
- **Clarity Language**: Functional programming for blockchain
- **Data Storage**: Maps, variables, and data structures
- **Access Control**: Owner permissions and user validation
- **Error Handling**: Comprehensive error management
- **Testing**: Automated contract testing

### Frontend Integration
- **Wallet Connection**: Stacks wallet integration
- **Transaction Handling**: Contract calls and state management
- **Real-time Updates**: Live blockchain data fetching
- **User Experience**: Modern, responsive UI design

### DeFi Concepts
- **Collateralization**: Over-collateralized lending
- **Liquidation Logic**: Automated risk management
- **Price Oracles**: External price data integration
- **Financial Calculations**: Interest rates and ratios

---

## 🤝 Contributing

This repository serves as a learning resource and workshop material. Feel free to:

1. **Fork** the repository
2. **Experiment** with the contracts
3. **Extend** functionality
4. **Share** your improvements

---

## 📄 License

Educational and workshop use. Please respect the learning nature of these projects.

---

## 🔗 Resources

- **Stacks Documentation**: [docs.stacks.co](https://docs.stacks.co)
- **Clarinet Guide**: [Clarinet Documentation](https://docs.hiro.so/clarinet)
- **Stacks Connect**: [Frontend Integration Guide](https://connect.stacks.js.org)

---

## 🏆 Workshop Achievements

By completing these projects, you'll have hands-on experience with:

- ✅ **Smart Contract Development** in Clarity
- ✅ **DeFi Application Architecture**
- ✅ **Blockchain Frontend Integration**
- ✅ **Testing and Deployment** workflows
- ✅ **Real-world DApp Development**

Happy Building! 🚀

---

*This workshop demonstrates the power and flexibility of the Stacks blockchain ecosystem for building decentralized applications.*
