import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { RSVP, A } = Ember;

moduleFor('service:search', 'Unit | Service | search', {
  needs: []
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.expect(10);

  service.set('client', {
    request(...args) {
      const [ path, , , method, { data } ] = args;

      assert.equal(path, 'channels');
      assert.equal(method, 'GET');
      assert.equal(data.q, 'test');
      return RSVP.Promise.resolve({ channels: new A() });
    }
  });

  assert.ok(service);

  assert.equal(service.get('noResults'), false);
  service.set('searchValue', 'test');
  assert.equal(service.get('noResults'), true);

  service.set('client', {
    request() {
      const channels = new A();
      channels.pushObject(Ember.Object.create({}));
      return RSVP.Promise.resolve({ channels });
    }
  });

  service.set('searchValue', 'test2');
  assert.equal(service.get('noResults'), false);
  assert.equal(service.get('searchResults.length'), 1);

  service.set('searchValue', '');
  assert.equal(service.get('noResults'), false);
  assert.equal(service.get('searchResults.length'), 0);

  service.set('client', null);
});
