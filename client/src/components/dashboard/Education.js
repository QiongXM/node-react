import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EducationItem from './EducationItem';

class Education extends Component {
  render() {
    const education = this.props.education.map(item => (
      <EducationItem
        key={item._id}
        id={item._id}
        school={item.school}
        degree={item.degree}
        from={item.from}
        to={item.to}
      />
    ));
    return (
      <div>
        <h4 className="mb-4">My Education </h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  education: PropTypes.array.isRequired
};

export default Education;
