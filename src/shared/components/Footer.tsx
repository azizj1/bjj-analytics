import * as React from 'react';
import * as styles from './Footer.scss';

export default function Footer() {
    return (
        <div className={styles.root}>
            Created by Aziz Javed © 2018
            <span> | </span>
            <a href='https://github.com/azizj1/bjj-analytics' target='_blank'>Source Code</a>
        </div>
    );
}
