import BaseApi, { HttpResponse } from './BaseApi'

export interface TaskObject {
  id?: string
  name: string
  description: string
  created_date?: number
  completed: boolean
}

export class TaskApi extends BaseApi {
  constructor() {
    super()
    this.contextApi = 'task'
  }

  /**
   * @throws HttpError
   * @return HttpResponse
   */
  getTasks(): Promise<HttpResponse<TaskObject[]>> {
    return this.getClient().get('')
  }

  /**
   * @throws HttpError
   * @return HttpResponse
   * @param task
   */
  addTask(task: TaskObject): Promise<HttpResponse<TaskObject>> {
    return this.getClient().post('', task)
  }

  /**
   * @throws HttpError
   * @return HttpResponse
   * @param task
   */
  updateTask(task: TaskObject): Promise<HttpResponse<TaskObject>> {
    return this.getClient().put('', task)
  }

  /**
   * @throws HttpError
   * @return HttpResponse
   * @param id
   */
  deleteTask(id: string): Promise<TaskObject> {
    return this.getClient().delete(`/${id}`)
  }
}
