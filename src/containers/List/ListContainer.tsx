import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {TaskActions} from "../../store/actions/TaskActions";

export default () => {
    const tasks = useSelector((state: RootState) => state.taskStore.tasks)

    useEffect(() => {
        TaskActions.getTasks();
    }, [])

    return (
        <div>
            <ul>
                {tasks.map(task => <li key={task.id}>{task.name}</li>)}
            </ul>
        </div>
    );
}
