import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

const { Map, setIn } = require('immutable');

export const initialState = {
  notifications: {},
  filter: "DEFAULT",
  loading: false,
};

export const notificationReducer = (state = Map(initialState), action) => {
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const data = notificationsNormalizer(action.data);
      Object.keys(data.notifications).map((key) => {
        data.notifications[key].isRead = false;
      });
      return state.mergeDeep(data);
    case MARK_AS_READ:
      return setIn(state, ['messages', String(action.index), 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case SET_LOADING_STATE:
      return state.set('loading', action.loading)
    default:
      break;
  }

  return state;
};

export default notificationReducer;
