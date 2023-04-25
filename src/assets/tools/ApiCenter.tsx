import { loadJson } from "./Utils";

export class ApiClass {
    private instancce : ApiClass | null = null;
    private url : string = "";
    private constructor() {
        if (this.instancce) {
            return this.instancce;
        }
        this.instancce = this;
    }

    public static async getInstancce() {
        const api = new ApiClass();
        api.url = await loadJson("config.json").then((data:any) => data.url);
        return api;
    }

    public async request(path: string, method: string, body: any) {
        return new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, this.url + path);
            xhr.responseType = "json";
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(body);
        });
    }

    public async get(path: string) {
        return this.request(path, "GET", null);
    }

    public async post(path: string, body: any) {
        return this.request(path, "POST", body);
    }

    public async put(path: string, body: any) {
        return this.request(path, "PUT", body);
    }

    public async delete(path: string) {
        return this.request(path, "DELETE", null);
    }

}