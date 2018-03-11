# node-traktor

[![stability - experimental][experimental-img]][stability-url]

scripts for working with traktor files. you can find my notes about Traktor [here](https://github.com/vibedrive/vibedrive/wiki/Traktor).

## api

### traktor.locate(cb)

calls back node-style with the path to a traktor root folder. 

also usable on the command line (`traktor locate`)

### traktor.Collection

##### `collection.load(source)` -> this
source can be 
  - a filepath that points to a collection.nml
  - an object that represents a collection file

returns a promise that resolves with the collection when it has been loaded

##### `collection.entries()` -> Array<Entry>
returns a list of entry items that represent music files

##### `collection.toXML()` -> xml_string
returns an xml string representation of the current tree 


## license

[MIT](LICENSE)

[experimental-img]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
