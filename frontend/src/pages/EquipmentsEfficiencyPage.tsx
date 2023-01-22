import React from "react";
import {Link} from "react-router-dom";
import SearchResultsUrlDbGrid from "../crudEditor/components/SearchResultsUrlDbGrid";

import Schema from "../crudEditor/Schema";
import DataTypeEnum from "../crudEditor/interfaces/DataTypeEnum";

interface Props {
}

interface State {
}

class EquipmentsEfficiencyPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let columns = Schema.getAttributesInGrid("equipments");
        columns = columns.filter((column) => ["name", "equipmentType"].includes(column.key));

        columns.push({key: "efficiency",
            title: "Эффективность (объём проектных работ, выполненных с помощью оборудования)",
            dataType: DataTypeEnum.MONEY});
        return (<>
                <h1>Эффективность оборудования</h1><br />
                <SearchResultsUrlDbGrid columns={columns}
                    entity={"equipments"}
                    requestPath={"?projection=efficiency"} />

        </>)
    }
}

export default EquipmentsEfficiencyPage;

