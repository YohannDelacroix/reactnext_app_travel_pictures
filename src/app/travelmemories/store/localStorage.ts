const createNoopStorage = () => {
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
};

const getStorage = async () => {
  if (typeof window !== "undefined") {
    const storageModule = await import("redux-persist/lib/storage");
    return storageModule.default;
  }
  return createNoopStorage();
};

export default await getStorage();
