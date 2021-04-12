import { FilterPipe } from './filter.pipe';
import { fakeData } from './fake.data';

describe('FilterPipe', () => {
  it('check with default filter', () => {
    const pipe = new FilterPipe();
    const value = {
      economy: false,
      firstClass: false,
      maximumPrice: 1000,
      minimumPrice: 100,
    };
    const transformedArray = pipe.transform(fakeData, value);
    expect(transformedArray.length).toEqual(3);
  });

  it('params parameter is empty ', () => {
    const pipe = new FilterPipe();
    const value = '';
    const transformedArray = pipe.transform(fakeData, value);
    expect(transformedArray.length).toEqual(3);
  });

  it('check with all filter set', () => {
    const pipe = new FilterPipe();
    const value = {
      economy: true,
      firstClass: true,
      maximumPrice: 400,
      minimumPrice: 200,
    };
    const transformedArray = pipe.transform(fakeData, value);
    expect(transformedArray.length).toEqual(0);
  });
});
