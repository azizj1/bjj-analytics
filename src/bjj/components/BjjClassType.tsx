import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IBjjClassTypeSeries } from '~/bjj/models';
import * as styles from './Graphs.scss';
import { baseOptions, tooltipFormatter, mobileWidth } from '~/bjj/components';

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
    }];
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
    }, {
        id: 'pie',
        name: 'All-time',
        type: 'pie',
        data: pieData,
        center: [50, 60],
        size: 100,
        showInLegend: false,
        dataLabels: {
            enabled: false
        },
        visible: false
    }];
    const lineOptions = {
        ...baseOptions,
        series: lineSeries,
        tooltip: {
            formatter: tooltipFormatter
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: mobileWidth
                },
                chartOptions: {
                    series: [{
                            id: 'pie',
                            visible: true
                        }]
                }
            }, {
                condition: {
                    minWidth: mobileWidth + 1
                },
                chartOptions: {
                    series: [{
                            id: 'pie',
                            visible: false
                        }]
                }
            }]
        } as any
    } as Highcharts.Options;
    const pieOptions = {
        ...baseOptions,
        chart: { type: 'pie' },
        series: [{
            data: pieData
        }]
    };
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
            </div>
        </div>
    );
}
