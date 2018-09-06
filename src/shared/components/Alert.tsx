import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './Alert.scss';

interface IAlertProps {
    type: 'default' | 'success' | 'info' | 'warning' | 'danger' | 'mini-danger';
    message: string;
    onDismiss?: () => void;
    className?: string;
}

export default function Alert({type, message, onDismiss, className}: IAlertProps) {
    return (
        <div className={cx(styles.alert, styles[`alert-${type}`], className)}>
            { message }
            { onDismiss && <span className={styles.dismiss} onClick={onDismiss}>Dismiss</span> }
        </div>
    );
}
