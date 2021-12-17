import configLoader from '../../config/register';

class NotFoundConfig extends Error {}

export default class Config {
    private static instance: Config;
    private configsStore: Record<string, unknown> = {};
    private loadedConfig = false;

    static getInstance() {
        if (!Config.instance) Config.instance = new Config();

        return Config.instance;
    }

    async loadConfig(): Promise<boolean> {
        let module = null;

        if (!this.loadedConfig) {
            for (let i = 0; i < configLoader.length; i++) {
                module = await configLoader[i].file();
                this.configsStore[configLoader[i].name] = await fetch(
                    module.default
                ).then((res) => res.json());
            }

            this.loadedConfig = true;
        }

        return true;
    }

    getConfig(name: string) {
        if (typeof this.configsStore[name] === 'undefined')
            throw new NotFoundConfig('Config not found');

        return this.configsStore[name];
    }

    getAllConfig() {
        return this.configsStore;
    }

    getProperty<T>(propertyName: string, defaultValue: T | null = null) {
        return (
            propertyName.split('.').reduce((acc: unknown, part: string) => {
                if (typeof acc === 'object') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return acc[part];
                }

                return acc;
            }, this.configsStore) || defaultValue
        );
    }
}
