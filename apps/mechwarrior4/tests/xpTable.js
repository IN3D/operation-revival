let expect = require('chai').expect
let xp = require('../xpTable.js')

describe('XP Tables', function () {
  it('should match the standard table', function () {
    expect(xp.standard).to.deep.equal(
      [20, 30, 50, 80, 120, 170, 230, 300, 380, 470, 570])
  })

  it('should match the fast learner table', function () {
    expect(xp.fastLearner).to.deep.equal(
      [18, 27, 45, 72, 108, 153, 207, 270, 342, 423, 513])
  })

  it('should match the slow learner table', function () {
    expect(xp.slowLearner).to.deep.equal(
      [22, 33, 55, 88, 132, 187, 253, 330, 418, 517, 627])
  })
})
