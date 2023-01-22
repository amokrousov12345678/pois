import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";
import {renderMoreInfo as renderMoreInfoEmployees} from "./EmployeesPage";

interface Props {
}

interface State {
}

class EngineersPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Инженеры</h1><br />
            <CrudGrid entity={"engineers"} showAddButton={true} onMoreInfo={renderMoreInfoEmployees} />
        </>)
    }
}

export default EngineersPage;
