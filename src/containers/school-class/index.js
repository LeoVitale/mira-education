import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/header';
import Student from 'components/student';
import { loadClassStudents, setSchoolClass, updateStudent, saveLesson } from '_redux/modules/school-class';

import styles from './styles.scss';

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

  componentDidMount() {
    const { match, classes, loadClassStudents, setSchoolClass } = this.props;
    const schoolClass =  Object.assign({}, ...classes.filter(item => item.id === match.params.classid));
    setSchoolClass(schoolClass);
    loadClassStudents(match.params.classid);
  }

  toggleStudent = (studentId) => {
    this.props.updateStudent(studentId);
  }

  saveLesson = () => {
    const { classSession, students } = this.props;
    const attendances = students.map(student => {
      return {studentId: student.studentId, status: student.status}
    });
    const lesson = {
      id: generateUUID(),
      date: getIsoDate(),
      schoolClassId: classSession.id,
      lessonOrder: 1,
      attendances: attendances
   }
   this.props.saveLesson(classSession.id, lesson);
  }

  render() {
    const { schoolClass, students, classSession } = this.props;
    return (
      <div className={styles.schoolClass}>
        <Header classSession={classSession}/>
        <div className={styles.studentList}>
          <ul>
            {
              students.map(student => (
                <Student key={student.studentId} student={student} toggleStudent={this.toggleStudent}/>
              ))
            }
          </ul>
          <button className={styles.saveButton} onClick={this.saveLesson}>Salvar</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    classes: state.teacher.classes,
    students: state.schoolClass.students,
    classSession: state.schoolClass.classSession
  }
}

const mapDispatchToProps = {
  loadClassStudents, setSchoolClass, updateStudent, saveLesson
}


export default connect(mapStateToProps, mapDispatchToProps)(SchoolClass);
