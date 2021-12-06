import configLoader from "../../config/register";

class NotFoundConfig extends Error {
}

export default class Config {
    private static instance: Config;
    private configsStore: Array<Object> = [];
    private loadedConfig: boolean = false;

    static getInstance() {
        if (!Config.instance)
            Config.instance = new Config();

        return Config.instance;
    }

    async loadConfig(): Promise<boolean> {
        let module = null;

        if (!this.loadedConfig) {
            for (let i = 0; i < configLoader.length; i++) {
                module = await configLoader[i].file();
                this.configsStore[configLoader[i]["name"]] = await fetch(module.default).then((res) => res.json());
            }

            this.loadedConfig = true;
        }

        return true;
    }

    getConfig(name: string) {
        if (typeof this.configsStore[name] === "undefined")
            throw new NotFoundConfig("Config not found");

        return this.configsStore[name];
    }

    getAllConfig() {
        return this.configsStore;
    }

    getProperty( propertyName: string, defaultValue = null) {
        return propertyName.split('.').reduce((acc, part) => acc && acc[part], this.configsStore) || defaultValue;
    }
}