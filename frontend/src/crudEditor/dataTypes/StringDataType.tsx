import React from "react";

import PlainDataType from "./PlainDataType";

class StringDataType extends PlainDataType {

    renderEditor(title: string, value: any, onChange: (newValue: any) => void, valid: boolean): React.ReactNode {
        function updateInput(e: React.ChangeEvent) {
            const newValue = (e.target as any).value;
            onChange(newValue);
        }

        return <p>{this.renderInputLabel(title, valid)}
                <input type="text" value={value} onChange={updateInput} /></p>;
    }
}

export default StringDataType;
