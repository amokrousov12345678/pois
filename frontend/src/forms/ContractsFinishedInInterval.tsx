import React from "react";

import DateRangeSearchForm from "./DateRangeSearchForm";

interface Props {
}

interface State {
}

class ContractsFinishedInInterval extends React.Component<Props, State> {
    render() {
        return  <>
            <h1>Договоры, выполненные в диапазон дат</h1><br />
            <DateRangeSearchForm queryRoute="/search/findFinishedInDateRange" entity="contracts"/>
        </>
    }
}

export default ContractsFinishedInInterval;
