import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const Header = ({ title, children = null, ...props }) => <header {...props} className={`${props.className} header`}>
  <h1 className="header__title">{title}</h1>
  {children}
</header>;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Header;
