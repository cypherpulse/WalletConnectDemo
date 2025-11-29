import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// 1. Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_PROJECT_ID // Replace with your actual project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'Sci-Fi Wallet Connect',
  description: 'A futuristic wallet connection demo',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const networks = [mainnet, base, polygon, arbitrum, optimism]

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': 'hsl(120, 100%, 50%)',
    '--w3m-border-radius-master': '0.5rem'
  }
})

export const queryClient = new QueryClient()

// 5. Create AppKit Provider
export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <wagmiAdapter.WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </wagmiAdapter.WagmiProvider>
  )
}
