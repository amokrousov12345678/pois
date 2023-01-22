import React from "react";
import {Link} from "react-router-dom";
import Schema from "../crudEditor/Schema";

import Spoiler from "../crudEditor/components/Spoiler";
import CrudGrid from "../crudEditor/components/CrudGrid";
import SearchResultsUrlDbGrid from "../crudEditor/components/SearchResultsUrlDbGrid";
import {GRID_PROJECTION_NAME} from "../crudEditor/Params";

interface Props {
}

interface State {
}

class ProjectsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    renderMoreInfo(id: number) {
        return (<>
            <Spoiler caption="Сотрудники данного договора">
                <SearchResultsUrlDbGrid columns={Schema.getAttributesInGrid("employees")}
                    entity={"employees"}
                    requestPath={"/search/findByWorkingContracts_Id?id={contract}&projection=" + GRID_PROJECTION_NAME}
                    paramValues={{contract: id}} />
            </Spoiler>
            <Spoiler caption="Использование оборудования">
                <SearchResultsUrlDbGrid columns={Schema.getAttributesInGrid("equipmentUsages")}
                    entity={"equipmentUsages"}
                    requestPath={"/search/findByProject_AssociatedContracts_Id?id={contract}&projection="
                        + GRID_PROJECTION_NAME}
                    paramValues={{contract: id}} />
            </Spoiler>
        </>);
    }

    renderLessInfo(id: number) {
        return (<>
            <Link to="/contracts_executing_in_interval">Поиск договоров выполнявшихся в определенный диапазон дат</Link><br />
            <Link to="/contracts_finished_in_interval">Поиск договоров завершенных в определенный диапазон дат</Link><br />
            <Link to="/contracts_efficiency">Эффективность выполненных договоров (стоимость на 1 задействованного сотрудника) </Link><br />
        </>)
    }

    render() {
        return (<>
            <h1>Договоры</h1><br />
            <CrudGrid entity={"contracts"} showAddButton={true} onMoreInfo={this.renderMoreInfo} onLessInfo={this.renderLessInfo} />
        </>)
    }
}

export default ProjectsPage;
