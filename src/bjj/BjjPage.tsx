import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjStats } from '~/bjj/models';
import { IState } from '~/shared/rootReducer';
import { getBjjStats } from '~/bjj/actions/getStats';
import { connect } from 'react-redux';
import * as styles from './BjjPage.scss';
import PulseLoader from '~/shared/components/loaders/PulseLoader';
import Alert from '~/shared/components/Alert';

const options = {
    title: {
      text: 'My chart'
    },
    series: [{
      data: [1, 2, 3]
    }]
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

export class BjjPage extends React.PureComponent<IBjjPageProps> {
    componentWillMount() {
        this.props.getBjjStats();
    }

    render() {
        const { loading, hasError } = this.props;
        if (loading)
            return this.loader();
        if (hasError)
            return this.error();
        return (
            <div className={styles.root}>
                {this.header()}
                <h2>Breakdown</h2>
                <div>

                </div>
                <HighchartsReact highcharts={Highcharts} options={options}/>
                <div>{loading}</div>
            </div>
        );
    }

    header() {
        return (
            <div className={styles.header}>
                <h1>Jiu-Jitsu Analysis</h1>
                <span>My journey so far</span>
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
}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
