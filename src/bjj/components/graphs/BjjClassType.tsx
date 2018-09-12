import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTypeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';
import { getLineAndPieOptions } from '~/bjj/components/graphs';

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
    const pieData = [{
        name: 'Gi',
        y: totalGiHours,
        color: colors[0]
    }, {
        name: 'NoGi',
        y: totalNoGiHours,
        color: colors[1]
    }] as Array<Highcharts.DataPoint>;

    const lineSeries =  [{
        id: 'gi',
        name: 'Gi',
        color: colors[0],
        data: gi,
        type: 'line'
    }, {
        id: 'noGi',
        name: 'NoGi',
        color: colors[1],
        data: noGi,
        type: 'line'
    }] as Highcharts.IndividualSeriesOptions[];
    const { lineOptions, pieOptions, mobilePieOptions } = getLineAndPieOptions(pieData, lineSeries);
    return (
        <div className={styles.root}>
            <h2>Gi vs. NoGi</h2>
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
