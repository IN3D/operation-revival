let expect = require('chai').expect
let Skill = require('../skill.js')

describe('A Skill', function() {
  beforeEach(function() {
    this.skill = new Skill({
      name: 'Acrobatics',
      subSkills: ['Free-Fall', 'Gymnastics'],
      targetNumber: 7,
      complexity: 'SB',
      links: ['RFL']
    })
  })

  it('should have a name', function() {
    expect(this.skill.name).to.equal('Acrobatics')
  })

  it('can have a list of sub-skills', function() {
    expect(this.skill.subSkills).to.deep.equal(['Free-Fall', 'Gymnastics'])
  })

  it('should have a tiered attribute', function() {
    expect(this.skill.tiered).to.equal(false)
  })

  it('should have a target number', function() {
    expect(this.skill.targetNumber).to.equal(7)
  })

  it('should have a complexity rating', function() {
    expect(this.skill.complexity).to.equal('SB')
  })

  it('should have linked attributes', function() {
    expect(this.skill.links).to.deep.equal(['RFL'])
  })
})
