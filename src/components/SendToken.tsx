import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { parseUnits } from 'viem';
import { base, mainnet } from 'wagmi/chains';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Color Theme: Green (primary) for success/security, Orange (secondary) for energy/warnings
// Updated from cyberpunk cyan/purple/pink theme to green/orange/black for better accessibility

// USDC Contract Addresses
const USDC_ADDRESSES = {
  [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
} as const;

const RECIPIENT_ADDRESS = '0xdbd8d1345d17638f3533fd72dcb38ba7523bcf91';

// ERC20 Transfer ABI
const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export const SendToken = () => {
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<'ethereum' | 'base'>('base');
  const { address, chain, chainId } = useAccount();
  const { toast } = useToast();
  const { switchChain } = useSwitchChain();

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount greater than 0',
        variant: 'destructive',
      });
      return;
    }

    const targetChainId = selectedNetwork === 'base' ? base.id : mainnet.id;
    const usdcAddress = USDC_ADDRESSES[targetChainId];

    // Check if we need to switch networks
    if (chain?.id !== targetChainId) {
      try {
        await switchChain({ chainId: targetChainId });
      } catch (err) {
        toast({
          title: 'Network Switch Failed',
          description: 'Please switch to the correct network manually',
          variant: 'destructive',
        });
        return;
      }
    }

    try {
      // USDC has 6 decimals
      const amountInSmallestUnit = parseUnits(amount, 6);
      const targetChain = selectedNetwork === 'base' ? base : mainnet;

      writeContract({
        address: usdcAddress,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [RECIPIENT_ADDRESS as `0x${string}`, amountInSmallestUnit],
        account: address as `0x${string}`,
        chain: targetChain,
      });
    } catch (err) {
      toast({
        title: 'Transaction Failed',
        description: err instanceof Error ? err.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleSuccess = () => {
    toast({
      title: 'Transaction Successful!',
      description: `Sent ${amount} USDC to ${RECIPIENT_ADDRESS.slice(0, 6)}...${RECIPIENT_ADDRESS.slice(-4)}`,
    });
    setAmount('');
  };

  if (isSuccess && hash) {
    setTimeout(handleSuccess, 1000);
  }

  if (!address) {
    return (
      <Card className="p-6 bg-card/50 border-muted-foreground/20">
        <p className="text-center text-muted-foreground">
          Connect your wallet to send USDC
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-card border-primary/30 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-primary">Send USDC</h2>
          <p className="text-sm text-muted-foreground">
            Transfer USDC tokens to the specified address
          </p>
        </div>

        {/* Network Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Network</label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={selectedNetwork === 'base' ? 'default' : 'outline'}
              onClick={() => setSelectedNetwork('base')}
              className={selectedNetwork === 'base' ? 'glow-green' : ''}
            >
              Base
            </Button>
            <Button
              type="button"
              variant={selectedNetwork === 'ethereum' ? 'default' : 'outline'}
              onClick={() => setSelectedNetwork('ethereum')}
              className={selectedNetwork === 'ethereum' ? 'glow-green' : ''}
            >
              Ethereum
            </Button>
          </div>
        </div>

        {/* Recipient Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Recipient Address</label>
          <div className="px-4 py-3 bg-muted/50 border border-primary/20 rounded-lg">
            <p className="font-mono text-sm text-primary break-all">
              {RECIPIENT_ADDRESS}
            </p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium text-foreground">
            Amount (USDC)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            className="text-lg font-semibold bg-background border-primary/30 focus:border-primary"
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={isPending || isConfirming || !amount}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold tracking-wider glow-green"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {isPending ? 'Confirming...' : 'Processing...'}
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send USDC
            </>
          )}
        </Button>

        {/* Status Messages */}
        {hash && (
          <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            {isConfirming ? (
              <>
                <Loader2 className="h-5 w-5 text-primary animate-spin mt-0.5" />
                <div>
                  <p className="font-semibold text-primary">Transaction Pending</p>
                  <p className="text-sm text-muted-foreground">Waiting for confirmation...</p>
                </div>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-primary">Transaction Successful!</p>
                  <a
                    href={`https://${selectedNetwork === 'base' ? 'basescan.org' : 'etherscan.io'}/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    View on Explorer →
                  </a>
                </div>
              </>
            ) : null}
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Transaction Failed</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        )}

        {/* Network Warning */}
        {chain && chain.id !== (selectedNetwork === 'base' ? base.id : mainnet.id) && (
          <div className="flex items-start gap-3 p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
            <AlertCircle className="h-5 w-5 text-secondary mt-0.5" />
            <div>
              <p className="font-semibold text-secondary">Wrong Network</p>
              <p className="text-sm text-muted-foreground">
                Please switch to {selectedNetwork === 'base' ? 'Base' : 'Ethereum'} network
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
