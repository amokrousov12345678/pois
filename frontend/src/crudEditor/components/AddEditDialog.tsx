import React from "react";
import {Button, Modal} from "react-bootstrap";
import {NotificationManager} from "react-notifications";

import Form from "./Form";
import Column from "../interfaces/Column";
import Schema from "../Schema";
import {EDITOR_PROJECTION_NAME} from "../Params";

import {Api} from "../../utils/Api";
const api = Api.getInstance();

interface Props {
    entity: string;
    id: number | null;
    onClose: () => void;
    onRefresh: () => void; //refresh grid after successful update
    fixedParamValues: Object[]; //for CrudGrid with not null limitedView NOT WORK YET!!
}

interface State {
    dataLoaded: boolean;
    initialFormValues: Object[];
}

class AddEditDialog extends React.Component<Props, State> {

    private columns: Column[];

    constructor(props: Props) {
        super(props);
        this.columns = Schema.getAttributesInEditor(this.props.entity);
        this.state = {dataLoaded: false, initialFormValues: null};
    }

    loadData = async (id: number) => {
        const requestOldValuesPath = "/" + this.props.entity + "/" + id
            + "?projection=" + EDITOR_PROJECTION_NAME;
        const response = (await api.get(requestOldValuesPath));
        response["id"] = id;
        this.setState({initialFormValues: response, dataLoaded: true});
    }

    loadEmptyData = async () => {
        this.setState({initialFormValues: null, dataLoaded: true});
    }

    componentDidMount() {
        if (this.props.id) {
            this.loadData(this.props.id);
            return;
        }
        this.loadEmptyData();
    }

    private save = async (serializedValues: Object[]) => {
        if (this.props.id) {
            const requestPath = "/" + this.props.entity + "/" + this.props.id;
            await api.patch(requestPath, serializedValues);
            NotificationManager.success("Изменения сохранены!");
        } else {
            const requestPath = "/" + this.props.entity + "/";
            await api.post(requestPath, serializedValues);
            NotificationManager.success("Запись создана!");
        }

        this.props.onRefresh();
        this.props.onClose();
    }

    private renderForm = (save: () => void, renderInputs: () => React.ReactNode) => {
        return (
            <Modal size="lg" show={true} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.id ? "Редактирование" : "Добавление"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderInputs()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={save}>
                        {this.props.id ? "Сохранить" : "Создать"}
                    </Button>
                </Modal.Footer>
            </Modal>
            )
    }

    render() {
        if (!this.state.dataLoaded) {
            return null;
        }

        return <Form initialValues={this.state.initialFormValues} columns={this.columns}
            onSave={this.save} onRender={this.renderForm} />
    }
}

export default AddEditDialog;
