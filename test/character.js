let expect = require('chai').expect
let Character = require('../character.js')

describe('A Character', function() {
  beforeEach(function() {
    this.character = new Character({concept: 'A test character'})
  })

  it('should be able to have a concept during creation', function() {
    expect(this.character.concept).to.equal('A test character')
  })

  it('should start with 5,000 XP', function() {
    expect(this.character.xp).to.equal(5000)
  })

  it('should spend 100 XP to increase an attribute to 1', function() {
    this.character.increaseAttribute('STR', 1)
    expect(this.character.attributes['STR']).to.equal(1)
    expect(this.character.xp).to.equal(4900)
  })

  it('should be valid if it has the Universal Fixed Experience Points', function() {
    _.forOwn(this.character.attributes, (v, k) => {
      this.character.increaseAttribute(k, 1)
    })
    this.character.increaseSkill({ name: 'Language', subSkill: 'English' }, 20)
    this.character.increaseSkill({ name: 'Language', subSkill: 'Spanish' }, 20)
    this.character.increaseSkill({ name: 'Perception' }, 10)
    expect(this.character.isValid()).to.equal(true)
  })

  describe('When adding skills', function() {
    beforeEach(function() {
      this.skill = { name: 'Language', subSkill: 'English' }
      this.character.increaseSkill(this.skill, 20)
    })

    it('should add a skill, if it does not already have it', function() {
      expect(this.character.skills).to.deep.equal([{
        skill: this.skill,
        xp: 20
      }])
      expect(this.character.xp).to.equal(4980)
    })

    it('should increase a skill, if it already exists', function() {
      this.character.increaseSkill(this.skill, 20)
      expect(this.character.skills).to.deep.equal([{
        skill: this.skill,
        xp: 40
      }])
      expect(this.character.xp).to.equal(4960)
    })
  })
})
