import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

import backActive from '../../../assets/ico_back_active.svg';
import backInactive from '../../../assets/ico_back_inactive.svg';
import forwardActive from '../../../assets/ico_front_active.svg';
import forwardInactive from '../../../assets/ico_front_inactive.svg';

import styles from './HeaderNavigation.module.scss';

const HeaderNavigation: React.FC<{ children: React.ReactNode }> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  const [isBack, setIsBack] = useState<boolean>(false);
  const [isForward, setIsForward] = useState<boolean>(false);

  useEffect(() => {
    const updateButtonStates = () => {
      const idx = window.history.state?.idx ?? 0;
      const length = window.history.length;

      setIsBack(idx !== 1);
      setIsForward(navigationType === 'POP' && idx < length - 2);
    };

    window.addEventListener('popstate', updateButtonStates);

    updateButtonStates();

    return () => {
      window.removeEventListener('popstate', updateButtonStates);
    };
  }, [location.pathname, navigationType]);
  const handleBack = () => {
    if (isBack) {
      navigate(-1);
    }
  };

  const handleForward = () => {
    if (isForward) {
      navigate(1);
    }
  };

  return (
    <div className={styles.Root}>
      <nav className={styles.headerNav}>
        <button
          className={styles.backbtn}
          onClick={handleBack}
          disabled={!isBack}
        >
          <img src={isBack ? backActive : backInactive} alt="Back" />
        </button>

        <button
          className={styles.forwardbtn}
          onClick={handleForward}
          disabled={!isForward}
        >
          <img
            src={isForward ? forwardActive : forwardInactive}
            alt="Forward"
          />
        </button>
      </nav>

      <main className={styles.headerMain}>{props.children}</main>
    </div>
  );
};

export default HeaderNavigation;
