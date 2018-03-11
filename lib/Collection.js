var fs = require('fs')
var { promisify } = require('util')
var et = require('elementtree')

var Collection = class Collection {
  entries () {
    if (!this._tree) throw new Error('Collection has not been loaded yet!')

    var collectionEl = this._tree.findall('COLLECTION')[0]
    var entries = collectionEl.findall('ENTRY')

    return entries
  }

  load (source) {
    return this._load(source).then(tree => {
      this._tree = tree

      return this
    })
  }

  update (source) {
    return this._load(source).then(nextTree => {
      // TODO

      return this
    })
  }

  toXML () {
    return this._tree.write()
  }

  _load (source) {
    if (typeof source === 'object') return this._fromJSON(source)
    if (typeof source === 'string') return this._fromFilepath(source)

    var err = new Error('Collection.load: Source must be either an object or a string')

    return Promise.reject(err)
  }

  _fromJSON (state) {
    state = {
      entries: [],
      playlists: []
    }

    var tree = nml(
      Head(),
      Folders(state.folders),
      Entries(state.entries),
      Playlists(state.playlists),
      Sets(state.sets),
      Sortings(state.sortings)
    )

    return Promise.resolve(tree)
  }

  _fromFilepath (filepath) {
    var read = promisify(fs.readFile)

    return read(filepath, 'utf8').then(file => et.parse(file))
  }
}

function nml () {
  var rootEl = et.Element('NML')

  rootEl.set('VERSION', '19')

  var children = [ ...arguments ]

  children.forEach((child, i) => rootEl.insert(i, child))

  var tree = new et.ElementTree(rootEl)

  return tree
}

function Head () {
  var el = new et.Element('HEAD')

  el.set('COMPANY', 'www.native-instruments.com')
  el.set('PROGRAM', 'Traktor')

  return el
}

function Folders (folders) {
  var el = new et.Element('MUSICFOLDERS')

  return el
}

function Entries (entries) {
  var el = new et.Element('COLLECTION')

  el.set('ENTRIES', entries.length)

  entries.forEach(entry => {
    var el = new et.SubElement(el, 'ENTRY')
  })

  return el
}

function Sets (sets) {
  var el = new et.Element('SETS')

  return el
}

function Playlists (nodes) {
  var el = new et.Element('PLAYLISTS')

  return el
}

function Sortings (sortings) {
  var el = new et.Element('SORTING_ORDER')

  return el
}

module.exports = Collection
