import React from "react";

import Spoiler from "../crudEditor/components/Spoiler";
import CrudGrid from "../crudEditor/components/CrudGrid";
import EmployeesSearch from "../forms/EmployeesSearch";

interface Props {
}

interface State {
}

class DivisionsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderMoreInfo(id: number) {
        return (<>
            <Spoiler caption="Сотрудники отдела">
                <EmployeesSearch division={id} />
            </Spoiler>
        </>);
    }

    render() {
        return (<>
            <h1>Отделы</h1><br />
            <CrudGrid entity={"divisions"} showAddButton={true} onMoreInfo={this.renderMoreInfo} />
        </>)
    }
}

export default DivisionsPage;
