import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

  setUpdateLesson = () => {

  }

  newLesson = () => {

  }

  render() {
    const { loadClasses, teacher, classes } = this.props;
    if(this.state.schoolClassId) return <Redirect push to={{
      pathname: `/schoolClass/${this.state.schoolClassId}`,
      state: {teste: 'me chupa'}
    }} />
    return (
      <div className={styles.teacher}>
        <p>
          Olá, professor
        </p>
        <h2>{teacher && teacher.name}</h2>
        <p><small>Selecione uma turma:</small></p>
        <ul>
          {classes.map(item => <ClassLink key={item.id} item={item} />)}
          {classes.map(item => {
            return <div key={item.id} onClick={() => this.loadLessons(item.id)}>{item.discipline}</div>
          })}
        </ul>
        <div>
          <button onClick={this.setUpdateLesson}>UPDATE LESSON</button>
          <button onClick={this.newLesson}>NEW LESSON</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher.teacher,
    classes: state.teacher.classes,
    lessons: state.teacher.lessons
  }
}

const mapDispatchToProps = {
  loadTeacher,
  getClassLessons
}


export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
