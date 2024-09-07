const store: flagStore = {
    "disabledFlag": false,
    "enabledFlag": true,
};

export type flagStore = Record<string, boolean>;

export class FlagsStore {
    constructor(private readonly flagStore: flagStore) {}

    async getFlagsFromStore() {
        return Promise.resolve(this.flagStore);
    }
}