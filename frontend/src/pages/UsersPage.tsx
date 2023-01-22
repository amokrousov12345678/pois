import React from "react";

import Spoiler from "../crudEditor/components/Spoiler";
import CrudGrid from "../crudEditor/components/CrudGrid";
import EmployeesSearch from "../forms/EmployeesSearch";

interface Props {
}

interface State {
}

class UsersPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Пользователи</h1><br />
            <CrudGrid entity={"users"} showAddButton={true} />
        </>)

    }
}

export default UsersPage;
