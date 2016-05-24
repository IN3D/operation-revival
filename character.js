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

  isValid() {
    let invalidAttributes = _.pickBy(this.attributes, (k, v) => v === 0)
    let englishSkill = _(this.skills)
      .filter((s) => _.isEqual(s.skill, { name: 'Language', subSkill: 'English' }))
      .first()
    let languageSkill = _(this.skills)
      .filter((s) => s.skill.name === 'Language' && s.skill.subSkill !== 'English')
      .orderBy((s) => s.xp, 'desc')
      .first()
    let perceptionSkill = _(this.skills)
      .filter((s) => s.skill.name === 'Perception')
      .first()

    let passableEnglish = englishSkill.xp >= 20
    let basicPerception = perceptionSkill.xp >= 10
    let secondLanguage = (languageSkill !== undefined && languageSkill.xp >= 20)
    return (passableEnglish &&
            secondLanguage &&
            basicPerception &&
            _.isEqual(invalidAttributes, {}))
  }
}
