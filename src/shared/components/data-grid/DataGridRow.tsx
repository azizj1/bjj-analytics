import * as React from 'react';
import { DataGridContext } from './';
import CollapsibleElement from './CollapsibleElement';
import * as cx from 'classnames';
import * as styles from './DataGrid.scss';
import ShowMore from '~/shared/components/data-grid/ShowMore';
import NavigationNext from '~/shared/components/data-grid/NavigationNext';

interface IDataGridRowProps extends React.HTMLProps <HTMLDivElement> {
    expandableContent?: React.ReactNode;
    href?: string;
    isHeader?: boolean;
    pivotLabel?: string;
    onExpand?(): void;
}

interface IDataGridRowState {
    isOpen: boolean;
}

export class DataGridRow extends React.PureComponent <IDataGridRowProps, IDataGridRowState> {
    constructor(props: IDataGridRowProps) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    render() {
        const {
            children,
            className,
            href,
            isHeader,
            expandableContent,
            pivotLabel,
            ...divProps
        } = this.props;
        delete divProps.onExpand;

        const classes = cx(
            styles.row,
            className,
            expandableContent && styles.isExpandable,
            href && styles.hasLink,
            this.state.isOpen && styles.isOpen,
            isHeader && styles.isHeader
        );

        return (
            <DataGridContext.Consumer>
                {({expandableContentLabel, linkLabel}) => (
                    <div className={classes} {...divProps}>
                        <div className={styles.mainRow}>
                            {pivotLabel && <div className={styles.pivotLabel}>{pivotLabel}</div>}
                            {children}
                            {expandableContent &&
                                expandableContentLabel && (
                                    <div
                                        className={styles.expandableContentButton}
                                        onClick={this.handleExpandClick}>
                                        <ShowMore size='1.25em' />
                                        <span className={styles.expandableContentLabel}>
                                            {expandableContentLabel}
                                        </span>
                                    </div>
                                )}
                            {href && linkLabel && (
                                    <a className={styles.link} href={href}>
                                        <span className={styles.linkLabel}>
                                            {linkLabel}
                                        </span>
                                        <NavigationNext size='1.25em' />
                                    </a>
                                )}
                        </div>
                        {this.renderExpandableContent()}
                    </div>
                )}
            </DataGridContext.Consumer>
        );
    }

    renderExpandableContent() {
		const { expandableContent } = this.props;
		const { isOpen } = this.state;
		return (
			<CollapsibleElement className={styles.subRow} collapsed={!isOpen}>
				<div>{expandableContent}</div>
			</CollapsibleElement>
		);
	}

	handleExpandClick = () => {
		if (!this.state.isOpen && this.props.onExpand) {
			this.props.onExpand();
		}

		if (this.props.expandableContent) {
			this.setState(state => ({
				isOpen: !state.isOpen
			}));
		}
	}
}
