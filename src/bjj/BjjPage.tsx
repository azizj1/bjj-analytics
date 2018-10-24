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
    IBjjPageSection,
    IBjjClass,
    IBjjPageFilters,
    IDataPoint,
    IDictionary
} from '~/bjj/models';
import {
    getClasses,
    getClassTypesSeries,
    getClassTimeSeries,
    getWeeklyHours,
    getWeeklyHoursSma,
    getDayOfWeekAgg,
    getInstructorsBreakdown
} from '~/bjj/selectors';
import { IState } from '~/shared/rootReducer';
import { getBjjStats } from '~/bjj/actions/getStats';
import { filter } from '~/bjj/actions/filter';
import { connect } from 'react-redux';
import PulseLoader from '~/shared/components/loaders/PulseLoader';
import Alert from '~/shared/components/Alert';
import SideMenu from '~/shared/components/SideMenu';
import BjjClassType from '~/bjj/components/graphs/BjjClassType';
import BjjClassTimes from '~/bjj/components/graphs/BjjClassTimes';
import Overview from '~/bjj/components/Overview';
import Promotions from '~/bjj/components/Promotions';
import DayOfWeek from '~/bjj/components/graphs/DayOfWeek';
import WeeklyHours from '~/bjj/components/graphs/WeeklyHours';
import Footer from '~/shared/components/Footer';
import ClassList from '~/bjj/components/ClassList';
import InstructorBreakdown from '~/bjj/components/graphs/InstructorBreakdown';
import * as cx from 'classnames';
import * as styles from './BjjPage.scss';

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
    instructorsBreakdown: IDictionary<IDataPoint[]>;
    classes: IBjjClass[];
    filters: IBjjPageFilters;
}

interface IBjjPageDispatchProps {
    getBjjStats(): void;
    filter(filters: IBjjPageFilters): void;
}

type IBjjPageProps = IBjjPageStateProps & IBjjPageDispatchProps;

function mapStateToProps(state: IState): IBjjPageStateProps {
    const { stats, loading, error, filters } = state.bjj;
    const { message, hasError } = error;
    const bjjClassTypeSeries = getClassTypesSeries(state);
    const bjjClassTimeSeries = getClassTimeSeries(state);
    const weeklyHours = getWeeklyHours(state);
    const weeklyHoursSma = getWeeklyHoursSma(state);
    const dayOfWeekAgg = getDayOfWeekAgg(state);
    const classes = getClasses(state);
    const instructorsBreakdown = getInstructorsBreakdown(state);
    return {
        stats, loading, hasError, bjjClassTypeSeries, bjjClassTimeSeries, weeklyHours, classes, filters,
        weeklyHoursSma, dayOfWeekAgg, instructorsBreakdown, errorMessage: message
    };
}

const mapDispatchToProps = {
    getBjjStats,
    filter
};

const initialPageSectionsState: IBjjPageSection[] = [{
    type: BjjPageSectionType.Header
}, {
    type: BjjPageSectionType.Overview
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
    type: BjjPageSectionType.Instructors
}, {
    type: BjjPageSectionType.DayOfWeek,
    name: 'Day of Week',
    divider: true
}, {
    type: BjjPageSectionType.Classes
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
    private instructorsRef: React.RefObject<InstructorBreakdown>;
    private dayOfWeekRef: React.RefObject<DayOfWeek>;
    private classesRef: React.RefObject<ClassList>;

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
        this.classesRef = React.createRef();
        this.instructorsRef = React.createRef();
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
                        <h1>Jiu-Jitsu Journal</h1>
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
        const { loading, hasError } = this.props;
        if (loading || hasError) return null;
        const {
            bjjClassTypeSeries, bjjClassTimeSeries, weeklyHours, weeklyHoursSma, dayOfWeekAgg, instructorsBreakdown,
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
            <InstructorBreakdown key='5' stats={instructorsBreakdown} ref={this.instructorsRef} />,
            <DayOfWeek key='6' stats={dayOfWeekAgg} ref={this.dayOfWeekRef} />
        ];
    }

    renderTable() {
        const { loading, hasError } = this.props;
        if (loading || hasError) return null;
        const { classes, filters, filter } = this.props;
        return <ClassList {...{classes, filter, filters}} ref={this.classesRef} />;
    }

    toggleMenu = () => this.setState(({menuVisible}) => ({menuVisible: !menuVisible}));

    handleContentClick = () => this.state.menuVisible && this.toggleMenu();

    currentRank() {
        const { loading, hasError } = this.props;
        if (loading || hasError)
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
            case BjjPageSectionType.Classes:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.classesRef.current) as any).offsetTop - 50);
                break;
            case BjjPageSectionType.Instructors:
                window.scrollTo(0, (ReactDOM.findDOMNode(this.instructorsRef.current) as any).offsetTop - 50);
                break;
        }
    }
}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
