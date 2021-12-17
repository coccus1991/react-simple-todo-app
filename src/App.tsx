import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './assets/style/app.scss';
import MainHeader from './components/layout/MainHeader/MainHeader';
import { HashRouter } from 'react-router-dom';
import LazyComponent from './components/ui/LazyComponent/LazyComponent';

const ListTasksContainer = () => (
    <LazyComponent
        import={() =>
            import('./containers/ListTasksContainer/ListTasksContainer')
        }
    />
);
const AddTaskContainer = () => (
    <LazyComponent
        import={() => import('./containers/AddTaskContainer/AddTaskContainer')}
    />
);

const App = () => {
    return (
        <HashRouter>
            <MainHeader />
            <div className="row justify-content-center pt-3">
                <div className="col-4">
                    <Routes>
                        <Route path="tasks" element={<Outlet />}>
                            <Route
                                path="list"
                                element={<ListTasksContainer />}
                            />
                            <Route path="add" element={<AddTaskContainer />} />
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="/tasks/list" />}
                        />
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
};

export default App;
