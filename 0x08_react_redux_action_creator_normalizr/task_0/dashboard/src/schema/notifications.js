import * as notifications from '../../../../notifications.json';

const getAllNotificationsByUser = (userId) => 
  notifications.default.filter((notification) => notification.author.id === userId)
                .map((notification) => notification.context);

export default getAllNotificationsByUser;
