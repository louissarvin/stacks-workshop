export function abbreviateAddress(address: string) {
  return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
}

export function abbreviateTxnId(txnId: string) {
  return `${txnId.substring(0, 8)}...${txnId.substring(txnId.length - 8)}`;
}

export function explorerAddress(address: string) {
  return `https://explorer.hiro.so/address/${address}?chain=testnet`;
}

export function explorerTxn(txnId: string) {
  return `https://explorer.hiro.so/txid/${txnId}?chain=testnet`;
}

export async function getStxBalance(address: string) {
  const baseUrl = "https://api.testnet.hiro.so";
  const url = `${baseUrl}/extended/v1/address/${address}/stx`;

  try {
    const response = await fetch(url).then((res) => res.json());
    const balance = parseInt(response.balance);
    return balance;
  } catch (error) {
    console.error("Error fetching STX balance:", error);
    return 0;
  }
}

// Convert a raw STX amount to a human readable format by respecting the 6 decimal places
export function formatStx(amount: number) {
  return parseFloat((amount / 10 ** 6).toFixed(2));
}

// Convert a human readable STX balance to the raw amount
export function parseStx(amount: number) {
  return Math.floor(amount * 10 ** 6);
}

// Format USD amounts
export function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Calculate collateral ratio as percentage
export function calculateCollateralRatio(collateralValue: number, loanAmount: number): number {
  if (loanAmount === 0) return 0;
  return (collateralValue / loanAmount) * 100;
}

// Check if loan is eligible for liquidation (below 120% collateral ratio)
export function isLiquidationEligible(collateralValue: number, loanAmount: number): boolean {
  const ratio = calculateCollateralRatio(collateralValue, loanAmount);
  return ratio < 120;
}
