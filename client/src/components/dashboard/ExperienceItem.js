import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';
import { connect } from 'react-redux';

class ExperienceItem extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const { id, company, title, from, to } = this.props;

    return (
      <tr>
        <td>{company}</td>
        <td>{title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
          {to === null ? 'Now' : <Moment format="YYYY/MM/DD">{to} </Moment>}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

ExperienceItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  company: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default connect(
  null,
  { deleteExperience }
)(ExperienceItem);
