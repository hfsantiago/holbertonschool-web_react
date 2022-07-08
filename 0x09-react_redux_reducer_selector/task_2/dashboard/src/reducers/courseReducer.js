import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

export const courseReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_COURSE_SUCCESS:
      return action.data.map((course) => {
        return { ...course, isSelected: false };
      });
    case SELECT_COURSE:
      return state.map((course) => {
        if (action.index === course.id)
          return { ...course, isSelected: true };
        return { ...course };
      });
    case UNSELECT_COURSE:
      return state.map((course) => {
        if (action.index === course.id)
          return { ...course, isSelected: false };
        return { ...course };
      });
    default:
      break;
  }

  return state;
};
