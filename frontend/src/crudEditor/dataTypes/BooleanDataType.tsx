import React from "react";

import PlainDataType from "./PlainDataType";

class BooleanDataType extends PlainDataType {

    getDefaultEditorValue(): any {
        return false;
    }

    renderEditor(title: string, value: any, onChange: (newValue: any) => void, valid: boolean): React.ReactNode {
        function updateInput(e: React.ChangeEvent) {
            const newValue = (e.target as any).checked;
            onChange(newValue);
        }
        return <p>{this.renderInputLabel(title, valid)}&nbsp;&nbsp;
             <input type="checkbox" checked={value} onChange={updateInput} style={{"verticalAlign": "middle"}} /></p>;
    }

    renderInGrid(value: any): React.ReactNode {
        return <input type="checkbox" checked={value} readOnly={true} />
    }
}

export default BooleanDataType;
