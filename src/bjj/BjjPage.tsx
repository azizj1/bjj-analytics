import * as React from 'react';
import { IBjjStats, IBjjClassTypeSeries, IBjjClassTimeSeries, IWeeklyHourPoint, IDaysOfWeekAgg } from '~/bjj/models';
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
import getClassTimeSeries from '~/bjj/selectors/getClassTimeSeries';
import BjjClassTimes from '~/bjj/components/BjjClassTimes';
import getWeeklyHours from '~/bjj/selectors/getWeeklyHours';
import getWeeklyHoursSma from '~/bjj/selectors/getWeeklyHoursSma';
import Overview from '~/bjj/components/Overview';
import Promotions from '~/bjj/components/Promotions';
import getDayOfWeekAgg from '~/bjj/selectors/getDayOfWeekAgg';
import DayOfWeek from '~/bjj/components/DayOfWeek';

interface IBjjPageStateProps {
    stats: IBjjStats;
    loading: boolean;
    errorMessage: string;
    hasError: boolean;
    bjjClassTypeSeries: IBjjClassTypeSeries;
    bjjClassTimeSeries: IBjjClassTimeSeries;
    weeklyHours: IWeeklyHourPoint[];
    weeklyHoursSma: IWeeklyHourPoint[];
    dayOfWeekAgg: IDaysOfWeekAgg;
}

interface IBjjPageDispatchProps {
    getBjjStats(): void;
}

type IBjjPageProps = IBjjPageStateProps & IBjjPageDispatchProps;

function mapStateToProps(state: IState): IBjjPageStateProps {
    const { stats, loading, error } = state.bjj;
    const { message, hasError } = error;
    const bjjClassTypeSeries = getClassTypesSeries(state);
    const bjjClassTimeSeries = getClassTimeSeries(state);
    const weeklyHours = getWeeklyHours(state);
    const weeklyHoursSma = getWeeklyHoursSma(state);
    const dayOfWeekAgg = getDayOfWeekAgg(state);
    return {
        stats, loading, hasError, bjjClassTypeSeries, bjjClassTimeSeries, weeklyHours,
        weeklyHoursSma, dayOfWeekAgg, errorMessage: message
    };
}

const mapDispatchToProps = {
    getBjjStats
};

interface IBjjPageState {
    menuVisible: boolean; // only relevant for mobile
}

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
        const { loading, hasError, errorMessage, stats } = this.props;
        const { menuVisible } = this.state;
        const trainingDuration = stats == null ? '...' : stats.trainingDuration;
        return (
            <div className={cx(styles.root, {[styles.active]: menuVisible})}>
                <SideMenu menuVisible={menuVisible} toggleVisibility={this.toggleMenu} />
                <div onClick={this.handleContentClick}>
                    <div className={styles.header}>
                        <h1>Jiu-Jitsu Analysis</h1>
                        <h2>For the past {trainingDuration}</h2>
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
        const {
            bjjClassTypeSeries,
            bjjClassTimeSeries,
            weeklyHours,
            weeklyHoursSma,
            dayOfWeekAgg,
            stats
        } = this.props;
        const {
            typeBreakdown: {giHours, noGiHours},
            timeBreakdown: {morningHours, afternoonHours, eveningHours},
            promotions
        } = stats;
        return [
            <Overview key='0'{...{stats, weeklyHours, weeklyHoursSma}} />,
            <Promotions promotions={promotions} key='1' />,
            <BjjClassType
                key='2'
                stats={bjjClassTypeSeries}
                totalGiHours={giHours}
                totalNoGiHours={noGiHours} />,
            <BjjClassTimes
                key='3'
                stats={bjjClassTimeSeries}
                totalMorningHours={morningHours}
                totalAfternoonHours={afternoonHours}
                totalEveningHours={eveningHours} />,
            <DayOfWeek key='4' stats={dayOfWeekAgg} />
        ];
    }

    toggleMenu = () => this.setState(({menuVisible}) => ({menuVisible: !menuVisible}));

    handleContentClick = () => this.state.menuVisible && this.toggleMenu();

}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
