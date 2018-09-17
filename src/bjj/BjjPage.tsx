import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IBjjStats,
    IBjjClassTypeSeries,
    IBjjClassTimeSeries,
    IWeeklyHourPoint,
    IDaysOfWeekAgg,
    BjjBelt,
    BjjPageSectionType,
    IBjjPageSection
} from '~/bjj/models';
import { IState } from '~/shared/rootReducer';
import { getBjjStats } from '~/bjj/actions/getStats';
import { connect } from 'react-redux';
import PulseLoader from '~/shared/components/loaders/PulseLoader';
import Alert from '~/shared/components/Alert';
import SideMenu from '~/shared/components/SideMenu';
import getClassTypesSeries from '~/bjj/selectors/getClassTypesSeries';
import BjjClassType from '~/bjj/components/graphs/BjjClassType';
import getClassTimeSeries from '~/bjj/selectors/getClassTimeSeries';
import BjjClassTimes from '~/bjj/components/graphs/BjjClassTimes';
import getWeeklyHours from '~/bjj/selectors/getWeeklyHours';
import getWeeklyHoursSma from '~/bjj/selectors/getWeeklyHoursSma';
import Overview from '~/bjj/components/Overview';
import Promotions from '~/bjj/components/Promotions';
import getDayOfWeekAgg from '~/bjj/selectors/getDayOfWeekAgg';
import DayOfWeek from '~/bjj/components/graphs/DayOfWeek';
import WeeklyHours from '~/bjj/components/graphs/WeeklyHours';
import Footer from '~/shared/components/Footer';
import * as cx from 'classnames';
import * as styles from './BjjPage.scss';
import ClassList from '~/bjj/components/ClassList';

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

const initialPageSectionsState: IBjjPageSection[] = [{
    type: BjjPageSectionType.Header
}, {
    type: BjjPageSectionType.Overview,
    selected: true
}, {
    type: BjjPageSectionType.WeeklyHours,
    name: 'Weekly Hours'
}, {
    type: BjjPageSectionType.Promotions
}, {
    type: BjjPageSectionType.ClassType,
    name: 'Gi vs. NoGi',
    divider: true
}, {
    type: BjjPageSectionType.ClassTime,
    name: 'Time of Day'
}, {
    type: BjjPageSectionType.DayOfWeek,
    name: 'Day of Week',
    divider: true
}];

interface IBjjPageState {
    menuVisible: boolean; // only relevant for mobile
    sections: IBjjPageSection[];
}

export class BjjPage extends React.PureComponent<IBjjPageProps, IBjjPageState> {
    private headerRef: React.RefObject<HTMLDivElement>;
    private overviewRef: React.RefObject<Overview>;
    private promotionRef: React.RefObject<Promotions>;
    private weeklyHoursRef: React.RefObject<WeeklyHours>;
    private classTypeRef: React.RefObject<BjjClassType>;
    private classTimeRef: React.RefObject<BjjClassTimes>;
    private dayOfWeekRef: React.RefObject<DayOfWeek>;

    constructor(props: IBjjPageProps) {
        super(props);
        this.state = {
            menuVisible: false,
            sections: initialPageSectionsState
        };
        this.headerRef = React.createRef();
        this.overviewRef = React.createRef();
        this.weeklyHoursRef = React.createRef();
        this.promotionRef = React.createRef();
        this.classTypeRef = React.createRef();
        this.classTimeRef = React.createRef();
        this.dayOfWeekRef = React.createRef();
    }
    componentWillMount() {
        this.props.getBjjStats();
    }

    render() {
        const { loading, hasError, errorMessage } = this.props;
        const { menuVisible, sections } = this.state;
        return (
            <div className={cx(styles.root, {[styles.active]: menuVisible})}>
                <SideMenu {...{menuVisible, sections}} scrollTo={this.scrollTo} toggleVisibility={this.toggleMenu} />
                <div onClick={this.handleContentClick}>
                    <div className={styles.header} ref={this.headerRef}>
                        <h1>Jiu-Jitsu Analysis</h1>
                        <h2>{this.currentRank()}</h2>
                    </div>
                    <div className={styles.content}>
                        {loading && <div className={styles.loader}><PulseLoader /></div>}
                        {hasError && <Alert type='danger' message={errorMessage} className={styles.error} />}
                        {!loading && !hasError && this.renderGraphs()}
                        {!loading && !hasError && this.renderTable()}
                        {!loading && !hasError && <Footer />}
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
            <Overview key='0'{...{stats}} ref={this.overviewRef} />,
            <WeeklyHours key='1' stats={weeklyHours} statsSma={weeklyHoursSma} ref={this.weeklyHoursRef} />,
            <Promotions promotions={promotions} key='2' ref={this.promotionRef} />,
            <BjjClassType
                key='3'
                stats={bjjClassTypeSeries}
                totalGiHours={giHours}
                totalNoGiHours={noGiHours}
                ref={this.classTypeRef} />,
            <BjjClassTimes
                key='4'
                stats={bjjClassTimeSeries}
                totalMorningHours={morningHours}
                totalAfternoonHours={afternoonHours}
                totalEveningHours={eveningHours}
                ref={this.classTimeRef} />,
            <DayOfWeek key='5' stats={dayOfWeekAgg} ref={this.dayOfWeekRef} />
        ];
    }

    renderTable() {
        if (this.props.stats == null) return null;
        const { stats: { classes }} = this.props;
        return <ClassList {...{classes}} />;
    }

    toggleMenu = () => this.setState(({menuVisible}) => ({menuVisible: !menuVisible}));

    handleContentClick = () => this.state.menuVisible && this.toggleMenu();

    currentRank() {
        if (this.props.stats == null)
            return '...';
        const { stats: { promotions }} = this.props;
        if (promotions.length <= 1)
            return 'White Belt';
        const last = promotions[promotions.length - 2];
        return `${BjjBelt[last.color]} Belt ${Array(last.stripes + 1).join('I')}`;
    }

    scrollTo = (section: BjjPageSectionType) => {
        switch (section) {
            case BjjPageSectionType.Header:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.headerRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.Overview:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.overviewRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.WeeklyHours:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.weeklyHoursRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.Promotions:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.promotionRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.ClassType:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.classTypeRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.ClassTime:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.classTimeRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.DayOfWeek:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.dayOfWeekRef.current) as any).offsetTop - 50);
                break;
        }
    }
}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
