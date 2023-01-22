import React from "react";

import StringDataType from "./StringDataType";

class EmployeeTypeDataType extends StringDataType {
    renderInGrid(value: any): React.ReactNode {
        switch (value) {
            case "engineers": return <>Инженер</>;
            case "constructors": return <>Конструктор</>;
            case "technicians": return <>Техник</>;
            case "otherEmployees": return <>Обслуживающий персонал</>;
            default: return <>?</>;
        }
    }
}

export default EmployeeTypeDataType;
