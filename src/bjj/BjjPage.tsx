import * as React from 'react';
import { IBjjStats, IBjjClassTypeSeries } from '~/bjj/models';
import { IState } from '~/shared/rootReducer';
import { getBjjStats } from '~/bjj/actions/getStats';
import { connect } from 'react-redux';
import PulseLoader from '~/shared/components/loaders/PulseLoader';
import Alert from '~/shared/components/Alert';
import SideMenu from '~/shared/components/SideMenu';
import * as cx from 'classnames';
import * as styles from './BjjPage.scss';
import getClassTypesSeries from '~/bjj/selectors/getClassTypesSeries';
import BjjClassType from '~/bjj/components/BjjClassType';

interface IBjjPageStateProps {
    stats: IBjjStats;
    loading: boolean;
    errorMessage: string;
    hasError: boolean;
    bjjClassTypeSeries: IBjjClassTypeSeries;
}

interface IBjjPageDispatchProps {
    getBjjStats(): void;
}

type IBjjPageProps = IBjjPageStateProps & IBjjPageDispatchProps;

function mapStateToProps(state: IState): IBjjPageStateProps {
    const { stats, loading, error } = state.bjj;
    const { message, hasError } = error;
    const bjjClassTypeSeries = getClassTypesSeries(state);
    return { stats, loading, hasError, bjjClassTypeSeries, errorMessage: message };
}

const mapDispatchToProps = {
    getBjjStats
};

interface IBjjPageState {
    menuVisible: boolean; // only relevant for mobile
}

const colors = [
    '#2ecc71',
    '#3498db'
];

export class BjjPage extends React.PureComponent<IBjjPageProps, IBjjPageState> {
    constructor(props: IBjjPageProps) {
        super(props);
        this.state = {
            menuVisible: false
        };
    }
    componentWillMount() {
        this.props.getBjjStats();
    }

    render() {
        const { loading, hasError, errorMessage } = this.props;
        const { menuVisible } = this.state;
        return (
            <div className={cx(styles.root, {[styles.active]: menuVisible})}>
                <SideMenu menuVisible={menuVisible} toggleVisibility={this.toggleMenu} />
                <div onClick={this.handleContentClick}>
                    <div className={styles.header}>
                        <h1>Jiu-Jitsu Analysis</h1>
                        <h2>My journey so far</h2>
                    </div>
                    <div className={styles.content}>
                        {loading && <div className={styles.loader}><PulseLoader /></div>}
                        {hasError && <Alert type='danger' message={errorMessage} className={styles.error} />}
                        {!loading && !hasError && this.renderGraphs()}
                    </div>
                </div>
            </div>
        );
    }

    renderGraphs() {
        if (this.props.stats == null) return null;
        const { bjjClassTypeSeries, stats: {typeBreakdown: {giHours, noGiHours}} } = this.props;
        return [
            <BjjClassType
                key='1'
                stats={bjjClassTypeSeries}
                totalGiHours={giHours}
                totalNoGiHours={noGiHours}
                colors={colors} />
        ];
    }

    toggleMenu = () => this.setState(({menuVisible}) => ({menuVisible: !menuVisible}));

    handleContentClick = () => this.state.menuVisible && this.toggleMenu();

}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
