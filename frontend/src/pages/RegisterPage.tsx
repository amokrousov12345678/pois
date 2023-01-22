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
    username: string;
    email: string;
}

interface State {

}

class RegisterPage extends React.Component<Props, State> {
    static columns = [
        {key: "username", title: "Логин", dataType: DataTypeEnum.STRING, required: true},
        {key: "email", title: "Email", dataType: DataTypeEnum.STRING, required: true},
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    register = async (serializedValues: RegisterInfo) => {
        try {
            await api.post("/register", serializedValues);
            NotificationManager.success("Регистрация успешна! На email выслана ссылка для установки пароля");
            setTimeout(() => {
                this.props.history.push("/login");
            }, 1000);
        } catch (e) {
            if (e.response) {
                NotificationManager.error("Ошибка! Пользователь с данным паролем и/или"
                    + " email существует в базе");
            }
        }
    }

    renderForm = (save: () => void, renderInputs: () => React.ReactNode) => {
        return <table style={{margin: "0 auto", marginTop: "15%", marginBottom : "15%"}}>
            <tr>
                <td style={{textAlign: "center"}}>
                    <h3>Регистрация</h3><br />
                    {renderInputs()}
                    <Button variant="primary" onClick={save}>Зарегистрироваться</Button>
                </td>
            </tr>
         </table>
    }

    render() {
        return (
            <Form initialValues={null} columns={RegisterPage.columns} onSave={this.register}
                columns={RegisterPage.columns} onRender={this.renderForm} />
        )
    }
}

export default RegisterPage;
