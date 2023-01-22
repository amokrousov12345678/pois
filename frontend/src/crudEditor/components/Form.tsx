import React from "react";
import {NotificationManager} from "react-notifications";

import Column from "../interfaces/Column";
import {createDataTypeFromColumn} from "../interfaces/DataTypeFactory";

interface Props {
    initialValues: any;
    columns: Column[];
    onSave: (serializedValues: Object[]) => void;
    onRender: (save: () => void, renderInputs: () => React.ReactNode) => React.ReactNode;
    addExtraFormInfoOnSave: boolean;
}

interface State {
    values: Object[];
    valids: boolean[];
}

class Form extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        let values = {};
        let valids = {};

        if (this.props.initialValues) {
            for (let column of this.props.columns) {
                values[column.key] = createDataTypeFromColumn(column).parseJsonToEditorValue(this.props.initialValues[column.key]);
            }
            values["id"] = this.props.initialValues["id"] ? this.props.initialValues["id"] : "";
        } else {
            for (let column of this.props.columns) {
                values[column.key] = createDataTypeFromColumn(column).getDefaultEditorValue();
            }
            values["id"] = "";
        }

        for (let column of this.props.columns) {
            valids[column.key] = true;
        }

        console.log("values", values, this.props.initialValues);
        this.state = {values: values, valids: valids};
    }

    private save = (extraFormInfo?: any) => {
        let serializedValues = {};
        let newValids = {};
        let foundInvalid = false;

        for (let column of this.props.columns) {
            serializedValues[column.key] = createDataTypeFromColumn(column).serializeEditorValue(this.state.values[column.key],
                this.state.values[column.observedKey]);
            let valid = createDataTypeFromColumn(column).isValid(serializedValues[column.key]);
            newValids[column.key] = valid;
            if (!valid) {
                foundInvalid = true;
            }
        }

        this.setState({valids: newValids});
        if (foundInvalid) {
            NotificationManager.error("Некоторые обязательные поля не заполнены")
            return;
        }
        console.log(serializedValues);
        if (this.props.addExtraFormInfoOnSave) {
            for (let key in extraFormInfo) {
                serializedValues[key] = extraFormInfo[key];
            }
        }
        this.props.onSave(serializedValues);
    }

    private changeValue = (columnKey: string, value: any) => {
        console.log(columnKey, value);
        this.setState((state) => {
            let newValues = Object.assign(state.values);
            newValues[columnKey] = value;
            return {values: newValues};
        });
    }

    private renderInputs = () => {
        return <>{this.props.columns.map((column) => {
            return createDataTypeFromColumn(column).renderEditor(column.title, this.state.values[column.key],
                this.changeValue.bind(this, column.key), this.state.valids[column.key], this.state.values[column.observedKey]);
        })}</>
    }

    render() {
        return this.props.onRender(this.save, this.renderInputs);
    }
}

export default Form;
