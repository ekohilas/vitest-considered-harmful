const store: flagStore = {
    "disabledFlag": false,
    "enabledFlag": true,
};

export type flagStore = Record<string, boolean>;

export async function getFlagsFromStore() {
    return Promise.resolve(store);
}