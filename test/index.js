var path = require('path')
var tape = require('tape')
var traktor = require('../.')

tape('load a collection file', function (t) {
  var collection = new traktor.Collection()
  var filepath = path.join(__dirname, '/data/empty-collection.nml')

  collection.load(filepath).then(tree => {
    t.pass()
    t.end()
  })
  .catch(t.fail)
})

tape('generate an nml collection from json', function (t) {
  var collection = new traktor.Collection()

  collection.load({}).then(tree => {
    t.pass()
    t.end()
  })
  .catch(t.fail)
})
