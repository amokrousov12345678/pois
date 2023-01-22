import DataTypeEnum from "./DataTypeEnum";

interface Column {
    key: string;
    title: string;
    dataType: DataTypeEnum;
    linkedEntity?: string;
    required: boolean;
    observedKey?: string; //field on which value depends dataset in this field
    queryPath?: string; //like /search/findByIdIn?ids={observedValue}
};

export default Column;
