import React from "react";

import Schema from "../crudEditor/Schema";
import CrudGrid from "../crudEditor/components/CrudGrid";
import * as SearchFormLogic from "./SearchFormLogic";
interface Props {
    division: number;
}

interface State {
    entityType: string;
    ageFrom: string;
    ageTo: string;
}

class EmployeesSearchForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            entityType: "",
            ageFrom: "",
            ageTo: "",
        }
    }

    updateInput = (e: React.ChangeEvent) => {
        const key: string = e.target.id;
        let deltaState = {};
        deltaState[key] = e.target.value;
        this.setState(deltaState);
    }

    render() {
        const limitedView = SearchFormLogic.makeLimitedViewFromSearchForm("/search/findByEntityTypeAndAgeBetweenAndDivision_Id",
            ["projection=grid"], this);
        return (<><h1>Поиск сотрудников</h1>
            <h3>Фильтры</h3>
            <p>Категория сотрудника:&nbsp;&nbsp;
                <select id="entityType" value={this.state.entityType} onChange={this.updateInput}>
                    <option key={null} value={""}>Любая</option>
                    {Schema.getAddableAncestors("employees").map((ancestor) => {
                        return <option key={ancestor.entity} value={ancestor.entity}>{ancestor.value}</option>
                    })}
                </select></p>
            <p>Диапазон возраста:&nbsp;&nbsp;
                <input type="text" id="ageFrom" value={this.state.ageFrom} onChange={this.updateInput} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
                <input type="text" id="ageTo" value={this.state.ageTo} onChange={this.updateInput} />
            </p>
            <br />
            <CrudGrid entity={"employees"} showAddButton={true}
                limitedView={limitedView}
                onMoreInfo={() => <></>} isSubgrid={this.props.division != null} />
        </>)
    }
}

export default EmployeesSearchForm;

