import rootReducer from "./rootReducer";
import { combineReducers } from "redux";
import { expect as expectChai } from 'chai';

import { initialState as initialStateCourse } from "./courseReducer";
import { initialState as initialStateNotification } from "./notificationReducer";
import { initialState as initialStateUiReducer } from "./uiReducer";
import { expect } from "chai";

var _ = require('lodash');
const { Map, fromJS } = require('immutable');

describe('Test rootReducer.js', () => {
  it('test the root reducer’s initial state', (done) => {
    const expected = {
      courses: Map(initialStateCourse),
      notifications: Map(initialStateNotification),
      ui: Map(initialStateUiReducer)
    };
    const reducer = combineReducers(rootReducer);
    const state = reducer(undefined, { type: "TEST" });

    expectChai(_.isEqual(expected, state)).to.equal(true);
    done();
  });
});
