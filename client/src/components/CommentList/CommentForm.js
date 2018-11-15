import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

import './CommentForm.less';

const CommentForm = ({ onSubmit }) => <Formik
  initialValues={{ comment: '' }}
  onSubmit={({ comment }) => onSubmit(comment)}
  validate={(values) => {
    const errors = {};

    if (!values.comment || values.comment.length < 10) {
      errors.comment = `Comment cannot be less than 10 characters. Your's is ${values.comment.length}`;
    }

    return errors;
  }}>
  <Form className="commentform">
    <label htmlFor="comment" className="commentform__label">Comment</label>
    <Field
      className="commentform__comment"
      id="comment"
      name="comment"
      rows="10"
      component="textarea"/>
    <ErrorMessage className="error" name="comment" component="div"/>

    <button type="submit">Submit comment</button>
  </Form>
</Formik>;

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
