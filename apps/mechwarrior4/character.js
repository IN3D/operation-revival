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

  increaseAttribute(attr, amount) {
    this.attributes[attr] += amount
    this.xp -= (amount * 100)
  }

  increaseSkill(skill, amount) {
    let result = _.find(this.skills, (s) => _.isEqual(s.skill, skill))
    if(result === undefined) this.skills.push({skill: skill, xp: amount})
    else result.xp += amount
    this.xp -= amount
  }

  findSkill(identifier, order) {
    let skills = _(this.skills).filter(identifier)
    if(order) return skills.orderBy(order).first()
    else return skills.first()
  }

  isValid() {
    let invalidAttributes = _.pickBy(this.attributes, (v, k) => v === 0)
    let englishSkill = this.findSkill(
      (s) => _.isEqual(s.skill, { name: 'Language', subSkill: 'English' }))
    let languageSkill = this.findSkill(
      (s) => s.skill.name === 'Language' && s.skill.subSkill !== 'English',
      (s) => s.xp, 'desc')
    let perceptionSkill = this.findSkill((s) => s.skill.name === 'Perception')

    let passableEnglish = (englishSkill !== undefined && englishSkill.xp >= 20)
    let basicPerception = (perceptionSkill !== undefined && perceptionSkill.xp >= 10)
    let secondLanguage = (languageSkill !== undefined && languageSkill.xp >= 20)
    return (passableEnglish &&
            secondLanguage &&
            basicPerception &&
            _.isEqual(invalidAttributes, {}))
  }
}
