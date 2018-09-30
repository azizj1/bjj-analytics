import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './DataGrid.scss';

interface IDataGridCellProps extends React.HTMLProps<HTMLDivElement> {
    alignment?: 'left' | 'center' | 'right'; // potentially remove
    hideOnPivot?: boolean;
    label?: string;
    widthWeighting?: number;
}

export class DataGridCell extends React.PureComponent<IDataGridCellProps> {
    public static defaultProps: Partial<IDataGridCellProps> = {
        widthWeighting: 1
    };

    render() {
        const {
            alignment,
            children,
            className,
            hideOnPivot,
            label,
            widthWeighting,
            ...rest
        } = this.props;

        const classes = cx(
            styles.cell,
            className,
            hideOnPivot && styles.hideOnPivot,
            alignment && styles[alignment]
        );

        return (
            <div
                className={classes}
                style={{
                    flexGrow: widthWeighting,
                    msFlexPositive: widthWeighting
                }}
                {...rest}>
                {label && <div className={styles.cellLabel}>{label}</div>}
                <div className={styles.cellContent}>{children}</div>
            </div>
        );
    }
}
