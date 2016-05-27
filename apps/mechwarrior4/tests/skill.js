let expect = require('chai').expect
let Skill = require('../skill.js')

describe('A skill', function() {
  it('should have a name', function() {
    let skill = new Skill('Language')
    expect(skill.name).to.equal('Language')
  })
})
