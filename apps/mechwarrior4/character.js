let _ = require('lodash')


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
    this.skills = []
    this.concept = data.concept
    this.affiliations = []
  }

  affiliate(affiliation) {
    this.affiliations.push(affiliation)
    _(affiliation.attributes).each((a) => {
      this.attributes[a.name] += a.value
    })
    return this.affiliations
  }

  debug_method(num) {
    this.attributes['STR'] += num
    return this.attributes['STR']
  }

  attribute(name) {
    return _.floor(this.attributes[name] / 100)
  }

  increaseAttribute(attr, amount) {
    this.attributes[attr] += amount
    this.xp -= amount
  }

  increaseSkill(skill, amount) {
    let result = _.find(this.skills, (s) => _.isEqual(s.skill, skill))
    if(result === undefined) this.skills.push({skill: skill, xp: amount})
    else result.xp += amount
    this.xp -= amount
  }

  findSkill(name, subSkill) {
    if(subSkill) {
      return _(this.skills).filter((s) => {
        return s.skill.name === name && s.skill.subSkill === subSkill
      }).first()
    } else {
      return _(this.skills).filter((s) => s.skill.name === name).first()
    }
  }

  valid() {
    let invalidAttributes = _.pickBy(this.attributes, (v, k) => v < 100)
    let englishSkill = this.findSkill('Language', 'English')
    let perceptionSkill = this.findSkill('Perception')
    return ((englishSkill !== undefined && englishSkill.xp >= 20) &&
            (perceptionSkill !== undefined && perceptionSkill.xp >= 10) &&
            (this.validSecondLanguage()) &&
            _.isEqual(invalidAttributes, {}))
  }

  validSecondLanguage() {
    if(this.affiliations.length < 1) return false
    let langs = []
    _(this.affiliations).each((a) => langs = _.union(langs, a.languages()))
    langs = _.filter(langs, (l) => l !== 'English')
    if(langs.length === 0) {
      return true
    } else {
      let secondLanguage = _(this.skills)
          .filter((s) => s.skill.name === 'Language' && _.includes(langs, s.skill.subSkill))
          .orderBy((s) => s.xp, 'desc')
          .first()
      return secondLanguage !== undefined && secondLanguage.xp >= 20
    }
  }
}
