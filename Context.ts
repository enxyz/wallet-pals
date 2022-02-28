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

type ContextType = {
  wallet: Wallet;
  setWallet: (wallet: Wallet) => void;
};

export const Context = React.createContext<ContextType>({
  wallet: defaultWallet,
  setWallet: () => console.warn('no wallet provider'),
});
