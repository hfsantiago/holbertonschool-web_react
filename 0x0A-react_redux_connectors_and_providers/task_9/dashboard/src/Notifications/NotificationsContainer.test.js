import React from "react";
import { shallow } from "enzyme";

import { NotificationsContainer } from "./NotificationsContainer";

describe("Test NotificationsContainer.js", () => {
  it(" It should make sure the fetching is happening on mount", (done) => {
    const fetchNotifications = jest.fn();
    const wrapper = shallow(<NotificationsContainer fetchNotifications={fetchNotifications} /> );
    expect(fetchNotifications).toHaveBeenCalled();
    done();
  });
});
