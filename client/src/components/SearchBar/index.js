import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import './index.less';
import PropTypes from 'prop-types';
import icon from './search.svg';

/**
 * Renders a Formik input field
 * https://github.com/jaredpalmer/formik
 */
const SearchBar = ({
  onSubmit,
  initialValue = '',
}) => <Formik
    initialValues={{ search: initialValue || '' }}
    validate={(values) => {
      const errors = {};
      if (!values.search) {
        errors.search = 'Search input can\'t be empty';
      }
      return errors;
    }}
    onSubmit={(values) => {
      onSubmit(values.search);
    }}>
    <div>
      <Form className="searchbar">
        <Field
          type="field"
          className="searchbar__field"
          placeholder="The dark knight rises"
          name="search"
          autoFocus/>
        <button type="submit" className="searchbar__submit">
          <img src={icon}/>
        </button>
      </Form>
      <ErrorMessage className="error" name="search" component="div"/>
    </div>
  </Formik>;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};

export default SearchBar;
