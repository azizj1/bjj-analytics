import * as React from 'react';
import { IBjjClass } from '~/bjj/models';
import { TableHead, TableRow, TableCell, Table, TableBody, Paper } from '@material-ui/core';
import * as styles from './graphs/Graphs.scss';
import { formatDate } from '~/bjj/components/graphs';

export default function ClassList({classes}: {classes: IBjjClass[]}) {
    (window as any).classes = classes;
    return (
        <div className={styles.root}>
        <h2>Classes</h2>
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>When</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Taught By</TableCell>
                        <TableCell>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classes.filter(c => !c.isAllDay).reverse().map((c, i) => (
                        <TableRow key={i}>
                            <TableCell component='th' scope='row'>
                                {formatDate(c.start)}
                            </TableCell>
                            <TableCell>{c.title}</TableCell>
                            <TableCell>{c.durationHours}hrs</TableCell>
                            <TableCell>{c.notes && c.notes.split('\n').find(n => n !== '')}</TableCell>
                            <TableCell className={styles.notes}>
                                {getNotes(c.notes).map((n, j) => <p key={`${i}-n${j}`}>{n}</p>)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
        </div>
    );
}

function getNotes(str: string) {
    if (str == null)
        return [];
    const teacherAndNotes = str.split('\n');
    return teacherAndNotes.slice(teacherAndNotes.findIndex(n => n !== '') + 1).join('\n').trim().split('\n');
}
