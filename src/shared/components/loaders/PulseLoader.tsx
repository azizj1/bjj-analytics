import * as React from 'react';
import * as styles from './PulseLoader.scss';

export default function PulseLoader() {
    return (
        <div className={styles.spinner}>
            <div className={styles.doubleBounce1}></div>
            <div className={styles.doubleBounce2}></div>
        </div>
    );
}
