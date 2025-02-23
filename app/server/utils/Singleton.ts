export const Singleton = <T>(factory: () => T) => {
    let instance: T | null = null;
    return () => {
        if (!instance) {
            instance = factory();
        }
        return instance;
    };
};