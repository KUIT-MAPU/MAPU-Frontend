import React from 'react';
import styles from './SearchPopUp.module.scss';
import check from '../../assets/ico_check.svg';

interface SearchPopUpProps {
  isCheck: string;
  className: string;
  handleRandomBtn: () => void;
  handleRecentBtn: () => void;
}

const SearchPopUp: React.FC<SearchPopUpProps> = ({
  className,
  isCheck,
  handleRandomBtn,
  handleRecentBtn,
}) => {
  return (
    <div className={`${className} ${styles.root}`}>
        <button className={styles.random} onClick={handleRandomBtn}>
          랜덤순 탐색
          {isCheck === 'random' && <img src={check} alt="check" />}
        </button>
        <button className={styles.recent} onClick={handleRecentBtn}>
          날짜순 탐색
          {isCheck === 'recent' && <img src={check} alt="check" />}
        </button>
    </div>
  );
};

export default SearchPopUp;
