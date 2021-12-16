import axios, {AxiosResponse} from 'axios';
import config from "../config/config";

export class HttpError extends Error {
    constructor(public message: string, public statusCode: string, public body: string) {
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HttpResponse<DateType> {
    constructor(public data: DateType, public status: number, public statusText: string, public headers: Record<string, string>) {
    }
}

export default class BaseApi {

    protected contextApi = "";

    /**
     * @param token
     */
    constructor(private token?: string) {
    }

    /**
     * @returns {AxiosInstance}
     */
    getClient() {
        const headers: Record<string, string> = {};

        if (this.token)
            headers.Authorization = `Bearer ${this.token}`;

        const client = axios.create({
            baseURL: config.getInstance().getProperty<string>("api.baseUrl", "").replace(/$\//, "") + "/" + this.contextApi.replace(/^\//, ""),
            headers: headers
        });

        client.interceptors.response.use((response: AxiosResponse) => {
            return new HttpResponse(response.data, response.status, response.statusText, response.headers)
        }, (error) => {
            throw (new HttpError(error.message, error.response.status, error.response.data));
        });

        return client;
    }
}
