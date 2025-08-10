# Tic-Tac-Toe Game 🎮

A multiplayer Tic-Tac-Toe game with STX betting functionality built on the Stacks blockchain. Features secure gameplay, financial incentives, and a modern Next.js frontend.

## 🎯 Overview

This project demonstrates intermediate blockchain development concepts through a classic game enhanced with cryptocurrency betting. Players can create games, join matches, and compete for STX prizes in a trustless environment.

## 🎮 Game Features

### Core Gameplay
- **Classic 3x3 Tic-Tac-Toe**: Traditional game rules
- **Multiplayer Support**: Player vs Player matches
- **Turn-based Logic**: Enforced turn order and validation
- **Win Detection**: Automatic winner determination
- **Draw Handling**: Fair outcome for tied games

### Financial Layer
- **STX Betting**: Players wager STX tokens on matches
- **Minimum Bet**: Configurable minimum bet amounts
- **Winner Takes All**: Automatic prize distribution
- **Smart Contract Escrow**: Secure fund holding during gameplay

### Security Features
- **Blockchain Enforcement**: Immutable game state
- **Cheat Prevention**: Move validation and turn enforcement
- **Fair Resolution**: Transparent winner determination
- **Secure Payments**: Automatic and trustless prize distribution

## 📁 Project Structure

```
tic-tac-toe-game/
├── contracts/
│   └── tic-tac-toe.clar         # Game smart contract
├── frontend/                    # Next.js frontend
│   ├── src/app/                # App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── create/             # Game creation
│   │   └── game/[gameId]/      # Individual game view
│   ├── components/             # React components
│   │   ├── game-board.tsx      # Game board UI
│   │   ├── games-list.tsx      # Games listing
│   │   └── navbar.tsx          # Navigation
│   ├── hooks/                  # Custom React hooks
│   │   └── use-stacks.ts       # Blockchain integration
│   ├── lib/                    # Utility functions
│   │   ├── contract.ts         # Contract interactions
│   │   └── stx-utils.ts        # STX formatting utilities
│   └── public/                 # Static assets
├── tests/
│   └── tic-tac-toe.test.ts     # Smart contract tests
├── deployments/
│   ├── default.simnet-plan.yaml
│   └── default.testnet-plan.yaml
└── Clarinet.toml               # Project configuration
```

## 🔧 Smart Contract Features

### Game Management

#### Public Functions
- **`create-game(bet-amount)`**: Create a new game with betting
- **`join-game(game-id)`**: Join an existing game as Player 2
- **`make-move(game-id, position)`**: Make a move (0-8 position)
- **`claim-winnings(game-id)`**: Claim prize after winning

#### Read-Only Functions
- **`get-game(game-id)`**: Retrieve complete game state
- **`get-game-count()`**: Get total number of games
- **`get-board(game-id)`**: Get current board state
- **`get-game-status(game-id)`**: Get game status and winner

### Game States
- **Created**: Waiting for second player
- **Active**: Game in progress
- **Finished**: Game completed with winner/draw
- **Claimed**: Winnings have been distributed

### Game Logic

#### Board Representation
```clarity
;; 3x3 grid represented as positions 0-8
;; 0 | 1 | 2
;; ---------
;; 3 | 4 | 5
;; ---------
;; 6 | 7 | 8
```

#### Win Conditions
- Horizontal: [0,1,2], [3,4,5], [6,7,8]
- Vertical: [0,3,6], [1,4,7], [2,5,8]
- Diagonal: [0,4,8], [2,4,6]

## 🖥️ Frontend Features

### Technology Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **@stacks/connect**: Wallet integration
- **Responsive Design**: Mobile-friendly interface

### Pages and Components

#### Home Page (`/`)
- Game overview and statistics
- Quick start options
- Recent games display
- Connect wallet prompt

#### Create Game (`/create`)
- Bet amount selection
- Game configuration
- Transaction confirmation
- Game creation feedback

#### Game View (`/game/[gameId]`)
- Interactive game board
- Real-time game state
- Move history
- Chat/interaction features

#### Game Board Component
- Visual 3x3 grid
- Click-to-move interaction
- Move validation
- Visual feedback for wins

### User Experience
- **Real-time Updates**: Live game state synchronization
- **Transaction Feedback**: Clear confirmation messages
- **Error Handling**: Comprehensive error management
- **Loading States**: Smooth user interactions
- **Responsive Design**: Works on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Clarinet CLI
- Stacks wallet (Hiro/Leather)
- STX testnet tokens

### Backend Setup

1. **Navigate to project**:
   ```bash
   cd tic-tac-toe-game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   clarinet test
   ```

4. **Deploy to testnet**:
   ```bash
   clarinet deployment apply --testnet
   ```

### Frontend Setup

1. **Navigate to frontend**:
   ```bash
   cd frontend
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
   Navigate to `http://localhost:3000`

## 🎲 Gameplay Flow

### 1. Create Game
```typescript
// Player 1 creates game with bet amount
await createGame(1000000); // 1 STX in microSTX
```

### 2. Join Game
```typescript
// Player 2 joins with matching bet
await joinGame(gameId);
```

### 3. Play Moves
```typescript
// Players alternate moves
await makeMove(gameId, position); // position 0-8
```

### 4. Claim Winnings
```typescript
// Winner claims the prize pool
await claimWinnings(gameId);
```

## 🧪 Testing

### Smart Contract Tests
```bash
# Run all contract tests
clarinet test

# Test specific functionality
clarinet test --filter test-create-game
clarinet test --filter test-win-detection
```

### Frontend Tests
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration
```

### Test Scenarios
- Game creation and joining
- Move validation and turn enforcement
- Win condition detection
- Draw handling
- Payment distribution
- Error cases and edge conditions

## 🔐 Security Considerations

### Smart Contract Security
- **Move Validation**: Prevents invalid moves
- **Turn Enforcement**: Ensures proper turn order
- **Reentrancy Protection**: Safe external calls
- **Overflow Protection**: Safe arithmetic operations

### Game Integrity
- **Immutable Moves**: Cannot change moves once made
- **Transparent Logic**: All game rules on-chain
- **Fair Random**: No random elements to manipulate
- **Time Limits**: Prevents game stalling (if implemented)

## 💰 Economic Model

### Betting System
- **Entry Fee**: Both players contribute equal amounts
- **Winner Takes All**: Full prize pool to winner
- **Draw Distribution**: Equal split on draws
- **Gas Optimization**: Minimal transaction costs

### Fee Structure
```clarity
;; Example betting amounts
(define-constant MIN-BET u100000)  ;; 0.1 STX minimum
(define-constant MAX-BET u10000000) ;; 10 STX maximum
```

## 🎨 UI/UX Design

### Visual Design
- **Modern Interface**: Clean and intuitive design
- **Game Board**: Interactive grid with hover effects
- **Status Indicators**: Clear game state communication
- **Animation**: Smooth transitions and feedback

### User Flow
1. **Connect Wallet**: Secure blockchain connection
2. **Browse Games**: View available games to join
3. **Create/Join**: Start or join a game
4. **Play**: Interactive gameplay experience
5. **Claim**: Collect winnings automatically

## 📊 Game Analytics

### Metrics Tracked
- Total games played
- Win/loss ratios
- Average bet amounts
- Player engagement
- Game completion rates

### Statistics Display
- Personal game history
- Leaderboards
- Global statistics
- Earnings tracking

## 🔧 Configuration

### Smart Contract Settings
```clarity
;; Game configuration constants
(define-constant MIN-BET-AMOUNT u100000)
(define-constant GAME-TIMEOUT u144) ;; 144 blocks (~24 hours)
```

### Frontend Configuration
```typescript
// Environment variables
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1Z9Q8F39NMNNAKRXDQZYNS2R6PJA5BVHHGRESTD
NEXT_PUBLIC_CONTRACT_NAME=tic-tac-toe
NEXT_PUBLIC_NETWORK=testnet
```

## 🚀 Deployment

### Testnet Deployment
```bash
# Deploy smart contract
clarinet deployment apply --testnet

# Build and deploy frontend
cd frontend
npm run build
npm run start
```

### Production Considerations
- Gas optimization
- Error monitoring
- Performance optimization
- Security audits

## 🎓 Educational Value

### Concepts Demonstrated
- **Game State Management**: Complex state handling in Clarity
- **Multi-player Logic**: Turn-based game coordination
- **Financial Integration**: Cryptocurrency betting mechanics
- **Frontend Integration**: React/Next.js with blockchain
- **User Experience**: Game UI/UX design patterns

### Learning Outcomes
- Intermediate Clarity programming
- Game development on blockchain
- Financial smart contracts
- Full-stack dApp development
- Testing strategies

## 🤝 Contributing

### Development Process
1. Fork repository
2. Create feature branch
3. Implement changes
4. Add comprehensive tests
5. Submit pull request

### Code Quality
- TypeScript for type safety
- ESLint for code standards
- Comprehensive testing
- Documentation updates

## 📚 Resources

- [Clarity Game Development](https://book.clarity-lang.org/ch11-00-developing-a-game.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stacks Connect Guide](https://connect.stacks.js.org)

## 🐛 Known Issues

- Game timeout not implemented
- Spectator mode pending
- Tournament features planned

## 📄 License

Educational and workshop use.

---

**Game On!** 🎮

This project perfectly bridges the gap between simple contracts and complex DeFi applications, demonstrating practical blockchain gaming concepts.
