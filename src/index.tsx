import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Config from './services/config/config';

Config.getInstance()
    .loadConfig()
    .then(async () => {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        );
    })
    .catch((e) => console.log(e.message));
