import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Teacher from 'containers/teacher';
import SchoolClass from 'containers/school-class';

import styles from './styles.scss';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Route exact path="/" component={Teacher} />
          <Route path="/schoolClass/:classid" component={SchoolClass} />
        </div>
      </Router>
    )
  }
}
