import React, { useState } from 'react';
import ico_search from '../../assets/ico_search.svg';
import styles from './SearchBar.module.scss'; 

const SearchBar: React.FC = () => {
  const [text, setText] = useState<string>('');

  return (
    <div className={styles.searchContainer}>
      <button className={styles.searchIcon}>
        <img src={ico_search} alt="Search Icon" />
      </button>

      <input
        type="text"
        placeholder="텍스트"
        value={text}
        onChange={(e) => setText(e.target.value)} 
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
