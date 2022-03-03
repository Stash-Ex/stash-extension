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
      <div className='flex items-center justify-center h-36 bg-gray-700 text-white'>
        <p>
          Welcome to <code className='text-red-500 font-medium'>Stash</code><br />
          The internet-wide scavenger hunt.
        </p>
      </div>
      <div className='flex items-center justify-between h-14 bg-gray-800 text-white'>
        <div className='flex-1 flex items-center justify-start pl-2'>
          {navLinks.map(nav => (
            <Link
              className={`flex items-center justify-center pl-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 hover:text-black ${nav.name === currentNavLink ? "bg-purple-500 text-black" : ""}`}
              to={nav.href}
              onClick={() => setCurrentNavLink(nav.name)}
            >
              {nav.name}
            </Link>
          ))}
        </div>
        <div className='right-0 flex flex-1 items-center justify-end pr-2'>
          <ConnectedComponent children={<p>Wallet: <span>{account && truncateAddress(account)}</span></p>} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NavBar;