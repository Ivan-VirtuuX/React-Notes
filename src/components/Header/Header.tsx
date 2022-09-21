import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        <Link to="/">
          <svg
            width="33"
            height="33"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H11.5C12.163 2 12.7989 2.26339 13.2678 2.73223C13.7366 3.20107 14 3.83696 14 4.5V8H10.5C9.83696 8 9.20107 8.26339 8.73223 8.73223C8.26339 9.20107 8 9.83696 8 10.5V14H4.5C3.83696 14 3.20107 13.7366 2.73223 13.2678C2.26339 12.7989 2 12.163 2 11.5V4.5ZM9 13.859C9.35367 13.735 9.67493 13.533 9.94 13.268L13.268 9.939C13.5325 9.67412 13.7341 9.35322 13.858 9H10.5C10.1022 9 9.72064 9.15804 9.43934 9.43934C9.15804 9.72064 9 10.1022 9 10.5V13.859Z"
              fill="#3B6AEE"
            />
          </svg>
        </Link>
        <h1>React Notes</h1>
      </header>
    </div>
  );
};
