import * as React from 'react';
import Transition from 'react-transition-group/Transition';
import * as cx from 'classnames';
import * as styles from './CollapsibleElement.scss';

interface ICollapsibleElementProps {
    collapsed: boolean;
    className?: string;
    element?: string;
}

export default class CollapsibleElement extends React.PureComponent<ICollapsibleElementProps> {
    private openHeight: number;

    public static defaultProps: Partial<ICollapsibleElementProps> = {
        element: 'div'
    };

    render() {
        const { collapsed, element, className, ...elementProps } = this.props;
        const elementClassName = cx(
            styles.root,
            collapsed ? styles.collapsed : styles.expanded,
            className
        );
        return (
            <Transition
                in={!collapsed}
                timeout={600}
                onEnter={this.handleEnter}
                onEntered={this.handleEntered}
                onEntering={this.handleEntering}
                onExit={this.handleExit}
                onExited={this.handleExited}
                onExiting={this.handleExiting}>
                {React.createElement(element, {
                    ...elementProps,
                    className: elementClassName
                })}
            </Transition>
        );
    }

    handleEnter = (node: any) => {
        node.style.overflow = 'hidden';
        this.openHeight = node.clientHeight; // Calculate the absolute equivalent of `auto`. This triggers a repaint
        node.style.height = '0';
        // tslint:disable-next-line:no-unused-expression
        node.clientHeight; // Force repaint at 0
    }

    handleEntering = (node: any) => {
        node.style.height = this.openHeight + 'px';
    }

    handleEntered = (node: any) => {
        node.style.height = '';
        node.style.overflow = '';
    }

    handleExit = (node: any) => {
        node.style.height = 'auto';
        node.style.height = node.clientHeight + 'px'; // Calculate the absolute equivalent of `auto`
        // tslint:disable-next-line:no-unused-expression
        node.clientHeight; // Force repaint at the new absolute height value
    }

    handleExiting = (node: any) => {
        node.style.height = '0';
    }

    handleExited = (node: any) => {
        node.style.height = '';
    }
}
