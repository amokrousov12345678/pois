import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";
import {renderMoreInfo as renderMoreInfoEmployees} from "./EmployeesPage";

interface Props {
}

interface State {
}

class TechniciansPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Техники</h1><br />
            <CrudGrid entity={"technicians"} showAddButton={true} onMoreInfo={renderMoreInfoEmployees} />
        </>)
    }
}

export default TechniciansPage;
