import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTeacher, loadClasses } from '_redux/modules/teacher';

import styles from './styles.scss';

class Teacher extends Component {

  componentWillMount() {
    this.props.loadTeacher('7c0f1442-7f7e-42fa-b4e3-10bb953317ed');
  }

  render() {
    const { loadClasses, teacher, classes } = this.props;
    console.log(classes);

    return (
      <div className={styles.teacher}>
        <p>
          Olá, professor
        </p>
        <h2>{teacher && teacher.name}</h2>
        <p><small>Selecione uma turma:</small></p>
        <ul>
          {classes.map(item =>
            <li key={item.id}>
              <Link to={`/schoolClass/${item.id}`}>
                <div>
                  <div><span>{item.level} {item.term} - {item.period} - {item.discipline}</span></div>
                </div>
              </Link>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher.teacher,
    classes: state.teacher.classes
  }
}

const mapDispatchToProps = {
  loadTeacher
}


export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
