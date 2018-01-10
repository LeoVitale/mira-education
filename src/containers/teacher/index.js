import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Modal from 'components/modal';
import { loadTeacher, getClassLessons } from '_redux/modules/teacher';

import ClassLink from 'components/class-link';
import styles from './styles.scss';

class Teacher extends Component {

  state = {
    schoolClassId: '',
    warningModal: false
  }

  componentWillMount() {
    this.props.loadTeacher('7c0f1442-7f7e-42fa-b4e3-10bb953317ed');
  }

  componentWillReceiveProps(nextProps) {
    const lessons = nextProps.lessons[this.state.schoolClassId];

    if (lessons) {
      this.setState({ warningModal: lessons.length > 0 ? true : false });
    }
  }

  loadLessons = (schoolClassId) => {
    this.setState({ schoolClassId });
    this.props.getClassLessons(schoolClassId);
  }

  redirectClass = (loadingLessons, lessons) => {
    const { schoolClassId } = this.state;
    if (loadingLessons) {
      return <div>carregando lições</div>
    }
    if (lessons[schoolClassId]) {
      if (!loadingLessons && lessons[schoolClassId].length > 0) {
        return true;
      } else if (!loadingLessons && lessons[schoolClassId].length === 0) {
        return <Redirect push to={{
          pathname: `/schoolClass/${schoolClassId}`,
          state: { newLesson: true, lessonId: '' }
        }} />
      }
    }
  }

  render() {
    const { loadClasses, teacher, classes, lessons, loadingLessons } = this.props;
    const { warningModal, schoolClassId } = this.state;
    const lastLesson = lessons[schoolClassId] && lessons[schoolClassId][lessons[schoolClassId].length - 1];

    return (
      <div className={styles.teacher}>
        <p>
          Olá, professor
        </p>
        <h2>{teacher && teacher.name}</h2>
        <p><small>Selecione uma turma:</small></p>
        <ul>
          {classes.map(item => <ClassLink loadLessons={this.loadLessons} key={item.id} item={item} />)}
        </ul>
        {this.redirectClass(loadingLessons, lessons)}
        <Modal isOpen={warningModal} message={'Você já possui um apontamento para esta aula, mas você pode atualizar a ultima aula ou criar uma nova!'}>
          <Fragment>
            <Link to={{
              pathname: `/schoolClass/${schoolClassId}`,
              state: { newLesson: false, lessonId: lastLesson && lastLesson.id }
            }}>Atualizar Chamada</Link>
            <Link to={{
              pathname: `/schoolClass/${schoolClassId}`,
              state: { newLesson: true, lessonId: '' }
            }}>Nova Chamada</Link>
          </Fragment>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher.teacher,
    classes: state.teacher.classes,
    lessons: state.teacher.lessons,
    loadingLessons: state.teacher.loadingLessons
  }
}

const mapDispatchToProps = {
  loadTeacher,
  getClassLessons
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
