let Character = require('../character.js')

module.exports = function (characterFactory, affiliationFactory) {
  this.character = new Character({})

  this.all = () => characterFactory.all()
  this.affiliations = () => affiliationFactory.all()
  this.affiliationText = () => (this.character.affiliations.length >= 2) ? 'affiliations' : 'affiliation'
  this.addAffiliation = (index) => {
    this.character.affiliate((this.affiliations())[index])
    return this.character.affiliations
  }
  this.removeAffiliation = (index) => {
    let affiliation = this.character.affiliations[index]
    this.character.unaffiliate(affiliation)
    return this.character.affiliations
  }


  // XXX: Debug functions
  this.printAffil = () => console.log(this.affiliations())
  this.printAll = () => console.log(this.all())
  this.logCharacter = () => console.log(this.character)
}
