import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTimeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';
import { getLineAndPieOptions } from '~/bjj/components/graphs';

interface IBjjClassTimesProps {
    stats: IBjjClassTimeSeries;
    totalMorningHours: number;
    totalAfternoonHours: number;
    totalEveningHours: number;
}

const colors = [
    '#e67e22',
    '#9b59b6',
    '#34495e'
];

export default class BjjClassTimes extends React.PureComponent<IBjjClassTimesProps> {
    render() {
        const {
            stats: { morning, afternoon, evening },
            totalMorningHours,
            totalAfternoonHours,
            totalEveningHours
        } = this.props;
        const pieData = [{
            name: 'Morning',
            y: totalMorningHours,
            color: colors[0]
        }, {
            name: 'Afternoon',
            y: totalAfternoonHours,
            color: colors[1]
        }, {
            name: 'Evening',
            y: totalEveningHours,
            color: colors[2]
        }];

        const lineSeries = [{
            name: 'Morning',
            color: colors[0],
            data: morning,
            type: 'line'
        }, {
            name: 'Afternoon',
            color: colors[1],
            data: afternoon,
            type: 'line'
        }, {
            name: 'Evening',
            color: colors[2],
            data: evening,
            type: 'line'
        }];

        const { lineOptions, pieOptions, mobilePieOptions } = getLineAndPieOptions(pieData, lineSeries);

        return (
            <div className={styles.root}>
                <h2>Time of day</h2>
                <div className={styles.graphs}>
                    <div className={styles.line}>
                        <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                    </div>
                    <div className={styles.pie}>
                        <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                    </div>
                    <div className={styles.mobileLinePie}>
                        <HighchartsReact highcharts={Highcharts} options={mobilePieOptions} />
                    </div>
                </div>
            </div>
        );
    }
}
