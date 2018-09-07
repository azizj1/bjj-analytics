import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjStats } from '~/bjj/models';
import { IState } from '~/shared/rootReducer';
import { getBjjStats } from '~/bjj/actions/getStats';
import { connect } from 'react-redux';
import PulseLoader from '~/shared/components/loaders/PulseLoader';
import Alert from '~/shared/components/Alert';
import SideMenu from '~/shared/components/SideMenu';
import * as cx from 'classnames';
import * as styles from './BjjPage.scss';

const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3]
    }],
    credits: {
        enabled: false
    }
};

interface IBjjPageStateProps {
    stats: IBjjStats;
    loading: boolean;
    errorMessage: string;
    hasError: boolean;
}

interface IBjjPageDispatchProps {
    getBjjStats(): void;
}

type IBjjPageProps = IBjjPageStateProps & IBjjPageDispatchProps;

function mapStateToProps(state: IState): IBjjPageStateProps {
    const { stats, loading, error } = state.bjj;
    const { message, hasError } = error;
    return { stats, loading, hasError, errorMessage: message };
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
        const { loading, hasError } = this.props;
        const { menuVisible } = this.state;
        if (loading)
            return this.loader();
        if (hasError)
            return this.error();
        return (
            <div className={cx(styles.root, {[styles.active]: menuVisible})}>
                <SideMenu menuVisible={menuVisible} toggleVisibility={this.toggleMenu} />
                <div onClick={this.toggleMenu}>
                    {this.header()}
                    <div className={styles.content}>
                        <h2>Breakdown</h2>
                        <HighchartsReact highcharts={Highcharts} options={options}/>
                    </div>
                </div>
            </div>
        );
    }

    header() {
        return (
            <div className={styles.header}>
                <h1>Jiu-Jitsu Analysis</h1>
                <h2>My journey so far</h2>
            </div>
        );
    }

    loader() {
        return (
            <div className={styles.root}>
                {this.header()}
                <div className={styles.loader}><PulseLoader /></div>
            </div>
        );
    }

    error() {
        const { errorMessage } = this.props;
        return (
            <div className={styles.root}>
                {this.header()}
                <Alert type='danger' message={errorMessage} />
            </div>
        );
    }

    toggleMenu = () => {
        console.log(`toggling.. currently at ${this.state.menuVisible}`);
        this.setState(({menuVisible}) => ({menuVisible: !menuVisible}));
    }
}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
