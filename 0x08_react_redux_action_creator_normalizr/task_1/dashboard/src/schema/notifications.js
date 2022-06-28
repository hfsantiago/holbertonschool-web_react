import * as notifications from '../../../../notifications.json';
import { normalize, schema } from 'normalizr';

const getAllNotificationsByUser = (userId) => 
  notifications.default.filter((notification) => notification.author.id === userId)
                .map((notification) => notification.context);

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, {
  idAttribute: 'guid'
});
const notification = new schema.Entity('notifications', {
  author: user,
  context: message
});
export const normalizedData = normalize(notifications.default, [notification]);


export default getAllNotificationsByUser;
