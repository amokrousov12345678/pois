import React from "react";
import {Link} from "react-router-dom";
import SearchResultsUrlDbGrid from "../crudEditor/components/SearchResultsUrlDbGrid";

import Schema from "../crudEditor/Schema";
import DataTypeEnum from "../crudEditor/interfaces/DataTypeEnum";

interface Props {
}

interface State {
}

class ProjectsEfficiencyPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let columns = Schema.getAttributesInGrid("contracts");
        columns = columns.filter((column) => ["name", "beginDate", "endDate"].includes(column.key));

        columns.push({key: "efficiency", title: "Эффективность (стоимость на 1 задействованного работника)", dataType: DataTypeEnum.MONEY});
        return (<>
                <h1>Эффективность выполенных проектов</h1><br />
                <SearchResultsUrlDbGrid columns={columns}
                    entity={"projects"}
                    requestPath={"/search/findByEndDateIsNotNull?projection=efficiency"} />

        </>)
    }
}

export default ProjectsEfficiencyPage;
