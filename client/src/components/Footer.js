import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Footer extends Component {
  render() {
    return (
      <div className='w3-bar w3-teal w3-center'>
        <Link to='/terms' className=' w3-button w3-padding-16'>
          Privacy
        </Link>
      </div>
    );
  }
}
