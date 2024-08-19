import React from 'react';
import { useKeywordStore } from '../../stores/keywordStore';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
  text: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ text }) => {
  return (
    <div className={styles.errorPageRoot}>
      {text && (
        <div className = {styles.text}>
          <p>'{text}'지도를 찾을 수 없어요.</p>
          <p>다른 검색어를 시도해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default ErrorPage;
