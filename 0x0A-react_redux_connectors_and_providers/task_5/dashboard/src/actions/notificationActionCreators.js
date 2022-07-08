import { MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';


export const markAsAread = (index) => {
  return {
    type: MARK_AS_READ,
    index: index
  };  
};
export const boundMarkAsAread = (index) => dispatch(markAsAread(index));

export const setNotificationFilter = (filter) => {
  return {
    type: SET_TYPE_FILTER,
    filter: filter
  };
};
export const boundSetNotificationFilter = (index) => dispatch(setNotificationFilter(filter));

export const setLoadingState = (loading) => {
  return {
    type: SET_LOADING_STATE,
    loading: loading
  }
};

export const setNotifications = (data) => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data: data
  };
};

export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch("./notifications.json")
      .then((res) => res.json())
      .then((data) => dispatch(setNotifications(data)))
      .catch((error) => {})
      .finally(() => dispatch(setLoadingState(false)));
  };
};
