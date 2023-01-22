import React from "react";

import PlainDataType from "./PlainDataType";

class MoneyDataType extends PlainDataType {

    renderEditor(title: string, value: any, onChange: (newValue: any) => void, valid: boolean): React.ReactNode {
        function updateInput(e: React.ChangeEvent) {
            let newValue = Number.parseInt((e.target as any).value);
            if (newValue != newValue) {
                newValue = 0;
            }
            onChange(newValue);
        }

        return <p>{this.renderInputLabel(title, valid)}
                <input type="text" value={value} onChange={updateInput} />&nbsp;р.</p>;
    }

    renderInGrid(value: any): React.ReactNode {
        return <>{value as string}&nbsp;р.</>;
    }
}

export default MoneyDataType;
