import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadClassStudents, setSchoolClass } from '_redux/modules/school-class';

class SchoolClass extends Component {

  componentWillMount() {
    const {match, classes, loadClassStudents, setSchoolClass} = this.props;
    loadClassStudents(match.params.classid);
    const schoolClass = classes.filter(item => item.id === match.params.classid);
    setSchoolClass(...schoolClass);
  }

  render() {
    return (
      <div>
        <h1>{this.props.match.params.classid}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    classes: state.teacher.classes,
    schoolClass: state.schoolClass
  }
}

const mapDispatchToProps = {
  loadClassStudents, setSchoolClass
}


export default connect(mapStateToProps, mapDispatchToProps)(SchoolClass);
