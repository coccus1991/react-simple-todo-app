import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import store from "./store";
import App from "./App";
import Config from "./services/config/config";


Config.getInstance().loadConfig().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                    <App/>
            </Provider>
        </React.StrictMode>,
        document.getElementById("root")
    );
}).catch(e => console.log(e.message));
