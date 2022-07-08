const { Map, fromJS } = require('immutable');

export const filterTypeSelected = (state) => {
  return state.get("filter");
};

export const getNotifications = (state) => {
  return state.get("notifications");
};

export const getUnreadNotifications = (state) => {
  const notifications = state.notifications.get("messages");

  if (notifications) {
    const filtered = Map(notifications)
      .valueSeq()
      .filter((value) => {
        try{
          if (value.get("isRead") === false)
            return value;
        } catch(err) {
          if (value["isRead"] === false)
            return value;
        }
      });

    return filtered;
  }

  return notifications;
};
