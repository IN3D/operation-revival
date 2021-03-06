let expect = require('chai').expect
let Affiliation = require('../affiliation.js')

describe('An Affiliation', function () {
  beforeEach(function () {
    this.affiliation = new Affiliation({
      cost: 150,
      primaryLanguage: 'English',
      secondaryLanguages: ['French', 'German', 'Hindi', 'Russian'],
      attributes: [{ name: 'STR', value: 25 }]
    })
  })
  it('should have a cost to take it', function () {
    expect(this.affiliation.cost).to.equal(150)
  })

  it('should have a primary language', function () {
    expect(this.affiliation.primaryLanguage).to.equal('English')
  })

  it('can have secondary languages', function () {
    expect(this.affiliation.secondaryLanguages).to.deep.equal([
      'French', 'German', 'Hindi', 'Russian'
    ])
    expect(this.affiliation.valid()).to.equal(true)
  })

  it('can have no secondary languages', function () {
    let aff = new Affiliation({
      cost: 75,
      primaryLanguage: 'English',
      secondaryLanguages: []
    })
    expect(aff.secondaryLanguages).to.deep.equal([])
    expect(this.affiliation.valid()).to.equal(true)
  })

  it('should have attributes', function () {
    expect(this.affiliation.attributes).to.deep.equal([
      { name: 'STR', value: 25 }
    ])
  })

  it("should return a union array of all it's languages", function () {
    expect(this.affiliation.languages()).to.deep.equal([
      'English', 'French', 'German', 'Hindi', 'Russian'
    ])
  })
})
