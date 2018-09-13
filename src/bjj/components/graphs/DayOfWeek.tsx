import * as React from 'react';
import { IDaysOfWeekAgg } from '~/bjj/models';
import { baseOptions } from '~/bjj/components/graphs';
import HighchartsReact from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import * as styles from './Graphs.scss';
import { days } from '~/bjj/selectors/getDayOfWeekAgg';

interface IDayOfWeekProps {
    stats: IDaysOfWeekAgg;
}

const colors = [
    '#e67e22',
    '#9b59b6',
    '#34495e'
];


export default class DayOfWeek extends React.PureComponent<IDayOfWeekProps> {
    render() {
        const { stats } = this.props;
        const options = {
            ...baseOptions,
            chart: {
                type: 'column'
            },
            xAxis: {
                type: undefined,
                categories: days
            },
            yAxis: {
                title: {
                    text: 'Hours'
                },
                stackLabels: {
                    enabled: true,
                    format: '{total}hrs'
                }
            },
            tooltip: {
                valueSuffix: 'hrs',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Morning',
                data: stats.morning.map(s => s.y),
                color: colors[0]
            }, {
                name: 'Afternoon',
                data: stats.afternoon.map(s => s.y),
                color: colors[1]
            }, {
                name: 'Evening',
                data: stats.evening.map(s => s.y),
                color: colors[2]
            }]
        } as Highcharts.Options;
        return (
            <div className={styles.root}>
                <h2>Day of Week</h2>
                <div className={styles.graphs}>
                    <div className={styles.lineFull}>
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                </div>
            </div>
        );
    }
}
