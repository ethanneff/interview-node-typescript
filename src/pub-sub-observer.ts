type BaseEvent<T extends string> = {
  type: T;
};

type Listener<Key extends string, Event extends BaseEvent<Key>> = (
  event: Event,
) => void;

type ObserverDB<Key extends string, Event extends BaseEvent<Key>> = {
  [key: string]: Listener<Key, Event>[];
};

type CreateObserver<Key extends string, Event extends BaseEvent<Key>> = {
  pub: (event: Event) => void;
  sub: (key: Key, listener: Listener<Key, Event>) => () => void;
};

export const createObserver = <
  Key extends string,
  Event extends BaseEvent<Key>,
>(): CreateObserver<Key, Event> => {
  const ObserverSingleton = (() => {
    const db: ObserverDB<Key, Event> = {};
    return {
      pub: (event: Event) => {
        if (!db[event.type]) {
          return;
        }
        db[event.type].map((listener) => listener(event));
      },
      sub: (key: Key, listener: Listener<Key, Event>) => {
        if (db[key]) {
          db[key].push(listener);
        } else {
          db[key] = [listener];
        }
        return () => {
          db[key] = db[key].filter((l) => l !== listener);
        };
      },
    };
  })();

  return ObserverSingleton;
};
