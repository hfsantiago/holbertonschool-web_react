import React from "react";
import { shallow } from "enzyme";

import { Footer } from "./Footer";
import { StyleSheetTestUtils } from "aphrodite";

describe('Test Footer.js', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('Footer without crashing', (done) => {
    expect(shallow(<Footer />).exists());
    done();
  });

  it('renders Copyright text', (done) => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('p')).toHaveLength(1);
    done();
  });

  it('test to verify that the link is not displayed when the user is logged out within the context', (done) => {
    const wrapper = shallow(<Footer/>);
    expect(wrapper.find('a')).toHaveLength(0);
    done();
  });

  it('test to verify that the link is displayed when the user is logged in within the context', (done) => {
    const user = { email: "test@test.com", password: "test" };
    const wrapper = shallow(<Footer user={user}/>);
    expect(wrapper.find('a')).toHaveLength(1);
    done();
  });
});
