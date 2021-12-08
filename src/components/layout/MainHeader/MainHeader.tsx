import React from "react";
import classes from "./MainHeader.module.scss";
import {NavLink} from "react-router-dom";


export default () => {
    return (
        <header className={`${classes.mainHeader} row align-items-center`}>
                <div className="col-4">
                    <h1>Todo App</h1>
                </div>

                <div className="col-8">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/tasks/list">List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/tasks/add">Add</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
        </header>
    );
}
