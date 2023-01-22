import React from "react";
import {Link} from "react-router-dom";

import Schema from "../crudEditor/Schema";

import Spoiler from "../crudEditor/components/Spoiler";
import CrudGrid from "../crudEditor/components/CrudGrid";
import SearchResultsUrlDbGrid from "../crudEditor/components/SearchResultsUrlDbGrid";
import EmployeesProjectByEntityType from "../forms/EmployeesProjectByEntityType";

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
            <Spoiler caption="Проектные работы">
                <CrudGrid entity={"projectWorks"} showAddButton={true}
                    limitedView={{requestPath: "/search/findByProject_Id?id={project}", paramValues: {project: id}}}
                    isSubgrid={true} />
            </Spoiler>
            <Spoiler caption="Субподрядные работы">
                <CrudGrid entity={"subcontractorWorks"} showAddButton={true}
                    limitedView={{requestPath: "/search/findByProject_Id?id={project}", paramValues: {project: id}}}
                    isSubgrid={true} />
            </Spoiler>
            <Spoiler caption="Сотрудники проекта">
                <EmployeesProjectByEntityType id={id} />
            </Spoiler>
            <Spoiler caption="Использование оборудования">
                <SearchResultsUrlDbGrid columns={Schema.getAttributesInGrid("equipmentUsages")
                                                       .filter((column) => column.key != "project")}
                    entity={"equipmentUsages"}
                    requestPath={"/search/findByProject_Id?id={project}&projection=" + GRID_PROJECTION_NAME}
                    paramValues={{project: id}} />
            </Spoiler>
        </>);
    }

    renderLessInfo(id: number) {
        return (<>
            <Link to="/projects_executing_in_interval">Поиск проектов выполнявшихся в определенный диапазон дат</Link><br />
            <Link to="/projects_finished_in_interval">Поиск проектов завершенных в определенный диапазон дат</Link><br />
            <Link to="/projects_efficiency">Эффективность выполненных проектов (стоимость на 1 задействованного сотрудника)</Link><br />
        </>)
    }

    render() {
        return (<>
            <h1>Проекты</h1><br />
            <CrudGrid entity={"projects"} showAddButton={true} onMoreInfo={this.renderMoreInfo} onLessInfo={this.renderLessInfo}/>
        </>)
    }
}

export default ProjectsPage;
