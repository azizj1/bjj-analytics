import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTypeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';
import { baseOptions, lineTooltipFormatter } from '~/bjj/components';

interface IBjjClassTypeProps {
    stats: IBjjClassTypeSeries;
    totalGiHours: number;
    totalNoGiHours: number;
}

const colors = [
    '#2ecc71',
    '#3498db'
];

export default function BjjClassType({stats: {gi, noGi}, totalNoGiHours, totalGiHours}: IBjjClassTypeProps) {
    const lineOptions = {
        ...baseOptions,
        series: [{
            name: 'Gi',
            color: colors[0],
            data: gi
        }, {
            name: 'NoGi',
            color: colors[1],
            data: noGi
        }],
        tooltip: {
            formatter: lineTooltipFormatter
        }
    };
    const pieOptions = {
        ...baseOptions,
        chart: { type: 'pie' },
        series: [{
            data: [{
                name: 'Gi',
                y: totalGiHours,
                color: colors[0]
            }, {
                name: 'NoGi',
                y: totalNoGiHours,
                color: colors[1]
            }]
        }]
    };
    return (
        <div>
            <h2>Gi vs. NoGi</h2>
            <div className={styles.graphs}>
                <div className={styles.line}>
                    <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                </div>
                <div className={styles.pie}>
                    <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                </div>
            </div>
        </div>
    );
}
