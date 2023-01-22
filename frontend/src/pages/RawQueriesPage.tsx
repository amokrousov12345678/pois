import React from "react";
import {Alert, Button, Table} from "react-bootstrap";
import {RouteComponentProps} from "react-router-dom";
import {Api} from "../utils/Api";
import DataTypeEnum from "../crudEditor/interfaces/DataTypeEnum";
import Form from "../crudEditor/components/Form";
import {NotificationManager} from "react-notifications";


const api = Api.getInstance();

interface Props extends RouteComponentProps<any> {
    history: History;
}

interface RawQueryDto {
    query: string;
    modifying: boolean;
}

interface RawQueryResponseDto {
    result: any[][] | null;
    error: String;
    affectedRows: number;
}
interface State {
    lastQueryResult: any[][] | null;
    errorMessage: string | null;
}

class RawQueriesPage extends React.Component<Props, State> {
    static columns = [
        {key: "query", title: "Текст запроса", dataType: DataTypeEnum.TEXT, required: true},
    ];

    constructor(props) {
        super(props);
        this.state = {lastQueryResult: null};
    }

    executeRawQuery = async (serializedValues: RawQueryDto) => {
        try {
            const response: RawQueryResponseDto = await api.post("/rawQuery/execute", serializedValues);
            this.setState({lastQueryResult: response.result, error: null});
            if (!serializedValues.modifying) {
                NotificationManager.success("Запрос выполнен успешно!");
            } else {
                NotificationManager.success("Запрос выполнен успешно!"
                    + " Затронуто " + response.affectedRows + " строк");
            }

        } catch (e) {
            if (e.response) {
                 this.setState({error: e.response.data.error});
                 NotificationManager.error("Ошибка при выполнении запроса, проверьте свой синтаксис");
            }
        }
    }

    renderForm = (save: (extraFormInfo?: any) => void, renderInputs: () => React.ReactNode) => {
        return <>
                    {renderInputs()}<br />
                    <Button variant="primary"
                        onClick={save.bind(null, {modifying: false})}>Выполнить запрос</Button>&nbsp;
                    <Button variant="danger"
                        onClick={save.bind(null, {modifying: true})}>Выполнить модифицирующий запрос</Button>&nbsp;
            </>
    }

    render() {

        return (<div style={{textAlign: "center"}}>
            <h1>Выполнение произвольного запроса</h1><br />
            <Form initialValues={null} onSave={this.executeRawQuery}
                columns={RawQueriesPage.columns} onRender={this.renderForm} addExtraFormInfoOnSave={true} />
            <br /><br />
            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
            <br />
            <Table striped bordered hover>
            {this.state.lastQueryResult !== null &&
            (typeof this.state.lastQueryResult != "object"
            ?
            <tr><td>{this.state.lastQueryResult}</td></tr>
            :
                (this.state.lastQueryResult.length
                ?
                this.state.lastQueryResult.map((row) => {
                    if (typeof row !== "object") {
                        return <tr><td>{row}</td></tr>
                    }
                    return <tr>{row.map((cell) => <td>{cell}</td>)}</tr>
                })
                :
                <tr><td>Записей не обнаружено(</td></tr>
                ))}
            </Table>
        </div>)
    }
}

export default RawQueriesPage;
