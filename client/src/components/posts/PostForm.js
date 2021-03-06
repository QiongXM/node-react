import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaGroup from '../common/TextAreaGroup';
import { addPost } from '../../actions/postActions';
import clearErrors from '../../actions/clearErrors';

class PostForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
    this.props.clearErrors();
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaGroup
                placeholder="Create a post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors.postErrors
});

export default connect(
  mapStateToProps,
  { addPost, clearErrors }
)(PostForm);
