import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";

interface Props {
}

interface State {
}

class EquipmentTypesPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Тип оборудования</h1><br />
            <CrudGrid entity={"equipmentTypes"} showAddButton={true} />
        </>)
    }
}

export default EquipmentTypesPage;

