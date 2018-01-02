import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTeacher, loadClasses } from '_redux/modules/teacher';

class Teacher extends Component {

  componentWillMount() {
    this.props.loadTeacher('7c0f1442-7f7e-42fa-b4e3-10bb953317ed');
  }

  render() {
    const { loadClasses, teacher, classes } = this.props;
    console.log(classes);

    return (
      <div>
        <p>
          Oi, {teacher && teacher.name}
        </p>
        <ul>
          {classes.map(item =>
            <li key={item.id}>
              <div>
                <div>{item.id}</div>
                <div>{item.discipline}</div>
              </div>
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
