import BaseApi, {HttpResponse} from "./BaseApi";

interface TaskObject {
    id?: string
    name: string,
    description: string,
    completed: boolean
}

export class TaskApi extends BaseApi {

    constructor() {
        super();
        this.contextApi = "task";
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     */
    getTasks(): Promise<HttpResponse> {
        return this.getClient().get("");
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     * @param task
     */
    addTask(task: TaskObject): Promise<HttpResponse> {
        return this.getClient().post("", task);
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     * @param task
     */
    updateTask(task: TaskObject): Promise<HttpResponse> {
        return this.getClient().put("", task);
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     * @param id
     */
    deleteTask(id: string): Promise<HttpResponse> {
        return this.getClient().delete(`/${id}`);
    }
}
