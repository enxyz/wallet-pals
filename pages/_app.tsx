import { useState } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { defaultWallet, Context, Wallet } from '../Context';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const [wallet, setWallet] = useState<Wallet>(defaultWallet);

  return (
    <Context.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}

export default MyApp;
