import { courseSelector } from './courseSelector';

var _ = require('lodash');
const { Map, fromJS } = require('immutable');

describe('Test courseSelector.js', () => {
  it('Test courseSelector function', (done) => {
    const state = {
      courses: fromJS([
        { id: 1, name: "ES6", isSelected: false, credit: 60, },
        { id: 2, name: "Webpack", isSelected: false, credit: 20, },
        { id: 3, name: "React", isSelected: false, credit: 40, },
      ]),
    };
    const expected = [
      { id: 1, name: "ES6", isSelected: false, credit: 60 },
      { id: 2, name: "Webpack", isSelected: false, credit: 20 },
      { id: 3, name: "React", isSelected: false, credit: 40 }
    ];
    const result = courseSelector(state);
    expect(_.isEqual(result.toJS(), expected)).toEqual(true);
    done();
  });
});
