import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadClassStudents, setSchoolClass } from '_redux/modules/school-class';

function getIsoDate() {
  let now = new Date();
  return new Date(now).toISOString();
}

function generateUUID() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};


class SchoolClass extends Component {

  state = {
    attendances: []
  }

  componentWillMount() {
    const { match, classes, loadClassStudents, setSchoolClass } = this.props;
    loadClassStudents(match.params.classid);
    const schoolClass = classes.filter(item => item.id === match.params.classid);
    setSchoolClass(...schoolClass);
  }

  createSchoolClass = (schoolClassId, students) => {

    const attendances = students.map(student => {
      return { studentId: student.id, status: 'ABSENCE' }
    })

    console.log('==============attendances======================');
    console.log(attendances);
    console.log('====================================');

    const reduced = Object.assign({}, ...attendances.map(item => ({ [item['studentId']]: item })))

    console.log('===============reduced=====================');
    console.log(reduced);
    console.log('====================================');

    const arr = Object.keys(reduced).map(function (key) { return reduced[key]; });

    console.log('================arr====================');
    console.log(arr);
    console.log('====================================');

    const obj = {
      'id': generateUUID(),
      'date': getIsoDate(),
      'schoolClassId': schoolClassId,
      'lessonOrder': 1,
      'attendances': attendances
    }

    console.log(obj);
  }

  updateAttendances = (attendance) => {
    const attendances = { ...this.state.attendances };


  }

  render() {

    const { schoolClass } = this.props;

    schoolClass.students.length > 0 && this.createSchoolClass(this.props.match.params.classid, schoolClass.students)

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
