import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

const ClassLink = props => {
  return (
    <li className={styles.classLink} onClick={() => props.loadLessons(props.item.id)}>
        <div className={styles.item}>
          <span>{props.item.level} {props.item.term} - {props.item.period} - {props.item.discipline}</span>
        </div>
    </li>
  );
};

export default ClassLink;
