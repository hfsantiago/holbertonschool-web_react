import { createSelector } from "reselect";

const { Map, fromJS } = require('immutable');

export const filterTypeSelected = (state) => {
  return state.get("filter");
};

export const getNotifications = (state) => {
  return state.get("notifications");
};

/*export const getUnreadNotifications = (state) => {
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
};*/

const getNotificationsSelector = (state) => state.notifications;
export const getUnreadNotificationsByType = createSelector(
  getNotificationsSelector,
  (notifications) => {
    const messages = notifications.get("messages");
    const filter = notifications.get("filter");

    if (messages) {
      let filtered;

      if (filter === "URGENT") {
        filtered = Map(messages)
          .valueSeq()
          .filter((value) => {
            try {
              if (value.get("isRead") === false && value.get("type") === "urgent")
                return value;
            } catch(err) {
              if (value["isRead"] === false && value["type"] === "urgent")
                return value;
            }
          });
      } else {
        filtered = Map(messages)
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

          console.log(filtered.toJS())
      }
      return filtered;
    }

    return messages;
  }
);
