import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Following.module.scss';

const Following = ({onClose}: {onClose: () => void}) => {
    return(
    <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>X</button>
          <div>Title</div>
          <div>Contents</div>
          <div>Date</div>
        </div>
      </div>
    )
}

export default Following;