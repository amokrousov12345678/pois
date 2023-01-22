import React from "react";
import {Link, withRouter, RouteComponentProps} from "react-router-dom";
import {Button, Dropdown} from "react-bootstrap";
import {NotificationManager} from "react-notifications";

import UrlDbGrid from "./UrlDbGrid";
import AddEditDialog from "./AddEditDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import Schema from "../Schema";
import {GRID_PROJECTION_NAME, FRONTEND_CRUD_ROOT_URL, ROWS_PER_PAGE} from "../Params";
import LimitedView from "../interfaces/LimitedView";
import {Api} from "../../utils/Api";

const api = Api.getInstance();

interface Props {
    entity: string;
    showAddButton: boolean;
    limitedView: LimitedView; //for crud grids in "more" window
    onMoreInfo: (id: number) => React.ReactNode; //draw extra grids on click "more" button
    onLessInfo: () => React.ReactNode; //something (for example links) below grid if no row chosen
    isSubgrid: boolean;
    showRowCount: boolean;
}

interface AddEditDialogParams {
    show: boolean;
    entity: string;
    id: number;
}

interface DeleteDialogParams {
    show: boolean;
    id: number;
}

interface State {
    addEditDialogProps: AddEditDialogParams;
    deleteDialogProps: DeleteDialogParams;
    timestamp: any;//for forced refresh grid by DbGrid (prop is passed via UrlDbGrid)
}

class CrudGrid extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {addEditDialogProps: {show: false, id: null}, deleteDialogProps: {show: false, id: null}, timestamp: 0};
    }

    private forceDbGridRefresh = () => {
        this.setState((state) => {
            return {timestamp: state.timestamp + 1}
        });
    }

    private closeDialog = () => { //closes any dialog, because it's impossible to have both opened dialogs in same time
        this.setState({addEditDialogProps: {show: false, id: null}, deleteDialogProps: {show: false, id: null}});
    }

    private showEditDialog = (entity: string, id: number) => {
        console.log(entity, id);
        this.setState({addEditDialogProps: {show: true, entity: entity, id: id}});
    }

    private showAddDialog = (entity: string) => {
        this.setState({addEditDialogProps: {show: true, entity: entity, id: null}});
    }

    private showDeleteDialog = (id: number) => {
        this.setState({deleteDialogProps: {show: true, id: id}});
    }

    private deleteById = async (id: number) => {
        const requestPath = "/" + this.props.entity + "/" + id;
        await api.delete(requestPath);
        NotificationManager.success("Запись удалена!");
        this.forceDbGridRefresh();
        this.closeDialog();
    }

    private ignoreClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }

    private getUrlParam(name: string) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    private leftExtraControlsRenderer = (row: any) => null;
    private rightExtraControlsRenderer = (row: any) => {
        const rowEntityType = (row.entityType || this.props.entity);
        return <>
            {((!this.getUrlParam("id") || this.props.isSubgrid) && this.props.onMoreInfo) &&
            <Link to={FRONTEND_CRUD_ROOT_URL + "/" + rowEntityType + "?id=" + row.id}>
                <img src={require("../../../images/more_ico.png")} title="Подробнее" />
            </Link>
            }
            <Link onClick={this.ignoreClick}>
                <img src={require("../../../images/edit_ico.png")}
                    title="Редактировать..." onClick={this.showEditDialog.bind(this, rowEntityType, row.id)}/>
            </Link>
            <Link onClick={this.ignoreClick}>
                <img src={require("../../../images/del_ico.png")}
                    title="Удалить" onClick={this.showDeleteDialog.bind(this, row.id)} />
            </Link>
        </>
    }

    private buildRequestPathForLimitedView = (limitedView: LimitedView) => {
        return limitedView.requestPath.replace(/\{(.*?)\}/g, (match, p1) => limitedView.paramValues[p1 as string]);
    }

    render() {
        const id = this.getUrlParam("id") as number;

        let columns = Schema.getAttributesInGrid(this.props.entity);

        if (this.props.limitedView) {
            columns = columns.filter((column) => { //TODO: duplicated with AddEditDialog
                return ![...Object.keys(this.props.limitedView.paramValues)].includes(column.key);
            });
        }

        let queryRoute = "/" + this.props.entity;
        if (this.props.limitedView) {
            queryRoute += this.buildRequestPathForLimitedView(this.props.limitedView);
            queryRoute += "&projection=" + GRID_PROJECTION_NAME;
        } else if (id) {
            queryRoute += "/" + id + "?projection=" + GRID_PROJECTION_NAME;
        } else {
            queryRoute += "?projection=" + GRID_PROJECTION_NAME;
        }
        console.log(queryRoute);
        const addableAncestors = Schema.getAddableAncestors(this.props.entity);
        return (
            <>
                {id && !this.props.isSubgrid && <p>
                Отображается только выбранная запись.&nbsp;&nbsp;
                <Link to={FRONTEND_CRUD_ROOT_URL + "/" + this.props.entity} >Отобразить все</Link></p>}

                <UrlDbGrid pageSize={ROWS_PER_PAGE} columns={columns}
                    queryRoute={queryRoute}
                    onLeftExtraControlsRender={this.leftExtraControlsRenderer}
                    onRightExtraControlsRender={this.rightExtraControlsRenderer}
                    timestamp={this.state.timestamp}
                    showRowCount={this.props.showRowCount} />

                {this.state.addEditDialogProps.show && <AddEditDialog entity={this.state.addEditDialogProps.entity}
                    id={this.state.addEditDialogProps.id} onClose={this.closeDialog}
                    onRefresh={this.forceDbGridRefresh}
                    fixedParams={this.props.limitedView ? this.props.limitedView.paramValues : undefined} />}

                {this.state.deleteDialogProps.show && <ConfirmDialog onClose={this.closeDialog}
                    onConfirm={this.deleteById.bind(this, this.state.deleteDialogProps.id)} />}

                {(!id || this.props.isSubgrid) && this.props.showAddButton && <p style={{textAlign: "center"}}><br />
                    {addableAncestors
                    ?
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            Добавить
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {addableAncestors.map((ancestor) => {
                                return <Dropdown.Item onClick={this.showAddDialog.bind(this, ancestor.entity)}
                                        key={ancestor.entity}>
                                    {ancestor.value}
                                </Dropdown.Item>})}
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <Button variant="primary" onClick={this.showAddDialog.bind(this, this.props.entity)}>Добавить...</Button>}
                </p>}

                {id && this.props.onMoreInfo && !this.props.isSubgrid && this.props.onMoreInfo(id)}
                {!id && this.props.onLessInfo && !this.props.isSubgrid && this.props.onLessInfo(id)}
            </>
        )
    }
}

export default CrudGrid;
