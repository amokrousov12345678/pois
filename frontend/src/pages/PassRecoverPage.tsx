import React from "react";
import {Button} from "react-bootstrap";
import {RouteComponentProps} from "react-router-dom";
import {Api} from "../utils/Api";
import DataTypeEnum from "../crudEditor/interfaces/DataTypeEnum";
import Form from "../crudEditor/components/Form";
import {NotificationManager} from "react-notifications";


const api = Api.getInstance();

interface Props extends RouteComponentProps<any> {
    history: History;
}

interface RegisterInfo {
    email: string;
}

interface State {

}

class PassRecoverPage extends React.Component<Props, State> {
    static columns = [
        {key: "email", title: "Email", dataType: DataTypeEnum.STRING, required: true},
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    passRecover = async (serializedValues: RegisterInfo) => {
        await api.post("/passRecover", serializedValues);

        NotificationManager.success("Если пользователь с таким email существует, "
            + "ему будет выслана ссылка для сброса пароля");

        setTimeout(() => {
            this.props.history.push("/login");
        }, 1000);

    }

    renderForm = (save: () => void, renderInputs: () => React.ReactNode) => {
        return <table style={{margin: "0 auto", marginTop: "15%", marginBottom : "15%"}}>
            <tr>
                <td style={{textAlign: "center"}}>
                    <h3>Восстановление пароля</h3><br />
                    {renderInputs()}
                    <Button variant="primary" onClick={save}>Восстановить пароль</Button>
                </td>
            </tr>
         </table>
    }

    render() {
        return (
            <Form initialValues={null} columns={PassRecoverPage.columns} onSave={this.passRecover}
                columns={PassRecoverPage.columns} onRender={this.renderForm} />
        )
    }
}

export default PassRecoverPage;
