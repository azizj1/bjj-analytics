import * as React from 'react';
import * as styles from './TwoCirclesLoader.scss';

export default function TwoCirclesLoader() {
    return (
        <div className={styles.twoCirclesLoader}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
        </div>
    );
}
