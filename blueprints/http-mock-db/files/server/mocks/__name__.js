module.exports = function(app) {
  var express = require('express');
  var <%= camelizedModuleName %>Router = express.Router();

  var resource = <%= dasherizedModuleName %>;
  var dbSetupConfig = {};
  dbSetupConfig[resource] = 'id';

  var db = require('rethinkdb_adapter');
  db.setup('http-mocks-db', dbSetupConfig);

  <%= camelizedModuleName %>Router.get('/', function(req, res) {
    db.findQuery(resource, req.query, function (err, payload) {
      if (err) {
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  <%= camelizedModuleName %>Router.post('/', function(req, res) {
    db.createRecord(resource, req.body[resource], function (err, payload) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(201).send(payload);
      }
    });
  });

  <%= camelizedModuleName %>Router.get('/:id', function(req, res) {
    var ids = req.params.id.split(',');
    if (ids.length === 1) {
      db.find(resource, ids[0], function (err, payload) {
        if (err) {
          res.sendStatus(500);
        } else {
          if (payload[resource] !== null) {
            res.send(payload);
          } else {
            db.findBySlug(resource, ids[0], function (err, payload) {
              if (err) {
                res.sendStatus(500);
              } else {
                if (payload[resource] !== null && payload[resource] !== void 0) {
                  res.send(payload);
                } else {
                  res.status(404).end();
                }
              }
            });
          }
        }
      });
    } else if (ids.length > 1) {
      db.findMany(resource, ids, function (err, payload) {
        if (err) {
          res.send(500);
        } else {
          res.send(payload);
        }
      });
    }
  });

  <%= camelizedModuleName %>Router.put('/:id', function(req, res) {
    db.updateRecord(resource, req.params.id, req.body[resource], function (err, payload) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(204).end(); // No Content
      }
    });
  });

  <%= camelizedModuleName %>Router.delete('/:id', function(req, res) {
    db.deleteRecord(resource, req.params.id, function (err) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(204).end(); // No Content
      }
    });
  });

  app.use('/api/<%= decamelizedModuleName %>', <%= camelizedModuleName %>Router);
};
