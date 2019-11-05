import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w3-bar w3-teal w3-center'>
      <Link to='/' className='w3-button w3-padding-16'>
        Home
      </Link>
      <Link to='/aboutus' className='w3-button w3-padding-16'>
        About Us
      </Link>
      <Link to='/terms' className='w3-button w3-padding-16'>
        Terms
      </Link>
    </div>
  );
};

export default Navbar;
