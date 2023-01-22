import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";

interface Props {
}

interface State {
}

class SubcontractorWorksPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Субподрядные работы</h1><br />
            <CrudGrid entity={"subcontractorWorks"} showAddButton={true} />
        </>)
    }
}

export default SubcontractorWorksPage;

