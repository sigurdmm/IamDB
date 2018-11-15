import React from 'react';
import PropTypes from 'prop-types';

import './index.less';
import { Link } from 'react-router-dom';

const Header = ({ title, children = null, ...props }) => <header {...props} className={`${props.className || ''} header`}>
  <Link to="/" className="header__title">
    <h1>{title}</h1>
  </Link>
  {children}
</header>;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Header;
