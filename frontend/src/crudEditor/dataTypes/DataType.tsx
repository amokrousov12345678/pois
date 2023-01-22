import React from "react";
import Column from "../interfaces/Column";

abstract class DataType {
    required: boolean;

    public constructor(column: Column) {
        this.required = column.required;
    }
    abstract parseJsonToEditorValue(jsonValue: any): any;
    abstract getDefaultEditorValue(): any;
    abstract serializeEditorValue(value: any, observedValue?: any): any;

    getSortable(): boolean {
        return false;
    }

    abstract renderEditor(title: string, value: any, onChange: (newValue: any) => void, valid: boolean,
        observedValue?: any): React.ReactNode;

    abstract renderInGrid(value: any): React.ReactNode;

    public isValid(value: any): boolean {
        if (value === null && this.required) {
            return false;
        }
        return true;
    }

    public renderInputLabel(title: string, valid: boolean): React.ReactNode {
        let labelText = title;
        if (this.required) {
            labelText += " *";
        }
        return valid ? <>{labelText}:&nbsp;&nbsp;</> : <><span style={{"color": "#f00"}}>{labelText}</span>:&nbsp;&nbsp;</>
    }
}


export default DataType;
