import React from 'react';
import styles from './styles.scss';

const Header = props => {
  return (
    <div className={styles.header}>
      <h3>{props.classSession.level} {props.classSession.term}</h3>
      <h4>{props.classSession.period} - {props.classSession.discipline} - Aula</h4>
    </div>
  );
};

export default Header;
