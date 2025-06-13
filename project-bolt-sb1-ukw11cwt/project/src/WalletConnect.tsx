import * as React from 'react';
import { RainbowKitProvider, getDefaultConfig, ConnectButton } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { polygonMumbai } from 'wagmi/chains';

// WalletConnect Cloud project ID
const projectId = import.meta.env.VITE_WC_PROJECT_ID || 'demo-project-id';

// Configure chains & providers
const config = getDefaultConfig({
  appName: 'Polygon Wallet App',
  projectId,
  chains: [polygonMumbai],
  ssr: false, // If your dApp doesn't use server side rendering
});

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const WalletConnect: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <div className="flex justify-center py-4">
            <ConnectButton />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletConnect;
