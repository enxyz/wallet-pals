import React from 'react';

export type Wallet = {
  connected: boolean;
  status: string;
  address: string;
};

export const defaultWallet = {
  connected: false,
  status: '',
  address: '',
};

type LFGContextType = {
  wallet: Wallet;
  setWallet: (wallet: Wallet) => void;
};

export const LFGContext = React.createContext<LFGContextType>({
  wallet: defaultWallet,
  setWallet: () => console.warn('no wallet provider'),
});
