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

const SearchBar = ({
  onSubmit,
}) => <Formik
    initialValues={{ search: '' }}
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
      <ErrorMessage className={'error'} name="search" component="div"/>
    </div>
  </Formik>;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
