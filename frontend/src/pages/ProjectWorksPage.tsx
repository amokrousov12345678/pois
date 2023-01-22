import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";

interface Props {
}

interface State {
}

class ProjectWorksPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<>
            <h1>Проектные работы</h1><br />
            <CrudGrid entity={"projectWorks"} showAddButton={true} />
        </>)
    }
}

export default ProjectWorksPage;
