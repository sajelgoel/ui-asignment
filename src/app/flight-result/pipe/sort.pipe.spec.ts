import { SortPipe } from './sort.pipe';
import { fakeData } from './fake.data';

describe('SortPipe', () => {
  let pipe: SortPipe;
  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('deafault case no sorting', () => {
    const transformedValue = pipe.transform(fakeData, '');
    expect(transformedValue[0].name).toBe(fakeData[0].name);
  });

  it('case "1" Price (Lowest to Highest)', () => {
    const transformedValue = pipe.transform(fakeData, '1');
    expect(transformedValue[0].name).toBe('IndiGo');
  });

  it('case "2" Price (Highest to Lowest)', () => {
    const transformedValue = pipe.transform(fakeData, '2');
    expect(transformedValue[2].name).toBe('IndiGo');
  });

  it('case "3" Duration (Shortest to Longest)', () => {
    const transformedValue = pipe.transform(fakeData, '3');
    expect(transformedValue[0].name).toBe('British Airways');
  });

  it('case "4" Duration (Longest to Shortest)', () => {
    const transformedValue = pipe.transform(fakeData, '4');
    expect(transformedValue[2].name).toBe('British Airways');
  });

  it('case "5" Departure (Earliest to Latest)', () => {
    const transformedValue = pipe.transform(fakeData, '5');
    expect(transformedValue[0].name).toBe('British Airways');
  });

  it('case "6" Arrival (Earliest to Latest)', () => {
    const transformedValue = pipe.transform(fakeData, '6');
    expect(transformedValue[0].name).toBe('IndiGo');
  });

  it('case "7" Airline (A to Z)', () => {
    const transformedValue = pipe.transform(fakeData, '7');
    expect(transformedValue[0].name).toBe('British Airways');
  });

  it('case "8" Airline (Z to A)', () => {
    const transformedValue = pipe.transform(fakeData, '8');
    expect(transformedValue[0].name).toBe('IndiGo');
  });

  it('when array is empty', () => {
    const transformedValue = pipe.transform([], '');
    expect(transformedValue).toEqual([]);
  });
});
