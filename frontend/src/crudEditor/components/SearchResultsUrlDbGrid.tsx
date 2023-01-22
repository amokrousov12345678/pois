import React from "react";
import {Link} from "react-router-dom";
import Column from "../interfaces/Column";
import UrlDbGrid from "./UrlDbGrid";
import {ROWS_PER_PAGE, FRONTEND_CRUD_ROOT_URL} from "../Params";

import {Api} from "../../utils/Api";
const api = Api.getInstance();

interface Props {
    columns: Column[];
    entity: string;
    requestPath: string;
    paramValues: Object[]; //like in LimitedView
    timestamp: number;
}

interface State {
}

class SearchResultsUrlDbGrid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    private getQueryRoute = () => {
        return FRONTEND_CRUD_ROOT_URL + "/" + this.props.entity +
            this.props.requestPath.replace(/\{(.*)\}/g, (match, p1) => this.props.paramValues[p1 as string]);
    }

    private leftExtraControlsRenderer = (row: any) => null;
    private rightExtraControlsRenderer = (row: any) => {
        const rowEntityType = (row.entityType || this.props.entity);
        return <>
            <Link to={FRONTEND_CRUD_ROOT_URL + "/" + rowEntityType + "?id=" + row.id}>
                <img src={require("../../../images/more_ico.png")} title="Подробнее" />
            </Link>
        </>
    }

    render() {

        return (
            <>
                <UrlDbGrid pageSize={ROWS_PER_PAGE} columns={this.props.columns} queryRoute={this.getQueryRoute()}
                onLeftExtraControlsRender={this.leftExtraControlsRenderer}
                    onRightExtraControlsRender={this.rightExtraControlsRenderer} {...this.props}
                    timestamp={this.props.timestamp} />
            </>
        )
    }
}

export default SearchResultsUrlDbGrid;
