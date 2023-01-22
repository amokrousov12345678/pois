import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";
import {renderMoreInfo as renderMoreInfoEmployees} from "./EmployeesPage";
interface Props {
}

interface State {
}

class ConstructorsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderMoreInfo(id: number) {
        return (<>{renderMoreInfoEmployees(id)}
            <h3>Авторские удостоверения конструктора</h3>
            <CrudGrid entity={"patents"} showAddButton={true}
                limitedView={{requestPath: "/search/findByConstructor_Id?id={constructor}", paramValues: {constructor: id}}}
                isSubgrid={true} />
        </>);
    }
    render() {
        return (<>
            <h1>Конструкторы</h1><br />
            <CrudGrid entity={"constructors"} showAddButton={true} onMoreInfo={this.renderMoreInfo} />
        </>)
    }
}

export default ConstructorsPage;
