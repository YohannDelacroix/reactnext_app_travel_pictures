const createWebStorage = (type: "local" | "session") => {
    if (typeof window === "undefined") {
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
    }
  
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
  
    return {
      getItem(key: string) {
        return Promise.resolve(storage.getItem(key));
      },
      setItem(key: string, value: any) {
        storage.setItem(key, value);
        return Promise.resolve(value);
      },
      removeItem(key: string) {
        storage.removeItem(key);
        return Promise.resolve();
      },
    };
  };
  
  // Utilisation de sessionStorage
  const storage = createWebStorage("session");
  
  export default storage;