import React from 'react';
import './LoadingSpinner.less';

/**
 * The HTML and CSS for the spinner is fetched from https://loading.io/css/
 */

const LoadingSpinner = () => <div className='loadingspinner'>
  <div className="lds-facebook"><div></div><div></div><div></div></div>
</div>;

export default LoadingSpinner;
