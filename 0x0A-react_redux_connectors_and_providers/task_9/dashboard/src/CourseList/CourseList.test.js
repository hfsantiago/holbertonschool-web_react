import React from 'react';
import { shallow } from 'enzyme';
import { expect as expectChai } from 'chai';

import { CourseList } from './CourseList'
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from "aphrodite";

describe('Test CourseList.js', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('CourseList without crashing', (done) => {
    expectChai(shallow(<CourseList listCourses={listCourses}/>).exists());
    done();
  });

  it('renders 5 diferent rows', (done) => {
    const wrapper = shallow(<CourseList listCourses={listCourses}/>);    
    expectChai(wrapper.find(CourseListRow)).to.have.lengthOf(5);
    done();
  });

  it('Verify that CourseList renders correctly if you pass an empty array or if you don’t pass the listCourses property', (done) => {
    let wrapper = shallow(<CourseList listCourses={null}/>);
    expectChai(wrapper.find(CourseListRow)).to.have.lengthOf(3);
    wrapper = shallow(<CourseList />);
    expectChai(wrapper.find(CourseListRow)).to.have.lengthOf(3);
    done();
  });

  it('verify that when you pass a list of courses, the component renders it correctly', (done) => {
    const wrapper = shallow(<CourseList listCourses={listCourses}/>);
    expectChai(wrapper.find(CourseListRow).first().html()).to.match(/<tr style="background-color:#deb5b545"><th colSpan="2" class="thFirt*/);
    expectChai(wrapper.find(CourseListRow)).to.have.lengthOf(5);
    done();
  });

  it("verify that the function fetchCourses is called when the component is mounted", (done) => {
    const fetchCourses = jest.fn();
    const wrapper = shallow(<CourseList fetchCourses={fetchCourses} />);
    expect(fetchCourses).toHaveBeenCalled();
    done();
  });

  it("verify that the two actions are correctly dispatched when the onChangeRow function is called", (done) => {
    const fetchCourses = jest.fn();
    const selectCourse = jest.fn();
    const unSelectCourse = jest.fn();
    const wrapper = shallow(
      <CourseList fetchCourses={fetchCourses} selectCourse={selectCourse} unSelectCourse={unSelectCourse} />
    );
    const instance = wrapper.instance();

    instance.onChangeRow("1", true);
    expect(selectCourse).toHaveBeenCalled();
    instance.onChangeRow("1", false);
    expect(unSelectCourse).toHaveBeenCalled();
    done();
  });
});
