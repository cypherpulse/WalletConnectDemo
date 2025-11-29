# WalletConnect Demo

## Overview

A comprehensive React application demonstrating seamless wallet integration using the AppKit protocol, featuring support for multiple blockchain networks including Base, with a modern green, orange, and black themed UI. This project serves as a complete reference implementation for integrating Reown AppKit v1.6.4 with Wagmi v3.0.2 for professional blockchain applications.

## Features

- **AppKit Integration**: Full Reown AppKit v1.6.4 implementation for connecting to MetaMask, WalletConnect protocol wallets, Coinbase Wallet, and more
- **Multi-Network Support**: Configured for Ethereum Mainnet, Base (primary focus), Polygon, Arbitrum, and Optimism
- **Token Sending**: Built-in functionality to send tokens across supported networks with proper validation
- **Modern UI**: Cyberpunk-themed interface using shadcn/ui components and Tailwind CSS
- **TypeScript**: Fully typed codebase for enhanced developer experience and type safety
- **Responsive Design**: Mobile-friendly interface with adaptive layouts and touch support
- **Error Handling**: Comprehensive error states and user feedback for blockchain interactions
- **Analytics**: WalletConnect analytics enabled for connection insights

## Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19 for fast development and optimized production builds
- **Styling**: Tailwind CSS 3.4.17 with custom cyberpunk theme and responsive utilities
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Blockchain Integration**:
  - **AppKit**: v1.6.4 for unified wallet connection experience
  - **Wagmi**: v3.0.2 for robust Ethereum RPC interactions and account management
  - **Viem**: v2.40.3 for low-level blockchain operations and utilities
- **State Management**: TanStack Query v5.90.11 for server state management and caching
- **Form Handling**: React Hook Form v7.61.1 with Zod v3.25.76 for validation
- **Icons**: Lucide React v0.462.0 for consistent iconography
- **Routing**: React Router DOM v6.30.1 for client-side navigation

## Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **Package Manager**: npm or pnpm
- **Reown Project ID**: Required for AppKit (obtain from [Reown Dashboard](https://dashboard.reown.com))

## Installation

**If you prefer referring to a video tutorial for this, please [click here](#video-tutorial).**

**Setting up from scratch? → Try out the [AppKit CLI templates](#alternative-installation) or the [AI-assisted setup](#alternative-installation).**

### Custom Installation

<Warning>
  If you are setting up your React app, please **do not use** `npx
    create-react-app`, as it has been deprecated. Using it may cause dependency
  issues. Instead, please use
  [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to
  create your React app. You can set it up by running `npm create vite@latest`.
</Warning>

<Tabs>
  <Tab title="Wagmi">
    <CodeGroup>
      ```bash npm theme={null}
      npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
      ```

      ```bash Yarn theme={null}
      yarn add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
      ```

      ```bash Bun theme={null}
      bun add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
      ```

      ```bash pnpm theme={null}
      pnpm add @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
      ```
    </CodeGroup>
  </Tab>
</Tabs>

## Cloud Configuration

Create a new project on Reown Dashboard at [https://dashboard.reown.com](https://dashboard.reown.com) and obtain a new project ID.

<Info>
  **Don't have a project ID?**

  Head over to Reown Dashboard and create a new project now!

  <Card title="Get started" href="https://dashboard.reown.com/?utm_source=cloud_banner&utm_medium=docs&utm_campaign=backlinks" />
</Info>

## Implementation

### AppKitProvider Component

AppKit now provides an `AppKitProvider` React component for easy integration in React applications. This component wraps your app and provides the AppKit context to all child components.

```tsx  theme={null}
import { AppKitProvider } from '@reown/appkit/react'

function App() {
  return (
    <AppKitProvider
      projectId="YOUR_PROJECT_ID"
      networks={[
        /* Your Networks */
      ]}
    >
      {/* Your App */}
    </AppKitProvider>
  )
}
```

### Framework-Specific Implementation

<Tabs>
  <Tab title="Wagmi">
    <Card title="wagmi Example" icon="github" href="https://github.com/reown-com/appkit-web-examples/tree/main/react/react-wagmi">
      Check the React wagmi example
    </Card>

    For a quick integration, you can use the `createAppKit` function with a unified configuration. This automatically applies the predefined configurations for different adapters like Wagmi, Ethers, or Solana, so you no longer need to manually configure each one individually. Simply pass the common parameters such as `projectId`, `chains`, `metadata`, etc., and the function will handle the adapter-specific configurations under the hood.

    This includes WalletConnect, Coinbase and Injected connectors, and the [Blockchain API](../../../../cloud/blockchain-api) as a [transport](https://wagmi.sh/core/api/createConfig#transports)

    On top of your app set up the following configuration, making sure that all functions are called **outside** any React component to avoid unwanted rerenders.

    ```tsx  theme={null}
    import { createAppKit } from '@reown/appkit/react'

    import { WagmiProvider } from 'wagmi'
    import { arbitrum, mainnet } from '@reown/appkit/networks'
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

    // 0. Setup queryClient
    const queryClient = new QueryClient()

    // 1. Get projectId from https://dashboard.reown.com
    const projectId = 'YOUR_PROJECT_ID'

    // 2. Create a metadata object - optional
    const metadata = {
      name: 'AppKit',
      description: 'AppKit Example',
      url: 'https://example.com', // origin must match your domain & subdomain
      icons: ['https://avatars.githubusercontent.com/u/179229932']
    }

    // 3. Set the networks
    const networks = [mainnet, arbitrum]

    // 4. Create Wagmi Adapter
    const wagmiAdapter = new WagmiAdapter({
      networks,
      projectId,
      ssr: true
    })

    // 5. Create modal
    createAppKit({
      adapters: [wagmiAdapter],
      networks,
      projectId,
      metadata,
      features: {
        analytics: true // Optional - defaults to your Cloud configuration
      }
    })

    export function AppKitProvider({ children }) {
      return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
      )
    }
    ```

    ## Importing networks

    Reown AppKit use [Viem](https://viem.sh/) networks under the hood, which provide a wide variety of networks for EVM chains. You can find all the networks supported by Viem within the `@reown/appkit/networks` path.

    ```js {2} theme={null}
    import { createAppKit } from '@reown/appkit'
    import { mainnet, arbitrum, base, scroll, polygon } from '@reown/appkit/networks'
    ```

- **Chain ID**: 8453
- **RPC URL**: https://mainnet.base.org
- **Block Explorer**: https://basescan.org
- **Native Token**: ETH
- **Gas Token**: ETH
- **Block Time**: ~2 seconds

## Usage

### Connecting a Wallet

1. Launch the application (`npm run dev`)
2. Click the **"Connect Wallet"** button in the header
3. Select your preferred wallet from the AppKit modal:
   - **Browser Wallets**: MetaMask, Coinbase Wallet, etc.
   - **Mobile Wallets**: Via WalletConnect QR code
4. Approve the connection request in your wallet
5. Your account address and network will be displayed

### Sending Tokens

1. Ensure you're connected to a wallet on a supported network
2. Navigate to the **Send Token** section
3. Fill in the transaction details:
   - **Recipient Address**: Valid Ethereum address
   - **Amount**: Token amount to send
   - **Token**: Select from available tokens (ETH by default)
4. Review the transaction details
5. Confirm and sign the transaction in your wallet
6. Wait for confirmation on the blockchain

## AppKit Integration Details

This demo implements industry-standard AppKit integration for production-ready applications.

### AppKit Configuration

Located in `src/config/wagmi.ts`, AppKit is configured with:

```typescript
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
    '--w3m-accent': 'hsl(188, 100%, 50%)',
    '--w3m-border-radius-master': '0.5rem'
  }
});
```

### Project-Specific AppKit Setup

This project uses the following AppKit configuration:

```typescript
// src/config/wagmi.ts
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// Project ID from Reown Dashboard
const projectId = import.meta.env.VITE_PROJECT_ID

// App metadata
const metadata = {
  name: 'Sci-Fi Wallet Connect',
  description: 'A futuristic wallet connection demo',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Supported networks
const networks = [mainnet, base, polygon, arbitrum, optimism]

// Wagmi adapter configuration
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// Create AppKit modal
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
    '--w3m-accent': 'hsl(188, 100%, 50%)',
    '--w3m-border-radius-master': '0.5rem'
  }
})

export const queryClient = new QueryClient()

// AppKit Provider for React
export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <wagmiAdapter.WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </wagmiAdapter.WagmiProvider>
  )
}
```

### Environment Setup

Create a `.env` file in the project root:

```env
VITE_PROJECT_ID=your_reown_project_id_here
```

**To get your Project ID:**
1. Go to [Reown Dashboard](https://dashboard.reown.com)
2. Create a new project
3. Copy the Project ID
4. Add it to your `.env` file

### Using AppKit Hooks and Components

#### AppKit Button Component

For the simplest integration, you can use the `<appkit-button>` web component:

```tsx
export default function ConnectButton() {
  return <appkit-button />
}
```

#### AppKit Hooks

Use the `useAppKit` hook for programmatic control:

```tsx
import { useAppKit } from '@reown/appkit/react'

export const WalletButton = () => {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return <button onClick={() => open()}>Connect Wallet</button>
}
```

#### Opening Specific Views

```tsx
const { open } = useAppKit()

// Open wallet connection modal
open()

// Open network selection
open({ view: 'Networks' })

// Open account view
open({ view: 'Account' })
```

### Supported Wallet Types

- **Browser Extensions**: MetaMask, Coinbase Wallet, Brave Wallet
- **Mobile Apps**: Trust Wallet, Rainbow, Argent, etc.
- **Hardware Wallets**: Via compatible wallet apps
- **WalletConnect Protocol**: Direct connection to mobile wallets via QR code
- **AppKit Universal**: Cross-platform wallet support

### Wagmi Integration

The application uses Wagmi for all blockchain interactions:

- **Account Management**: Connection status, address, balance
- **Network Switching**: Automatic network detection and switching
- **Transaction Handling**: Send transactions with proper error handling
- **Contract Interactions**: Ready for smart contract integrations

### Base Network Specific Features

- **Primary Network**: Base is highlighted as the main network in the demo
- **Fast Transactions**: Leveraging Base's ~2-second block times
- **Low Fees**: Cost-effective transactions on Layer 2
- **EVM Compatibility**: Full Ethereum Virtual Machine support

### Key Components

#### WalletButton (`src/components/WalletButton.tsx`)
- Manages wallet connection/disconnection using AppKit hooks
- Displays account address and network
- Handles connection errors gracefully
- Real-time connection status updates

#### SendToken (`src/components/SendToken.tsx`)
- Form validation using React Hook Form + Zod
- Token amount input with decimal support
- Address validation and ENS support
- Transaction status feedback
- Error handling for failed transactions

#### Wagmi Config (`src/config/wagmi.ts`)
- Centralized AppKit and Wagmi configuration
- Multi-chain support with AppKit networks
- WalletConnect project metadata
- Query client setup for caching

## Development

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Production build optimized for deployment
npm run build:dev    # Development build for testing
npm run lint         # Run ESLint for code quality checks
npm run preview      # Preview production build locally
```

### Project Structure

```
wallet-connect-demo-main/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui component library
│   │   ├── WalletButton.tsx
│   │   ├── SendToken.tsx
│   │   └── NavLink.tsx
│   ├── config/
│   │   └── wagmi.ts       # WalletConnect & Wagmi configuration
│   ├── hooks/
│   │   ├── use-mobile.tsx # Responsive design hook
│   │   └── use-toast.ts   # Toast notification hook
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   ├── pages/
│   │   ├── Index.tsx      # Main application page
│   │   └── NotFound.tsx   # 404 error page
│   ├── App.tsx            # Root component with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # This file
```

### Environment Variables

Create `.env` with:
```env
VITE_PROJECT_ID=your_walletconnect_project_id
```

### Code Quality

- **ESLint**: Configured for React and TypeScript best practices
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (via ESLint integration)

## Contributing

We welcome contributions from the community! This project follows industry best practices for open-source development.

### How to Contribute

1. **Fork the repository** on GitHub
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the existing code style
4. **Test thoroughly** - ensure wallet connections work across different networks
5. **Commit your changes**:
   ```bash
   git commit -m 'Add: Brief description of your feature'
   ```
6. **Push to your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** with a detailed description

### Contribution Guidelines

- **Code Style**: Follow the existing TypeScript and React patterns
- **Testing**: Test wallet connections on multiple networks (especially Base)
- **Documentation**: Update README and code comments as needed
- **Security**: Never commit API keys or sensitive information
- **Compatibility**: Ensure changes work with the supported wallet types

### Development Setup for Contributors

1. Follow the installation steps above
2. Set up your Reown project ID
3. Test with multiple wallets and networks
4. Ensure all linting passes: `npm run lint`
5. Build successfully: `npm run build`

## Alternative Installation

If you are starting from scratch, you can use the following methods to set up your project with Reown AppKit.

<AccordionGroup>
  <Accordion title="Set up Reown AppKit using AI">
    If you're using Cursor IDE (or another AI based IDE) to build a project with Reown AppKit, Reown provides a `.mdc` file that enhances your development experience. The `reown-appkit.mdc` [file here](https://github.com/reown-com/reown-docs/blob/main/reown-appkit.mdc) contains Cursor-specific rules and type hints for Reown AppKit.

    To use it in your project:

    1. Copy the `reown-appkit.mdc` file from this repository
    2. Create a `.cursor/rules` folder in your project's root directory (if it doesn't exist)
    3. Place the `.mdc` file in your project's `.cursor/rules` folder

    For more info, refer to [Cursor's documentation](https://docs.cursor.com/context/rules#project-rules).
  </Accordion>

  <Accordion title="AppKit CLI">
    Reown offers a dedicated CLI to set up a minimal version of AppKit in the easiest and quickest way possible.

    To do this, please run the command below.

    ```bash  theme={null}
    npx @reown/appkit-cli
    ```

    After running the command, you will be prompted to confirm the installation of the CLI. Upon your confirmation, the CLI will request the following details:

    1. **Project Name**: Enter the name for your project.
    2. **Framework**: Select your preferred framework or library. Currently, you have three options: React, Next.js, and Vue.
    3. **Network-Specific libraries**: Choose whether you want to install Wagmi, Ethers, Solana, or Multichain (EVM + Solana).

    After providing the project name and selecting your preferences, the CLI will install a minimal example of AppKit with your preferred blockchain library. The example will be pre-configured with a `projectId` that will only work on `localhost`. To fully configure your project, please obtain a `projectId` from the Reown Dashboard and update your project accordingly.

    **Refer to [Cloud Configuration](#cloud-configuration) for more information.**
  </Accordion>
</AccordionGroup>

## Video Tutorial

<div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
  <iframe
    style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    maxWidth: '560px',
    margin: '0 auto'
  }}
    src="https://www.youtube.com/embed/lxTGqXh7LiA?si=1MQMbtqQtM6KSfE0"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</iframe>
</div>

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[Reown](https://reown.com/)**: The company behind AppKit and WalletConnect protocol
- **[AppKit](https://appkit.reown.com/)**: Unified wallet connection interface
- **[WalletConnect](https://walletconnect.com/)**: The protocol enabling secure wallet connections
- **[Wagmi](https://wagmi.sh/)**: React hooks for Ethereum
- **[Base](https://base.org/)**: Layer 2 network providing fast, low-cost transactions
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful, accessible component library
- **[Vite](https://vitejs.dev/)**: Fast build tool and development server

## Support

- **Issues**: [GitHub Issues](https://github.com/cypherpulse/WalletConnectDemo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cypherpulse/WalletConnectDemo/discussions)
- **AppKit Docs**: [docs.reown.com/appkit](https://docs.reown.com/appkit/)
- **WalletConnect Docs**: [docs.walletconnect.com](https://docs.walletconnect.com/)
- **Base Docs**: [docs.base.org](https://docs.base.org/)
- **Reown Dashboard**: [dashboard.reown.com](https://dashboard.reown.com)

---

**Built with ❤️ for the Web3 community** - Demonstrating best practices for WalletConnect integration on Base and other networks.
