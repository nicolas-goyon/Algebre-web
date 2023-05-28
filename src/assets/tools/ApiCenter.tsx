import { getCookie } from "./Utils";

export class ApiClass {
    private static instance: ApiClass | null = null;
    public constructor() {
        if (ApiClass.instance) {
            return ApiClass.instance;
        }
        ApiClass.instance = this;
    }
    public async request(path: string, method: string, body: any) {
        function updateTokenApi(xhr: XMLHttpRequest) {
            if (xhr.response == null) {
                return;
            }
            const token = xhr.response.token;
            if (token)
                document.cookie = `token=${token}`;

        }

        return new Promise<any>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, path);
            xhr.setRequestHeader("Content-Type", "application/json");
            
            const token = getCookie("token");
            if (token)
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);

            xhr.responseType = "json";
            xhr.onload = () => {
                updateTokenApi(xhr);
                return resolve(xhr)
            };
            xhr.onerror = () => reject(xhr.statusText);
            if (body)
                xhr.send(JSON.stringify(body));
            else
                xhr.send();
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

    public async delete(path: string, body: any) {
        return this.request(path, "DELETE", body);
    }

    public async patch(path: string, body: any) {
        return this.request(path, "PATCH", body);
    }



}

export const api = new ApiClass();