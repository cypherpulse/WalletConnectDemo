import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains';
import { QueryClient } from '@tanstack/react-query';

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_PROJECT_ID; // Replace with your actual project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'Sci-Fi Wallet Connect',
  description: 'A futuristic wallet connection demo',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, base, polygon, arbitrum, optimism] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(188, 100%, 50%)',
    '--w3m-border-radius-master': '0.5rem',
  }
});

export const queryClient = new QueryClient();
