import * as React from 'react';
import * as marked from 'marked';
import { IBjjClass, IBjjPageFilters } from '~/bjj/models';
import { formatDate } from '~/bjj/components/graphs';
import DataGrid, { DataGridRow, DataGridCell } from '~/shared/components/data-grid';
import * as pageStyles from './graphs/Graphs.scss';
import * as styles from './ClassList.scss';
import * as InfiniteScroll from 'react-infinite-scroller';
import Search from '~/bjj/components/Icons/Search';

const listIncrement = 30;

interface IClassListProps {
    classes: IBjjClass[];
    filter(filters: IBjjPageFilters): void;
    filters: IBjjPageFilters;
}

interface IClassListState {
    showNumItems: number;
}

export default class ClassList extends React.PureComponent<IClassListProps, IClassListState> {
    constructor(props: IClassListProps) {
        super(props);
        this.state = {
            showNumItems: listIncrement
        };
    }

    componentWillReceiveProps(nextProps: IClassListProps) {
        if (nextProps.filters.query.toLowerCase() !== this.props.filters.query.toLowerCase() &&
        this.state.showNumItems > listIncrement)
            this.setState({showNumItems: listIncrement});
    }

    render() {
        const { classes, filters: { query }} = this.props;
        const { showNumItems } = this.state;
        return (
            <div className={pageStyles.root}>
                <h2>Classes</h2>
                <div className={styles.search}>
                    <Search />
                    <input
                        type='text'
                        value={query}
                        onChange={this.onQueryChange}
                        placeholder='Search for classes'
                        data-test-class='search-bar' />
                </div>
                <InfiniteScroll hasMore={showNumItems < classes.length} loadMore={this.showMoreItems}>
                    <DataGrid expandableContentLabel='Detailed Notes'>
                        <DataGridRow isHeader={true}>
                            <DataGridCell widthWeighting={2} hideOnPivot>When</DataGridCell>
                            <DataGridCell widthWeighting={2}>Name</DataGridCell>
                            <DataGridCell>Duration</DataGridCell>
                            <DataGridCell>Taught By</DataGridCell>
                            <DataGridCell widthWeighting={5}>Notes</DataGridCell>
                        </DataGridRow>
                        {classes.slice(0, showNumItems).map((c, i) => (
                            <DataGridRow
                                key={i}
                                pivotLabel={formatDate(c.start)}
                                expandableContent={this.renderNotes(c.notes)}>
                                <DataGridCell label='When' widthWeighting={2} hideOnPivot>
                                    {formatDate(c.start)}
                                </DataGridCell>
                                <DataGridCell label='Name' widthWeighting={2}>{c.title}</DataGridCell>
                                <DataGridCell label='Duration'>{c.durationHours}hrs</DataGridCell>
                                <DataGridCell label='Taught By'>{c.taughtBy}</DataGridCell>
                                <DataGridCell widthWeighting={5}>{c.notesTldr}</DataGridCell>
                            </DataGridRow>
                        ))}
                    </DataGrid>
                </InfiniteScroll>
            </div>
        );
    }

    renderNotes(str: string) {
        let rawMarkup: any;
        if (str != null && str.trim() !== '')
            rawMarkup = marked(str, {sanitize: true});
        else
            rawMarkup = marked('No notes', {sanitize: true});
        return (
            <div className={styles.notesCell}>
                <div className={styles.notes} dangerouslySetInnerHTML={{ __html: rawMarkup }} />
            </div>
        );
    }

    showMoreItems = () => this.setState(({showNumItems}) => ({showNumItems: showNumItems + listIncrement}));

    onQueryChange = (event: React.FormEvent<HTMLInputElement>) => this.props.filter({query: event.currentTarget.value});
}
