let _ = require('lodash')

/**
 * A class representing a  character in Mechwarrior 4 (i.e. A Time of War)
 */
module.exports = class Character {

  /**
   * Create a character.
   * @param {object} data - JSON representation of character data
   */
  constructor (data) {
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
    this.skills = []
    this.concept = data.concept
    this.affiliations = []
  }

  /**
   * Add an affiliation to a character.
   * @param {Affiliation} affiliation - An affiliation instance
   * @return {Affiliation[]} The list of affiliations of this character
   */
  affiliate (affiliation) {
    this.affiliations.push(affiliation)
    this.xp -= affiliation.cost
    _(affiliation.attributes).each((a) => (this.attributes[a.name] += a.value))
    _(affiliation.skills).each((s) => {
      let result = this.findSkill(s.name, s.sub)
      if (result === undefined) this.skills.push(s)
      else result.xp += s.xp
    })
    return this.affiliations
  }

  /**
   * Returns the point value of the specified attribute.
   * @param {string} name - The name of the attribute (i.e. 'STR', 'BOD', etc.)
   * @return {number|NaN} An interger value, or NaN for non-existant attributes
   */
  attribute (name) {
    return _.floor(this.attributes[name] / 100)
  }

  /**
   * Adds XP, to the specified attribute, and removes it from the XP pool.
   * @param {string} attr - The attribute name
   * @param {number} amount - The amount of XP
   * @return {null} No return
   */
  increaseAttribute (attr, amount) {
    if (this.attributes[attr] !== undefined) {
      this.attributes[attr] += amount
      this.xp -= amount
    }
  }

  /**
   * Increases a skill by the specified amount of XP, and removes that XP from
   * the character's XP pool. If the character does not already have the skill,
   * it will be added to the character's skill list.
   * @param {Skill} skill - The skill to be increased
   * @param {number} amount - The amount of XP to increase by
   * @return {null} No return
   */
  increaseSkill (skill, amount) {
    let result = this.findSkill(skill.name, skill.sub)
    if (result === undefined) {
      skill.xp = amount
      this.skills.push(skill)
    } else {
      result.xp += amount
    }
    this.xp -= amount
  }

  /**
   * Finds the specified skill of the given character.
   * @param {string} name - The name of the skill
   * @param {string} [subSkill] - The subSkill, if applicable
   * @return {Skill|undefined} Returns the found skill, or undefined if not found
   */
  findSkill (name, subSkill) {
    if (subSkill) {
      return _(this.skills).filter((s) => s.name === name && s.sub === subSkill)
        .first()
    } else {
      return _(this.skills).filter((s) => s.name === name).first()
    }
  }

  /**
   * Removes the given affiliation from the character's list of affiliations
   * @param {Affiliation} affiliation - The affiliation to be removed
   * @return {Affiliation[]} The character's current list of affiliations
   */
  unaffiliate (affiliation) {
    let index = _.findIndex(this.affiliations, (a) => _.isEqual(a, affiliation))
    if (index !== -1) {
      return this.unaffiliateIndex(index)
    } else {
      return this.affiliations
    }
  }

  /**
   * Removes the affiliation from the character at the specified index.
   * @param {number} index - The index in the characters affiliation array
   * @return {Affiliation[]} The character's current list of affiliations
   */
  unaffiliateIndex (index) {
    let removed = _.pullAt(this.affiliations, index)[0]
    this.xp += removed.cost
    _(removed.attributes).each((a) => (this.attributes[a.name] -= a.value))
    _(removed.skills).each((s) => {
      let result = this.findSkill(s.name, s.sub)
      if (result === undefined) {
        s.xp *= -1
        this.skills.push(s)
      } else {
        result.xp -= s.xp
      }
    })
    _.remove(this.skills, (s) => s.xp === 0)
    return this.affiliations
  }

  /**
   * Checks if the character is valid, based on attribute, skill, and language
   * requirements. The requirements are that a character does not have any
   * attribute with XP lower than 100. They have at least 20 XP spent on English,
   * they have at least 10 XP spent on the perception skill, and they know a
   * valid second language (if applicable).
   * @return {boolean} If the character is valid or not
   */
  valid () {
    let invalidAttributes = _.pickBy(this.attributes, (v, k) => v < 100)
    let englishSkill = this.findSkill('Language', 'English')
    let perceptionSkill = this.findSkill('Perception')
    return ((englishSkill !== undefined && englishSkill.xp >= 20) &&
            (perceptionSkill !== undefined && perceptionSkill.xp >= 10) &&
            (this.validSecondLanguage()) &&
            _.isEqual(invalidAttributes, {}))
  }

  /**
   * Checks if the character has a valid second language. The rules are that a
   * character knows a language, other than English, that belongs to one of their
   * affiliations. A character is allowed to not know a second language if their
   * affiliation(s) does not have any second languages, this exception is mostly
   * for Clan characters. If the character does not meet this exception, then
   * they must have a non-English language skill with 20 XP or more.
   * @return {boolean} If the character has a valid second language
   */
  validSecondLanguage () {
    if (this.affiliations.length < 1) return false
    let langs = []
    _(this.affiliations).each((a) => (langs = _.union(langs, a.languages())))
    langs = _.filter(langs, (l) => l !== 'English')
    if (langs.length === 0) {
      return true
    } else {
      let any = _.includes(langs, '*')
      let secondLanguage = _(this.skills)
          .filter((s) => {
            if (any) return s.name === 'Language'
            else return (s.name === 'Language' && (_.includes(langs, s.sub)))
          })
          .orderBy((s) => s.xp, 'desc')
          .first()
      return secondLanguage !== undefined && secondLanguage.xp >= 20
    }
  }
}
