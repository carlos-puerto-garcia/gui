import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

moduleFor('route:configuration', 'Unit | Route | configuration', {
  needs: ['service:notifier', 'service:exercism', 'service:configuration']
});

test('it bubbles if error when reading file', function(assert) {
  let route = this.subject();
  route.configuration = td.function();
  route.configuration.readConfigFile = td.function();
  td
    .when(route.configuration.readConfigFile())
    .thenThrow(new Error('Error: ENOENT, no such file or directory "/fake"'));

  assert.throws(function() {
      route.model();
    },
    new Error('Error: ENOENT, no such file or directory "/fake"'),
    ''
  );
});
