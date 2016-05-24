let expect = require('chai').expect
let Character = require('../character.js')

describe('A Character', function() {
  before(function() {
    this.character = new Character({concept: 'A test character'})
  })

  it('should be able to have a concept during creation', function() {
    expect(this.character.concept).to.equal('A test character')
  })

  it('should start with 5,000 XP', function() {
    expect(this.character.xp).to.equal(5000)
  })

  it('should cost 100 XP to increase an attribute to 1', function() {
    this.character.increaseAttribute('STR', 1)
    expect(this.character.attributes['STR']).to.equal(1)
    expect(this.character.xp).to.equal(4900)
  })
})
