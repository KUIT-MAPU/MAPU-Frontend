import React from 'react';
import styles from './KeywordList.module.scss';

interface KeywordListProps {
  className?: string;
}

const KeywordList: React.FC<KeywordListProps> = ({ className }) => {
  return (
    <>
      <div className={className}>KeywordList</div>
    </>
  );
};

export default KeywordList;
