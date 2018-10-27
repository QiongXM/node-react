import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';
import { connect } from 'react-redux';

class EducationItem extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const { id, school, degree, from, to } = this.props;

    return (
      <tr>
        <td>{school}</td>
        <td>{degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
          {to === null ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
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

EducationItem.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  school: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string
};

export default connect(
  null,
  { deleteEducation }
)(EducationItem);
