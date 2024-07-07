import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import './HeaderNavigation.scss';

const HeaderNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  const [isBack, setIsBack] = useState<boolean>(false);
  const [isForward, setIsForward] = useState<boolean>(false);

  useEffect(() => {
    const updateButtonStates = () => {
      const idx = window.history.state?.idx ?? 0;
      const length = window.history.length;

      setIsBack(idx !== 0);
      setIsForward(navigationType === 'POP' && idx < length-1);
    };

    window.addEventListener('popstate', updateButtonStates);

    updateButtonStates();

    return () => {
      window.removeEventListener('popstate', updateButtonStates);
    };
  }, [location.pathname, navigationType, isForward]); 

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
    <nav className="headerNav">
      <button className="backbtn" onClick={handleBack} disabled={!isBack}>
        <img
          src={isBack ? '/MAPUimg/back_btn_active.png' : '/MAPUimg/back_btn_inactive.png'}
          alt="Back"
        />
      </button>

      <button className="forwardbtn" onClick={handleForward} disabled={!isForward}>
        <img 
          src={isForward ? '/MAPUimg/forward_btn_active.png' : '/MAPUimg/forward_btn_inactive.png'}
          alt="Forward"
        />
      </button>
    </nav>
  );
};

export default HeaderNavigation;

