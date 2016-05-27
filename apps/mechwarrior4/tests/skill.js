let expect = require('chai').expect
let Skill = require('../skill.js')

describe('A Skill', function() {
  beforeEach(function() {
    this.skill = new Skill({
      name: 'Acrobatics',
      subSkills: ['Free-Fall', 'Gymnastics'],
      targetNumbers: [7],
      complexities: ['SB'],
      links: [['RFL']],
      xp: 40
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
    expect(this.skill.targetNumbers).to.deep.equal([7])
  })

  it('should have a complexity rating', function() {
    expect(this.skill.complexities).to.deep.equal(['SB'])
  })

  it('should have linked attributes', function() {
    expect(this.skill.links).to.deep.equal([['RFL']])
  })

  it('should have xp', function() {
    expect(this.skill.xp).to.equal(40)
  })

  it('should have a value of 1', function() {
    expect(this.skill.value('standard')).to.equal(1)
  })

  describe('When working with a tiered skill', function() {
    beforeEach(function() {
      this.skill = new Skill({
        name: 'Computers',
        subSkills: [],
        targetNumbers: [8, 9],
        tiered: true,
        complexities: ['CB', 'CA'],
        links: [['INT'], ['DEX', 'INT']],
        xp: 80
      })
    })

    it('should have the basic tier traits below skill level 3', function() {
      expect(this.skill.value('standard')).to.equal(3)
      expect(this.skill.targetNumber('standard')).to.equal(8)
      expect(this.skill.complexity('standard')).to.equal('CB')
      expect(this.skill.link('standard')).to.deep.equal(['INT'])
    })

    it('should have the advanced level traits at or above skill level 4', function() {
      this.skill.xp += 40
      expect(this.skill.value('standard')).to.equal(4)
      expect(this.skill.targetNumber('standard')).to.equal(9)
      expect(this.skill.complexity('standard')).to.equal('CA')
      expect(this.skill.link('standard')).to.deep.equal(['DEX', 'INT'])
    })
  })
})
