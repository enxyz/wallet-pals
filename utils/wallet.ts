import { Wallet } from '../Context';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getStatusFromAddress = (address: string) => {
  return (
    'Connected: ' +
    String(address).substring(0, 6) +
    '...' +
    String(address).substring(38)
  );
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const walletString = getStatusFromAddress(addressArray[0]);
      const obj: Wallet = {
        connected: true,
        status: walletString,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        connected: false,
        status: '😥 ' + err,
        address: '',
      } as Wallet;
    }
  } else {
    return {
      connected: false,
      status: 'You must install a wallet like Metamask for your browser.',
      address: '',
    } as Wallet;
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        const walletString = getStatusFromAddress(addressArray[0]);
        return {
          connected: true,
          address: addressArray[0],
          status: walletString,
        } as Wallet;
      } else {
        return {
          connected: false,
          address: '',
          status: 'Connect your wallet to get started.',
        } as Wallet;
      }
    } catch (err) {
      return {
        connected: false,
        address: '',
        status: '😥 ' + err,
      } as Wallet;
    }
  } else {
    return {
      connected: false,
      address: '',
      status: 'You must install a wallet like Metamask for your browser',
    } as Wallet;
  }
};
