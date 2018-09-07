import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './SideMenu.scss';

interface ISideMenuProps {
    menuVisible: boolean;
    toggleVisibility(): void;
}
export default class SideMenu extends React.PureComponent<ISideMenuProps> {
    render() {
        const { menuVisible, toggleVisibility } = this.props;
        return [
            <a
                href='#'
                className={cx(styles.menuLink, {[styles.active]: menuVisible})}
                key='1'
                onClick={toggleVisibility}>
                <span></span>
            </a>,
            <div key='2' className={cx(styles.menu, {[styles.active]: menuVisible})}>
                <div className='pure-menu'>
                    <a className='pure-menu-heading' href='#'>Jiu-Jitsu</a>

                    <ul className='pure-menu-list'>
                        <li className='pure-menu-item'><a href='#' className='pure-menu-link'>Overview</a></li>
                        <li className='pure-menu-item'><a href='#' className='pure-menu-link'>Promotions</a></li>
                        <li className='pure-menu-item'>
                            <a href='#' className='pure-menu-link menu-item-divided'>Time Series</a>
                        </li>

                        <li className='pure-menu-item pure-menu-selected'>
                            <a href='#' className='pure-menu-link'>Gi vs. NoGi</a>
                        </li>
                        <li className='pure-menu-item'><a href='#' className='pure-menu-link'>Time of day</a></li>
                        <li className='pure-menu-item'><a href='#' className='pure-menu-link'>Type of class</a></li>
                        <li className='pure-menu-item'>
                            <a href='#' className='pure-menu-link menu-item-divided'>Day of week</a>
                        </li>
                    </ul>
                </div>
            </div>
        ];
    }
}
