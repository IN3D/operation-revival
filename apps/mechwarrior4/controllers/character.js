let Character = require('../character.js')

module.exports = function (characterFactory) {
  this.words = 'cool story bro'
  this.add = () => {
    characterFactory.add(new Character({ concept: 'cool', xp: 5500 }))
  }
  this.printAll = () => {
    console.log(characterFactory.all())
  }
  this.badAdd = () => {
    characterFactory.add(null)
  }
}
