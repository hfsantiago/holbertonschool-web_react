import getAllNotificationsByUser from './notifications';
import { expect as expectChai } from 'chai';

describe('Test notifications.js', () => {
  it('verify is using this id -> 5debd764a7c57c7839d722e9 return the correct value', (done) => {
    const data = getAllNotificationsByUser('5debd764a7c57c7839d722e9');
    const result = [
      {
        guid: "2d8e40be-1c78-4de0-afc9-fcc147afd4d2",
        isRead: true,
        type: "urgent",
        value:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      },
      {
        guid: "280913fe-38dd-4abd-8ab6-acdb4105f922",
        isRead: false,
        type: "urgent",
        value:
          "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
      }
    ];

    expectChai(data.length).to.equal(result.length);
    for(let i = 0; i < data.length; i++) {
      const o1 = data[i];
      const o2 = result[i];
      expectChai(Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p] === o2[p])).to.equal(true);
    }

    expect(data).toEqual(expect.arrayContaining(result));
    done();
  });
});
