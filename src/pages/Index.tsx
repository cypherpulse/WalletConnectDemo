import { WalletButton } from '@/components/WalletButton';
import { SendToken } from '@/components/SendToken';
import { useAccount } from 'wagmi';
import { Shield, Zap, Lock } from 'lucide-react';

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern animate-grid-flow opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-5xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-block">
              <h1 className="font-display text-7xl md:text-8xl font-black tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow">
                  CONNECT
                </span>
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mt-4" />
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-light">
              Experience the future of decentralized connectivity
            </p>
          </div>

          {/* Wallet Connection Card */}
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <div className="bg-card border border-primary/30 rounded-2xl p-8 md:p-12 max-w-2xl w-full relative overflow-hidden group">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-center">
                  <WalletButton />
                </div>

                {isConnected && (
                  <div className="text-center space-y-4 animate-in fade-in duration-500">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Shield className="h-5 w-5" />
                      <p className="font-display font-semibold tracking-wide">
                        CONNECTION ESTABLISHED
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Your wallet is now connected to the network
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Send Token Section */}
          {isConnected && (
            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="max-w-2xl w-full">
                <SendToken />
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="bg-card border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:glow-cyan">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">Secure</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Military-grade encryption protects your connection
              </p>
            </div>

            <div className="bg-card border border-secondary/20 rounded-xl p-6 hover:border-secondary/50 transition-all duration-300 hover:glow-purple">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-display font-bold text-lg">Lightning Fast</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Instant connections to multiple blockchain networks
              </p>
            </div>

            <div className="bg-card border border-accent/20 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:glow-pink">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Lock className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg">Private</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Your keys, your crypto, your data stays yours
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-muted-foreground text-sm animate-in fade-in duration-1000 delay-500">
            <p>Powered by WalletConnect Protocol</p>
          </div>
        </div>
      </div>

      {/* Corner accent effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
    </div>
  );
};

export default Index;
