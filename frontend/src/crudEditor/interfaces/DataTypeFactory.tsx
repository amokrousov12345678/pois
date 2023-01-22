import DataTypeEnum from "./DataTypeEnum";
import Column from "../interfaces/Column";

import StringDataType from "../dataTypes/StringDataType";
import TextDataType from "../dataTypes/TextDataType";
import MoneyDataType from "../dataTypes/MoneyDataType";
import DateDataType from "../dataTypes/DateDataType";
import BooleanDataType from "../dataTypes/BooleanDataType";
import LinkDataType from "../dataTypes/LinkDataType";
import EmployeeTypeDataType from "../dataTypes/EmployeeTypeDataType";
import DataType from "../dataTypes/DataType";
import PasswordDataType from "../dataTypes/PasswordDataType";

function createDataTypeFromColumn(column: Column): DataType {
    switch (column.dataType) {
        case DataTypeEnum.STRING: return new StringDataType(column);
        case DataTypeEnum.TEXT: return new TextDataType(column);
        case DataTypeEnum.MONEY: return new MoneyDataType(column);
        case DataTypeEnum.DATE: return new DateDataType(column);
        case DataTypeEnum.BOOLEAN: return new BooleanDataType(column);
        case DataTypeEnum.LINK: return new LinkDataType(column, false);
        case DataTypeEnum.MULTIPLE_LINKS: return new LinkDataType(column, true);
        case DataTypeEnum.EMPLOYEE_TYPE: return new EmployeeTypeDataType(column);
        case DataTypeEnum.PASSWORD: return new PasswordDataType(column);
    }
}

export {createDataTypeFromColumn};
