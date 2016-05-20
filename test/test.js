require('chai').should();

describe('Array', function() {
  describe('#indexOf', function() {
    it('should return -1 when the value is not present', function() {
      let foo = [1,2,3];
      foo.indexOf(5).should.equal(-1);
      foo.indexOf(0).should.equal(-1);
    });
  });
});
