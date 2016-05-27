let _ = require('lodash')
let xp = require('./xpTable.js')


module.exports = class Skill {
  constructor(data) {
    this.name = data.name
    this.subSkills = data.subSkills
    this.tiered = (data.tiered === undefined ? false : data.tiered)
    this.targetNumber = data.targetNumber
    this.complexity = data.complexity
    this.links = data.links
  }
}
