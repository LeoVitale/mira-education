import React, { Component } from 'react';
import styles from './styles.scss';

class Modal extends Component {
  state = {
    openModal:false
  }

  render() {
    const {isOpen, message, btnAction} = this.props;
    if(!isOpen){
      return null;
    }

    return (
      <div className={styles.overlayModal}>
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
          <p className={styles.message}>{message}</p>
          <button className={styles.closeButton} onClick={() => btnAction()}>Ok</button>
        </div>
      </div>
    );
  }
}

export default Modal;
