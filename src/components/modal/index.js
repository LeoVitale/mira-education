import React, { Component } from 'react';
import styles from './styles.scss';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal:false
    }
  }

  render() {
    const {isOpen, message} = this.props;
    if(!isOpen){
      return null;
    }

    return (
      <div className={styles.overlayModal}>
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
          <p className={styles.message}>{message}</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
