import { createDatabase } from '../in-memory-database';

describe('memory database', () => {
  it('works', () => {
    expect.assertions(4);

    type CustomRecord = {
      id: string;
      power: number;
      count: number;
    };

    const db = createDatabase<CustomRecord>(),
      carRecord = { count: 12, id: 'car', power: 213 };

    expect(db.get('cart')).toBeUndefined();
    expect(db.set(carRecord)).toStrictEqual(carRecord);
    expect(db.get('car')).toStrictEqual(carRecord);
    expect(db.get('tractor')).toBeUndefined();
  });
});
