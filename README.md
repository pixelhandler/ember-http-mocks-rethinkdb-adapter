# Ember HTTP Mocks RethinkDB Adapter

See [Ember CLI mocks-and-fixtures] documentation for information on how
Ember CLI supports generators for http-mocks. 

This addon extends the behavior of an http-mock by adding an adapter to
a document store using [RethinkDB]. This is useful when you want to
develop using live data that can be queried, e.g. with parameters
like `sortBy`, `limit`, `order`, `withFields`, `offset`.

Below is an example request URI using a query supported by the 
[rethinkdb_adapter]

* http://localhost:4200/api/posts?limit=10&order=desc&offset=0&sortBy=date&withFields=title

Using this addon requires a local installation of RethinkDB and adapter.

For more information on using ember-cli, visit [ember-cli.com].


## Installation

    npm install --save-dev rethinkdb_adapter
    ember install:addon ember-http-mocks-rethinkdb-adapter


## Generator: http-mocks-db

This addon uses Ember CLI generators to create a mock that is
backed up by a document store db, i.e. RethinkDB

    ember generate http-mocks-db `your-resource-name-pluralized`

For example use `ember generate http-mocks-db posts` for a collection of
post models. And with Ember data return `return this.store.find('post',
{ sortBy: 'date', order: 'desc', limit: 100 })` from your route's model
hook. After creating some records with the db administration tools, then
use your new endpoint backed by your db at http://localhost:4200/api/posts

After generating a db backed http-mock it may help to restart your app
with `ember server`.

For more info on generators use `ember help generate`


## RethinkDB

Here is a [Ten-minute guide] on [RethinkDB]

* [Install options]

For developers on a mac, install with [Homebrew], here is a link to a 
[shell script].

    brew update && brew install rethinkdb


### Starting your db

See the [30-second quickstart] for how to start and use the db.

To start the db (and create a db, if one doesn't exist), in the root of your
project use the command `rethinkdb`

Once you've started your db try out the [administration-tools] at
http://localhost:8080


### Back up your data

See the [Back up your data] guide for steps to import and export data.

Perhaps create a data directory in your project to keep db dumps.


[rethinkdb_adapter]: https://github.com/pixelhandler/rethinkdb_adapter
[Ember CLI mocks-and-fixtures]: http://www.ember-cli.com/#mocks-and-fixtures
[RethinkDB]: http://www.rethinkdb.com
[Install options]: http://www.rethinkdb.com/docs/install/
[30-second quickstart]: http://rethinkdb.com/docs/quickstart/
[administration-tools]: http://rethinkdb.com/docs/administration-tools/
[Back up your data]: http://rethinkdb.com/docs/backup/
[Homebrew]: http://brew.sh
[shell script]: https://github.com/pixelhandler/ember-slide-deck/blob/master/bin/install_rethinkdb.sh
[Ten-minute guide]: http://www.rethinkdb.com/docs/guide/javascript/
[ember-cli.com]: http://www.ember-cli.com/
