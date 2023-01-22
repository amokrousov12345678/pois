import React from "react";
import {Link} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

import Loading from "../../components/Loading";
import {createDataTypeFromColumn} from "../interfaces/DataTypeFactory";
import SortInfo from "../interfaces/SortInfo";
import Column from "../interfaces/Column";

interface ResourceLink {
    id: number;
    title: string;
}

interface RepositoryResponse {
    data: Object[];
    pageCount: number;
}

interface Props {
    columns: Column[];
    onLeftExtraControlsRender: (row: any) => React.ReactNode;
    onRightExtraControlsRender: (row: any) => React.ReactNode;
    onGetData: (pageNo: number, pageSize: number, sortBy: SortInfo) => Promise<RepositoryResponse>;
    timestamp: any;
    showRowCount: boolean;
}

interface State {
    pageNo: number;
    pageSize: number;
    pageCount: number;
    rowCount: number;
    loadedDataPage: Object[];
    sortBy: SortInfo;
}

class DbGrid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pageNo: 1,
            pageSize: props.pageSize ? props.pageSize : 1,
            pageCount: null,
            rowCount: null,
            loadedDataPage: null,
            sortBy: {columnKey: "id", isAsc: false},
        };
    }

    private loadDataPage = async (pageNo: number, pageSize: number, sortBy: SortInfo) => {
        const loadedData = await this.props.onGetData(pageNo, pageSize, sortBy);
        pageNo = Math.min(pageNo, loadedData.pageCount);
        if (loadedData.pageCount > 0 && pageNo === 0) {
            pageNo = 1;
        }
        this.setState({
            pageNo: pageNo,
            pageSize: pageSize,
            pageCount: loadedData.pageCount,
            rowCount: loadedData.rowCount,
            loadedDataPage: loadedData.data,
            sortBy: sortBy,
        });
    }

    componentDidUpdate(props: Props) {
        if (props.timestamp !== this.props.timestamp) {
            this.loadDataPage(this.state.pageNo, this.state.pageSize, this.state.sortBy);
        }
    }

    componentDidMount() {
        this.loadDataPage(this.state.pageNo, this.state.pageSize, this.state.sortBy);
    }

    private switchPage = (pageNo: number) => {
        this.loadDataPage(pageNo, this.state.pageSize, this.state.sortBy);
    }

    private switchSorting = (column: Column) => {
        if (!createDataTypeFromColumn(column).getSortable()) {
            return;
        }

        let newSortBy: SortInfo = Object.assign(this.state.sortBy);
        if (column.key != newSortBy.columnKey) {
            newSortBy.isAsc = true;
            newSortBy.columnKey = column.key;
        } else {
            newSortBy.isAsc = !newSortBy.isAsc;
        }

        const newPageNo = 1;
        this.loadDataPage(newPageNo, this.state.pageSize, newSortBy);
    }

    render() {
        if (!this.state.loadedDataPage) {
            return <Loading />
        }
        return (
        <>
            {this.props.showRowCount && <p>Всего записей: {this.state.rowCount}</p>}
            <Table striped bordered hover>
            <thead>
                <tr>
                <th key={"extrasLeft"}></th>
                {this.props.columns.map((column) => {
                    let sortIndicator = "";
                    if (this.state.sortBy.columnKey === column.key) {
                        if (this.state.sortBy.isAsc) {
                            sortIndicator = "△";
                        } else {
                            sortIndicator = "▽";
                        }
                    }
                    return <th key={column.key}
                        onClick={this.switchSorting.bind(this, column)}>{column.title} {sortIndicator}</th>
                })}
                <th key={"extrasRight"}></th>
                </tr>
            </thead>
            <tbody>
                {this.state.pageCount == 0 &&
                    <tr><td style={{textAlign: "center"}} colSpan={10000}>No data available</td></tr>}
                {this.state.loadedDataPage.map((row, rowNumber) => {
                    return <tr key={rowNumber}>
                    <td key={"extrasLeft"}>{this.props.onLeftExtraControlsRender(row)}</td>
                    {this.props.columns.map((column) => <td key={column.key}>{
                        createDataTypeFromColumn(column).renderInGrid(row[column.key])
                    }</td>)}
                    <td key={"extrasRight"}>{this.props.onRightExtraControlsRender(row)}</td>
                    </tr>
                })}
            </tbody>
            </Table>
            <p style={{"textAlign": "center"}}>
            <Button variant="primary" disabled={this.state.pageNo <= 1}
                    onClick={this.switchPage.bind(null, 1)}>{"<<"}</Button>{' '}
                <Button variant="primary" disabled={this.state.pageNo <= 1}
                    onClick={this.switchPage.bind(null, this.state.pageNo - 1)}>{"<"}</Button>{' '}
                <Button variant="primary">{this.state.pageNo}</Button>{' '}
                <Button variant="primary" disabled={this.state.pageNo >= this.state.pageCount}
                    onClick={this.switchPage.bind(null, this.state.pageNo + 1)}>{">"}</Button>{' '}
                <Button variant="primary" disabled={this.state.pageNo >= this.state.pageCount}
                    onClick={this.switchPage.bind(null, this.state.pageCount)}>{">>"}</Button>{' '}

            </p>

        </>
        );//TODO: bring navigation to extra component
    }
}

export default DbGrid;
