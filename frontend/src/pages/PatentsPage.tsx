import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";

interface Props {
}

interface State {
}

class EmployeesPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Авторские свидетельства</h1><br />
            <CrudGrid entity={"patents"} showAddButton={true} />
        </>)
    }
}

export default EmployeesPage;
