import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

export const WalletButton = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="px-6 py-3 bg-card border border-primary/50 rounded-lg glow-cyan">
          <p className="text-sm text-muted-foreground">Connected Wallet</p>
          <p className="font-display text-primary font-semibold tracking-wider">
            {formatAddress(address)}
          </p>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="lg"
          className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => open()}
      size="lg"
      className="relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan px-8 py-6 text-lg font-display font-bold tracking-wider group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Wallet className="mr-3 h-6 w-6 relative z-10" />
      <span className="relative z-10">Connect Wallet</span>
    </Button>
  );
};
