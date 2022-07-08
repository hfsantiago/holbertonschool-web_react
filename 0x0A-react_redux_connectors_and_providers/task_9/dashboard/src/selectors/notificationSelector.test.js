import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from './notificationSelector';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ } from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';
import { notificationReducer } from '../reducers/notificationReducer';
import { expect as expectChai } from 'chai';

var _ = require('lodash');
const { Map, fromJS } = require('immutable');

describe('Test notificationSelector.js', () => {
  const data = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", value: "New data available" }
  ];

  const state = fromJS({
    filter: "DEFAULT",
    notifications: notificationsNormalizer([
      { id: 1, isRead: false, type: "default", value: "New course available" },
      { id: 2, isRead: false, type: "urgent", value: "New resume available" },
      { id: 3, isRead: false, type: "urgent", value: "New data available" }
    ]).notifications
  });

  it('Test filterTypeSelected function', (done) => {
    const result = filterTypeSelected(notificationReducer(undefined, {}));
    expectChai(_.isEqual(result, 'DEFAULT')).to.equal(true);
    done();
  });

  it('Test getNotifications function', (done) => {
    const result = getNotifications(notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data: data }));
    const expected = notificationsNormalizer([
      { id: 1, isRead: false, type: "default", value: "New course available" },
      { id: 2, isRead: false, type: "urgent", value: "New resume available" },
      { id: 3, isRead: false, type: "urgent", value: "New data available" }
    ]);
    expectChai(_.isEqual(result, expected.notifications)).to.equal(true);
    done();
  });

  it('Test getUnreadNotifications function', (done) => {
    const state = {
      notifications: fromJS({
        messages: {
          1: { guid: 1, type: "default", value: "New course available", isRead: true, },
          2: { guid: 2, type: "urgent", value: "New resume available", isRead: false, },
          3: { guid: 3, type: "urgent", html: { __html: "xxx" }, isRead: true, },
        },
      }),
    };
    const expected = [
      { guid: 2, type: "urgent", value: "New resume available", isRead: false, },
    ];
    const result = getUnreadNotificationsByType(state);    
    expectChai(_.isEqual(result.toJS(), expected)).to.equal(true);
    done();
  });

  it('Test getUnreadNotifications function -> URGENT ', (done) => {
    const state = {
      notifications: fromJS({
        filter: "URGENT",
        messages: {
          1: { guid: 1, type: "default", value: "New course available", isRead: true, },
          2: { guid: 2, type: "urgent", value: "New resume available", isRead: false, },
          3: { guid: 3, type: "default", html: { __html: "xxx" }, isRead: true, },
        },
      }),
    };
    const expected = [
      { guid: 2, type: "urgent", value: "New resume available", isRead: false, },
    ];
    const result = getUnreadNotificationsByType(state);    
    expectChai(_.isEqual(result.toJS(), expected)).to.equal(true);
    done();
  });
});
