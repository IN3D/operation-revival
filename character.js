module.exports = class Character {
  constructor(data) {
    this.xp = 5000
    this.attributes = {
      STR: 0,
      BOD: 0,
      RFL: 0,
      DEX: 0,
      INT: 0,
      WIL: 0,
      CHA: 0,
      EDG: 0
    }
    this.concept = data.concept
  }

  increaseAttribute(attr, amount) {
    this.attributes[attr] += amount
    this.xp -= (amount * 100)
  }
}
