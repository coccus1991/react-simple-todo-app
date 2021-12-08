import React, {useRef} from "react";
import {TaskActions} from "../../store/actions/TaskActions";
import TaskEntity from "../../entities/TaskEntity";
import {useNavigate} from "react-router-dom";

export default () => {
    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const navigate = useNavigate();

    const onSubmitHandler = async form => {
        form.preventDefault();

        const newTask = new TaskEntity();
        newTask.name = nameInput.current.value;
        newTask.description = descriptionInput.current.value

        try {
            await TaskActions.addTask(newTask);
            navigate("/tasks/list")
        } catch (e) {

        }
    };

    return (
        <div className="row d-grid">
            <form onSubmit={onSubmitHandler}>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                        <input required ref={nameInput} type="text" name="task" className="form-control"/>
                    </div>
                </div>

                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea ref={descriptionInput} required className="form-control" rows={4} />
                    </div>
                </div>

                <div className="col justify-content-end">
                    <button className="btn btn-success" type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}
