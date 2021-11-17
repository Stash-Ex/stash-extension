import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <h5>NAVBAR</h5>
      <ul>
        <li><Link to="/Claim">Discover</Link></li>
        <li><Link to="/Create">Create</Link></li>
     	</ul>
      <hr />
    </div>
  );
};

export default NavBar;