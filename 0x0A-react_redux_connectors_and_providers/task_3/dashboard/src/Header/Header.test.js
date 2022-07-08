import React from "react";
import { shallow } from "enzyme";

import { Header } from "./Header";
import { StyleSheetTestUtils } from "aphrodite";

describe('Test Header.js', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('Header without crashing', (done) => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toEqual(true);
    done();
  });

  it('renders 1 img and 1 h1', (done) => {
    const user = { email: "test@test.com", password: "test" };
    const wrapper = shallow(<Header user={user}/>);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
    done();
  });

  it('test that mounts the Header component with a default context value. Verify that the logoutSection is not created', (done) => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('p#logoutSection')).toHaveLength(0);
    done();
  });

  it('test that mounts the Header component with a user defined (isLoggedIn is true and an email is set). Verify that the logoutSection is created', (done) => {
    const user = { email: "test@test.com", password: "test" };
    const wrapper = shallow(<Header user={user}/>);
    expect(wrapper.find('p#logoutSection')).toHaveLength(1);
    done();
  });
});
