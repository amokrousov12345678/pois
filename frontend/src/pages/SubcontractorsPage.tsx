import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";

interface Props {
}

interface State {
}

class SubcontractorsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Субподрядчики</h1><br />
            <CrudGrid entity={"subcontractors"} showAddButton={true} />
        </>)
    }
}

export default SubcontractorsPage;

