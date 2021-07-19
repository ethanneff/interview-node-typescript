import { createObserver } from '../pub-sub-observer';

describe('pub sub', () => {
  it('works', () => {
    expect.assertions(3);

    type ReduxTypes = 'createUser' | 'dispatchUser';
    type ReduxEvent = {
      type: ReduxTypes;
      payload: Record<string, unknown>;
    };
    const pubsub = createObserver<ReduxTypes, ReduxEvent>(),
      callback = jest.fn(),
      listener = (payload: ReduxEvent) => callback(payload),
      unsubscribe = pubsub.sub('createUser', listener),
      bob: ReduxEvent = { type: 'createUser', payload: { action: 'bob' } },
      jim: ReduxEvent = { type: 'createUser', payload: { action: 'jim' } },
      ben: ReduxEvent = { type: 'createUser', payload: { action: 'ben' } };

    pubsub.pub(bob);
    expect(callback).toHaveBeenCalledWith(bob);
    pubsub.pub(jim);
    expect(callback).toHaveBeenCalledWith(jim);
    unsubscribe();
    pubsub.pub(ben);
    expect(callback).not.toHaveBeenCalledWith(ben);
  });
});
