import BaseApi, {HttpResponse} from "./BaseApi";

interface TaskObject {
    id?: string
    name: string,
    description: string,
    completed: boolean
}

export class TaskApi extends BaseApi {
    private contextApi = "/task";

    /**
     * @throws HttpError
     * @return HttpResponse
     */
    getTasks(): Promise<HttpResponse> {
        return this.getClient().get(this.contextApi);
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     * @param task
     */
    addTask(task: TaskObject): Promise<HttpResponse>  {
        return this.getClient().post(this.contextApi, task);
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     * @param task
     */
    updateTask(task: TaskObject): Promise<HttpResponse>  {
        return this.getClient().put(this.contextApi, task);
    }

    /**
     * @throws HttpError
     * @return HttpResponse
     * @param id
     */
    deleteTask(id: string): Promise<HttpResponse>  {
        return this.getClient().delete(`${this.contextApi}/${id}`);
    }
}
