import React from "react";

import PlainDataType from "./PlainDataType";

class TextDataType extends PlainDataType {

    renderEditor(title: string, value: any, onChange: (newValue: any) => void, valid: boolean): React.ReactNode {
        function updateInput(e: React.ChangeEvent) {
            const newValue = (e.target as any).value;
            onChange(newValue);
        }
        return <p>{this.renderInputLabel(title, valid)}<br />
            <textarea rows={3} cols={40} value={value} onChange={updateInput} /></p>;
    }
}

export default TextDataType;
