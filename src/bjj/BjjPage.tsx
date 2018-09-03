import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjStats } from '~/bjj/models';
import { IState } from '~/shared/rootReducer';
import { getBjjStats } from '~/bjj/actions/getStats';
import { connect } from 'react-redux';

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
}

interface IBjjPageDispatchProps {
    getBjjStats(): void;
}

type IBjjPageProps = IBjjPageStateProps & IBjjPageDispatchProps;

function mapStateToProps(state: IState): IBjjPageStateProps {
    const { stats, loading } = state.bjj;
    return { stats, loading };
}

const mapDispatchToProps = {
    getBjjStats
};

export class BjjPage extends React.PureComponent<IBjjPageProps> {
    componentWillMount() {
        this.props.getBjjStats();
    }

    render() {
        const { stats, loading } = this.props;
        console.log(stats);
        return (
            <div>
                <HighchartsReact highcharts={Highcharts} options={options}/>
                <div>{loading}</div>
            </div>
        );
    }
}

export default connect<IBjjPageStateProps, IBjjPageDispatchProps, null>(mapStateToProps, mapDispatchToProps)(BjjPage);
