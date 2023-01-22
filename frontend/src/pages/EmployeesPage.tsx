import React from "react";
import {Link} from "react-router-dom";
import CrudGrid from "../crudEditor/components/CrudGrid";
import Spoiler from "../crudEditor/components/Spoiler";
import DateRangeSearchForm from "../forms/DateRangeSearchForm";

interface Props {
}

interface State {
}

function renderMoreInfo(id: number) {
    return <>
        <Spoiler caption="Поиск договоров, в которых участвует в заданном интервале времени">
            <DateRangeSearchForm entity="contracts" queryRoute="/search/findByWorkerIdInDateRange" id={id} />
        </Spoiler>
        <Spoiler caption="Поиск проектов, в которых участвует в заданном интервале времени">
            <DateRangeSearchForm entity="projects" queryRoute="/search/findByWorkerIdInDateRange" id={id} />
        </Spoiler>
    </>
}

class EmployeesPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }


    renderLessInfo() {
        return <>
            <Link to="/employees_search">Поиск сотрудников по возрасту</Link><br />
            <Link to="/employees_used_in_projects_by_dates">Поиск сотрудников, выполняющих проекты в заданном диапазоне дат</Link><br />
            <Link to="/employees_used_in_contracts_by_dates">Поиск сотрудников, задействованных в договорах в заданном диапазоне дат</Link>
        </>
    }
    render() {
        return (<>
            <h1>Сотрудники</h1><br />
            <CrudGrid entity={"employees"} showAddButton={true}
                onMoreInfo={renderMoreInfo} onLessInfo={this.renderLessInfo}/>
        </>)
    }
}

export default EmployeesPage;
export {renderMoreInfo};
