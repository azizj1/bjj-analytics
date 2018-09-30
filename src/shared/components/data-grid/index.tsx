import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './DataGrid.scss';

export { DataGridRow } from './DataGridRow';
export { DataGridCell } from './DataGridCell';

interface IDataGridProps extends React.HTMLProps<HTMLDivElement> {
    expandableContentLabel?: string;
    linkLabel?: string;
}

export interface IDataGridContext {
    expandableContentLabel: string;
    linkLabel: string;
}

export const DataGridContext = React.createContext<IDataGridContext>({expandableContentLabel: '', linkLabel: ''});

export default class DataGrid extends React.PureComponent<IDataGridProps> {
    render() {
        const {
            children,
            className,
            expandableContentLabel,
            linkLabel,
            ...rest
        } = this.props;

        const classes = cx(
            'c-data-grid',
            className,
            expandableContentLabel != null && styles.hasExpandableContent,
            linkLabel != null && styles.hasLinks
        );

        return (
            <div className={classes} {...rest}>
                <DataGridContext.Provider value={{expandableContentLabel, linkLabel}}>
                    {children}
                </DataGridContext.Provider>
            </div>
        );
    }
}
