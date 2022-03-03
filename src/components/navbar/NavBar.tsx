import { useState } from 'react';
import { Link } from 'react-router-dom';
import { truncateAddress } from '../../web3/starknet/utils';
import ConnectedComponent from '../ConnectedComponent';

const navLinks = [
  { name: 'Discover', href: "/Claim" },
  { name: 'Create', href: "/Create" },
]

const NavBar = ({ account }) => {
  const [currentNavLink, setCurrentNavLink] = useState("Discover");

  return (
    <div>
      <div className='flex flex-col justify-center h-36 bg-gray-700 text-center text-white'>
        <p className='text-xl'>
          Welcome to <code className='text-red-500 font-medium'>Stash</code>
        </p>
        <p className='text-sm'>
          Crypto discoveries await
        </p>
      </div>
      <div className='flex items-center justify-between h-14'>
        <div className='flex-1 flex items-center justify-start pl-2 h-3/5'>
          {navLinks.map(nav => (
            <Link
              className={`text-sm font-medium flex flex-1 justify-center self-stretch items-center rounded-md border-b-2 border-transparent ${nav.name === currentNavLink ? "border-red-500" : "hover:border-red-500"}`}
              to={nav.href}
              onClick={() => setCurrentNavLink(nav.name)}
              key={nav.name}
            >
              {nav.name}
            </Link>
          ))}
        </div>
        <div className='right-0 flex flex-1 items-center justify-end pr-2'>
          <ConnectedComponent children={<p className='text-sm'>Wallet: <span>{account && truncateAddress(account)}</span></p>} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NavBar;