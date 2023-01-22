import {Session} from "./Session";
const session = Session.getInstance();
import {BACKEND_ROOT_URL} from "../crudEditor/Params";
import axios from "axios";
import {NotificationManager} from "react-notifications";

class Api {
    private static instance: Api = null;
    private backendRootUrl: string;

    protected constructor(backendRootUrl: string) {
        this.backendRootUrl = backendRootUrl;
    }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api(BACKEND_ROOT_URL);
        }
        return Api.instance;
    }

    private static showDialogAboutError(error: AxiosError) {
        if (!error.response) {
            NotificationManager.error("Ошибка при отправке запроса. Проверьте сетевое подключение");
            return;
        }
        if (error.response.status == "403") {
            NotificationManager.error("Доступ запрещен");
            return;
        }
        NotificationManager.error("Ошибка при отправке запроса");
        return;
    }
    public async doRequest(method: string, path: string, extraUrlParams: any, requestBody: any): any {
        if (!extraUrlParams) {
            extraUrlParams = {};
        }
        let headers = {};
        if (path != "/login" && session.getAuthToken()) {
            headers["Authorization"] =  "Bearer " + session.getAuthToken();
        }
        try {
            const response = await axios({method: method, url: this.makeUrlFromPath(path),
                params: extraUrlParams, data: requestBody,
                headers: headers});
            return response.data;
        } catch (error) {
            Api.showDialogAboutError(error);
            console.log(error);
            throw error;
        }

    }

    public makeUrlFromPath(path: string) {
        return this.backendRootUrl + path;
    }

    public get(path: string, extraUrlParams: any): any {
        return this.doRequest("get", path, extraUrlParams, null);
    }

    public delete(path: string): any {
        return this.doRequest("delete", path, null, null);
    }

    public post(path: string, requestBody: any): any {
        return this.doRequest("post", path, null, requestBody);
    }

    public patch(path: string, requestBody: any): any {
        return this.doRequest("patch", path, null, requestBody);
    }
}

export {Api};
