import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/header';
import Student from 'components/student';
import Modal from 'components/modal';
import { loadClassStudents, setSchoolClass, updateStudent, saveLesson, resetLesson } from '_redux/modules/school-class';
import { getIsoDate, generateUUID } from 'utils';

import styles from './styles.scss';

class SchoolClass extends Component {

  componentDidMount() {
    const { match, classes, loadClassStudents, setSchoolClass } = this.props;
    const schoolClass =  Object.assign({}, ...classes.filter(item => item.id === match.params.classid));
    setSchoolClass(schoolClass);
    loadClassStudents(match.params.classid);
  }

  closeModal = () =>{
    this.props.resetLesson();
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
    const { schoolClass, students, classSession, savingLesson, savedLesson } = this.props;
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
        <Modal isOpen={savedLesson} message={'Chamada salva com sucesso!'} btnAction={this.closeModal}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    classes: state.teacher.classes,
    students: state.schoolClass.students,
    classSession: state.schoolClass.classSession,
    savingLesson: state.schoolClass.savingLesson,
    savedLesson: state.schoolClass.savedLesson
  }
}

const mapDispatchToProps = {
  loadClassStudents, setSchoolClass, updateStudent, saveLesson, resetLesson
}


export default connect(mapStateToProps, mapDispatchToProps)(SchoolClass);
