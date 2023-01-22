import React from "react";
import {Button} from "react-bootstrap";
import {Link, RouteComponentProps} from "react-router-dom";
import {Api} from "../utils/Api";
import {Session} from "../utils/Session";
import DataTypeEnum from "../crudEditor/interfaces/DataTypeEnum";
import Form from "../crudEditor/components/Form";

const api = Api.getInstance();
const session = Session.getInstance();

interface Props extends RouteComponentProps<any> {
    history: History;
}

interface Credentials {
    username: string;
    password: string;
}

interface State {

}

class LoginPage extends React.Component<Props, State> {
    static columns = [
        {key: "username", title: "Логин", dataType: DataTypeEnum.STRING, required: true},
        {key: "password", title: "Пароль", dataType: DataTypeEnum.PASSWORD, required: true},
    ];

    constructor(props) {
        super(props);
        this.state = {};
    }

    login = async (serializedValues: Credentials) => {
        const response = await api.post("/login", serializedValues);
        session.setAuthToken(response.token);
        this.props.history.push("/");
    }

    renderForm = (save: () => void, renderInputs: () => React.ReactNode) => {
        return <table style={{margin: "0 auto", marginTop: "15%", marginBottom : "15%"}}>
            <tr>
                <td style={{textAlign: "center"}}>
                    {renderInputs()}
                    <Button variant="primary" onClick={save}>Войти</Button><br /><br />
                    <Link to="/register">Регистрация</Link><br />
                    <Link to="/passRecover">Восстановление пароля</Link><br />
                </td>
            </tr>
         </table>
    }

    render() {
        return (
            <Form initialValues={null} columns={LoginPage.columns} onSave={this.login}
                columns={LoginPage.columns} onRender={this.renderForm} />

        )
    }
}

export default LoginPage;
