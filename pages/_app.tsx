import { useContext, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultWallet, LFGContext, Wallet } from '../Context';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const [wallet, setWallet] = useState<Wallet>(defaultWallet);
  const context = useContext(LFGContext);

  return (
    <LFGContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LFGContext.Provider>
  );
}

export default MyApp;
