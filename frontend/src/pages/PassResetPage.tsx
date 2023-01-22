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

interface PassResetInfo {
    password: string;
    password2: string;
}

interface State {

}

class PassResetPage extends React.Component<Props, State> {
    static columns = [
        {key: "password", title: "Пароль", dataType: DataTypeEnum.PASSWORD, required: true},
        {key: "password2", title: "Подтверждение пароля", dataType: DataTypeEnum.PASSWORD, required: true},
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    passReset = async (serializedValues: PassResetInfo) => {
        if (serializedValues["password"] !== serializedValues["password2"]) {
            NotificationManager.error("Введенные пароли не совпадают!");
            return;
        }
        const urlSearchParams = new URLSearchParams(window.location.search);
        serializedValues["email"] = urlSearchParams.get("email");
        serializedValues["secret"] = urlSearchParams.get("secret");
        await api.post("/passReset", serializedValues);

        NotificationManager.success("Пароль успешно восстановлен!"
            + " Теперь с его помощью Вы можете войти в систему");

        setTimeout(() => {
            this.props.history.push("/login");
        }, 1000);

    }

    renderForm = (save: () => void, renderInputs: () => React.ReactNode) => {
        return <table style={{margin: "0 auto", marginTop: "15%", marginBottom : "15%"}}>
            <tr>
                <td style={{textAlign: "center"}}>
                    <h3>Установка нового пароля</h3><br />
                    {renderInputs()}
                    <Button variant="primary" onClick={save}>Установить</Button>
                </td>
            </tr>
         </table>
    }

    render() {
        return (
            <Form initialValues={null} columns={PassResetPage.columns} onSave={this.passReset}
                columns={PassResetPage.columns} onRender={this.renderForm} />
        )
    }
}

export default PassResetPage;
