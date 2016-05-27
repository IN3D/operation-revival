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
    _(affiliation.attributes).each((a) => this.attributes[a.name] += a.value)
    return this.affiliations
  }

  attribute(name) {
    return _.floor(this.attributes[name] / 100)
  }

  increaseAttribute(attr, amount) {
    this.attributes[attr] += amount
    this.xp -= amount
  }

  increaseSkill(skill, amount) {
    let result = this.findSkill(skill.name, skill.sub)
    if(result === undefined) {
      skill.xp = amount
      this.skills.push(skill)
    } else {
      result.xp += amount
    }
    this.xp -= amount
  }

  findSkill(name, subSkill) {
    if(subSkill) {
      return _(this.skills).filter((s) => s.name === name && s.sub === subSkill)
        .first()
    } else {
      return _(this.skills).filter((s) => s.name === name).first()
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
      let any = _.includes(langs, '*')
      let secondLanguage = _(this.skills)
          .filter((s) => {
            if(any) return s.name === 'Language'
            else return (s.name === 'Language' && (_.includes(langs, s.sub)))
          })
          .orderBy((s) => s.xp, 'desc')
          .first()
      return secondLanguage !== undefined && secondLanguage.xp >= 20
    }
  }
}
