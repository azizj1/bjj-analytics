import * as React from 'react';
import * as cx from 'classnames';
import * as styles from './SideMenu.scss';
import { BjjPageSectionType, IBjjPageSection } from '~/bjj/models';

interface ISideMenuProps {
    menuVisible: boolean;
    sections: IBjjPageSection[];
    toggleVisibility(): void;
    scrollTo(section: BjjPageSectionType): void;
}
export default class SideMenu extends React.PureComponent<ISideMenuProps> {
    render() {
        const { menuVisible, toggleVisibility, sections } = this.props;

        return [
            <a
                href='javascript:;'
                className={cx(styles.menuLink, {[styles.active]: menuVisible})}
                key='1'
                onClick={toggleVisibility}>
                <span></span>
            </a>,
            <div key='2' className={cx(styles.menu, {[styles.active]: menuVisible})}>
                <div className='pure-menu'>
                    <a
                        className='pure-menu-heading'
                        href='javascript:;'
                        onClick={this.handleScroll(BjjPageSectionType.Header)}>
                            Jiu-Jitsu
                    </a>
                    <ul className='pure-menu-list'>
                        {sections.filter((_, i) => i > 0).map(s => (
                            <li key={s.type} className={cx('pure-menu-item', {'pure-menu-selected': s.selected})}>
                                <a
                                    href='javascript:;'
                                    className={cx('pure-menu-link', {'menu-item-divided': s.divider})}
                                    onClick={this.handleScroll(s.type)}>
                                        {s.name || BjjPageSectionType[s.type]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ];
    }

    handleScroll = (section: BjjPageSectionType) => () => this.props.scrollTo(section);
}
