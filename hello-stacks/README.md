# Hello Stacks 👋

A beginner-friendly Clarity smart contract demonstrating the fundamentals of Stacks blockchain development.

## 📖 Overview

This is a simple "Hello World" contract designed to introduce developers to Clarity smart contract programming. It demonstrates basic concepts like data storage, access control, and public/read-only functions.

## 🎯 Learning Objectives

- Understand Clarity syntax and structure
- Learn about constants and data variables
- Practice access control patterns
- Implement basic error handling
- Work with public and read-only functions

## 📁 Project Structure

```
hello-stacks/
├── contracts/
│   └── helloworld.clar      # Main smart contract
├── tests/
│   └── helloworld.test.ts   # Contract tests
├── deployments/
│   └── default.testnet-plan.yaml
├── settings/
│   ├── Devnet.toml
│   ├── Mainnet.toml
│   └── Testnet.toml
├── Clarinet.toml            # Project configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Smart Contract Features

### Core Functions

#### Public Functions
- **`set-greeting`**: Update the greeting message (owner only)
- **`say-hello`**: Return a personalized greeting with the caller's address

#### Read-Only Functions
- **`get-greeting`**: Retrieve the current greeting message
- **`get-owner`**: Get the contract owner's address

### Key Concepts Demonstrated

1. **Constants**: Immutable values defined at contract deployment
   ```clarity
   (define-constant contract-owner tx-sender)
   (define-constant err-owner-only (err u100))
   ```

2. **Data Variables**: Mutable state storage
   ```clarity
   (define-data-var greeting (string-ascii 50) "Hello, World!")
   ```

3. **Access Control**: Owner-only function restrictions
   ```clarity
   (asserts! (is-eq tx-sender contract-owner) err-owner-only)
   ```

4. **Error Handling**: Proper error codes and assertions
   ```clarity
   (define-constant err-owner-only (err u100))
   (define-constant err-already-exists (err u101))
   ```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Clarinet CLI
- Git

### Installation

1. **Navigate to project directory**:
   ```bash
   cd hello-stacks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

1. **Run tests**:
   ```bash
   clarinet test
   ```

2. **Check contract syntax**:
   ```bash
   clarinet check
   ```

3. **Start local development**:
   ```bash
   clarinet console
   ```

### Deployment

1. **Deploy to testnet**:
   ```bash
   clarinet deployment apply --testnet
   ```

2. **Verify deployment**:
   Check the deployment plan in `deployments/default.testnet-plan.yaml`

## 🧪 Testing

The project includes comprehensive tests in `tests/helloworld.test.ts`:

- Contract deployment verification
- Greeting functionality tests
- Access control validation
- Error handling verification

Run tests with:
```bash
npm test
```

## 📝 Example Usage

### In Clarinet Console

```clarity
;; Get the current greeting
(contract-call? .helloworld get-greeting)

;; Say hello (returns personalized message)
(contract-call? .helloworld say-hello)

;; Update greeting (owner only)
(contract-call? .helloworld set-greeting "Hello, Blockchain!")
```

### Contract Calls

```typescript
// Read-only call to get greeting
const greeting = await callReadOnlyFunction({
  contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractName: "helloworld",
  functionName: "get-greeting",
  functionArgs: [],
  senderAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  network: new StacksTestnet(),
});
```

## 🎓 Key Learning Points

### 1. Contract Structure
- How to organize a Clarity contract
- Best practices for constants and variables
- Function naming conventions

### 2. Data Types
- String handling in Clarity
- Principal (address) types
- Error responses

### 3. Access Control
- Owner-only function patterns
- Transaction sender verification
- Security considerations

### 4. Testing Strategies
- Unit testing smart contracts
- Test-driven development approach
- Edge case handling

## 🔗 Next Steps

After mastering this contract, proceed to:

1. **Tic-Tac-Toe Game** - Learn about complex game logic and multi-player interactions
2. **HODL Platform** - Explore advanced DeFi concepts and frontend integration

## 📚 Resources

- [Clarity Language Reference](https://docs.stacks.co/clarity)
- [Clarinet Documentation](https://docs.hiro.so/clarinet)
- [Stacks Blockchain Guide](https://docs.stacks.co)

## 🐛 Common Issues

### Contract Won't Deploy
- Check Clarity syntax with `clarinet check`
- Verify all required files are present
- Ensure proper network configuration

### Tests Failing
- Verify test setup in `Clarinet.toml`
- Check that all dependencies are installed
- Review test assertions and expected values

## 🤝 Contributing

This is a learning project. Feel free to:
- Experiment with the code
- Add new features
- Improve documentation
- Share your learning experience

---

**Happy Learning!** 🎉

This project provides a solid foundation for understanding Stacks smart contract development. Take your time to explore each concept before moving to more complex projects.
