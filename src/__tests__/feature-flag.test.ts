import { FeatureFlag } from '../index';

test('My FeatureFlag', () => {
  expect(FeatureFlag('Carl')).toBe('Olá Carl');
});