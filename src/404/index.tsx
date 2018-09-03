import * as React from 'react';
import * as styles from './index.scss';
import * as cx from 'classnames';

export default function Page404() {
    return (
        <div className={styles.error}>
            <div className={styles.container}>
                <div className={styles.clip}>
                    <div className={styles.shadow}>
                        <span className={cx(styles.digit, styles.thirdDigit)}>4</span>
                    </div>
                </div>
                <div className={styles.clip}>
                    <div className={styles.shadow}>
                        <span className={cx(styles.digit, styles.secondDigit)}>0</span>
                    </div>
                </div>
                <div className={styles.clip}>
                    <div className={styles.shadow}>
                        <span className={cx(styles.digit, styles.firstDigit)}>4</span>
                    </div>
                </div>
                <div className={styles.msg}>OH!<span className={styles.triangle}></span></div>
            </div>
            <h2>Sorry! Page not found</h2>
        </div>
    );
}

