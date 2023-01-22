import React from "react";

import DataType from "./DataType";

abstract class PlainDataType extends DataType {

    parseJsonToEditorValue(jsonValue: any): any {
        return jsonValue;
    }

    getDefaultEditorValue(): any {
        return "";
    }

    serializeEditorValue(value: any): any {
        if (value === "") {
            return null;
        }
        return value;
    }

    getSortable(): boolean {
        return true;
    }

    renderInGrid(value: any): React.ReactNode {
        return <>{value as string}</>;
    }
}

export default PlainDataType;
