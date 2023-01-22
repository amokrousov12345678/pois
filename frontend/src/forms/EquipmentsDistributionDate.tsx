import React from "react";

import CrudGrid from "../crudEditor/components/CrudGrid";
import * as SearchFormLogic from "./SearchFormLogic";
import DatePicker from "react-datepicker";
import SearchResultsUrlDbGrid from "../crudEditor/components/SearchResultsUrlDbGrid";

import Schema from "../crudEditor/Schema";

import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
}

interface State {
    date: string;
}

class EquipmentsDistributionDate extends React.Component<Props, State> {
    private dbDateFormat = "YYYY-MM-DD";
    constructor(props: Props) {
        super(props);
        this.state = {
            date: moment(new Date()).format(this.dbDateFormat),
        }
    }

    updateInput = (key: string, date: Date) => {
        console.log(key, date);
        let deltaState = {};
        deltaState[key] = moment(date).format(this.dbDateFormat);
        this.setState(deltaState);
    }

    render() {
        return (<>
            <h1>Распределение оборудования на 00:00 указанной даты</h1><br />
            <p>Дата:&nbsp;&nbsp;
                <DatePicker id="date" dateFormat={"yyyy-MM-dd"}
                    selected={new Date(this.state.date)} onChange={this.updateInput.bind(this, "date")} />
            </p>
            <br />
            <SearchResultsUrlDbGrid columns={Schema.getAttributesInGrid("equipments").filter((column) => {
                return column.key != "ownerDivision";
            })}
                    entity={"equipments"}
                    requestPath={"/search/getDistributionByDate?projection=grid&date=" + this.state.date} />
        </>)
    }
}

export default EquipmentsDistributionDate;

