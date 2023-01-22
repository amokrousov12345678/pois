import React from "react";

import DateRangeSearchForm from "./DateRangeSearchForm";

interface Props {
}

interface State {
}

class ProjectsFinishedInInterval extends React.Component<Props, State> {
    render() {
        return <>
            <h1>Проекты, выполненные в диапазон дат</h1><br />
            <DateRangeSearchForm queryRoute="/search/findFinishedInDateRange" entity="projects"/>
        </>
    }
}

export default ProjectsFinishedInInterval;
