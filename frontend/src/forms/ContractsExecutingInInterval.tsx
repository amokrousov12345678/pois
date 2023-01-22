import React from "react";

import DateRangeSearchForm from "./DateRangeSearchForm";

interface Props {
}

interface State {
}

class ContractsExecutingInInterval extends React.Component<Props, State> {
    render() {
        return <>
            <h1>Договоры, выполняющиеся в диапазон дат</h1><br />
            <DateRangeSearchForm queryRoute="/search/findExecutingInDateRange" entity="contracts"/>
        </>
    }
}

export default ContractsExecutingInInterval;

