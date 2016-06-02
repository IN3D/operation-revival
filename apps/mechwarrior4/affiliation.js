let _ = require('lodash')
let Skill = require('./skill.js')

module.exports = class Affiliation {
  constructor (data) {
    this.cost = data.cost
    this.primaryLanguage = data.primaryLanguage
    this.secondaryLanguages = data.secondaryLanguages
    this.attributes = data.attributes
    this.skills = _(data.skills).map((s) => new Skill(s)).value()
  }

  languages () {
    return _.union([this.primaryLanguage], this.secondaryLanguages)
  }

  valid () {
    return ((this.cost !== 0 || this.cost !== undefined) &&
            (this.primaryLanguage !== '' || this.primaryLanguage !== undefined))
  }
}
