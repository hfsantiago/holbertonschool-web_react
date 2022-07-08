import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';

export const initialState = {
  notifications: [],
  filter: "DEFAULT",
};

export const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.data.map((notification) => {
          return { ...notification, isRead: false };
        })
      };
    case MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map((notification) => {
          if (action.index === notification.id)
            return { ...notification, isRead: true };
          return { ...notification }
        })
      };
    case SET_TYPE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    default:
      break;
  }

  return state;
};

export default notificationReducer;
