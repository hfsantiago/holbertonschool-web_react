import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { StyleSheet, css } from 'aphrodite';
import { connect } from "react-redux";

import CourseListRow from './CourseListRow';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';
import { courseSelector } from "../selectors/courseSelector";

export class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeRow = this.onChangeRow.bind(this);
  }

  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow(id, checked) {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  }

  render() {
    const { listCourses } = this.props;

    return (
      <div className={css(style.containerCourse)}>
        <table id='CourseList' className={css(style.tableStyle)}>
          <thead>
            <CourseListRow isHeader={true} textFirstCell="Available courses"></CourseListRow>
            <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit"></CourseListRow>
          </thead>
          <tbody>
            {!listCourses ? (<CourseListRow textFirstCell="No course available yet" isHeader={false} />) : <></>}
            {listCourses && listCourses.map((course) => (<CourseListRow key={course.id} id={course.id} textFirstCell={course.name} textSecondCell={course.credit} isHeader={false} isChecked={course.isSelected} onChangeRow={this.onChangeRow} />))}
          </tbody>
        </table>
      </div>
    );
  }
}


CourseList.defaultProps = {
  listCourses: null,
  fetchCourses: () => {},
  selectCourse: () => {},
  unSelectCourse: () => {},
};

CourseList.propTypes = {
  listCourses: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fetchCourses: PropTypes.func,
  selectCourse: PropTypes.func,
  unSelectCourse: PropTypes.func,
};

const style = StyleSheet.create({
  containerCourse: {
    minHeight: '26rem',
    padding: '1rem'
  },
  tableStyle: {
    width: '100%',
    borderCollapse: 'collapse'
  }
});


export const mapStateToProps = (state) => {
  const coursesList = courseSelector(state);
  return {
    listCourses: coursesList,
  };
};

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
