// Borrowed from https://github.com/ember-cli/ember-cli/blob/master/blueprints/http-mock/index.js

var Blueprint = require('../../../ember-cli/lib/models/blueprint');

module.exports = {
  description: 'Generates a mock api endpoint in /api prefix with db storage (RethinkDB).',

  anonymousOptions: [
    'endpoint-path'
  ],

  locals: function(options) {
    return {
      path: '/' + options.entity.name.replace(/^\//, '')
    };
  },

  beforeInstall: function(options) {
    var serverBlueprint = Blueprint.lookup('server', {
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    return serverBlueprint.install(options);
  },

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'connect-restreamer', target: '^1.0.0' }
    ]);
  }
};
