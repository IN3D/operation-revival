let _ = require('lodash')

module.exports = class Affiliation {
  constructor (data) {
    this.cost = data.cost
    this.primaryLanguage = data.primaryLanguage
    this.secondaryLanguages = data.secondaryLanguages
    this.attributes = data.attributes
  }

  languages () {
    return _.union([this.primaryLanguage], this.secondaryLanguages)
  }

  valid () {
    return ((this.cost !== 0 || this.cost !== undefined) &&
            (this.primaryLanguage !== '' || this.primaryLanguage !== undefined))
  }
}
