let _ = require('lodash')
let standard = [20, 30, 50, 80, 120, 170, 230, 300, 380, 470, 570]

module.exports = {
  standard: standard,
  fastLearner: _(standard).map((x) => _.floor(x * 0.9)).value(),
  slowLearner: _(standard).map((x) => _.floor(x * 1.1)).value()
}
