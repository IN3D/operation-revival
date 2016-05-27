let _ = require('lodash')
let xp = require('./xpTable.js')


module.exports = class Skill {
  constructor(data) {
    this.name = data.name
    this.subSkills = data.subSkills
    this.tiered = (data.tiered === undefined ? false : data.tiered)
    this.targetNumbers = data.targetNumbers
    this.complexities = data.complexities
    this.links = data.links
    this.xp = data.xp
  }

  value(learning) {
    return _(xp[learning]).findLastIndex((x) => _.gte(this.xp, x))
  }

  targetNumber(learning) {
    return this.tieredSkill('targetNumbers', learning)
  }

  complexity(learning) {
    return this.tieredSkill('complexities', learning)
  }

  link(learning) {
    return this.tieredSkill('links', learning)
  }

  tieredSkill(skill, learning) {
    if(!this.tiered) {
      return this[skill][0]
    } else {
      if(this.value(learning) <= 3) return this[skill][0]
      else return this[skill][1]
    }
  }
}
