import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getLineAndPieOptions } from '.';
import * as styles from './Graphs.scss';
import { IDictionary, IDataPoint } from '~/bjj/models';

interface IInstructorBreakdownProps {
    stats: IDictionary<IDataPoint[]>;
}

export default class InstructorBreakdown extends React.PureComponent<IInstructorBreakdownProps> {
    render() {
        const { stats } = this.props;
        const entries = Object.entries(stats);
        const totalHours = entries.map(e => [e[0], e[1][e[1].length - 1]] as [string, IDataPoint]);
        const pieData = totalHours.map(e => ({
            name: e[0],
            y: e[1].y
        }));
        const lineSeries = entries.map(e => ({
            name: e[0],
            data: e[1],
            type: 'line'
        }));
        const { lineOptions, pieOptions, mobilePieOptions } = getLineAndPieOptions(pieData, lineSeries);
        return (
            <div className={styles.root}>
                <h2>Instructors</h2>
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

