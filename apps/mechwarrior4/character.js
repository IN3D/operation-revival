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
    let invalidAttributes = _.pickBy(this.attributes, (v, k) => v === 0)
    let englishSkill = this.findSkill('Language', 'English')
    let perceptionSkill = this.findSkill('Perception')
    let languageSkill = _(this.skills)
        .filter((s) => {
          return s.skill.name === 'Language' && s.skill.subSkill !== 'English'
        })
        .orderBy((s) => s.xp, 'desc').first()
    return ((englishSkill !== undefined && englishSkill.xp >= 20) &&
            (perceptionSkill !== undefined && perceptionSkill.xp >= 10) &&
            (languageSkill !== undefined && languageSkill.xp >= 20) &&
            _.isEqual(invalidAttributes, {}))
  }
}
