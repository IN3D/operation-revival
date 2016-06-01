let expect = require('chai').expect
let Character = require('../character.js')
let Affiliation = require('../affiliation.js')
let Skill = require('../skill.js')

describe('A Character', function () {
  beforeEach(function () {
    this.character = new Character({concept: 'A test character'})
  })

  it('should be able to have a concept during creation', function () {
    expect(this.character.concept).to.equal('A test character')
  })

  it('should start with 5,000 XP', function () {
    expect(this.character.xp).to.equal(5000)
  })

  it('should spend 100 XP to increase an attribute to 1', function () {
    this.character.increaseAttribute('STR', 100)
    expect(this.character.attributes['STR']).to.equal(100)
    expect(this.character.xp).to.equal(4900)
  })

  it('should not spend xp, when a non-existant attribute is specified', function () {
    this.character.increaseAttribute('WAT', 100)
    expect(this.character.xp).to.equal(5000)
  })

  it('should have an attribute value of 1, if 100 XP has been spent on it', function () {
    this.character.increaseAttribute('STR', 100)
    expect(this.character.attribute('STR')).to.equal(1)
  })

  it('should have an attribute value of 3, if 399 XP has been spent on it', function () {
    this.character.increaseAttribute('STR', 399)
    expect(this.character.attribute('STR')).to.equal(3)
  })

  describe('When adding skills', function () {
    beforeEach(function () {
      this.skill = new Skill({name: 'Language', sub: 'English'})
      this.character.increaseSkill(this.skill, 20)
    })

    it('should add a skill, if it does not already have it', function () {
      expect(this.character.skills).to.deep.equal([
        new Skill({ name: 'Language', sub: 'English', xp: 20 })
      ])
      expect(this.character.xp).to.equal(4980)
    })

    it('should increase a skill, if it already exists', function () {
      this.character.increaseSkill(this.skill, 20)
      expect(this.character.skills).to.deep.equal([
        new Skill({ name: 'Language', sub: 'English', xp: 40 })
      ])
      expect(this.character.xp).to.equal(4960)
    })
  })

  describe('When choosing an affiliation', function () {
    beforeEach(function () {
      this.affiliation = new Affiliation({
        cost: 150,
        primaryLanguage: 'English',
        secondaryLanguages: ['French', 'German', 'Hindi', 'Russian'],
        attributes: [{ name: 'STR', value: 25 }]
      })
    })

    it('should add the affiliation to the characters list of affiliations', function () {
      expect(this.character.affiliate(this.affiliation)).to.deep.equal([this.affiliation])
    })

    it('should apply the attribute benefits of the affiliation', function () {
      this.character.affiliate(this.affiliation)
      expect(this.character.attributes['STR']).to.equal(25)
    })

    it('should apply the negative attributes of the affiliation', function () {
      this.affiliation.attributes[0].value = -50
      this.character.affiliate(this.affiliation)
      expect(this.character.attributes['STR']).to.equal(-50)
    })
  })
})
