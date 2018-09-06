import * as React from 'react';
import * as styles from './WaveLoader.scss';

export default function WaveLoader() {
    return (
        <div className={styles.spinner}>
            <div className={styles.rect1}></div>
            <div className={styles.rect2}></div>
            <div className={styles.rect3}></div>
            <div className={styles.rect4}></div>
            <div className={styles.rect5}></div>
        </div>
    );
}
