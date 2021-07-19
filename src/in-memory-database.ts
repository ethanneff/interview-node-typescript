type DatabaseRecord = {
  id: string;
};

type Database<T extends DatabaseRecord> = {
  get: (key: string) => T | undefined;
  set: (val: T) => void;
};

export const createDatabase = <T extends DatabaseRecord>(): Database<T> => {
  const SingletonDatabase = (() => {
    const db: Record<string, T> = {};
    return {
      get: (key: string) => db[key],
      set: (val: T) => (db[val.id] = val),
    };
  })();

  return SingletonDatabase;
};
