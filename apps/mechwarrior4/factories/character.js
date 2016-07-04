let Character = require('../character.js')

module.exports = function () {
  this.characters = []
  return {
    all: () => this.characters,
    add: (character) => {
      if(character instanceof Character) {
        this.characters.push(character)
      } else {
        // HACK: this is stupid, should do something better once there's a
        // real app going on just don't know what 'something' is yet.
        console.error('Tried to add a non-character!')
      }
    }
  }
}
