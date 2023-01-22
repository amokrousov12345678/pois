import React from "react";
import {Link} from "react-router-dom";

import Column from "../interfaces/Column";
import DataType from "./DataType";
import {FRONTEND_CRUD_ROOT_URL, CHOICE_GRID_PROJECTION_NAME, ROWS_PER_PAGE_EDITOR} from "../Params";

import UrlDbGrid from "../components/UrlDbGrid";
import Schema from "../Schema";

import {Api} from "../../utils/Api";
const api = Api.getInstance();

interface ResourceLink {
    id: number;
    title: string;
}

function makeReactLink(linkedEntity: string, value: ResourceLink) {
    return <React.Fragment key={value.id}>
        <Link to={FRONTEND_CRUD_ROOT_URL + "/" + linkedEntity + "?id=" + value.id}>{value.title}</Link><br />
    </React.Fragment>
}

class LinkDataType extends DataType {
    private linkedEntity: string;
    private multiChoice: boolean;
    private queryPath: string;

    constructor(column: Column, multiChoice: boolean) {
        super(column);
        this.linkedEntity = column.linkedEntity;
        this.queryPath = column.queryPath;
        this.multiChoice = multiChoice;
    }

    parseJsonToEditorValue(jsonValue: any): any {
        if (this.multiChoice) {
            return new Set<number>(jsonValue.map(item => item.id));
        }

        if (!jsonValue) {
            return new Set<number>();
        }
        return new Set<number>([jsonValue.id]);
    }

    getDefaultEditorValue(): any {
        return new Set<number>();
    }

    serializeEditorValue(value: any, observedValue?: Set<number>): any {
        let valueAsArray = [...value];
        console.log(observedValue);
        //if (observedValue && typeof observedValue == "object") {
        //    valueAsArray = valueAsArray.filter((item) => observedValue.has(item));
        //}

        valueAsArray = valueAsArray.map((id) => api.makeUrlFromPath("/" + this.linkedEntity + "/" + id));

        if (this.multiChoice) {
            return valueAsArray;
        }

        if (valueAsArray.length) {
            return valueAsArray[0];
        }
        return null;
    }



    renderEditor(title: string, value: any, onChange: (newValue: any) => void,
        valid: boolean, observedValue?: Set<number>): React.ReactNode {

        function getObservedValueAsUrlParam(observedValue?: any): string {
            if (typeof observedValue == "object") {
                return [...observedValue].join(",");
            }
            return observedValue as string;
        }

        let queryRoute = "/" + this.linkedEntity;

        if (this.queryPath) {
            queryRoute += this.queryPath.replace("{observedValue}", getObservedValueAsUrlParam(observedValue))
                + "&projection=" + CHOICE_GRID_PROJECTION_NAME;
        } else {
            queryRoute += "?projection=" + CHOICE_GRID_PROJECTION_NAME;
        }

        function choiceItem(value: any,  onChange: (newValue: any) => void, id: number, e: React.ChangeEvent) {
            const newCheckedValue = e.target.checked;
            let newValue = Object.assign(value);

            if (!this.multiChoice) {
                newValue.clear();
            }

            if (newCheckedValue) {
                newValue.add(id);
            } else {
                newValue.delete(id);
            }
            onChange(newValue);
        }

        function choiceButtonRender(value: any, onChange: (newValue: any) => void, row: any) {
            return <input type={this.multiChoice ? "checkbox" : "radio"}
                    onChange={choiceItem.bind(this, value, onChange, row.id)} checked={value.has(row.id)} />
        }

        function unchoiceAll(onChange: (newValue: any) => void) {
            onChange(new Set<number>());
        }

        return <p>{this.renderInputLabel(title, valid)}<br />
            {!this.multiChoice && !this.required && <>
                <input type="radio" onChange={unchoiceAll.bind(this, onChange)}
                checked={value.size === 0} />&nbsp;&nbsp;Не выбрано<br/></>}
            <UrlDbGrid pageSize={ROWS_PER_PAGE_EDITOR} columns={Schema.getAttributesInChoiceGrid(this.linkedEntity)}
                queryRoute={queryRoute}
                onLeftExtraControlsRender={choiceButtonRender.bind(this, value, onChange)}
                onRightExtraControlsRender={() => null}/>
        </p>

    }

    renderInGrid(value: any): React.ReactNode {
        if (this.multiChoice) {
            return <>
                {value.map((item) => makeReactLink(this.linkedEntity, item))}
            </>
        }

        if (value) {
            return makeReactLink(this.linkedEntity, value);
        }

        return <>None</>;
    }
}

export default LinkDataType;
