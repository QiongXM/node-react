import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExperienceItem from './ExperienceItem';

class Experience extends Component {
  render() {
    const experience = this.props.experience.map(item => (
      <ExperienceItem
        key={item._id}
        id={item._id}
        company={item.company}
        title={item.title}
        from={item.from}
        to={item.to}
      />
    ));
    return (
      <div>
        <h4 className="mb-4">My Experience </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
