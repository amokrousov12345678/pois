import React from "react";

import Schema from "../crudEditor/Schema";
import CrudGrid from "../crudEditor/components/CrudGrid";
import * as SearchFormLogic from "./SearchFormLogic";
interface Props {
    id: number;//projectId
}

interface State {
    entityType: string;
}

class EmployeesProjectByEntityType extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            entityType: "",
        }
    }

    updateInput = (e: React.ChangeEvent) => {
        const key: string = e.target.id;
        let deltaState = {};
        deltaState[key] = e.target.value;
        this.setState(deltaState);
    }

    render() {
        const limitedView = SearchFormLogic.makeLimitedViewFromSearchForm("/search/findByEntityTypeAndProjectId",
            [], this);
        return (<>
            <p>Категория сотрудника:&nbsp;&nbsp;
                <select id="entityType" value={this.state.entityType} onChange={this.updateInput}>
                    <option key={null} value={""}>Любая</option>
                    {Schema.getAddableAncestors("employees").map((ancestor) => {
                        return <option key={ancestor.entity} value={ancestor.entity}>{ancestor.value}</option>
                    })}
                </select></p>
            <br />
            <CrudGrid entity={"employees"}
                limitedView={limitedView}
                onMoreInfo={() => <></>} isSubgrid={true} showRowCount={true} />
        </>)
    }
}

export default EmployeesProjectByEntityType;

