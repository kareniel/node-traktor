# node-traktor

[![stability - experimental][experimental-img]][stability-url]

scripts for working with traktor files

## api

### traktor.locate(cb)

calls back node-style with the path to a traktor root folder. 

also usable on the command line (`node node-traktor/lib/locate`)

### traktor.Collection

##### `collection.load(source)`
source can be 
  - a filepath that points to a collection.nml
  - an object that represents a collection file

returns a promise that resolves when collection has been loaded

##### `collection.entries()`
returns a list of entry items that represent music files

##### `collection.toXML()`
returns an xml string representation of the current tree 


## license

[MIT](LICENSE)

[experimental-img]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
