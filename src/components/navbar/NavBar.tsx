import { Link } from 'react-router-dom';
import { truncateAddress } from '../../web3/starknet/utils';
import ConnectedComponent from '../ConnectedComponent';

import './NavBar.css';

const NavBar = ({ account }) => {
  return (
    <div>
      <header className="App-header">
        <p>
          Welcome to <code className='text-red-500'>&lt;MetaCache/&gt;</code><br />
          The internet-wide scavenger hunt.
        </p>
        <p>Address: <ConnectedComponent children={<span>{account && truncateAddress(account)}</span>} /></p>
      </header>
      <ul>
        <li><Link to="/Claim">Discover</Link></li>
        <li><Link to="/Create">Create</Link></li>
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;