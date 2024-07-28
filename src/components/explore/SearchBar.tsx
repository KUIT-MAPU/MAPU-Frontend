import React, { useState } from 'react';
import ico_search from '../../assets/ico_search.svg';
import styles from './SearchBar.module.scss';

interface SearchBarPorps {
  className : string;
  text : string;
  setText : (text:string) => void;
}

const SearchBar: React.FC<SearchBarPorps> = ( { className, text, setText}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
      <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''} ${className}`}>
        <button className={styles.searchIcon}>
          <img src={ico_search} alt="Search Icon" />
        </button>

        <input
          type="text"
          placeholder="텍스트"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${styles.searchInput} ${isFocused ? styles.focused : ''}`}
        />
      </div>
  );
};

export default SearchBar;