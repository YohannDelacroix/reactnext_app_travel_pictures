const createNoopStorage = () => {
    return {
      getItem(_key: string) {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: any) {
        return Promise.resolve(value);
      },
      removeItem(_key: string) {
        return Promise.resolve();
      },
    };
  };
  
  const storage = typeof window !== "undefined" ? require("redux-persist/lib/storage").default : createNoopStorage();
  
  export default storage;