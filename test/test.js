let expect = require('chai').expect;

describe('Array', function() {
  describe('#indexOf', function() {
    it('should return -1 when the value is not present', function() {
      let foo = [1,2,3];
      expect(foo.indexOf(5)).to.equal(-1);
      expect(foo.indexOf(0)).to.equal(-1);
    });
  });
});
