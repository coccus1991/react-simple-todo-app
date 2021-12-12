import React, {useEffect} from "react";
import {Routes, Route, Navigate, Outlet} from "react-router-dom"
import "./assets/style/app.scss"
import ListTasksContainer from "./containers/ListTasksContainer/ListTasksContainer";
import MainHeader from "./components/layout/MainHeader/MainHeader";
import AddTaskContainer from "./containers/AddTaskContainer/AddTaskContainer";
import {HashRouter} from "react-router-dom";

// @ts-ignore
function App() {
    return (
        <HashRouter>
            <MainHeader/>
            <div className="row justify-content-center pt-3">
                <div className="col-4">
                    <Routes>
                        <Route path="tasks" element={<Outlet/>}>
                            <Route path="list" element={<ListTasksContainer/>}/>
                            <Route path="add" element={<AddTaskContainer/>}/>
                        </Route>
                        <Route path="*" element={<Navigate to="/tasks/list"/>}/>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    )
}

export default App;
