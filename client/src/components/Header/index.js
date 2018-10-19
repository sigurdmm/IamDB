import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, children = null }) => <header className="header">
  <h1 className="header__title">{title}</h1>
  {children}
</header>;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Header;
