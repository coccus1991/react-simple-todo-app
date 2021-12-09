import TaskEntity from "../entities/TaskEntity";
import {TaskApi} from "../services/api/TaskApi";
import {ModelMapper} from "../utilities/MapperLibrary/MapperLibrary";

export interface TaskRepositoryInterface {
    getTasks(): Promise<Array<TaskEntity>>;

    addTask(task: TaskEntity): Promise<TaskEntity>;

    updateTask(task: TaskEntity): Promise<TaskEntity>;

    deleteTask(task: TaskEntity): Promise<boolean>;
}

export default class TaskRepository implements TaskRepositoryInterface {
    private apiClient: TaskApi;

    constructor() {
        this.apiClient = new TaskApi();
    }

    /**
     * @throws HttpError
     */
    async getTasks(): Promise<Array<TaskEntity>> {
        const {data}: any = await this.apiClient.getTasks();

        return data.map(elem => new ModelMapper(TaskEntity).map(elem));
    }

    async addTask(task: TaskEntity): Promise<TaskEntity> {
        const {data} = await this.apiClient.addTask(task.toJSON());

        return new ModelMapper(TaskEntity).map(data);
    }

    async updateTask(task: TaskEntity): Promise<TaskEntity> {
        const {data} = await this.apiClient.updateTask(task.toJSON());

        return new ModelMapper(TaskEntity).map(data);
    }

    async deleteTask(task: TaskEntity): Promise<boolean> {
        await this.apiClient.deleteTask(task.id);
        return true;
    }
}
