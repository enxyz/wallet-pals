import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="bg-zest min-h-screen flex flex-col font-light">
      <Head>
        <title>Wallet Pals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex-1 mb-12">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
