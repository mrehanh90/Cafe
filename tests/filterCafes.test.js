const { filterCafes, distanceKm, sortByDistance } = require('../utils/filterCafes');

const sample = [
  { id: 1, name: 'Brew', address: 'E-7 Islamabad', description: 'coffee and bakery', features: ['wifi', 'bakery'], lat: 33.72, lng: 73.04 },
  { id: 2, name: 'Table Talk', address: 'F-6/3 Islamabad', description: 'desi food', features: ['cozy'], lat: 33.73, lng: 73.07 },
  { id: 3, name: 'No Coords Cafe', address: 'unknown', description: 'test entry', features: ['wifi'], lat: null, lng: null },
];

describe('filterCafes', () => {
  test('returns everything when no query/filter given', () => {
    expect(filterCafes(sample)).toHaveLength(3);
  });

  test('matches on name (case insensitive)', () => {
    const result = filterCafes(sample, { query: 'brew' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Brew');
  });

  test('matches on description too', () => {
    const result = filterCafes(sample, { query: 'desi' });
    expect(result[0].name).toBe('Table Talk');
  });

  test('filters by feature tag', () => {
    const result = filterCafes(sample, { feature: 'wifi' });
    expect(result.map((c) => c.id)).toEqual([1, 3]);
  });

  test('combines query + feature', () => {
    const result = filterCafes(sample, { query: 'brew', feature: 'bakery' });
    expect(result).toHaveLength(1);
  });

  test('returns empty array when nothing matches', () => {
    expect(filterCafes(sample, { query: 'nothing_matches_this' })).toHaveLength(0);
  });
});

describe('distanceKm', () => {
  test('distance to self is 0', () => {
    expect(distanceKm(33.72, 73.04, 33.72, 73.04)).toBeCloseTo(0);
  });

  test('roughly matches known F-6 to F-7 distance (~3km)', () => {
    const d = distanceKm(33.735, 73.078, 33.726, 73.058);
    expect(d).toBeGreaterThan(1);
    expect(d).toBeLessThan(5);
  });
});

describe('sortByDistance', () => {
  test('drops entries without coordinates', () => {
    const sorted = sortByDistance(sample, 33.72, 73.04);
    expect(sorted).toHaveLength(2);
  });

  test('closest cafe comes first', () => {
    const sorted = sortByDistance(sample, 33.72, 73.04);
    expect(sorted[0].name).toBe('Brew');
  });
});
