// @ts-ignore
import axios, {AxiosResponse} from 'axios';
import config from "../config/config";

export class HttpError extends Error {
    public message: string;
    public statusCode: string;
    public body: string;

    constructor (message, statusCode, body) {
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);

        this.statusCode = statusCode;
        this.body = body;
    }
}

export class HttpResponse {
    public data: string;
    public status: number;
    public statusText: string;
    public headers: Array<any>


    constructor(data, status, statusText, headers) {
        this.data = data;
        this.status = status;
        this.statusText = statusText;
        this.headers = headers;
    }
}

export default class BaseApi {
    private token: string;

    /**
     * @param token
     */
    constructor(token?) {
        this.token = token;
    }

    /**
     * @returns {AxiosInstance}
     */
    getClient() {
        let headers = {} as any;

        if (this.token)
            headers.Authorization = `Bearer ${this.token}`;

        const client = axios.create({
            baseURL: config.getInstance().getProperty("api.baseUrl") + "/api",
            headers: headers
        });

        // @ts-ignore
        client.interceptors.response.use((response: AxiosResponse) => {
           return new HttpResponse(response.data, response.status, response.statusText, response.headers)
        }, (error) => {
            throw (new HttpError(error.message, error.response.status, error.response.data));
        });

        return client;
    }
}