import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from 'components/header';
import Student from 'components/student';
import Modal from 'components/modal';
import { loadClassStudents, setSchoolClass, updateStudent, saveLesson, resetLesson, editLesson } from '_redux/modules/school-class';
import { getIsoDate, generateUUID } from 'utils';

import styles from './styles.scss';

class SchoolClass extends Component {

  state = {
    opeModal: false,
    returnHome: false
  }

  componentDidMount() {
    const { match, classes, loadClassStudents, setSchoolClass } = this.props;
    const schoolClass =  Object.assign({}, ...classes.filter(item => item.id === match.params.classid));
    setSchoolClass(schoolClass);
    loadClassStudents(match.params.classid);
  }

  componentWillReceiveProps(nextProps) {
    const { savedLesson, updatedLesson } = nextProps;
    if(savedLesson || updatedLesson) {
      this.setState({opeModal: true});
    }
  }

  closeModal = () =>{
    this.props.resetLesson();
    this.setState({opeModal: false, returnHome:true});
  }
  toggleStudent = (studentId) => {
    this.props.updateStudent(studentId);
  }

  saveLesson = () => {
    const { classSession, students, location } = this.props;
    const attendances = students.map(student => {
      return {studentId: student.studentId, status: student.status}
    });

    const lessonOrder = location.state.lessonOrder === 0 ? 1 : (location.state.lessonOrder+1);
    const lesson = {
      id: location.state.lessonId ? location.state.lessonId : generateUUID(),
      date: getIsoDate(),
      schoolClassId: classSession.id,
      lessonOrder: lessonOrder,
      attendances: attendances
   }

   if(location.state.newLesson) {
    this.props.saveLesson(classSession.id, lesson);
   } else {
    this.props.editLesson(classSession.id, location.state.lessonId, lesson)
   }
  }

  render() {
    const { schoolClass, students, classSession, savingLesson, savedLesson, updatedLesson } = this.props;
    const { opeModal, returnHome } = this.state;
    if(returnHome) {
      return <Redirect push to="/"/>
    }
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
        <Modal isOpen={opeModal} message={savedLesson ? 'Chamada salva com sucesso!' : 'Chamada atualizada com sucesso!'}>
          <Fragment>
            <button onClick={() => this.closeModal()} className={styles.closeButton}>Ok</button>
          </Fragment>
        </Modal>
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
    savedLesson: state.schoolClass.savedLesson,
    updatedLesson: state.schoolClass.updatedLesson
  }
}

const mapDispatchToProps = {
  loadClassStudents, setSchoolClass, updateStudent, saveLesson, resetLesson, editLesson
}


export default connect(mapStateToProps, mapDispatchToProps)(SchoolClass);
