import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

const ClassLink = props => {
  return (
    <li key={props.item.id} className={styles.classLink}>
      <Link to={`/schoolClass/${props.item.id}`}>
        <div>
          <div><span>{props.item.level} {props.item.term} - {props.item.period} - {props.item.discipline}</span></div>
        </div>
      </Link>
    </li>
  );
};

export default ClassLink;
