import React, {useRef} from "react";
import {TaskActions} from "../../store/actions/TaskActions";
import TaskEntity from "../../entities/TaskEntity";
import {useNavigate} from "react-router-dom";

export default () => {
    const taskInput = useRef(null);
    const navigate = useNavigate();

    const onSubmitHandler = async form => {
        form.preventDefault();

        if(!taskInput.current.value)
            return

        const newTask = new TaskEntity();
        newTask.name = taskInput.current.value;

        try {
            await TaskActions.addTask(newTask)
            taskInput.current.value = "";
            navigate("/tasks/list")
        } catch (e) {

        }


    };

    return (
        <div className="row d-grid">
            <form onSubmit={onSubmitHandler}>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">New Task</label>
                        <input ref={taskInput} type="text" name="task" className="form-control"/>
                    </div>
                </div>

                <div className="col justify-content-end">
                    <button className="btn btn-success" type="submit">Add</button>
                </div>
            </form>

        </div>
    );
}
