let expect = require('chai').expect
let Character = require('../character.js')
let Affiliation = require('../affiliation.js')


// Universal Fixed Experience Points
describe("A Character's validity", function() {
  beforeEach(function() {
    this.character = new Character({concept: 'A test character'})
    _.forOwn(this.character.attributes, (v, k) => {
      this.character.increaseAttribute(k, 100)
    })
    this.character.increaseSkill({ name: 'Language', subSkill: 'English' }, 20)
    this.character.increaseSkill({ name: 'Perception' }, 10)
    this.character.affiliate(new Affiliation({
      cost: 150,
      primaryLanguage: 'Mandarin Chinese',
      secondaryLanguages: ['Russian', 'Cantonese', 'Vietnamese', 'English'],
      attributes: [{ name: 'EDG', value: 50 }]
    }))
  })

  it('should be invalid if the character does not know English', function() {
    this.character.skills = _.filter(this.character.skills, (s) => {
      return s.skill.subSkill !== 'English'
    })
    expect(this.character.valid()).to.equal(false)
  })

  it('should be invalid if the character does not know a second affiliation language', function() {
    this.character.increaseSkill({ name: 'Language', subSkill: 'Spanish' }, 20)
    expect(this.character.valid()).to.equal(false)
  })

  it('should be invalid if the character has no perception', function() {
    this.character.skills = _.filter(this.character.skills, (s) => {
      return s.skill.name !== 'Perception'
    })
    expect(this.character.valid()).to.equal(false)
  })

  it('should be invalid if the character has an attribute below 100 XP', function() {
    this.character.attributes.STR = 99
    expect(this.character.valid()).to.equal(false)
  })

  it('should be valid if it has all required skills and attributes', function() {
    this.character.increaseSkill({ name: 'Language', subSkill: 'Cantonese' }, 20)
    expect(this.character.valid()).to.equal(true)
  })

  it('should be valid to have no second language, if the affiliation has none', function() {
    this.character.affiliations = []
    this.character.affiliate(new Affiliation({
      cost: 150,
      primaryLanguage: 'English',
      secondaryLanguages: [],
      attributes: [{ name: 'STR', value: 50 }]
    }))
    expect(this.character.valid()).to.equal(true)
  })
})
