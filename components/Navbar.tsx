import Link from 'next/link';
import { useContext } from 'react';
import { LFGContext } from '../Context';

const Navbar: React.FC = () => {
  const context = useContext(LFGContext);

  return (
    <nav className="flex items-center space-between flex-wrap pt-3 pb-12 mx-12">
      <div className="flex-1 basis-1/4 flex justify-start">
        <Link href="/">
          <a className="inline-flex items-center p-2">
            <span className="text-xl font-bold tracking-wide px-2">
              wallet-pals
            </span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
