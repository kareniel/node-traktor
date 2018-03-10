var fs = require('fs')
var { promisify } = require('util')
var et = require('elementtree')

class Collection {
  entries () {
    if (!this.tree) throw new Error('Collection has not been loaded yet!')

    var collectionEl = this.tree.findall('COLLECTION')[0]
    var entries = collectionEl.findall('ENTRY')

    return entries
  }

  load (source) {
    if (typeof source === 'object') return this._fromJSON(source)
    if (typeof source === 'string') return this._fromFilepath(source)
    throw new Error('Collection.load: Source must be either an object or a string')
  }

  _fromJSON (json) {
    var entries = []
    var { ElementTree, Element, SubElement } = et

    var root = Element('NML')
    root.set('VERSION', '19')

    var headEl = SubElement(root, 'HEAD')
    headEl.set('COMPANY', 'www.native-instruments.com')
    headEl.set('PROGRAM', 'Traktor')

    SubElement(root, 'MUSICFOLDERS')

    var collectionEl = SubElement(root, 'COLLECTION')
    collectionEl.set('ENTRIES', entries.length)

    var entryElements = []

    entries.forEach(entry => {
      var el = SubElement(collectionEl, 'ENTRY')
      entryElements.push(el)
    })

    SubElement(root, 'SETS')
    SubElement(root, 'PLAYLISTS')
    SubElement(root, 'SORTING_ORDER')

    this.tree = new ElementTree(root)

    return Promise.resolve(this.entries())
  }

  _fromFilepath (filepath) {
    var read = promisify(fs.readFile)

    return read(filepath, 'utf8').then(file => {
      this.tree = et.parse(file)

      return this.entries()
    })
  }
}

module.exports = Collection
