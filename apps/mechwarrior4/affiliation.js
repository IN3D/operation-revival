module.exports = class Affiliation {
  constructor(data) {
    this.cost = data.cost
    this.primaryLanguage = data.primaryLanguage
    this.secondaryLanguages = data.secondaryLanguages
  }

  valid() {
    return ((this.cost !== 0 || this.cost !== undefined) &&
            (this.primaryLanguage !== '' || this.primaryLanguage !== undefined))
  }
}
