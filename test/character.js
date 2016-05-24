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

  describe('When validating the Universal Fixed Experience Points', function() {
    beforeEach(function() {
      _.forOwn(this.character.attributes, (v, k) => {
        this.character.increaseAttribute(k, 1)
      })
      this.character.increaseSkill({ name: 'Language', subSkill: 'English' }, 20)
      this.character.increaseSkill({ name: 'Language', subSkill: 'Spanish' }, 20)
      this.character.increaseSkill({ name: 'Perception' }, 10)
    })

    it('should be invalid if the character does not know English', function() {
      this.character.skills = _.filter(this.character.skills, (s) => {
        return s.skill.subSkill !== 'English'
      })
      expect(this.character.isValid()).to.equal(false)
    })

    it('should be invalid if the character is not bilingual', function() {
      this.character.skills = _.filter(this.character.skills, (s) => {
        return s.skill.subSkill !== 'Spanish'
      })
      expect(this.character.isValid()).to.equal(false)
    })

    it('should be invalid if the character has no perception', function() {
      this.character.skills = _.filter(this.character.skills, (s) => {
        return s.skill.name !== 'Perception'
      })
      expect(this.character.isValid()).to.equal(false)
    })

    it('should be invalid if the character has an attribute below 1', function() {
      this.character.attributes.STR = 0
      expect(this.character.isValid()).to.equal(false)
    })

    it('should be valid if it has all required skills and attributes', function() {
      expect(this.character.isValid()).to.equal(true)
    })
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
