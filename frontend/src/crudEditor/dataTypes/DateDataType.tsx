import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

import PlainDataType from "./PlainDataType";

class DateDataType extends PlainDataType {

    private displayDateFormat = "yyyy-MM-dd";
    private dbDateFormat = "YYYY-MM-DD";

    parseJsonToEditorValue(jsonValue: any): any {
        if (jsonValue == null) {
            return null;
        }
        return new Date(jsonValue);
    }

    getDefaultEditorValue(): any {
        return new Date();
    }

    serializeEditorValue(value: any): any {
        if (value == null) {
            return null;
        }
        return moment(value).format(this.dbDateFormat);
    }

    renderEditor(title: string, value: any, onChange: (newValue: any) => void, valid: boolean): React.ReactNode {
        function updateInput(value: Date) {
            onChange(new Date(value).getTime());
        }
        function checkboxChange(e: React.MouseEvent) {
            if (e.target.checked) {
                onChange(new Date().getTime());
                return;
            }
            onChange(null);
        }
        return <p>
            {this.renderInputLabel(title, valid)}
            {!this.required && <><input type="checkbox" checked={value != null}
                onChange={checkboxChange} style={{"verticalAlign": "middle"}} />&nbsp;&nbsp;</>}
            {value && <DatePicker dateFormat={this.displayDateFormat} selected={value} onChange={updateInput} />}
        </p>
    }
}

export default DateDataType;
