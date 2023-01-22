import React from "react";

import Schema from "../crudEditor/Schema";
import CrudGrid from "../crudEditor/components/CrudGrid";
import * as SearchFormLogic from "./SearchFormLogic";
import DatePicker from "react-datepicker";

import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    id: number;//projectId
}

interface State {
    entityType: string;
    dateFrom: string;
    dateTo: string;
}

class EmployeesProjectsByIntervalAndEntityType extends React.Component<Props, State> {
    private dbDateFormat = "YYYY-MM-DD";
    constructor(props: Props) {
        super(props);
        this.state = {
            entityType: "",
            dateFrom: moment(new Date()).format(this.dbDateFormat),
            dateTo: moment(new Date()).format(this.dbDateFormat),
        }
    }

    updateInput = (e: React.ChangeEvent) => {
        const key: string = e.target.id;
        let deltaState = {};
        deltaState[key] = e.target.value;
        this.setState(deltaState);
    }

    updateDateInput = (key: string, date: Date) => {
        console.log(key, date);
        let deltaState = {};
        deltaState[key] = moment(date).format(this.dbDateFormat);
        this.setState(deltaState);
    }

    render() {
        const limitedView = SearchFormLogic.makeLimitedViewFromSearchForm("/search/findByEntityTypeAndProjectDate",
            [], this);
        return (<><h1>Проекты, выполняемые сотрудниками в диапазон дат</h1>
            <p>Категория сотрудника:&nbsp;&nbsp;
                <select id="entityType" value={this.state.entityType} onChange={this.updateInput}>
                    <option key={null} value={""}>Любая</option>
                    {Schema.getAddableAncestors("employees").map((ancestor) => {
                        return <option key={ancestor.entity} value={ancestor.entity}>{ancestor.value}</option>
                    })}
                </select></p>
            <p>Диапазон дат:&nbsp;&nbsp;
                <DatePicker id="dateFrom" dateFormat={"yyyy-MM-dd"}
                    selected={new Date(this.state.dateFrom)} onChange={this.updateDateInput.bind(this, "dateFrom")} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
                <DatePicker id="dateTo" dateFormat={"yyyy-MM-dd"}
                    selected={new Date(this.state.dateTo)} onChange={this.updateDateInput.bind(this, "dateTo")} />
            </p>
            <br />
            <CrudGrid entity={"employees"}
                limitedView={limitedView}
                onMoreInfo={() => <></>} isSubgrid={true} showRowCount={true} />
        </>)
    }
}

export default EmployeesProjectsByIntervalAndEntityType;

