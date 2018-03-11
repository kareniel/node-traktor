var command = process.argv[2]

if (command === 'locate') {
  var locate = require('./lib/locate')

  locate(function (err, location) {
    console.log(err || location)
  })
}
