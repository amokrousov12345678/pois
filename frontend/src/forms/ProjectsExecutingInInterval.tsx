import React from "react";

import DateRangeSearchForm from "./DateRangeSearchForm";

interface Props {
}

interface State {
}

class ProjectsExecutingInInterval extends React.Component<Props, State> {
    render() {
        return  <>
            <h1>Проекты, выполняющиеся в диапазон дат</h1><br />
            <DateRangeSearchForm queryRoute="/search/findExecutingInDateRange" entity="projects"/>
        </>
    }
}

export default ProjectsExecutingInInterval;

