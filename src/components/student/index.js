import React from 'react';
import styles from './styles.scss';

import checkIcon from 'img/check.svg';
import cancel from 'img/cancel.svg';

const Student = props => {
  const {student, toggleStudent} = props;
  return (
    <li className={styles.student} onClick={() => toggleStudent(student.studentId)}>
      <span>{student.number} - {student.name}</span> <img src={student.status === 'PRESENT' ? checkIcon : cancel}/>
    </li>
  );
};

export default Student;
