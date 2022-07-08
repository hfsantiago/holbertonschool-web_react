import { selectCourse, unSelectCourse, setCourses, fetchCourses } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import { expect as expectChai } from 'chai';
import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
var _ = require('lodash');

describe('Test courseActionCreators.js', () => {
  it('test for the selectCourse action. Calling the creator with 1 as argument should return: "{ type: SELECT_COURSE, index: 1 }"' , (done) => {
    const data = selectCourse(1);
    const result = { type: SELECT_COURSE, index: 1 };
    expectChai(_.isEqual(data, result)).to.equal(true);
    done();
  });

  it('test for the unSelectCourse action. Calling the creator with 1 as argument should return: "{ type: UNSELECT_COURSE, index: 1 }"', (done) => {
    const data = unSelectCourse(1);
    const result = { type: UNSELECT_COURSE, index: 1 };
    expectChai(_.isEqual(data, result)).to.equal(true);
    done();
  });

  it('test for fetchCourses', (done) => {
    const store = mockStore({});
    fetchMock.restore();

    fetchMock.get("./courses.json", "{}");

    return store.dispatch(fetchCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(setCourses({}));
      done();
    });
  });
});
