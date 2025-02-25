const createWebStorage = (type: "local" | "session") => {
  if (typeof window === "undefined") {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem(value: string) {
        return Promise.resolve(value);
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  const storage = type === "local" ? window.localStorage : window.sessionStorage;

  return {
    getItem(key: string) {
      return Promise.resolve(storage.getItem(key));
    },
    setItem(key: string, value: string) {
      storage.setItem(key, value);
      return Promise.resolve(value);
    },
    removeItem(key: string) {
      storage.removeItem(key);
      return Promise.resolve();
    },
  };
};

const storage = createWebStorage("session");

export default storage;
