import LimitedView from "../crudEditor/interfaces/LimitedView";

function addParams(paramValues: Object, urlParams: Object[], from: Object[]) {
    for (let key in from) {
        let currentValue = from[key];
        if (typeof currentValue === "object") {
            continue;
        }
        if (key === "queryRoute" || key === "entity") { //hack for container
            continue;
        }
        if (currentValue) {
            paramValues[key] = currentValue;
            urlParams.push(key+"={"+key+"}");
        }
    }
}

function makeLimitedViewFromSearchForm(queryBaseRoute: string, extraUrlParams: Object[],
    searchForm: any): LimitedView {
    let paramValues = {};
    let urlParams = [];
    addParams(paramValues, urlParams, searchForm.props);
    addParams(paramValues, urlParams, searchForm.state);
    urlParams = [...urlParams, ...extraUrlParams];
    let requestPath = queryBaseRoute;
    if (urlParams.length) {
        requestPath += "?";
    }

    requestPath += urlParams.join("&");
    return {requestPath: requestPath, paramValues: paramValues}
}

export {makeLimitedViewFromSearchForm};
