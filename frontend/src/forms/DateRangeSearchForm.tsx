import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";
import * as SearchFormLogic from "./SearchFormLogic";
import DatePicker from "react-datepicker";

import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    queryRoute: string;
    entity: string;
}

interface State {
    dateFrom: string;
    dateTo: string;
}

class DateRangeSearchForm extends React.Component<Props, State> {
    private dbDateFormat = "YYYY-MM-DD";
    constructor(props: Props) {
        super(props);
        this.state = {
            dateFrom: moment(new Date()).format(this.dbDateFormat),
            dateTo: moment(new Date()).format(this.dbDateFormat),
        }
    }

    updateInput = (key: string, date: Date) => {
        console.log(key, date);
        let deltaState = {};
        deltaState[key] = moment(date).format(this.dbDateFormat);
        this.setState(deltaState);
    }

    render() {
        const limitedView = SearchFormLogic.makeLimitedViewFromSearchForm(this.props.queryRoute,
            [], this);
        return (<>
            <p>Диапазон дат:&nbsp;&nbsp;
                <DatePicker id="dateFrom" dateFormat={"yyyy-MM-dd"}
                    selected={new Date(this.state.dateFrom)} onChange={this.updateInput.bind(this, "dateFrom")} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
                <DatePicker id="dateTo" dateFormat={"yyyy-MM-dd"}
                    selected={new Date(this.state.dateTo)} onChange={this.updateInput.bind(this, "dateTo")} />
            </p>
            <br />
            <CrudGrid entity={this.props.entity} showAddButton={true}
                limitedView={limitedView}
                onMoreInfo={() => <></>}
                isSubgrid={true} />
        </>)
    }
}

export default DateRangeSearchForm;

