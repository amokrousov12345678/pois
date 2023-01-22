import React from "react";
import axios from "axios";

import DbGrid from "./DbGrid";
import SortInfo from "./SortInfo";

import Column from "../interfaces/Column";
import {BACKEND_ROOT_URL} from "../Params";

import {Api} from "../../utils/Api";
const api = Api.getInstance();

interface Props {
    columns: Column[];
    queryRoute: string;
    onLeftExtraControlsRender: (row: any) => React.ReactNode;
    onRightExtraControlsRender: (row: any) => React.ReactNode;
    timestamp: any;//forced refresh grid
    showRowCount: boolean;
}

interface State {
    timestamp: any;//for child
}

class UrlDbGrid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {timestamp: 0};
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.timestamp != this.props.timestamp || prevProps.queryRoute != this.props.queryRoute) {
            console.log(prevProps.timestamp, this.props.timestamp);
            this.setState((state) => {
                return {timestamp: this.state.timestamp + 1}
            });
        }
    }
    private getData = async (pageNo: number, pageSize: number, sortBy: SortInfo) => {
        let requestPath = this.props.queryRoute;

        let paramsObject = {
            page: Math.max(pageNo - 1, 0),
            size: pageSize,
        }

        if (sortBy.columnKey) {
            paramsObject.sort = sortBy.columnKey + "," + (sortBy.isAsc ? "asc" : "desc");
        }

        const response = (await api.get(requestPath, paramsObject));

        let dataRows = null;
        let pageCount = null;
        let rowCount = null;
        if (!response["_embedded"]) { //workaround to be able to fetch /{entity}/{id} as collection
            dataRows = [response];
            pageCount = 1;
            rowCount = 1;
        } else {
            dataRows = response["_embedded"][Object.keys(response["_embedded"])[0]];
            pageCount = response.page.totalPages;
            rowCount = response.page.totalElements;
        }
        return {pageCount: pageCount, rowCount: rowCount, data: dataRows};
    }

    render() {
        return (
            <>
                <DbGrid {...this.props} showRowCount={this.props.showRowCount}
                    timestamp={this.state.timestamp} columns={this.props.columns}
                    onLeftExtraControlsRender={this.props.onLeftExtraControlsRender}
                    onRightExtraControlsRender={this.props.onRightExtraControlsRender} onGetData={this.getData} />
            </>
        )
    }
}

export default UrlDbGrid;
