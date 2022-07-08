import { shallow } from "enzyme";
import React from "react";
import { StyleSheetTestUtils } from "aphrodite";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { App, listNotificationsInitialState, mapStateToProps } from "./App";
import uiReducer, { initialState } from "../reducers/uiReducer";
import { expect as expectChai } from 'chai';
import CourseList from '../CourseList/CourseList';
import Login from '../Login/Login';

const store = createStore(uiReducer, initialState);
var _ = require('lodash');
const { fromJS } = require('immutable');

describe('Test App.js', () => {

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('App without crashing', (done) => {
    expectChai(shallow(<App />).exists());
    done();
  });

  it('check that CourseList is not displayed when isLoggedIn is false', (done) => {
    const wrapper = shallow(<App />);
    expectChai(wrapper.find(CourseList)).to.have.lengthOf(0);
    done();
  });

  it('check that CourseList is displayed and Login is not displayed when isLoggedIn is true', (done) => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expectChai(wrapper.find(CourseList)).to.have.lengthOf(1);
    expectChai(wrapper.find(Login)).to.have.lengthOf(0);
    done();
  });

  it('test that verify that the function returns the right object isUserLoggedIn', (done) => {
    let state = { ui: fromJS({ isUserLoggedIn: true }) } ;
    const result = mapStateToProps(state);
    expectChai(_.isEqual(result, { isLoggedIn: true, displayDrawer: undefined })).to.equal(true);
    done();
  });

  it('test that verify that the function returns the right object displayDrawer', (done) => {
    let state = { ui: fromJS({ isNotificationDrawerVisible: true }) };
    const result = mapStateToProps(state);
    expectChai(_.isEqual(result, { isLoggedIn: undefined, displayDrawer: true })).to.equal(true);
    done();
  });
});

