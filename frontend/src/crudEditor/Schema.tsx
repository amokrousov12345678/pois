import DataTypeEnum from "./interfaces/DataTypeEnum";

const employeeAttributes = [
    {key: "lastName", title: "Фамилия", dataType: DataTypeEnum.STRING, required: true},
    {key: "firstName", title: "Имя", dataType: DataTypeEnum.STRING, required: true},
    {key: "patronymic", title: "Отчество", dataType: DataTypeEnum.STRING},
    {key: "birthDate", title: "Дата рождения", dataType: DataTypeEnum.DATE, required: true},
    {key: "age", title: "Возраст", dataType: DataTypeEnum.DATE},
    {key: "division", title: "Отдел", dataType: DataTypeEnum.LINK,
        linkedEntity: "divisions", required: true},
];

const editableEmployeeKeys = ["lastName", "firstName", "patronymic", "birthDate", "division"];
const schema = {
    "patents": {
        attributes: [
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "description", title: "Описание", dataType: DataTypeEnum.TEXT},
            {key: "issueDate", title: "Дата выдачи", dataType: DataTypeEnum.DATE, required: true},
            {key: "constructor", title: "Кому выдано", dataType: DataTypeEnum.LINK,
                linkedEntity: "constructors", required: true},
        ],
        keysInGrid: new Set(["name", "description", "issueDate", "constructor"]),
        keysInEditor: new Set(["name", "description", "issueDate", "constructor"]),
    },
    "employees": {
        attributes: [...employeeAttributes,
            {key: "entityType", title: "Тип сотрудника", dataType: DataTypeEnum.EMPLOYEE_TYPE}],
        keysInGrid: new Set(["lastName", "firstName", "patronymic", "birthDate", "age", "division", "entityType"]),
        keysInEditor: new Set(editableEmployeeKeys),
        keysInChoiceGrid: new Set(["lastName", "firstName", "patronymic", "entityType"]),
        addableAncestors: [
            {entity: "constructors", value: "Конструктор"},
            {entity: "engineers", value: "Инженер"},
            {entity: "technicians", value: "Техник"},
            {entity: "otherEmployees", value: "Прочие"},
        ]
    },
    "constructors": {
        attributes: [
            ...employeeAttributes,
            {key: "patents", title: "Авторские удостоверения", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "patents"},
            {key: "leadedProjects", title: "Руководимые проекты", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "projects"},
        ],
        keysInGrid: new Set(["lastName", "firstName", "patronymic", "patents", "leadedProjects"]),
        keysInEditor: new Set(editableEmployeeKeys),
        keysInChoiceGrid: new Set(["lastName", "firstName", "patronymic"]),
    },
    "engineers": {
        attributes: [
            ...employeeAttributes,
            {key: "leadedContracts", title: "Руководимые договоры", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "contracts"},
        ],
        keysInGrid: new Set(["lastName", "firstName", "patronymic", "leadedContracts"]),
        keysInEditor: new Set(editableEmployeeKeys),
        keysInChoiceGrid: new Set(["lastName", "firstName", "patronymic"]),
    },
    "technicians": {
        attributes: [
            ...employeeAttributes,
            {key: "servableEquipmentTypes", title: "Типы обслуживаемого оборудования", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "equipmentTypes"},
        ],
        keysInGrid: new Set(["lastName", "firstName", "patronymic", "servableEquipmentTypes"]),
        keysInEditor: new Set([...editableEmployeeKeys, "servableEquipmentTypes"]),
        keysInChoiceGrid: new Set(["lastName", "firstName", "patronymic"]),
    },
    "otherEmployees": {
        attributes: [
            ...employeeAttributes,
            {key: "description", title: "Описание сотрудника", dataType: DataTypeEnum.TEXT},
        ],
        keysInGrid: new Set(["lastName", "firstName", "patronymic", "description"]),
        keysInEditor: new Set([...editableEmployeeKeys, "description"]),
    },
    "divisions": {
        attributes: [
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "employees", title: "Сотрудники", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "employees"},
            {key: "leader", title: "Руководитель", dataType: DataTypeEnum.LINK,
                linkedEntity: "employees", observedKey: "id",
                queryPath: "/search/findByDivision_Id?id={observedValue}"},
             {key: "ownedEquipments", title: "Владеемое оборудование", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "equipments"},
        ],
        keysInGrid: new Set(["name", "leader", "employees", "ownedEquipments"]),
        keysInEditor: new Set(["name", "leader"]),
        keysInChoiceGrid: new Set(["name"]),
    },
    "contracts": {
        attributes: [
            {key: "customer", title: "Заказчик", dataType: DataTypeEnum.STRING, required: true},
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "beginDate", title: "Начало выполнения", dataType: DataTypeEnum.DATE, required: true},
            {key: "endDate", title: "Окончание выполнения", dataType: DataTypeEnum.DATE},
            {key: "projects", title: "Проекты в договоре", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "projects"},
            {key: "totalCost", title: "Суммарная стоимость проектов", dataType: DataTypeEnum.MONEY, required: true},
            {key: "workgroupEmployees", title: "Сотрудники рабочей группы", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "employees"},
            {key: "leaderEngineer", title: "Ведущий инженер", dataType: DataTypeEnum.LINK,
                linkedEntity: "engineers", observedKey: "workgroupEmployees",
                queryPath: "/search/findByIdIn?ids={observedValue}"},

        ],
        keysInGrid: new Set(["customer", "name", "beginDate", "endDate", "totalCost", "projects"]),
        keysInEditor: new Set(["customer", "name", "beginDate", "endDate",
            "projects", "workgroupEmployees", "leaderEngineer"]),
        keysInChoiceGrid: new Set(["name", "beginDate", "endDate"]),
    },
    "projects": {
        attributes: [
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "beginDate", title: "Начало выполнения", dataType: DataTypeEnum.DATE, required: true},
            {key: "endDate", title: "Окончание выполнения", dataType: DataTypeEnum.DATE},
            {key: "associatedContracts", title: "Договоры, включающие проект", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "contracts"},
            {key: "workgroupEmployees", title: "Сотрудники рабочей группы", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "employees"},
            {key: "leaderConstructor", title: "Ведущий конструктор", dataType: DataTypeEnum.LINK,
                linkedEntity: "constructors", observedKey: "workgroupEmployees",
                queryPath: "/search/findByIdIn?ids={observedValue}"},
            {key: "totalCost", title: "Суммарная стоимость работ", dataType: DataTypeEnum.MONEY, required: true},
        ],
        keysInGrid: new Set(["name", "beginDate", "endDate", "associatedContracts", "totalCost"]),
        keysInEditor: new Set(["name", "beginDate", "endDate",
            "workgroupEmployees", "leaderConstructor"]),
        keysInChoiceGrid: new Set(["name", "beginDate", "endDate"]),
    },
    "equipments": {
        attributes: [
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "equipmentType", title: "Тип оборудования", dataType: DataTypeEnum.LINK,
                linkedEntity: "equipmentTypes", required: true},
            {key: "ownerDivision", title: "Отдел, с которому привязано", dataType: DataTypeEnum.LINK,
                linkedEntity: "divisions"},
            {key: "usingProject", title: "Проект, использующий сейчас", dataType: DataTypeEnum.LINK,
                linkedEntity: "projects"},
        ],
        keysInGrid: new Set(["name", "equipmentType", "ownerDivision", "usingProject"]),
        keysInEditor: new Set(["name", "equipmentType", "ownerDivision", "usingProject"]),
        keysInChoiceGrid: new Set(["name"]),
    },
    "equipmentTypes": {
        attributes: [
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "equipment", title: "Оборудование данного типа", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "equipments"},
        ],
        keysInGrid: new Set(["name", "equipment"]),
        keysInEditor: new Set(["name"]),
        keysInChoiceGrid: new Set(["name"]),
    },
    "subcontractors": {
        attributes: [
            {key: "name", title: "Название", dataType: DataTypeEnum.STRING, required: true},
            {key: "description", title: "Описание", dataType: DataTypeEnum.TEXT},
        ],
        keysInGrid: new Set(["name", "description"]),
        keysInEditor: new Set(["name", "description"]),
        keysInChoiceGrid: new Set(["name"]),
    },
    "subcontractorWorks": {
        attributes: [
            {key: "name", title: "Название работы", dataType: DataTypeEnum.STRING, required: true},
            {key: "subcontractor", title: "Субподрядчик", dataType: DataTypeEnum.LINK,
                linkedEntity: "subcontractors", required: true},
            {key: "project", title: "Проект", dataType: DataTypeEnum.LINK,
                linkedEntity: "projects", required: true},
            {key: "cost", title: "Стоимость", dataType: DataTypeEnum.MONEY, required: true},
        ],
        keysInGrid: new Set(["name", "subcontractor", "project", "cost"]),
        keysInEditor: new Set(["name", "subcontractor", "project", "cost"]),
    },
    "projectWorks": {
        attributes: [
            {key: "name", title: "Название работы", dataType: DataTypeEnum.STRING, required: true},
            {key: "project", title: "Проект", dataType: DataTypeEnum.LINK,
                linkedEntity: "projects", required: true},
            {key: "done", title: "Выполнена", dataType: DataTypeEnum.BOOLEAN, required: true},
            {key: "usedEquipment", title: "Оборудование", dataType: DataTypeEnum.LINK,
                linkedEntity: "equipments", observedKey: "project",
                queryPath: "/search/findByUsingProject_Id?id={observedValue}", required: false},
            {key: "cost", title: "Стоимость", dataType: DataTypeEnum.MONEY, required: true},
        ],
        keysInGrid: new Set(["name", "project", "usedEquipment", "cost", "done"]),
        keysInEditor: new Set(["name", "project", "usedEquipment", "cost", "done"]),
    },
    "equipmentUsages": {
        attributes: [
            {key: "actionType", title: "Операция", dataType: DataTypeEnum.STRING, required: true},
            {key: "dateTime", title: "Дата/время", dataType: DataTypeEnum.DATE,
                linkedEntity: "projects", required: true},
            {key: "equipment", title: "Оборудование", dataType: DataTypeEnum.LINK,
                linkedEntity: "equipments", required: true},
            {key: "project", title: "Проект", dataType: DataTypeEnum.LINK,
                linkedEntity: "projects", required: true},
        ],
        keysInGrid: new Set(["actionType", "dateTime", "equipment", "project"]),
    },
    "users": {
        attributes: [
            {key: "username", title: "Имя пользователя", dataType: DataTypeEnum.STRING, required: true},
            {key: "email", title: "Email", dataType: DataTypeEnum.STRING, required: true},
            {key: "privileges", title: "Привилегии", dataType: DataTypeEnum.MULTIPLE_LINKS,
                linkedEntity: "privileges"}
        ],
        keysInGrid: new Set(["username", "email", "privileges"]),
        keysInEditor: new Set(["username", "email", "privileges"]),
    },
    "privileges": {
        attributes: [
            {key: "name", title: "Привилегия", dataType: DataTypeEnum.STRING, required: true},
        ],
        keysInChoiceGrid: new Set(["name"]),
    }
}

class Schema {
    public static getAttributesInGrid(entity: string) {
        return schema[entity].attributes.filter((attribute) => schema[entity].keysInGrid.has(attribute.key));
    }

    public static getAttributesInEditor(entity: string) {
        const result = schema[entity].attributes.filter((attribute) => schema[entity].keysInEditor.has(attribute.key));
        console.log(result);
        return result;
    }

    public static getAttributesInChoiceGrid(entity: string) {
        return schema[entity].attributes.filter((attribute) => schema[entity].keysInChoiceGrid.has(attribute.key));
    }

    public static getAddableAncestors(entity: string) {
        return schema[entity].addableAncestors;
    }
}

export default Schema;
